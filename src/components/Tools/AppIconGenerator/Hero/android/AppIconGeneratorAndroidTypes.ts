// ─── Asset types ─────────────────────────────────────────────────────────────

export interface ImageLayerAsset {
  type: "image";
  file?: File;
  previewUrl?: string;
}

export interface ClipartLayerAsset {
  type: "clipart";
  iconName: string;
  iconSet: string;
  svgString?: string; // pre-computed SVG for canvas generation
  color: string;
}

export type TextFontStyle = "regular" | "bold" | "italic";

export interface TextLayerAsset {
  type: "text";
  text: string;
  font: string;
  color: string;
  fontStyle: TextFontStyle;
}

export interface ColorLayerAsset {
  type: "color";
  color: string;
}

export type ForegroundAsset = ImageLayerAsset | ClipartLayerAsset | TextLayerAsset;
export type BackgroundAsset = ColorLayerAsset | ImageLayerAsset;

// ─── Layer configs ────────────────────────────────────────────────────────────

export interface ForegroundLayerConfig {
  layerName: string;
  asset: ForegroundAsset;
  trim: boolean;
  resize: number; // 0–400 percent
}

export interface BackgroundLayerConfig {
  layerName: string;
  asset: BackgroundAsset;
}

// ─── Options ──────────────────────────────────────────────────────────────────

export type LegacyShape = "none" | "circle" | "square" | "horizontal" | "vertical";
export type IconFormat = "webp" | "png";

export interface AndroidOptionsConfig {
  legacy: { generate: boolean; shape: LegacyShape };
  round: { generate: boolean };
  playStore: { generate: boolean };
  format: IconFormat;
}

// ─── Root config ──────────────────────────────────────────────────────────────

export interface AndroidIconConfig {
  fileName: string;
  foreground: ForegroundLayerConfig;
  background: BackgroundLayerConfig;
  monochrome: ForegroundLayerConfig;
  options: AndroidOptionsConfig;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

export const DEFAULT_ANDROID_CONFIG: AndroidIconConfig = {
  fileName: "ic_launcher",
  foreground: {
    layerName: "ic_launcher_foreground",
    asset: { type: "image" },
    trim: false,
    resize: 80,
  },
  background: {
    layerName: "ic_launcher_background",
    asset: { type: "color", color: "#3DDC84" },
  },
  monochrome: {
    layerName: "ic_launcher_monochrome",
    asset: { type: "image" },
    trim: false,
    resize: 80,
  },
  options: {
    legacy: { generate: true, shape: "square" },
    round: { generate: true },
    playStore: { generate: true },
    format: "png",
  },
};
