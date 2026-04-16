import type { AppIconPlatformSelection } from "@/components/Tools/AppIconGenerator/appIconGeneratorTypes";
import type { generateAndDownloadAppIconArchive } from "@/services/appIconGenerator";
import type { IosCustomConfig } from "./AppIconGeneratorIosTypes";

const RENDER_SIZE = 1024;
const IOS_SAFE_ZONE_RATIO = 0.8;

// ─── Canvas helpers ───────────────────────────────────────────────────────────

function makeCanvas(size: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context unavailable");
  return [canvas, ctx];
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img") as HTMLImageElement;
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) { reject(new Error("toBlob failed")); return; }
      resolve(blob);
    }, "image/png");
  });
}

// ─── Composite renderer ───────────────────────────────────────────────────────

export async function renderToCanvas(config: IosCustomConfig): Promise<HTMLCanvasElement> {
  const [canvas, ctx] = makeCanvas(RENDER_SIZE);
  const size = RENDER_SIZE;

  // ── Background ──────────────────────────────────────────────────────────────
  const bg = config.background.asset;
  if (bg.type === "color") {
    ctx.fillStyle = bg.color;
    ctx.fillRect(0, 0, size, size);
  } else if (bg.type === "image" && bg.previewUrl) {
    const img = await loadImage(bg.previewUrl);
    ctx.drawImage(img, 0, 0, size, size);
  } else {
    // Default gradient fallback
    const grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, "#667eea");
    grad.addColorStop(1, "#764ba2");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }

  // ── Foreground ──────────────────────────────────────────────────────────────
  const { asset, resize } = config.foreground;
  const fgSize = size * IOS_SAFE_ZONE_RATIO * (resize / 100);
  const offset = (size - fgSize) / 2;

  if (asset.type === "image" && asset.previewUrl) {
    const img = await loadImage(asset.previewUrl);
    ctx.drawImage(img, offset, offset, fgSize, fgSize);
  } else if (asset.type === "clipart" && asset.svgString) {
    const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(asset.svgString)}`;
    const img = await loadImage(dataUrl);
    ctx.drawImage(img, offset, offset, fgSize, fgSize);
  } else if (asset.type === "text" && asset.text) {
    const fontWeight = asset.fontStyle === "bold" ? "bold" : "normal";
    const fontStyleCss = asset.fontStyle === "italic" ? "italic" : "normal";
    const fontFamily =
      asset.font === "System Default" || !asset.font
        ? "system-ui, sans-serif"
        : `"${asset.font}", sans-serif`;
    const fontSize = fgSize * 0.45;

    ctx.font = `${fontStyleCss} ${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = asset.color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const maxTextWidth = fgSize * 0.9;
    const measuredWidth = ctx.measureText(asset.text).width;
    if (measuredWidth > maxTextWidth) {
      ctx.save();
      ctx.translate(size / 2, size / 2);
      ctx.scale(maxTextWidth / measuredWidth, 1);
      ctx.fillText(asset.text, 0, 0);
      ctx.restore();
    } else {
      ctx.fillText(asset.text, size / 2, size / 2);
    }
  }

  return canvas;
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function generateAndDownloadIosCustomIcons(
  config: IosCustomConfig,
  selection: AppIconPlatformSelection,
  onGenerateArchive: typeof generateAndDownloadAppIconArchive,
): Promise<{ filename: string }> {
  const canvas = await renderToCanvas(config);
  const blob = await canvasToBlob(canvas);
  const file = new File([blob], "ios_custom_icon.png", { type: "image/png" });

  return onGenerateArchive({
    imageFile: file,
    selection: { ...selection, android: false },
    androidFileName: "",
  });
}
