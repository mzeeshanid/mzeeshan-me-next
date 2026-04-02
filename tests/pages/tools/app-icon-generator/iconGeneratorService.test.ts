import JSZip from "jszip";
import {
  createGenerationManifest,
  generateAppIconArchive,
  getAndroidTargets,
  getAppleTargets,
  sanitizeAndroidFileName,
} from "@/services/appIconGenerator";
import { describe, expect, it } from "vitest";

const imageFile = new File(["icon"], "icon.png", { type: "image/png" });
const selection = {
  iphone: true,
  ipad: false,
  watchos: false,
  macos: false,
  android: true,
};

describe("appIconGenerator service", () => {
  it("generates the expected iOS targets", () => {
    const targets = getAppleTargets({
      iphone: true,
      ipad: false,
      watchos: false,
      macos: false,
      android: false,
    });

    expect(targets).toHaveLength(11);
    expect(targets[0]?.folder).toBe("iOS/AppIcon.appiconset");
    expect(targets[0]?.filename).toContain("Icon-iphone-");
  });

  it("generates the expected Android targets and file naming", () => {
    const targets = getAndroidTargets("Launcher Icon");

    expect(targets.some((item) => item.folder === "android/mipmap-mdpi")).toBe(true);
    expect(targets.some((item) => item.filename === "launcher_icon.png")).toBe(true);
    expect(targets.some((item) => item.filename === "launcher_icon.xml")).toBe(true);
    expect(targets.some((item) => item.filename.endsWith(".xml"))).toBe(true);
  });

  it("creates a manifest with Apple contents and Android assets", () => {
    const manifest = createGenerationManifest(selection, "ic_launcher");

    expect(manifest.some((item) => item.filename === "Contents.json")).toBe(true);
    expect(manifest.some((item) => item.folder === "android/mipmap-xhdpi")).toBe(true);
    expect(manifest.some((item) => item.filename === "app-store-icon-1024.png")).toBe(true);
    expect(manifest.some((item) => item.filename === "play-store-icon-512.png")).toBe(true);
  });

  it("creates a ZIP archive with the expected structure", async () => {
    const blob = await generateAppIconArchive(
      {
        imageFile,
        selection,
        androidFileName: "ic_launcher",
      },
      async (_file, size) => new Blob([`icon-${size}`], { type: "image/png" }),
    );

    const zip = await JSZip.loadAsync(await blob.arrayBuffer());
    const files = Object.keys(zip.files);

    expect(files).toContain("iOS/AppIcon.appiconset/Contents.json");
    expect(files).toContain("iOS/AppIcon.appiconset/Icon-iphone-20.png");
    expect(files).toContain("android/mipmap-mdpi/ic_launcher.png");
    expect(files).toContain("android/mipmap-anydpi-v26/ic_launcher.xml");
    expect(files).toContain("app-store-icon-1024.png");
    expect(files).toContain("play-store-icon-512.png");
  });

  it("sanitizes Android names predictably", () => {
    expect(sanitizeAndroidFileName("Launcher Icon")).toBe("launcher_icon");
    expect(sanitizeAndroidFileName("123start")).toBe("ic_123start");
  });
});
