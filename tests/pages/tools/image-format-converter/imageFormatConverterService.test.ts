import {
  formatBytes,
  inferImageFormat,
  buildConvertedFilename,
  isMimeTypeAccepted,
  MAX_IMAGE_CONVERTER_BYTES,
  MAX_IMAGE_CONVERTER_FILES,
  MAX_IMAGE_CONVERTER_CONCURRENCY,
} from "@/services/imageFormatConverter";
import { describe, expect, it } from "vitest";

describe("imageFormatConverter service", () => {
  describe("formatBytes", () => {
    it("formats bytes less than 1KB", () => {
      expect(formatBytes(0)).toBe("0 B");
      expect(formatBytes(1)).toBe("1 B");
      expect(formatBytes(512)).toBe("512 B");
    });

    it("formats kilobytes", () => {
      expect(formatBytes(1024)).toBe("1.0 KB");
      expect(formatBytes(1536)).toBe("1.5 KB");
      expect(formatBytes(10240)).toBe("10 KB");
    });

    it("formats megabytes", () => {
      expect(formatBytes(1048576)).toBe("1.0 MB");
      expect(formatBytes(1572864)).toBe("1.5 MB");
      expect(formatBytes(52428800)).toBe("50 MB");
    });

    it("formats gigabytes", () => {
      expect(formatBytes(1073741824)).toBe("1.0 GB");
      expect(formatBytes(2147483648)).toBe("2.0 GB");
    });

    it("handles edge cases with zero and large numbers", () => {
      expect(formatBytes(-1)).toBe("-1 B");
      expect(formatBytes(100)).toBe("100 B");
    });
  });

  describe("inferImageFormat", () => {
    it("infers PNG format from mime type", () => {
      const file = new File([""], "test.png", { type: "image/png" });
      expect(inferImageFormat(file)).toBe("png");
    });

    it("infers JPG format from mime type", () => {
      const jpgFile = new File([""], "test.jpg", { type: "image/jpeg" });
      expect(inferImageFormat(jpgFile)).toBe("jpg");

      const jpegFile = new File([""], "test.jpeg", { type: "image/jpeg" });
      expect(inferImageFormat(jpegFile)).toBe("jpg");
    });

    it("infers WebP format", () => {
      const file = new File([""], "test.webp", { type: "image/webp" });
      expect(inferImageFormat(file)).toBe("webp");
    });

    it("infers TIFF format", () => {
      const tiffFile = new File([""], "test.tiff", { type: "image/tiff" });
      expect(inferImageFormat(tiffFile)).toBe("tiff");

      const tifFile = new File([""], "test.tif", { type: "image/tiff" });
      expect(inferImageFormat(tifFile)).toBe("tiff");
    });

    it("infers BMP format", () => {
      const file = new File([""], "test.bmp", { type: "image/bmp" });
      expect(inferImageFormat(file)).toBe("bmp");
    });

    it("infers GIF format", () => {
      const file = new File([""], "test.gif", { type: "image/gif" });
      expect(inferImageFormat(file)).toBe("gif");
    });

    it("infers AVIF format", () => {
      const file = new File([""], "test.avif", { type: "image/avif" });
      expect(inferImageFormat(file)).toBe("avif");
    });

    it("infers ICO format from mime type", () => {
      const icoFile = new File([""], "test.ico", { type: "image/x-icon" });
      expect(inferImageFormat(icoFile)).toBe("ico");

      const microsoftIco = new File([""], "icon.ico", { type: "image/vnd.microsoft.icon" });
      expect(inferImageFormat(microsoftIco)).toBe("ico");
    });

    it("infers AVIF format from filename extension when mime type is empty", () => {
      const avifFile = new File([""], "photo.avif", { type: "" });
      expect(inferImageFormat(avifFile)).toBe("avif");
    });

    it("infers ICO format from filename extension", () => {
      const icoFile = new File([""], "favicon.ico", { type: "" });
      expect(inferImageFormat(icoFile)).toBe("ico");
    });

    it("infers HEIC format from mime type", () => {
      const heicFile = new File([""], "test.heic", { type: "image/heic" });
      expect(inferImageFormat(heicFile)).toBe("heic");

      const heifFile = new File([""], "test.heif", { type: "image/heif" });
      expect(inferImageFormat(heifFile)).toBe("heic");
    });

    it("infers HEIC format from filename extension when mime type is empty", () => {
      const heicFile = new File([""], "photo.heic", { type: "" });
      expect(inferImageFormat(heicFile)).toBe("heic");

      const heifFile = new File([""], "photo.heif", { type: "" });
      expect(inferImageFormat(heifFile)).toBe("heic");
    });

    it("infers format from filename extension when mime type is empty", () => {
      const pngFile = new File([""], "photo.png", { type: "" });
      expect(inferImageFormat(pngFile)).toBe("png");

      const jpgFile = new File([""], "photo.jpg", { type: "" });
      expect(inferImageFormat(jpgFile)).toBe("jpg");

      const webpFile = new File([""], "photo.webp", { type: "" });
      expect(inferImageFormat(webpFile)).toBe("webp");
    });

    it("returns null for unsupported formats", () => {
      const file = new File([""], "test.xyz", { type: "application/xyz" });
      expect(inferImageFormat(file)).toBe(null);
    });

    it("handles case-insensitive mime types", () => {
      const file = new File([""], "test.PNG", { type: "IMAGE/PNG" });
      expect(inferImageFormat(file)).toBe("png");
    });
  });

  describe("buildConvertedFilename", () => {
    it("replaces extension with output extension", () => {
      expect(buildConvertedFilename("image.jpg", "png")).toBe("image.png");
      expect(buildConvertedFilename("photo.png", "webp")).toBe("photo.webp");
    });

    it("handles filenames with multiple dots", () => {
      expect(buildConvertedFilename("my.photo.jpg", "png")).toBe("my.photo.png");
      expect(buildConvertedFilename("image.test.png", "webp")).toBe("image.test.webp");
    });

    it("handles filenames without extension", () => {
      expect(buildConvertedFilename("image", "jpg")).toBe("image.jpg");
    });
  });

  describe("isMimeTypeAccepted", () => {
    it("returns true when mime type is in accepted list", () => {
      expect(isMimeTypeAccepted("image/png", ["image/png", "image/jpeg"])).toBe(true);
      expect(isMimeTypeAccepted("image/jpeg", ["image/png", "image/jpeg"])).toBe(true);
    });

    it("returns false when mime type is not in accepted list", () => {
      expect(isMimeTypeAccepted("image/gif", ["image/png", "image/jpeg"])).toBe(false);
    });

    it("returns false for empty accepted list", () => {
      expect(isMimeTypeAccepted("image/png", [])).toBe(false);
    });
  });

  describe("constants", () => {
    it("exports correct max file size", () => {
      expect(MAX_IMAGE_CONVERTER_BYTES).toBe(50 * 1024 * 1024);
    });

    it("exports correct max file count", () => {
      expect(MAX_IMAGE_CONVERTER_FILES).toBe(20);
    });

    it("exports correct max concurrency", () => {
      expect(MAX_IMAGE_CONVERTER_CONCURRENCY).toBe(5);
    });
  });
});