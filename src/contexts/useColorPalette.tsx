import { createContext, useContext, useState, type ReactNode } from "react";

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
  initialPalette?: Palette;
}

export function ColorPaletteProvider({
  children,
  initialPalette = DEFAULT_PALETTE,
}: ColorPaletteProviderProps) {
  // initialPalette comes from the server-read cookie — no client correction needed.
  // useState only reads its argument on the very first mount, so client-side
  // navigations (where initialPalette is undefined) leave the existing state alone.
  const [palette, setPaletteState] = useState<Palette>(initialPalette);

  const setPalette = (newPalette: Palette) => {
    if (!isPalette(newPalette)) return;
    // Write cookie so the server renders the correct color on the next request.
    document.cookie = `${PALETTE_COOKIE}=${newPalette}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
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
