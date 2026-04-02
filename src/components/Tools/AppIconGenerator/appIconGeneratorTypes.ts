export type UploadValidationResult = {
  valid: boolean;
  error?: string;
};

export type UploadedImage = {
  file: File;
  previewUrl: string;
  width: number;
  height: number;
};

export type AppIconPlatformSelection = {
  iphone: boolean;
  ipad: boolean;
  watchos: boolean;
  macos: boolean;
  android: boolean;
};

export type AppIconPlatformKey = keyof AppIconPlatformSelection;

export type ApplePlatformKey = Exclude<AppIconPlatformKey, "android">;

export type AppIconTarget = {
  id: string;
  platform: AppIconPlatformKey;
  size: number;
  folder: string;
  filename: string;
  kind: "png" | "json" | "xml";
  content?: string;
  idiom?: string;
  scale?: string;
  sizeLabel?: string;
};

export type GenerateAppIconOptions = {
  imageFile: File;
  selection: AppIconPlatformSelection;
  androidFileName: string;
};

export type ResizeIconFn = (
  file: File,
  size: number,
) => Promise<Blob>;
