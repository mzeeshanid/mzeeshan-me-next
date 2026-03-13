type GtagParams = Record<string, unknown>;

type GtagCommand = "config" | "event";

declare global {
  interface Window {
    gtag?: (
      command: GtagCommand,
      targetIdOrAction: string | undefined,
      params?: GtagParams,
    ) => void;
  }
}

// Log the pageview with its URL.
export const pageview = (url: string): void => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  });
};

interface GAEventInput {
  action: string;
  params?: GtagParams;
}

// Log specific events happening.
export const event = ({ action, params }: GAEventInput): void => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", action, params);
};
