import type { BackgroundLayerConfig, ForegroundLayerConfig } from "../android/AppIconGeneratorAndroidTypes";

export interface IosCustomConfig {
  foreground: ForegroundLayerConfig;
  background: BackgroundLayerConfig;
}

export const DEFAULT_IOS_CUSTOM_CONFIG: IosCustomConfig = {
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
