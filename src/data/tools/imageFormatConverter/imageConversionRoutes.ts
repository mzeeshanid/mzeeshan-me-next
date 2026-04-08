import type { ImageConversionRoute, ImageFormat, ImageFormatBrowserSupport } from "./types";

export const imageFormatBrowserSupport: Record<ImageFormat, ImageFormatBrowserSupport> = {
  webp: {
    supported: true,
    browsers: ["Chrome 23+, Firefox 65+, Safari 14.1+, Edge 79+, Samsung Internet 6.2+"],
    since: "2012",
  },
  png: {
    supported: true,
    browsers: ["All browsers"],
    since: "1996",
  },
  jpg: {
    supported: true,
    browsers: ["All browsers"],
    since: "1992",
  },
  bmp: {
    supported: true,
    browsers: ["All browsers"],
    since: "1995",
  },
  tiff: {
    supported: true,
    browsers: ["Chrome 77+, Firefox 66+, Safari 5+, Edge 79+, Samsung Internet 12+"],
    since: "2019",
  },
  gif: {
    supported: true,
    browsers: ["All browsers"],
    since: "1995",
  },
  avif: {
    supported: typeof window !== "undefined" && document.createElement("canvas").toDataURL("image/avif").startsWith("data:image/avif"),
    browsers: ["Chrome 79+, Firefox 113+, Safari 16+, Edge 85+, Samsung Internet 16+"],
    since: "2022",
  },
  ico: {
    supported: true,
    browsers: ["All browsers"],
    since: "1995",
  },
  heic: {
    supported: true,
    browsers: ["Safari 11+ (iOS/macOS only)"],
    since: "2016",
  },
};

export const getFormatBrowserSupport = (format: ImageFormat): ImageFormatBrowserSupport => {
  const support = imageFormatBrowserSupport[format];
  
  if (format === "avif" && !support.supported) {
    return {
      supported: false,
      browsers: ["Chrome 79+, Firefox 113+, Safari 16+, Edge 85+, Samsung Internet 16+"],
      since: "2022",
    };
  }
  
  return support;
};

export const checkBrowserSupportsFormat = (format: ImageFormat): boolean => {
  if (typeof window === "undefined") return true;
  
  if (format === "avif") {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const dataUrl = canvas.toDataURL("image/avif");
    return dataUrl.startsWith("data:image/avif");
  }
  
  return true;
};

export const imageFormatOptions: { value: ImageFormat; label: string }[] = [
  { value: "webp", label: "WebP" },
  { value: "png", label: "PNG" },
  { value: "jpg", label: "JPEG" },
  { value: "bmp", label: "BMP" },
  { value: "tiff", label: "TIFF" },
  { value: "gif", label: "GIF" },
  { value: "avif", label: "AVIF" },
  { value: "ico", label: "ICO" },
  { value: "heic", label: "HEIC" },
];

const imageFormatConfig: Record<
  ImageFormat,
  {
    acceptedMimeTypes: string[];
    outputMimeType: string;
    outputExtension: string;
    supportsQuality?: boolean;
  }
> = {
  webp: {
    acceptedMimeTypes: ["image/webp"],
    outputMimeType: "image/webp",
    outputExtension: "webp",
    supportsQuality: true,
  },
  png: {
    acceptedMimeTypes: ["image/png"],
    outputMimeType: "image/png",
    outputExtension: "png",
  },
  jpg: {
    acceptedMimeTypes: ["image/jpeg", "image/jpg"],
    outputMimeType: "image/jpeg",
    outputExtension: "jpg",
    supportsQuality: true,
  },
  bmp: {
    acceptedMimeTypes: ["image/bmp", "image/x-ms-bmp"],
    outputMimeType: "image/bmp",
    outputExtension: "bmp",
  },
  tiff: {
    acceptedMimeTypes: ["image/tiff"],
    outputMimeType: "image/tiff",
    outputExtension: "tiff",
  },
  gif: {
    acceptedMimeTypes: ["image/gif"],
    outputMimeType: "image/gif",
    outputExtension: "gif",
  },
  avif: {
    acceptedMimeTypes: ["image/avif"],
    outputMimeType: "image/avif",
    outputExtension: "avif",
    supportsQuality: true,
  },
  ico: {
    acceptedMimeTypes: ["image/x-icon", "image/vnd.microsoft.icon"],
    outputMimeType: "image/x-icon",
    outputExtension: "ico",
  },
  heic: {
    acceptedMimeTypes: ["image/heic", "image/heif"],
    outputMimeType: "image/heic",
    outputExtension: "heic",
  },
};

export const getImageFormatLabel = (format: ImageFormat): string =>
  imageFormatOptions.find((option) => option.value === format)?.label ?? format.toUpperCase();

const conversionFormats = imageFormatOptions.map((option) => option.value);

export const imageConversionRoutes: ImageConversionRoute[] = conversionFormats.flatMap(
  (sourceFormat) =>
    conversionFormats
      .filter((targetFormat) => targetFormat !== sourceFormat)
      .map((targetFormat) => {
        const targetConfig = imageFormatConfig[targetFormat];

        return {
          slug: `${sourceFormat}-to-${targetFormat}`,
          sourceFormat,
          targetFormat,
          path: `/tools/image-format-converter/${sourceFormat}-to-${targetFormat}`,
          label: `${getImageFormatLabel(sourceFormat)} to ${getImageFormatLabel(targetFormat)}`,
          status: "active",
          acceptedMimeTypes: imageFormatConfig[sourceFormat].acceptedMimeTypes,
          outputMimeType: targetConfig.outputMimeType,
          outputExtension: targetConfig.outputExtension,
          supportsQuality: targetConfig.supportsQuality,
          privacyHighlight:
            "Converted locally in your browser. Your image never leaves your device.",
        } satisfies ImageConversionRoute;
      }),
);

export const getImageConversionRouteBySlug = (slug: string) =>
  imageConversionRoutes.find((route) => route.slug === slug);

export const getImageConversionRouteByPair = (
  sourceFormat: string,
  targetFormat: string,
) =>
  imageConversionRoutes.find(
    (route) =>
      route.sourceFormat === sourceFormat && route.targetFormat === targetFormat,
  );

export const getRelatedImageConversionRoutes = (
  currentSlug: string,
  limit = 4,
) => {
  const currentRoute = getImageConversionRouteBySlug(currentSlug);

  if (!currentRoute) {
    return imageConversionRoutes.filter((route) => route.status === "active").slice(0, limit);
  }

  const sameSource = imageConversionRoutes.filter(
    (route) =>
      route.slug !== currentSlug && route.sourceFormat === currentRoute.sourceFormat,
  );

  const sameTarget = imageConversionRoutes.filter(
    (route) =>
      route.slug !== currentSlug &&
      route.sourceFormat !== currentRoute.sourceFormat &&
      route.targetFormat === currentRoute.targetFormat,
  );

  return [...sameSource, ...sameTarget].slice(0, limit);
};
