import JSZip from "jszip";
import type {
  AppIconPlatformSelection,
  AppIconTarget,
  ApplePlatformKey,
  GenerateAppIconOptions,
  ResizeIconFn,
  UploadValidationResult,
} from "@/components/Tools/AppIconGenerator/appIconGeneratorTypes";

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];

const APPLE_PLATFORM_SIZES: Record<ApplePlatformKey, number[]> = {
  iphone: [20, 29, 40, 58, 60, 76, 80, 87, 120, 152, 180],
  ipad: [20, 29, 40, 58, 76, 80, 87, 120, 152, 167, 180, 1024, 60],
  watchos: [24, 28, 29, 40, 44, 46, 50, 58],
  macos: [16, 32, 64, 128, 256, 512, 1024, 24, 48, 96, 192],
};

const ANDROID_MIPMAPS = [
  { density: "mdpi", size: 48 },
  { density: "hdpi", size: 72 },
  { density: "xhdpi", size: 96 },
  { density: "xxhdpi", size: 144 },
] as const;

export const validateImageUploadFile = (file: File): UploadValidationResult => {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: "Unsupported file format. Use PNG, JPG, or WEBP.",
    };
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return {
      valid: false,
      error: "Image is too large. Use an image under 10 MB.",
    };
  }

  return { valid: true };
};

export const getSelectedPlatformCount = (
  selection: AppIconPlatformSelection,
): number => {
  return Object.values(selection).filter(Boolean).length;
};

export const isAndroidFileNameValid = (value: string): boolean => {
  return /^[a-z][a-z0-9_]*$/.test(value);
};

export const sanitizeAndroidFileName = (value: string): string => {
  const sanitized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, "_")
    .replace(/^_+|_+$/g, "");

  if (!sanitized) {
    return "ic_launcher";
  }

  return /^[a-z]/.test(sanitized) ? sanitized : `ic_${sanitized}`;
};

export const getAppleTargets = (
  selection: AppIconPlatformSelection,
): AppIconTarget[] => {
  const targets: AppIconTarget[] = [];

  (Object.entries(APPLE_PLATFORM_SIZES) as Array<[ApplePlatformKey, number[]]>).forEach(
    ([platform, sizes]) => {
      if (!selection[platform]) {
        return;
      }

      sizes.forEach((size) => {
        const filename = `Icon-${platform}-${String(size).replace(".", "_")}.png`;
        targets.push({
          id: `${platform}-${size}`,
          platform,
          size,
          folder: "iOS/AppIcon.appiconset",
          filename,
          kind: "png",
          idiom: platform,
          scale: "1x",
          sizeLabel: `${size}x${size}`,
        });
      });
    },
  );

  return targets;
};

export const createAppleContentsJson = (
  targets: AppIconTarget[],
): string => {
  return JSON.stringify(
    {
      images: targets
        .filter((target) => target.kind === "png")
        .map((target) => ({
          filename: target.filename,
          idiom: target.idiom,
          scale: target.scale,
          size: target.sizeLabel,
        })),
      info: {
        author: "xcode",
        version: 1,
      },
    },
    null,
    2,
  );
};

export const getAndroidTargets = (androidFileName: string): AppIconTarget[] => {
  const fileName = sanitizeAndroidFileName(androidFileName);
  const targets: AppIconTarget[] = ANDROID_MIPMAPS.map((mipmap) => ({
    id: `android-${mipmap.density}`,
    platform: "android",
    size: mipmap.size,
    folder: `android/mipmap-${mipmap.density}`,
    filename: `${fileName}.png`,
    kind: "png",
  }));

  return [
    ...targets,
    {
      id: "android-foreground",
      platform: "android",
      size: 432,
      folder: "android/drawable",
      filename: `${fileName}_foreground.png`,
      kind: "png",
    },
    {
      id: "android-background",
      platform: "android",
      size: 0,
      folder: "android/drawable",
      filename: `${fileName}_background.xml`,
      kind: "xml",
      content:
        '<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="rectangle"><solid android:color="#FFFFFF" /></shape>',
    },
    {
      id: "android-adaptive",
      platform: "android",
      size: 0,
      folder: "android/mipmap-anydpi-v26",
      filename: `${fileName}.xml`,
      kind: "xml",
      content:
        `<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android"><background android:drawable="@drawable/${fileName}_background"/><foreground android:drawable="@drawable/${fileName}_foreground"/></adaptive-icon>`,
    },
    {
      id: "android-adaptive-round",
      platform: "android",
      size: 0,
      folder: "android/mipmap-anydpi-v26",
      filename: `${fileName}_round.xml`,
      kind: "xml",
      content:
        `<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android"><background android:drawable="@drawable/${fileName}_background"/><foreground android:drawable="@drawable/${fileName}_foreground"/></adaptive-icon>`,
    },
  ];
};

export const createGenerationManifest = (
  selection: AppIconPlatformSelection,
  androidFileName: string,
): AppIconTarget[] => {
  const appleTargets = getAppleTargets(selection);
  const manifest: AppIconTarget[] = [];

  if (appleTargets.length > 0) {
    manifest.push(...appleTargets);
    manifest.push({
      id: "apple-contents",
      platform: "iphone",
      size: 0,
      folder: "iOS/AppIcon.appiconset",
      filename: "Contents.json",
      kind: "json",
      content: createAppleContentsJson(appleTargets),
    });
    manifest.push({
      id: "apple-store-icon",
      platform: "iphone",
      size: 1024,
      folder: "",
      filename: "app-store-icon-1024.png",
      kind: "png",
    });
  }

  if (selection.android) {
    manifest.push(...getAndroidTargets(androidFileName));
    manifest.push({
      id: "android-store-icon",
      platform: "android",
      size: 512,
      folder: "",
      filename: "play-store-icon-512.png",
      kind: "png",
    });
  }

  return manifest;
};

export const defaultResizeIcon: ResizeIconFn = async (file, size) => {
  const imageUrl = URL.createObjectURL(file);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = imageUrl;
    });

    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Canvas context is unavailable");
    }

    context.clearRect(0, 0, size, size);
    context.drawImage(image, 0, 0, size, size);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((value) => {
        if (!value) {
          reject(new Error("Failed to create image blob"));
          return;
        }

        resolve(value);
      }, "image/png");
    });

    return blob;
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
};

export const generateAppIconArchive = async (
  options: GenerateAppIconOptions,
  resizeIcon: ResizeIconFn = defaultResizeIcon,
): Promise<Blob> => {
  const zip = new JSZip();
  const manifest = createGenerationManifest(
    options.selection,
    options.androidFileName,
  );

  for (const target of manifest) {
    const filePath = target.folder
      ? `${target.folder}/${target.filename}`
      : target.filename;

    if (target.kind === "png") {
      const blob = await resizeIcon(options.imageFile, target.size);
      zip.file(filePath, await blob.arrayBuffer());
      continue;
    }

    zip.file(filePath, target.content || "");
  }

  return zip.generateAsync({ type: "blob" });
};

export const downloadBlob = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
};

export const generateAndDownloadAppIconArchive = async (
  options: GenerateAppIconOptions,
  resizeIcon: ResizeIconFn = defaultResizeIcon,
): Promise<{ filename: string }> => {
  const blob = await generateAppIconArchive(options, resizeIcon);
  const filename = `app-icons-${Date.now()}.zip`;
  downloadBlob(blob, filename);
  return { filename };
};
