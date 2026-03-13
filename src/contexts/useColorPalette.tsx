import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

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

const DEFAULT_PALETTE: Palette = "green";
const COLOR_PALETTE_STORAGE_KEY = "mzeeshan:accent-palette";
const ALLOWED_PALETTES: Palette[] = [
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

const isPalette = (value: string): value is Palette => {
  return ALLOWED_PALETTES.includes(value);
};

interface ColorPaletteContextType {
  palette: Palette;
  setPalette: (p: Palette) => void;
}

const ColorPaletteContext = createContext<ColorPaletteContextType | undefined>(
  undefined,
);

export function ColorPaletteProvider({ children }: { children: ReactNode }) {
  const [palette, setPaletteState] = useState<Palette>(DEFAULT_PALETTE);

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

    const savedPalette = window.localStorage.getItem(COLOR_PALETTE_STORAGE_KEY);
    if (savedPalette && isPalette(savedPalette)) {
      setPaletteState(savedPalette);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(COLOR_PALETTE_STORAGE_KEY, palette);
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
