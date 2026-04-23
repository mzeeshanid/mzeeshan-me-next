import type { AppIconPlatformSelection, ResizeIconFn } from "@/components/Tools/AppIconGenerator/appIconGeneratorTypes";
import {
  generateAndDownloadIosArchive,
  defaultResizeIcon,
} from "@/services/appIconGenerator";
import type { IosLayerConfig } from "./AppIconGeneratorIosTypes";

const RENDER_SIZE = 1024;
const IOS_SAFE_ZONE_RATIO = 0.8;

// ─── Canvas helpers ───────────────────────────────────────────────────────────

function makeCanvas(size: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.createElement("canvas");
  canvas.width  = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context unavailable");
  return [canvas, ctx];
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img") as HTMLImageElement;
    img.crossOrigin = "anonymous";
    img.onload  = () => resolve(img);
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

export async function renderToCanvas(config: IosLayerConfig): Promise<HTMLCanvasElement> {
  const [canvas, ctx] = makeCanvas(RENDER_SIZE);
  const size = RENDER_SIZE;

  const bg = config.background.asset;
  if (bg.type === "color") {
    ctx.fillStyle = bg.color;
    ctx.fillRect(0, 0, size, size);
  } else if (bg.type === "image" && bg.previewUrl) {
    const img = await loadImage(bg.previewUrl);
    ctx.drawImage(img, 0, 0, size, size);
  } else {
    const grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, "#667eea");
    grad.addColorStop(1, "#764ba2");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }

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
    const fontWeight   = asset.fontStyle === "bold"   ? "bold"   : "normal";
    const fontStyleCss = asset.fontStyle === "italic" ? "italic" : "normal";
    const fontFamily   = asset.font === "System Default" || !asset.font
      ? "system-ui, sans-serif"
      : `"${asset.font}", sans-serif`;
    const fontSize = fgSize * 0.45;

    ctx.font          = `${fontStyleCss} ${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.fillStyle     = asset.color;
    ctx.textAlign     = "center";
    ctx.textBaseline  = "middle";

    const maxTextWidth  = fgSize * 0.9;
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

// ─── Canvas → resizable File ──────────────────────────────────────────────────

async function configToFile(config: IosLayerConfig, filename: string): Promise<File> {
  const canvas = await renderToCanvas(config);
  const blob   = await canvasToBlob(canvas);
  return new File([blob], filename, { type: "image/png" });
}

// ─── Public API ───────────────────────────────────────────────────────────────

export interface IosGenerationConfig {
  darkEnabled:   boolean;
  tintedEnabled: boolean;
  any:     IosLayerConfig;
  dark?:   IosLayerConfig;
  tinted?: IosLayerConfig;
}

export async function generateAndDownloadIosIcons(
  config: IosGenerationConfig,
  selection: AppIconPlatformSelection,
  resizeIcon: ResizeIconFn = defaultResizeIcon,
): Promise<{ filename: string }> {
  const anyFile = await configToFile(config.any, "icon-any.png");

  const darkFile   = config.darkEnabled   && config.dark
    ? await configToFile(config.dark,   "icon-dark.png")   : undefined;
  const tintedFile = config.tintedEnabled && config.tinted
    ? await configToFile(config.tinted, "icon-tinted.png") : undefined;

  return generateAndDownloadIosArchive(
    {
      selection: { ...selection, android: false },
      anyFile,
      darkFile,
      tintedFile,
    },
    resizeIcon,
  );
}
