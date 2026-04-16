import React from "react";

/**
 * SSR-safe localStorage hook.
 *
 * Always starts with `defaultValue` so server and client render identically
 * (no hydration mismatch). After mount, reads the stored value and keeps it
 * in sync on every subsequent change.
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = React.useState<T>(defaultValue);
  const initialized = React.useRef(false);

  React.useEffect(() => {
    if (!initialized.current) {
      // First run: hydrate from storage, skip the write so we don't
      // clobber a stored value with the default before the re-render.
      initialized.current = true;
      try {
        const stored = window.localStorage.getItem(key);
        if (stored !== null) {
          setValue(JSON.parse(stored) as T);
          return;
        }
      } catch {}
    }
    // Subsequent runs (after hydration or whenever value changes): persist.
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);

  return [value, setValue];
}
