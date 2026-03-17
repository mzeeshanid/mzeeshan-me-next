import { createContext, useContext, useState, type ReactNode, useEffect } from "react";

type Palette =
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
export const COLOR_PALETTE_STORAGE_KEY = "mzeeshan:accent-palette";
export const COLOR_PALETTE_DATASET_KEY = "colorPalette";
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

export const isPalette = (value: string): value is Palette => {
  return ALLOWED_PALETTES.includes(value);
};

declare global {
  interface Window {
    __INITIAL_COLOR_PALETTE__?: Palette;
  }
}

const getInitialPalette = (): Palette => {
  if (typeof window === "undefined") {
    return DEFAULT_PALETTE;
  }

  const windowPalette = window.__INITIAL_COLOR_PALETTE__;
  if (windowPalette && isPalette(windowPalette)) {
    return windowPalette;
  }

  const datasetPalette =
    document.documentElement.dataset[COLOR_PALETTE_DATASET_KEY];
  if (datasetPalette && isPalette(datasetPalette)) {
    return datasetPalette;
  }

  const savedPalette = window.localStorage.getItem(COLOR_PALETTE_STORAGE_KEY);
  if (savedPalette && isPalette(savedPalette)) {
    return savedPalette;
  }

  return DEFAULT_PALETTE;
};

interface ColorPaletteContextType {
  palette: Palette;
  setPalette: (p: Palette) => void;
}

const ColorPaletteContext = createContext<ColorPaletteContextType | undefined>(
  undefined,
);

export function ColorPaletteProvider({ children }: { children: ReactNode }) {
  const [palette, setPaletteState] = useState<Palette>(getInitialPalette);

  const setPalette = (newPalette: Palette) => {
    if (!isPalette(newPalette)) {
      return;
    }
    setPaletteState(newPalette);
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const initialPalette = getInitialPalette();
    if (initialPalette !== palette) {
      setPaletteState(initialPalette);
    }
  }, [palette]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(COLOR_PALETTE_STORAGE_KEY, palette);
    window.__INITIAL_COLOR_PALETTE__ = palette;
    document.documentElement.dataset[COLOR_PALETTE_DATASET_KEY] = palette;
  }, [palette]);

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
