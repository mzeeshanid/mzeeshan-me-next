export const getBaseUrl = (): string => {
  // Browser
  if (typeof window !== "undefined") {
    return "";
  }

  // Server (SSG, ISR, API routes)
  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    throw new Error("NEXT_PUBLIC_SITE_URL is not defined");
  }

  return process.env.NEXT_PUBLIC_SITE_URL;
};
