import type { BackgroundLayerConfig, ForegroundLayerConfig } from "../android/AppIconGeneratorAndroidTypes";

export interface IosLayerConfig {
  foreground: ForegroundLayerConfig;
  background: BackgroundLayerConfig;
}

export const DEFAULT_IOS_LAYER_CONFIG: IosLayerConfig = {
  foreground: {
    layerName: "foreground",
    asset: { type: "image" },
    trim: false,
    resize: 80,
  },
  background: {
    layerName: "background",
    asset: { type: "color", color: "#1B5A2D" },
  },
};

// Alias kept for any remaining usages
export type IosCustomConfig = IosLayerConfig;
export const DEFAULT_IOS_CUSTOM_CONFIG = DEFAULT_IOS_LAYER_CONFIG;
