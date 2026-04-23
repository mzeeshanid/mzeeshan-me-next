import JSZip from "jszip";
import {
  createGenerationManifest,
  generateAndDownloadAppIconArchive,
  generateIosArchiveBlob,
  getAndroidTargets,
  getLegacyAppleTargetsForSelection,
  sanitizeAndroidFileName,
} from "@/services/appIconGenerator";
import { describe, expect, it } from "vitest";

const imageFile = new File(["icon"], "icon.png", { type: "image/png" });

const iphoneOnlySelection = {
  iphone: true,
  ipad: false,
  watchos: false,
  macos: false,
  android: false,
};

const mixedSelection = {
  iphone: true,
  ipad: false,
  watchos: false,
  macos: false,
  android: true,
};

describe("appIconGenerator service", () => {
  it("generates 14 iPhone legacy targets with correct idiom/platform/scale", () => {
    const targets = getLegacyAppleTargetsForSelection(iphoneOnlySelection);

    expect(targets).toHaveLength(14);
    const first = targets[0];
    expect(first?.idiom).toBe("universal");
    expect(first?.platform).toBe("ios");
    expect(first?.scale).toBeDefined();
    expect(first?.filename).toContain("ios-icon-");
  });

  it("adds iPad-specific sizes when iPad is selected", () => {
    const targets = getLegacyAppleTargetsForSelection({
      ...iphoneOnlySelection,
      ipad: true,
    });
    expect(targets).toHaveLength(16);
    expect(targets.some((t) => t.filename === "ios-icon-76@2x.png")).toBe(true);
    expect(targets.some((t) => t.filename === "ios-icon-83_5@2x.png")).toBe(true);
  });

  it("generates 20 watchOS legacy targets", () => {
    const targets = getLegacyAppleTargetsForSelection({
      ...iphoneOnlySelection,
      iphone: false,
      watchos: true,
    });
    expect(targets).toHaveLength(20);
    expect(targets.every((t) => t.platform === "watchos")).toBe(true);
  });

  it("generates 10 macOS legacy targets", () => {
    const targets = getLegacyAppleTargetsForSelection({
      ...iphoneOnlySelection,
      iphone: false,
      macos: true,
    });
    expect(targets).toHaveLength(10);
    expect(targets.every((t) => t.idiom === "mac")).toBe(true);
  });

  it("generates the expected Android targets and file naming", () => {
    const targets = getAndroidTargets("Launcher Icon");

    expect(targets.some((item) => item.folder === "android/mipmap-mdpi")).toBe(true);
    expect(targets.some((item) => item.filename === "launcher_icon.png")).toBe(true);
    expect(targets.some((item) => item.filename === "launcher_icon.xml")).toBe(true);
    expect(targets.some((item) => item.filename.endsWith(".xml"))).toBe(true);
  });

  it("creates a manifest with Android assets only (iOS now has its own archive builder)", () => {
    const manifest = createGenerationManifest(mixedSelection, "ic_launcher");

    expect(manifest.some((item) => item.folder === "android/mipmap-xhdpi")).toBe(true);
    expect(manifest.some((item) => item.filename === "play-store-icon-512.png")).toBe(true);
  });

  it("creates an iOS archive with Sizes and iOS 26+ folders (any only, no dark/tinted)", async () => {
    const blob = await generateIosArchiveBlob(
      {
        selection: iphoneOnlySelection,
        anyFile: imageFile,
      },
      async (_file, size) => new Blob([`icon-${size}`], { type: "image/png" }),
    );

    const zip   = await JSZip.loadAsync(await blob.arrayBuffer());
    const files = Object.keys(zip.files);

    expect(files.some((f) => f.startsWith("iOS/Sizes/AppIcon.appiconset/"))).toBe(true);
    expect(files).toContain("iOS/Sizes/AppIcon.appiconset/Contents.json");
    expect(files).toContain("iOS/iOS 26+/AppIcon.appiconset/Contents.json");
    expect(files).toContain("iOS/iOS 26+/AppIcon.appiconset/icon-1024-any.png");
    expect(files).not.toContain("iOS/iOS 26+/AppIcon.appiconset/icon-1024-dark.png");
    // None appearance: no dark/tinted variants in Sizes folder
    expect(files).not.toContain("iOS/Sizes/AppIcon.appiconset/ios-icon-60@2x-dark.png");
  });

  it("creates an iOS archive with appearance variants in both Sizes and iOS 26+ folders", async () => {
    const blob = await generateIosArchiveBlob(
      {
        selection:  iphoneOnlySelection,
        anyFile:    imageFile,
        darkFile:   imageFile,
        tintedFile: imageFile,
      },
      async (_file, size) => new Blob([`icon-${size}`], { type: "image/png" }),
    );

    const zip   = await JSZip.loadAsync(await blob.arrayBuffer());
    const files = Object.keys(zip.files);

    // iOS 26+ folder — three variants
    expect(files).toContain("iOS/iOS 26+/AppIcon.appiconset/icon-1024-any.png");
    expect(files).toContain("iOS/iOS 26+/AppIcon.appiconset/icon-1024-dark.png");
    expect(files).toContain("iOS/iOS 26+/AppIcon.appiconset/icon-1024-tinted.png");

    // Sizes folder — three variants per size
    expect(files.some((f) => f.endsWith("-dark.png") && f.includes("iOS/Sizes/"))).toBe(true);
    expect(files.some((f) => f.endsWith("-tinted.png") && f.includes("iOS/Sizes/"))).toBe(true);
    expect(files).toContain("iOS/Sizes/AppIcon.appiconset/ios-icon-60@2x-dark.png");
    expect(files).toContain("iOS/Sizes/AppIcon.appiconset/ios-icon-60@2x-tinted.png");
  });

  it("sanitizes Android names predictably", () => {
    expect(sanitizeAndroidFileName("Launcher Icon")).toBe("launcher_icon");
    expect(sanitizeAndroidFileName("123start")).toBe("ic_123start");
  });
});
