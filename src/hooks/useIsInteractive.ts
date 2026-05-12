import { useEffect, useState } from "react";

/**
 * Returns true once the browser is idle after hydration.
 * Uses requestIdleCallback where available, falls back to setTimeout(0) for Safari.
 * Prevents IntersectionObserver setup from competing with the initial hydration work.
 */
export function useIsInteractive(): boolean {
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(() => setIsInteractive(true));
      return () => cancelIdleCallback(id);
    } else {
      const id = setTimeout(() => setIsInteractive(true), 0);
      return () => clearTimeout(id);
    }
  }, []);

  return isInteractive;
}
