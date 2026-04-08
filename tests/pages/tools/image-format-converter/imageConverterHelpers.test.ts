import {
  getSizeComparisonLabel,
  getTargetFormatSizeNote,
  buildItemId,
} from "@/components/Tools/ImageFormatConverter/Hero/helpers/imageConverterHelpers";
import { describe, expect, it } from "vitest";

describe("imageConverterHelpers", () => {
  describe("getSizeComparisonLabel", () => {
    it("returns empty string for zero original bytes", () => {
      expect(getSizeComparisonLabel(0, 100)).toBe("");
      expect(getSizeComparisonLabel(-1, 100)).toBe("");
    });

    it("returns Smaller when converted is smaller than original", () => {
      expect(getSizeComparisonLabel(1000, 500)).toBe("Smaller: 0.5x");
      expect(getSizeComparisonLabel(1000, 100)).toBe("Smaller: 0.1x");
      expect(getSizeComparisonLabel(1000, 1000)).toBe("Smaller: 1.0x");
    });

    it("returns Larger when converted is larger than original", () => {
      expect(getSizeComparisonLabel(500, 1000)).toBe("Larger: 2.0x");
      expect(getSizeComparisonLabel(100, 500)).toBe("Larger: 5.0x");
    });

    it("formats large ratios without decimals", () => {
      expect(getSizeComparisonLabel(100, 2000)).toBe("Larger: 20x");
      expect(getSizeComparisonLabel(100, 150)).toBe("Larger: 1.5x");
    });
  });

  describe("getTargetFormatSizeNote", () => {
    it("returns JPEG/WebP note for jpg format", () => {
      const note = getTargetFormatSizeNote("jpg");
      expect(note).toContain("JPEG/WebP-style output");
    });

    it("returns JPEG/WebP note for webp format", () => {
      const note = getTargetFormatSizeNote("webp");
      expect(note).toContain("JPEG/WebP-style output");
    });

    it("returns PNG note", () => {
      const note = getTargetFormatSizeNote("png");
      expect(note).toContain("lossless");
    });

    it("returns TIFF note", () => {
      const note = getTargetFormatSizeNote("tiff");
      expect(note).toContain("large");
    });

    it("returns BMP note", () => {
      const note = getTargetFormatSizeNote("bmp");
      expect(note).toContain("uncompressed");
    });

    it("returns GIF note", () => {
      const note = getTargetFormatSizeNote("gif");
      expect(note).toContain("inefficient");
    });

    it("returns empty string for unknown formats", () => {
      expect(getTargetFormatSizeNote("unknown")).toBe("");
      expect(getTargetFormatSizeNote("")).toBe("");
    });
  });

  describe("buildItemId", () => {
    it("builds unique ID from file name and index", () => {
      const file = new File(["content"], "test.png", { type: "image/png" });

      const id = buildItemId(file, 0);
      expect(id).toContain("test.png");
      expect(id).toContain("0");
    });

    it("includes index in the ID", () => {
      const file = new File(["content"], "test.png", { type: "image/png" });
      
      const id0 = buildItemId(file, 0);
      const id1 = buildItemId(file, 1);
      
      expect(id0).toContain("-0");
      expect(id1).toContain("-1");
    });

    it("produces different IDs for different files", () => {
      const file1 = new File(["content1"], "image1.png", { type: "image/png" });
      const file2 = new File(["content2"], "image2.png", { type: "image/png" });

      const id1 = buildItemId(file1, 0);
      const id2 = buildItemId(file2, 0);

      expect(id1).not.toBe(id2);
    });
  });
});