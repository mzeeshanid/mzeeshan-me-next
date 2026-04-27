import type {
  AppIconPlatformSelection,
  AppIconTarget,
  GenerateAppIconOptions,
  ResizeIconFn,
  UploadValidationResult,
} from "@/components/Tools/AppIconGenerator/appIconGeneratorTypes";

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];

// ─── Legacy Apple target definitions (based on Xcode appiconset schema) ────────

interface LegacyAppleTarget {
  idiom: "universal" | "mac";
  platform?: "ios" | "watchos";
  size: string;    // in points, e.g. "20x20"
  scale?: string;  // e.g. "2x" (omitted for 1024 App Store entry)
  px: number;      // actual pixel size for rendering
  filename: string;
}

const IPHONE_LEGACY_TARGETS: LegacyAppleTarget[] = [
  { idiom: "universal", platform: "ios", size: "20x20",      scale: "2x", px: 40,  filename: "ios-icon-20@2x.png"    },
  { idiom: "universal", platform: "ios", size: "20x20",      scale: "3x", px: 60,  filename: "ios-icon-20@3x.png"    },
  { idiom: "universal", platform: "ios", size: "29x29",      scale: "2x", px: 58,  filename: "ios-icon-29@2x.png"    },
  { idiom: "universal", platform: "ios", size: "29x29",      scale: "3x", px: 87,  filename: "ios-icon-29@3x.png"    },
  { idiom: "universal", platform: "ios", size: "38x38",      scale: "2x", px: 76,  filename: "ios-icon-38@2x.png"    },
  { idiom: "universal", platform: "ios", size: "38x38",      scale: "3x", px: 114, filename: "ios-icon-38@3x.png"    },
  { idiom: "universal", platform: "ios", size: "40x40",      scale: "2x", px: 80,  filename: "ios-icon-40@2x.png"    },
  { idiom: "universal", platform: "ios", size: "40x40",      scale: "3x", px: 120, filename: "ios-icon-40@3x.png"    },
  { idiom: "universal", platform: "ios", size: "60x60",      scale: "2x", px: 120, filename: "ios-icon-60@2x.png"    },
  { idiom: "universal", platform: "ios", size: "60x60",      scale: "3x", px: 180, filename: "ios-icon-60@3x.png"    },
  { idiom: "universal", platform: "ios", size: "64x64",      scale: "2x", px: 128, filename: "ios-icon-64@2x.png"    },
  { idiom: "universal", platform: "ios", size: "64x64",      scale: "3x", px: 192, filename: "ios-icon-64@3x.png"    },
  { idiom: "universal", platform: "ios", size: "68x68",      scale: "2x", px: 136, filename: "ios-icon-68@2x.png"    },
  { idiom: "universal", platform: "ios", size: "1024x1024",             px: 1024, filename: "ios-icon-1024.png"      },
];

const IPAD_EXTRA_LEGACY_TARGETS: LegacyAppleTarget[] = [
  { idiom: "universal", platform: "ios", size: "76x76",      scale: "2x", px: 152, filename: "ios-icon-76@2x.png"    },
  { idiom: "universal", platform: "ios", size: "83.5x83.5",  scale: "2x", px: 167, filename: "ios-icon-83_5@2x.png"  },
];

const MACOS_LEGACY_TARGETS: LegacyAppleTarget[] = [
  { idiom: "mac", size: "16x16",   scale: "1x", px: 16,   filename: "mac-icon-16@1x.png"   },
  { idiom: "mac", size: "16x16",   scale: "2x", px: 32,   filename: "mac-icon-16@2x.png"   },
  { idiom: "mac", size: "32x32",   scale: "1x", px: 32,   filename: "mac-icon-32@1x.png"   },
  { idiom: "mac", size: "32x32",   scale: "2x", px: 64,   filename: "mac-icon-32@2x.png"   },
  { idiom: "mac", size: "128x128", scale: "1x", px: 128,  filename: "mac-icon-128@1x.png"  },
  { idiom: "mac", size: "128x128", scale: "2x", px: 256,  filename: "mac-icon-128@2x.png"  },
  { idiom: "mac", size: "256x256", scale: "1x", px: 256,  filename: "mac-icon-256@1x.png"  },
  { idiom: "mac", size: "256x256", scale: "2x", px: 512,  filename: "mac-icon-256@2x.png"  },
  { idiom: "mac", size: "512x512", scale: "1x", px: 512,  filename: "mac-icon-512@1x.png"  },
  { idiom: "mac", size: "512x512", scale: "2x", px: 1024, filename: "mac-icon-512@2x.png"  },
];

const WATCHOS_LEGACY_TARGETS: LegacyAppleTarget[] = [
  { idiom: "universal", platform: "watchos", size: "22x22",    scale: "2x", px: 44,  filename: "watch-icon-22@2x.png"    },
  { idiom: "universal", platform: "watchos", size: "24x24",    scale: "2x", px: 48,  filename: "watch-icon-24@2x.png"    },
  { idiom: "universal", platform: "watchos", size: "27.5x27.5",scale: "2x", px: 55,  filename: "watch-icon-27_5@2x.png"  },
  { idiom: "universal", platform: "watchos", size: "29x29",    scale: "2x", px: 58,  filename: "watch-icon-29@2x.png"    },
  { idiom: "universal", platform: "watchos", size: "30x30",    scale: "2x", px: 60,  filename: "watch-icon-30@2x.png"    },
  { idiom: "universal", platform: "watchos", size: "32x32",    scale: "2x", px: 64,  filename: "watch-icon-32@2x.png"    },
  { idiom: "universal", platform: "watchos", size: "33x33",    scale: "2x", px: 66,  filename: "watch-icon-33@2x.png"    },
  { idiom: "universal", platform: "watchos", size: "40x40",    scale: "2x", px: 80,  filename: "watch-icon-40@2x.png"    },
  { idiom: "universal", platform: "watchos", size: "43.5x43.5",scale: "2x", px: 87,  filename: "watch-icon-43_5@2x.png"  },
  { idiom: "universal", platform: "watchos", size: "44x44",    scale: "2x", px: 88,  filename: "watch-icon-44@2x.png"    },
  { idiom: "universal", platform: "watchos", size: "46x46",    scale: "2x", px: 92,  filename: "watch-icon-46@2x.png"    },
  { idiom: "universal", platform: "watchos", size: "50x50",    scale: "2x", px: 100, filename: "watch-icon-50@2x.png"    },
  { idiom: "universal", platform: "watchos", size: "51x51",    scale: "2x", px: 102, filename: "watch-icon-51@2x.png"    },
  { idiom: "universal", platform: "watchos", size: "54x54",    scale: "2x", px: 108, filename: "watch-icon-54@2x.png"    },
  { idiom: "universal", platform: "watchos", size: "86x86",    scale: "2x", px: 172, filename: "watch-icon-86@2x.png"    },
  { idiom: "universal", platform: "watchos", size: "98x98",    scale: "2x", px: 196, filename: "watch-icon-98@2x.png"    },
  { idiom: "universal", platform: "watchos", size: "108x108",  scale: "2x", px: 216, filename: "watch-icon-108@2x.png"   },
  { idiom: "universal", platform: "watchos", size: "117x117",  scale: "2x", px: 234, filename: "watch-icon-117@2x.png"   },
  { idiom: "universal", platform: "watchos", size: "129x129",  scale: "2x", px: 258, filename: "watch-icon-129@2x.png"   },
  { idiom: "universal", platform: "watchos", size: "1024x1024",            px: 1024, filename: "watch-icon-1024.png"     },
];

// ─── Android mipmaps ──────────────────────────────────────────────────────────

const ANDROID_MIPMAPS = [
  { density: "mdpi",   size: 48  },
  { density: "hdpi",   size: 72  },
  { density: "xhdpi",  size: 96  },
  { density: "xxhdpi", size: 144 },
] as const;

// ─── Validation ───────────────────────────────────────────────────────────────

export const validateImageUploadFile = (file: File): UploadValidationResult => {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return { valid: false, error: "Unsupported file format. Use PNG, JPG, or WEBP." };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { valid: false, error: "Image is too large. Use an image under 10 MB." };
  }
  return { valid: true };
};

export const getSelectedPlatformCount = (selection: AppIconPlatformSelection): number =>
  Object.values(selection).filter(Boolean).length;

// ─── Android utilities ────────────────────────────────────────────────────────

export const isAndroidFileNameValid = (value: string): boolean =>
  /^[a-z][a-z0-9_]*$/.test(value);

export const sanitizeAndroidFileName = (value: string): string => {
  const sanitized = value.trim().toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^_+|_+$/g, "");
  if (!sanitized) return "ic_launcher";
  return /^[a-z]/.test(sanitized) ? sanitized : `ic_${sanitized}`;
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
      content: '<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="rectangle"><solid android:color="#FFFFFF" /></shape>',
    },
    {
      id: "android-adaptive",
      platform: "android",
      size: 0,
      folder: "android/mipmap-anydpi-v26",
      filename: `${fileName}.xml`,
      kind: "xml",
      content: `<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android"><background android:drawable="@drawable/${fileName}_background"/><foreground android:drawable="@drawable/${fileName}_foreground"/></adaptive-icon>`,
    },
    {
      id: "android-adaptive-round",
      platform: "android",
      size: 0,
      folder: "android/mipmap-anydpi-v26",
      filename: `${fileName}_round.xml`,
      kind: "xml",
      content: `<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android"><background android:drawable="@drawable/${fileName}_background"/><foreground android:drawable="@drawable/${fileName}_foreground"/></adaptive-icon>`,
    },
  ];
};

// ─── Legacy Apple target helpers ──────────────────────────────────────────────

export const getLegacyAppleTargetsForSelection = (
  selection: AppIconPlatformSelection,
): LegacyAppleTarget[] => {
  const seen = new Set<string>();
  const targets: LegacyAppleTarget[] = [];

  const add = (list: LegacyAppleTarget[]) => {
    for (const t of list) {
      if (!seen.has(t.filename)) {
        seen.add(t.filename);
        targets.push(t);
      }
    }
  };

  if (selection.iphone) add(IPHONE_LEGACY_TARGETS);
  if (selection.ipad) {
    // iPad needs the shared iPhone sizes too (universal iOS appiconset)
    add(IPHONE_LEGACY_TARGETS);
    add(IPAD_EXTRA_LEGACY_TARGETS);
  }
  if (selection.watchos) add(WATCHOS_LEGACY_TARGETS);
  if (selection.macos) add(MACOS_LEGACY_TARGETS);

  return targets;
};

export const createLegacyContentsJson = (
  targets: LegacyAppleTarget[],
  options: { hasDark?: boolean; hasTinted?: boolean } = {},
): string => {
  const images: Record<string, unknown>[] = [];

  for (const t of targets) {
    const base: Record<string, unknown> = { idiom: t.idiom };
    if (t.platform) base.platform = t.platform;
    if (t.scale) base.scale = t.scale;
    base.size = t.size;

    images.push({ ...base, filename: t.filename });

    if (options.hasDark) {
      images.push({
        ...base,
        appearances: [{ appearance: "luminosity", value: "dark" }],
        filename: t.filename.replace(".png", "-dark.png"),
      });
    }
    if (options.hasTinted) {
      images.push({
        ...base,
        appearances: [{ appearance: "luminosity", value: "tinted" }],
        filename: t.filename.replace(".png", "-tinted.png"),
      });
    }
  }

  return JSON.stringify({ images, info: { author: "xcode", version: 1 } }, null, 2);
};

// ─── iOS 26+ Contents.json ────────────────────────────────────────────────────

export const IOS26_ANY_FILENAME    = "icon-1024-any.png";
export const IOS26_DARK_FILENAME   = "icon-1024-dark.png";
export const IOS26_TINTED_FILENAME = "icon-1024-tinted.png";

export const createIos26ContentsJson = (
  options: { hasDark?: boolean; hasTinted?: boolean } = {},
): string => {
  const images: Record<string, unknown>[] = [
    { filename: IOS26_ANY_FILENAME, idiom: "universal", platform: "ios", size: "1024x1024" },
  ];

  if (options.hasDark) {
    images.push({
      appearances: [{ appearance: "luminosity", value: "dark" }],
      filename: IOS26_DARK_FILENAME,
      idiom: "universal",
      platform: "ios",
      size: "1024x1024",
    });
  }
  if (options.hasTinted) {
    images.push({
      appearances: [{ appearance: "luminosity", value: "tinted" }],
      filename: IOS26_TINTED_FILENAME,
      idiom: "universal",
      platform: "ios",
      size: "1024x1024",
    });
  }

  return JSON.stringify({ images, info: { author: "xcode", version: 1 } }, null, 2);
};

// ─── iOS archive generator ────────────────────────────────────────────────────

export type IosArchiveOptions = {
  selection: AppIconPlatformSelection;
  anyFile: File;
  darkFile?: File;
  tintedFile?: File;
};

export const generateIosArchiveBlob = async (
  options: IosArchiveOptions,
  resizeIcon: ResizeIconFn = defaultResizeIcon,
): Promise<Blob> => {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();
  const legacyBase = "iOS/Sizes/AppIcon.appiconset";
  const ios26Base  = "iOS/iOS 26+/AppIcon.appiconset";

  // ── Legacy folder ──────────────────────────────────────────────────────────
  const legacyTargets = getLegacyAppleTargetsForSelection(options.selection);
  const hasDark   = !!options.darkFile;
  const hasTinted = !!options.tintedFile;

  for (const target of legacyTargets) {
    zip.file(`${legacyBase}/${target.filename}`, await (await resizeIcon(options.anyFile, target.px)).arrayBuffer());
    if (hasDark) {
      zip.file(`${legacyBase}/${target.filename.replace(".png", "-dark.png")}`,
        await (await resizeIcon(options.darkFile!, target.px)).arrayBuffer());
    }
    if (hasTinted) {
      zip.file(`${legacyBase}/${target.filename.replace(".png", "-tinted.png")}`,
        await (await resizeIcon(options.tintedFile!, target.px)).arrayBuffer());
    }
  }
  zip.file(`${legacyBase}/Contents.json`, createLegacyContentsJson(legacyTargets, { hasDark, hasTinted }));

  // ── iOS 26+ folder ─────────────────────────────────────────────────────────
  zip.file(`${ios26Base}/${IOS26_ANY_FILENAME}`, await (await resizeIcon(options.anyFile, 1024)).arrayBuffer());
  if (hasDark)   zip.file(`${ios26Base}/${IOS26_DARK_FILENAME}`,   await (await resizeIcon(options.darkFile!,   1024)).arrayBuffer());
  if (hasTinted) zip.file(`${ios26Base}/${IOS26_TINTED_FILENAME}`, await (await resizeIcon(options.tintedFile!, 1024)).arrayBuffer());

  zip.file(`${ios26Base}/Contents.json`, createIos26ContentsJson({ hasDark, hasTinted }));

  return zip.generateAsync({ type: "blob" });
};

export const generateAndDownloadIosArchive = async (
  options: IosArchiveOptions,
  resizeIcon: ResizeIconFn = defaultResizeIcon,
): Promise<{ filename: string }> => {
  const blob = await generateIosArchiveBlob(options, resizeIcon);
  const filename = `ios-app-icons-${Date.now()}.zip`;
  downloadBlob(blob, filename);
  return { filename };
};

// ─── Android archive (unchanged) ──────────────────────────────────────────────

export const createGenerationManifest = (
  selection: AppIconPlatformSelection,
  androidFileName: string,
): AppIconTarget[] => {
  const manifest: AppIconTarget[] = [];
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

// ─── Resize + download helpers ────────────────────────────────────────────────

export const defaultResizeIcon: ResizeIconFn = async (file, size) => {
  const imageUrl = URL.createObjectURL(file);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload  = () => resolve(img);
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = imageUrl;
    });

    const canvas = document.createElement("canvas");
    canvas.width  = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context is unavailable");
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(image, 0, 0, size, size);

    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((value) => {
        if (!value) { reject(new Error("Failed to create image blob")); return; }
        resolve(value);
      }, "image/png");
    });
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
};

export const downloadBlob = (blob: Blob, filename: string): void => {
  const url    = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href     = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
};

export const generateAppIconArchive = async (
  options: GenerateAppIconOptions,
  resizeIcon: ResizeIconFn = defaultResizeIcon,
): Promise<Blob> => {
  const JSZip = (await import("jszip")).default;
  const zip      = new JSZip();
  const manifest = createGenerationManifest(options.selection, options.androidFileName);

  for (const target of manifest) {
    const filePath = target.folder ? `${target.folder}/${target.filename}` : target.filename;
    if (target.kind === "png") {
      const blob = await resizeIcon(options.imageFile, target.size);
      zip.file(filePath, await blob.arrayBuffer());
      continue;
    }
    zip.file(filePath, target.content || "");
  }

  return zip.generateAsync({ type: "blob" });
};

export const generateAndDownloadAppIconArchive = async (
  options: GenerateAppIconOptions,
  resizeIcon: ResizeIconFn = defaultResizeIcon,
): Promise<{ filename: string }> => {
  const blob     = await generateAppIconArchive(options, resizeIcon);
  const filename = `app-icons-${Date.now()}.zip`;
  downloadBlob(blob, filename);
  return { filename };
};
