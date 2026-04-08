import { MAX_IMAGE_CONVERTER_BYTES, inferImageFormat, isHeicFile } from "@/services/imageFormatConverter";
import type { ImageFormat } from "@/data/tools/imageFormatConverter/types";

export interface ValidationResult {
  valid: boolean;
  error: string | null;
}

export interface ImageValidationResult extends ValidationResult {
  dimensions: { width: number; height: number } | null;
}

const getImageDimensions = async (file: File): Promise<{ width: number; height: number }> => {
  if (isHeicFile(file)) {
    const { heicTo } = await import("heic-to");
    const blob = await heicTo({
      blob: file,
      type: "image/png",
    });
    const objectUrl = URL.createObjectURL(blob);
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = objectUrl;
    });
    URL.revokeObjectURL(objectUrl);
    return { width: image.naturalWidth, height: image.naturalHeight };
  }

  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
    };
    image.onerror = () => reject(new Error("Failed to load image"));
    image.src = URL.createObjectURL(file);
  });
};

export const validateImageFile = async (
  file: File,
  expectedFormat?: ImageFormat,
): Promise<ImageValidationResult> => {
  if (file.size > MAX_IMAGE_CONVERTER_BYTES) {
    return {
      valid: false,
      error: "This image is too large. The maximum size is 50 MB.",
      dimensions: null,
    };
  }

  const sourceFormat = inferImageFormat(file);

  if (!sourceFormat) {
    return {
      valid: false,
      error: "This image format is not supported for conversion.",
      dimensions: null,
    };
  }

  if (expectedFormat && sourceFormat !== expectedFormat) {
    return {
      valid: false,
      error: `This page expects ${expectedFormat.toUpperCase()} images. Switch the source format or remove this file.`,
      dimensions: null,
    };
  }

  try {
    const dimensions = await getImageDimensions(file);
    return {
      valid: true,
      error: null,
      dimensions,
    };
  } catch {
    return {
      valid: false,
      error: "We could not read this image. Try a different file.",
      dimensions: null,
    };
  }
};

export const validateBatchFiles = async (
  files: File[],
  expectedFormat?: ImageFormat,
): Promise<ImageValidationResult[]> => {
  return Promise.all(files.map((file) => validateImageFile(file, expectedFormat)));
};