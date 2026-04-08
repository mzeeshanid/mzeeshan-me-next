import type { ImageFormat } from "@/data/tools/imageFormatConverter/types";

export const MAX_IMAGE_CONVERTER_BYTES = 50 * 1024 * 1024;
export const MAX_IMAGE_CONVERTER_FILES = 20;
export const MAX_IMAGE_CONVERTER_CONCURRENCY = 5;

export const formatBytes = (bytes: number): string => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const units = ["KB", "MB", "GB"];
  let size = bytes / 1024;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  return `${size.toFixed(size >= 10 ? 0 : 1)} ${units[unitIndex]}`;
};

export const isMimeTypeAccepted = (
  mimeType: string,
  acceptedMimeTypes: string[],
): boolean => acceptedMimeTypes.includes(mimeType);

export const loadImageElement = async (file: File): Promise<HTMLImageElement> => {
  const objectUrl = URL.createObjectURL(file);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const nextImage = new Image();
      nextImage.onload = () => resolve(nextImage);
      nextImage.onerror = () => reject(new Error("Failed to load image for conversion."));
      nextImage.src = objectUrl;
    });

    return image;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
};

export const inferImageFormat = (file: File): ImageFormat | null => {
  const mimeType = file.type.toLowerCase();
  const name = file.name.toLowerCase();

  if (mimeType === "image/png" || name.endsWith(".png")) {
    return "png";
  }

  if (
    mimeType === "image/jpeg" ||
    mimeType === "image/jpg" ||
    name.endsWith(".jpg") ||
    name.endsWith(".jpeg")
  ) {
    return "jpg";
  }

  if (mimeType === "image/webp" || name.endsWith(".webp")) {
    return "webp";
  }

  if (mimeType === "image/tiff" || name.endsWith(".tiff") || name.endsWith(".tif")) {
    return "tiff";
  }

  if (mimeType === "image/bmp" || name.endsWith(".bmp")) {
    return "bmp";
  }

  if (mimeType === "image/gif" || name.endsWith(".gif")) {
    return "gif";
  }

  if (mimeType === "image/avif" || name.endsWith(".avif")) {
    return "avif";
  }

  if (mimeType === "image/x-icon" || mimeType === "image/vnd.microsoft.icon" || name.endsWith(".ico")) {
    return "ico";
  }

  if (mimeType === "image/heic" || mimeType === "image/heif" || name.endsWith(".heic") || name.endsWith(".heif")) {
    return "heic";
  }

  return null;
};

export const readImageDimensions = async (
  file: File,
): Promise<{ width: number; height: number }> => {
  const sourceCanvas = await createSourceCanvas({ file });

  return {
    width: sourceCanvas.width,
    height: sourceCanvas.height,
  };
};

type CreateSourceCanvasOptions = {
  file: File;
  resizeWidth?: number;
  resizeHeight?: number;
  onProgress?: (progress: number) => void;
};

export const isHeicFile = (file: File): boolean => {
  const mimeType = file.type.toLowerCase();
  const name = file.name.toLowerCase();
  return mimeType === "image/heic" || mimeType === "image/heif" || name.endsWith(".heic") || name.endsWith(".heif");
};

const convertHeicToPng = async (file: File): Promise<HTMLCanvasElement> => {
  const { heicTo } = await import("heic-to");
  const blob = await heicTo({
    blob: file,
    type: "image/png",
  });
  
  const objectUrl = URL.createObjectURL(blob);
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load converted HEIC image."));
    img.src = objectUrl;
  });
  
  URL.revokeObjectURL(objectUrl);
  
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas context is unavailable.");
  }
  context.drawImage(image, 0, 0);
  
  return canvas;
};

const createSourceCanvas = async ({
  file,
  resizeWidth,
  resizeHeight,
  onProgress,
}: CreateSourceCanvasOptions): Promise<HTMLCanvasElement> => {
  onProgress?.(10);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas context is unavailable.");
  }

  if (isHeicFile(file)) {
    const heicCanvas = await convertHeicToPng(file);
    onProgress?.(35);
    canvas.width = resizeWidth ?? heicCanvas.width;
    canvas.height = resizeHeight ?? heicCanvas.height;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(heicCanvas, 0, 0, canvas.width, canvas.height);
    onProgress?.(70);
    return canvas;
  }

  try {
    const image = await loadImageElement(file);
    onProgress?.(35);
    canvas.width = resizeWidth ?? image.naturalWidth;
    canvas.height = resizeHeight ?? image.naturalHeight;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    onProgress?.(70);

    return canvas;
  } catch {
    const { Jimp } = await import("jimp");
    const image = await Jimp.read(await file.arrayBuffer());
    onProgress?.(35);

    const sourceCanvas = document.createElement("canvas");
    sourceCanvas.width = image.bitmap.width;
    sourceCanvas.height = image.bitmap.height;

    const sourceContext = sourceCanvas.getContext("2d");
    if (!sourceContext) {
      throw new Error("Canvas context is unavailable.");
    }

    sourceContext.putImageData(
      new ImageData(
        new Uint8ClampedArray(image.bitmap.data),
        image.bitmap.width,
        image.bitmap.height,
      ),
      0,
      0,
    );

    canvas.width = resizeWidth ?? image.bitmap.width;
    canvas.height = resizeHeight ?? image.bitmap.height;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(sourceCanvas, 0, 0, canvas.width, canvas.height);
    onProgress?.(70);

    return canvas;
  }
};

export const convertImageInBrowser = async (options: {
  file: File;
  outputMimeType: string;
  quality?: number;
  optimizeOutput?: boolean;
  resizeWidth?: number;
  resizeHeight?: number;
  onProgress?: (progress: number) => void;
}): Promise<Blob> => {
  options.onProgress?.(10);
  const canvas = await createSourceCanvas({
    file: options.file,
    resizeWidth: options.resizeWidth,
    resizeHeight: options.resizeHeight,
    onProgress: options.onProgress,
  });
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas context is unavailable.");
  }

  if (options.outputMimeType === "image/x-icon") {
    const pngBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Failed to create PNG for ICO conversion."));
            return;
          }
          resolve(blob);
        },
        "image/png",
      );
    });
    options.onProgress?.(100);
    return pngBlob;
  }

  if (isJimpOutputMimeType(options.outputMimeType)) {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const { Jimp } = await import("jimp");
    const jimpImage = Jimp.fromBitmap({
      data: imageData.data,
      width: canvas.width,
      height: canvas.height,
    });
    const outputBuffer = await jimpImage.getBuffer(
      options.outputMimeType,
      getJimpOutputOptions(
        options.outputMimeType,
        options.quality,
        options.optimizeOutput,
      ),
    );
    options.onProgress?.(100);

    return new Blob([new Uint8Array(outputBuffer)], {
      type: options.outputMimeType,
    });
  }

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to create converted image."));
          return;
        }

        options.onProgress?.(100);
        resolve(blob);
      },
      options.outputMimeType,
      options.optimizeOutput ? options.quality : undefined,
    );
  });
};

type JimpOutputMimeType =
  | "image/jpeg"
  | "image/png"
  | "image/bmp"
  | "image/tiff"
  | "image/gif";

const JIMP_OUTPUT_MIME_TYPES = new Set<string>([
  "image/jpeg",
  "image/png",
  "image/bmp",
  "image/tiff",
  "image/gif",
]);

const isJimpOutputMimeType = (mimeType: string): mimeType is JimpOutputMimeType =>
  JIMP_OUTPUT_MIME_TYPES.has(mimeType);

export const checkBrowserSupportsOutputFormat = (outputMimeType: string): boolean => {
  if (typeof window === "undefined") return true;
  
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  
  try {
    const dataUrl = canvas.toDataURL(outputMimeType);
    return dataUrl.startsWith(`data:${outputMimeType}`);
  } catch {
    return false;
  }
};

const getJimpOutputOptions = (
  mimeType: JimpOutputMimeType,
  quality?: number,
  optimizeOutput?: boolean,
) => {
  if (mimeType === "image/jpeg" && optimizeOutput && quality) {
    return { quality: Math.round(quality * 100) };
  }

  if (mimeType === "image/png" && optimizeOutput) {
    return {
      deflateLevel: 9,
      deflateStrategy: 3,
    };
  }

  return undefined;
};

export const buildConvertedFilename = (
  originalName: string,
  outputExtension: string,
): string => {
  const withoutExtension = originalName.replace(/\.[^/.]+$/, "");
  return `${withoutExtension}.${outputExtension}`;
};
