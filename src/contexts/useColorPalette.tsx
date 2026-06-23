import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Palette =
  | "gray"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "teal"
  | "blue"
  | "cyan"
  | "purple"
  | "pink"
  | string;

export const DEFAULT_PALETTE: Palette = "green";
export const PALETTE_COOKIE = "accent-color";
export const ALLOWED_PALETTES: Palette[] = [
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
];

export const isPalette = (value: string): value is Palette =>
  ALLOWED_PALETTES.includes(value);

export function parsePaletteCookie(cookieHeader: string): Palette {
  const match = cookieHeader.match(
    new RegExp(`(?:^|;\\s*)${PALETTE_COOKIE}=([^;]+)`)
  );
  const value = match?.[1];
  return value && ALLOWED_PALETTES.includes(value)
    ? (value as Palette)
    : DEFAULT_PALETTE;
}

// 1 year — same session length Chakra Pro uses
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

interface ColorPaletteContextType {
  palette: Palette;
  setPalette: (p: Palette) => void;
}

const ColorPaletteContext = createContext<ColorPaletteContextType | undefined>(
  undefined,
);

interface ColorPaletteProviderProps {
  children: ReactNode;
}

export function ColorPaletteProvider({ children }: ColorPaletteProviderProps) {
  // SSR always uses the default — HTML is byte-identical for every visitor.
  // After mount, read the value the blocking script stamped on <html> from the
  // cookie, so React state matches the CSS that's already on screen.
  const [palette, setPaletteState] = useState<Palette>(DEFAULT_PALETTE);

  useEffect(() => {
    const stored = document.documentElement.dataset.colorPalette;
    if (stored && isPalette(stored)) {
      setPaletteState(stored as Palette);
    }
  }, []);

  const setPalette = (newPalette: Palette) => {
    if (!isPalette(newPalette)) return;
    document.cookie = `${PALETTE_COOKIE}=${newPalette}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
    document.documentElement.dataset.colorPalette = newPalette;
    setPaletteState(newPalette);
  };

  return (
    <ColorPaletteContext.Provider value={{ palette, setPalette }}>
      {children}
    </ColorPaletteContext.Provider>
  );
}

export function useColorPalette(): ColorPaletteContextType {
  const ctx = useContext(ColorPaletteContext);
  if (!ctx)
    throw new Error("useColorPalette must be used within ColorPaletteProvider");
  return ctx;
}
