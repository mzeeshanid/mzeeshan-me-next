import { formatBytes, buildConvertedFilename as buildFilename } from "@/services/imageFormatConverter";

export const getSizeComparisonLabel = (
  originalBytes: number,
  convertedBytes: number,
): string => {
  if (originalBytes <= 0) {
    return "";
  }

  const ratio = convertedBytes / originalBytes;
  const formattedRatio = ratio.toFixed(ratio >= 10 ? 0 : 1);

  if (ratio <= 1) {
    return `Smaller: ${formattedRatio}x`;
  }

  return `Larger: ${formattedRatio}x`;
};

export const getTargetFormatSizeNote = (targetFormat: string): string => {
  switch (targetFormat) {
    case "jpg":
    case "webp":
      return "Enable Optimize output to use a smaller quality setting for JPEG/WebP-style output.";
    case "png":
      return "PNG is lossless. Photo-like images can still become larger than JPEG or WebP.";
    case "tiff":
      return "TIFF output can be large. Use Resize or choose JPEG/WebP when smaller files matter more.";
    case "bmp":
      return "BMP is usually uncompressed, so output files are expected to be much larger.";
    case "gif":
      return "GIF can be inefficient for rich-color images. This converter exports a static GIF frame.";
    default:
      return "";
  }
};

export const triggerDownload = (url: string, fileName: string) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
};

export const buildItemId = (file: File, index: number): string =>
  `${file.name}-${file.size}-${file.lastModified}-${index}`;

export const buildUniqueItemId = (file: File, index: number, existingCount: number): string =>
  `${file.name}-${file.size}-${file.lastModified}-${existingCount + index}`;

export { formatBytes, buildFilename as buildConvertedFilename };