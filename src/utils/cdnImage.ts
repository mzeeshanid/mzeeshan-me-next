const CDN_BASE = "https://cdn.mzeeshan.me";

export function isCdnUrl(url: string): boolean {
  return url.startsWith(CDN_BASE);
}

export function getCdnBlurUrl(url: string): string {
  const lastSlash = url.lastIndexOf("/");
  return url.substring(0, lastSlash + 1) + "Blur_" + url.substring(lastSlash + 1);
}
