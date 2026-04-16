import JSZip from "jszip";
import type { AndroidIconConfig, BackgroundLayerConfig, ForegroundLayerConfig, LegacyShape } from "./AppIconGeneratorAndroidTypes";

// ─── Density map ──────────────────────────────────────────────────────────────

const DENSITIES = [
  { name: "mdpi",    scale: 1 },
  { name: "hdpi",    scale: 1.5 },
  { name: "xhdpi",   scale: 2 },
  { name: "xxhdpi",  scale: 3 },
  { name: "xxxhdpi", scale: 4 },
] as const;

// Adaptive layer base: 108dp; legacy base: 48dp; play store: 512px
const ADAPTIVE_BASE_DP = 108;
const LEGACY_BASE_DP   = 48;
const PLAY_STORE_SIZE  = 512;

// Safe zone: center 66dp of the 108dp canvas
const SAFE_ZONE_RATIO = 66 / 108;

// ─── Canvas helpers ───────────────────────────────────────────────────────────

function makeCanvas(size: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context unavailable");
  return [canvas, ctx];
}

async function canvasToBlob(canvas: HTMLCanvasElement, mimeType: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) { reject(new Error("toBlob failed")); return; }
      resolve(blob);
    }, mimeType);
  });
}

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

function objectUrl(file: File): string {
  return URL.createObjectURL(file);
}

// ─── Background drawing ───────────────────────────────────────────────────────

async function drawBackground(
  ctx: CanvasRenderingContext2D,
  size: number,
  config: BackgroundLayerConfig,
): Promise<void> {
  const { asset } = config;

  if (asset.type === "color") {
    ctx.fillStyle = asset.color;
    ctx.fillRect(0, 0, size, size);
    return;
  }

  if (asset.type === "image" && asset.file) {
    const url = objectUrl(asset.file);
    try {
      const img = await loadImage(url);
      ctx.drawImage(img, 0, 0, size, size);
    } finally {
      URL.revokeObjectURL(url);
    }
  }
}

// ─── Foreground drawing ───────────────────────────────────────────────────────

async function drawForeground(
  ctx: CanvasRenderingContext2D,
  size: number,
  config: ForegroundLayerConfig,
): Promise<void> {
  const { asset, resize } = config;

  // Position within safe zone, further scaled by user's resize %
  const contentSize = size * SAFE_ZONE_RATIO * (resize / 100);
  const x = (size - contentSize) / 2;
  const y = (size - contentSize) / 2;

  if (asset.type === "image" && asset.file) {
    const url = objectUrl(asset.file);
    try {
      const img = await loadImage(url);
      ctx.drawImage(img, x, y, contentSize, contentSize);
    } finally {
      URL.revokeObjectURL(url);
    }
    return;
  }

  if (asset.type === "clipart" && asset.svgString) {
    const svgBlob = new Blob([asset.svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);
    try {
      const img = await loadImage(url);
      ctx.drawImage(img, x, y, contentSize, contentSize);
    } finally {
      URL.revokeObjectURL(url);
    }
    return;
  }

  if (asset.type === "text" && asset.text) {
    const font =
      asset.font === "System Default" || !asset.font
        ? "system-ui"
        : asset.font;
    const fontSize = contentSize * 0.55;
    ctx.font = `bold ${fontSize}px "${font}", system-ui`;
    ctx.fillStyle = asset.color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(asset.text, size / 2, size / 2);
  }
}

// ─── Shape mask ───────────────────────────────────────────────────────────────

function applyShapeMask(
  ctx: CanvasRenderingContext2D,
  size: number,
  shape: LegacyShape,
): void {
  if (shape === "none" || shape === "square") return;

  ctx.globalCompositeOperation = "destination-in";
  ctx.beginPath();

  if (shape === "circle") {
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  } else if (shape === "horizontal") {
    const r = size * 0.3;
    ctx.roundRect(0, size * 0.15, size, size * 0.7, r);
  } else if (shape === "vertical") {
    const r = size * 0.3;
    ctx.roundRect(size * 0.15, 0, size * 0.7, size, r);
  }

  ctx.fill();
  ctx.globalCompositeOperation = "source-over";
}

// ─── Composite icon (fg + bg, used for legacy/round/play-store) ───────────────

async function compositeIcon(
  size: number,
  fg: ForegroundLayerConfig,
  bg: BackgroundLayerConfig,
  shape: LegacyShape,
  mimeType: string,
): Promise<Blob> {
  const [canvas, ctx] = makeCanvas(size);
  await drawBackground(ctx, size, bg);
  await drawForeground(ctx, size, fg);
  applyShapeMask(ctx, size, shape);
  return canvasToBlob(canvas, mimeType);
}

// ─── Adaptive layer (fg or bg alone) ─────────────────────────────────────────

async function renderAdaptiveLayer(
  size: number,
  isFg: boolean,
  config: ForegroundLayerConfig | BackgroundLayerConfig,
  mimeType: string,
): Promise<Blob> {
  const [canvas, ctx] = makeCanvas(size);
  if (isFg) {
    await drawForeground(ctx, size, config as ForegroundLayerConfig);
  } else {
    await drawBackground(ctx, size, config as BackgroundLayerConfig);
  }
  return canvasToBlob(canvas, mimeType);
}

// ─── Monochrome layer ─────────────────────────────────────────────────────────

async function renderMonochromeLayer(
  size: number,
  config: ForegroundLayerConfig,
  mimeType: string,
): Promise<Blob> {
  const [canvas, ctx] = makeCanvas(size);
  await drawForeground(ctx, size, config);
  // Apply grayscale via pixel manipulation
  const imageData = ctx.getImageData(0, 0, size, size);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    data[i] = data[i + 1] = data[i + 2] = gray;
  }
  ctx.putImageData(imageData, 0, 0);
  return canvasToBlob(canvas, mimeType);
}

// ─── XML helpers ──────────────────────────────────────────────────────────────

function adaptiveIconXml(fileName: string, hasMonochrome: boolean): string {
  const mono = hasMonochrome
    ? `\n    <monochrome android:drawable="@drawable/${fileName}_monochrome"/>`
    : "";
  return [
    `<?xml version="1.0" encoding="utf-8"?>`,
    `<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">`,
    `    <background android:drawable="@drawable/${fileName}_background"/>`,
    `    <foreground android:drawable="@drawable/${fileName}_foreground"/>${mono}`,
    `</adaptive-icon>`,
  ].join("\n");
}

function colorBackgroundXml(color: string): string {
  return [
    `<?xml version="1.0" encoding="utf-8"?>`,
    `<shape xmlns:android="http://schemas.android.com/apk/res/android">`,
    `    <solid android:color="${color}"/>`,
    `</shape>`,
  ].join("\n");
}

// ─── Preview renderer ─────────────────────────────────────────────────────────
// Composites foreground + background to a data URL for the device preview section.
// Uses previewUrl when available to avoid redundant object URL creation.

export async function renderAndroidPreviewDataUrl(
  config: Pick<AndroidIconConfig, "foreground" | "background">,
  size = 512,
): Promise<string> {
  const [canvas, ctx] = makeCanvas(size);

  // Background
  const bgAsset = config.background.asset;
  if (bgAsset.type === "color") {
    ctx.fillStyle = bgAsset.color;
    ctx.fillRect(0, 0, size, size);
  } else if (bgAsset.type === "image") {
    const url = (bgAsset as { previewUrl?: string }).previewUrl
      ?? (bgAsset.file ? objectUrl(bgAsset.file) : null);
    if (url) {
      const owned = !(bgAsset as { previewUrl?: string }).previewUrl;
      try {
        const img = await loadImage(url);
        ctx.drawImage(img, 0, 0, size, size);
      } finally {
        if (owned) URL.revokeObjectURL(url);
      }
    }
  }

  // Foreground
  const { asset, resize } = config.foreground;
  const contentSize = size * SAFE_ZONE_RATIO * (resize / 100);
  const x = (size - contentSize) / 2;
  const y = (size - contentSize) / 2;

  if (asset.type === "image") {
    const url = (asset as { previewUrl?: string }).previewUrl
      ?? (asset.file ? objectUrl(asset.file) : null);
    if (url) {
      const owned = !(asset as { previewUrl?: string }).previewUrl;
      try {
        const img = await loadImage(url);
        ctx.drawImage(img, x, y, contentSize, contentSize);
      } finally {
        if (owned) URL.revokeObjectURL(url);
      }
    }
  } else if (asset.type === "clipart" && asset.svgString) {
    const svgBlob = new Blob([asset.svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);
    try {
      const img = await loadImage(url);
      ctx.drawImage(img, x, y, contentSize, contentSize);
    } finally {
      URL.revokeObjectURL(url);
    }
  } else if (asset.type === "text" && asset.text) {
    const font =
      asset.font === "System Default" || !asset.font ? "system-ui" : asset.font;
    const fontWeight = asset.fontStyle === "bold" ? "bold" : "normal";
    const fontStyleCss = asset.fontStyle === "italic" ? "italic" : "normal";
    const fontSize = contentSize * 0.55;
    ctx.font = `${fontStyleCss} ${fontWeight} ${fontSize}px "${font}", system-ui`;
    ctx.fillStyle = asset.color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(asset.text, size / 2, size / 2);
  }

  return canvas.toDataURL("image/png");
}

// ─── Public entry point ───────────────────────────────────────────────────────

export async function generateAndDownloadAndroidIcons(
  config: AndroidIconConfig,
): Promise<{ filename: string }> {
  const zip = new JSZip();
  const fn = config.fileName || "ic_launcher";
  const mime = config.options.format === "webp" ? "image/webp" : "image/png";
  const ext = config.options.format === "webp" ? "webp" : "png";
  const hasMono = config.monochrome.asset.type !== "image" ||
    !!(config.monochrome.asset as { file?: File }).file;

  // ── Adaptive icon XMLs ──────────────────────────────────────────────────
  const xmlContent = adaptiveIconXml(fn, hasMono);
  zip.file(`android/mipmap-anydpi-v26/${fn}.xml`, xmlContent);
  if (config.options.round.generate) {
    zip.file(`android/mipmap-anydpi-v26/${fn}_round.xml`, xmlContent);
  }

  // ── Background: XML if solid color, PNG otherwise ──────────────────────
  if (config.background.asset.type === "color") {
    zip.file(
      `android/drawable/${fn}_background.xml`,
      colorBackgroundXml(config.background.asset.color),
    );
  } else {
    // PNG background at xxxhdpi equivalent for the drawable folder
    const bgSize = ADAPTIVE_BASE_DP * 4;
    const bgBlob = await renderAdaptiveLayer(bgSize, false, config.background, mime);
    zip.file(`android/drawable/${fn}_background.${ext}`, await bgBlob.arrayBuffer());
  }

  // ── Foreground layer (drawable) ─────────────────────────────────────────
  const fgSize = ADAPTIVE_BASE_DP * 4;
  const fgBlob = await renderAdaptiveLayer(fgSize, true, config.foreground, mime);
  zip.file(`android/drawable/${fn}_foreground.${ext}`, await fgBlob.arrayBuffer());

  // ── Monochrome layer ────────────────────────────────────────────────────
  if (hasMono) {
    const monoSize = ADAPTIVE_BASE_DP * 4;
    const monoBlob = await renderMonochromeLayer(monoSize, config.monochrome, mime);
    zip.file(`android/drawable/${fn}_monochrome.${ext}`, await monoBlob.arrayBuffer());
  }

  // ── Legacy icons (composited) per density ──────────────────────────────
  if (config.options.legacy.generate) {
    for (const density of DENSITIES) {
      const size = Math.round(LEGACY_BASE_DP * density.scale);
      const blob = await compositeIcon(size, config.foreground, config.background, config.options.legacy.shape, mime);
      zip.file(`android/mipmap-${density.name}/${fn}.${ext}`, await blob.arrayBuffer());
    }
  }

  // ── Round icons ─────────────────────────────────────────────────────────
  if (config.options.round.generate) {
    for (const density of DENSITIES) {
      const size = Math.round(LEGACY_BASE_DP * density.scale);
      const blob = await compositeIcon(size, config.foreground, config.background, "circle", mime);
      zip.file(`android/mipmap-${density.name}/${fn}_round.${ext}`, await blob.arrayBuffer());
    }
  }

  // ── Play Store icon ─────────────────────────────────────────────────────
  if (config.options.playStore.generate) {
    const blob = await compositeIcon(PLAY_STORE_SIZE, config.foreground, config.background, "none", mime);
    zip.file(`android/play-store-icon.${ext}`, await blob.arrayBuffer());
  }

  // ── Download ────────────────────────────────────────────────────────────
  const zipBlob = await zip.generateAsync({ type: "blob" });
  const filename = `android-icons-${fn}-${Date.now()}.zip`;

  const url = URL.createObjectURL(zipBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  return { filename };
}
