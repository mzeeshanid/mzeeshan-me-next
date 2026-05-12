export type RGB = { r: number; g: number; b: number };
export type HSL = { h: number; s: number; l: number };
export type HSV = { h: number; s: number; v: number };
export type SourceFormat = "HEX" | "RGB" | "HSL" | "HSV";

export type WcagCheck = { ratio: number; passAA: boolean; passAAA: boolean };
export type WcagResult = { vsWhite: WcagCheck; vsBlack: WcagCheck };
export type Harmonics = {
  complementary: string[];
  analogous: string[];
  triadic: string[];
};
export type ConversionResult = {
  hex: string;
  rgb: RGB;
  hsl: HSL;
  hsv: HSV;
  wcag: WcagResult;
  harmonics: Harmonics;
  namedColor: string | null;
};

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}

export function hexToRgb(hex: string): RGB | null {
  const clean = hex.replace("#", "").trim();
  let full = "";
  if (clean.length === 3) {
    full = clean[0] + clean[0] + clean[1] + clean[1] + clean[2] + clean[2];
  } else if (clean.length === 6) {
    full = clean;
  } else {
    return null;
  }
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

export function rgbToHex({ r, g, b }: RGB): string {
  return (
    "#" +
    [r, g, b]
      .map((n) =>
        clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0"),
      )
      .join("")
  );
}

export function rgbToHsl({ r, g, b }: RGB): HSL {
  const rN = r / 255,
    gN = g / 255,
    bN = b / 255;
  const max = Math.max(rN, gN, bN),
    min = Math.min(rN, gN, bN);
  const delta = max - min;
  const l = (max + min) / 2;
  if (delta === 0) return { h: 0, s: 0, l: Math.round(l * 100) };
  const s = delta / (1 - Math.abs(2 * l - 1));
  let h = 0;
  if (max === rN) h = ((gN - bN) / delta) % 6;
  else if (max === gN) h = (bN - rN) / delta + 2;
  else h = (rN - gN) / delta + 4;
  h = ((h * 60) + 360) % 360;
  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function hslToRgb({ h, s, l }: HSL): RGB {
  const sN = s / 100,
    lN = l / 100;
  const c = (1 - Math.abs(2 * lN - 1)) * sN;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lN - c / 2;
  let r = 0,
    g = 0,
    bv = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; bv = x; }
  else if (h < 240) { g = x; bv = c; }
  else if (h < 300) { r = x; bv = c; }
  else { r = c; bv = x; }
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((bv + m) * 255),
  };
}

export function rgbToHsv({ r, g, b }: RGB): HSV {
  const rN = r / 255,
    gN = g / 255,
    bN = b / 255;
  const max = Math.max(rN, gN, bN),
    min = Math.min(rN, gN, bN);
  const delta = max - min;
  const v = max;
  const s = max === 0 ? 0 : delta / max;
  let h = 0;
  if (delta !== 0) {
    if (max === rN) h = ((gN - bN) / delta) % 6;
    else if (max === gN) h = (bN - rN) / delta + 2;
    else h = (rN - gN) / delta + 4;
    h = ((h * 60) + 360) % 360;
  }
  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

export function hsvToRgb({ h, s, v }: HSV): RGB {
  const sN = s / 100,
    vN = v / 100;
  const c = vN * sN;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = vN - c;
  let r = 0,
    g = 0,
    bv = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; bv = x; }
  else if (h < 240) { g = x; bv = c; }
  else if (h < 300) { r = x; bv = c; }
  else { r = c; bv = x; }
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((bv + m) * 255),
  };
}

function linearize(c: number): number {
  const n = c / 255;
  return n <= 0.04045 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
}

function relativeLuminance({ r, g, b }: RGB): number {
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

function getContrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return parseFloat(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
}

function wcagCheck(ratio: number): WcagCheck {
  return { ratio, passAA: ratio >= 4.5, passAAA: ratio >= 7 };
}

function getWcag(rgb: RGB): WcagResult {
  const L = relativeLuminance(rgb);
  return {
    vsWhite: wcagCheck(getContrastRatio(L, 1.0)),
    vsBlack: wcagCheck(getContrastRatio(L, 0.0)),
  };
}

function rotateHue(hsl: HSL, deg: number): string {
  const newH = ((hsl.h + deg) % 360 + 360) % 360;
  return rgbToHex(hslToRgb({ h: newH, s: hsl.s, l: hsl.l }));
}

function getHarmonics(rgb: RGB): Harmonics {
  const hsl = rgbToHsl(rgb);
  return {
    complementary: [rotateHue(hsl, 180)],
    analogous: [rotateHue(hsl, -30), rotateHue(hsl, 30)],
    triadic: [rotateHue(hsl, 120), rotateHue(hsl, 240)],
  };
}

const CSS_NAMED: [string, RGB][] = [
  ["red", { r: 255, g: 0, b: 0 }],
  ["lime", { r: 0, g: 255, b: 0 }],
  ["blue", { r: 0, g: 0, b: 255 }],
  ["white", { r: 255, g: 255, b: 255 }],
  ["black", { r: 0, g: 0, b: 0 }],
  ["yellow", { r: 255, g: 255, b: 0 }],
  ["cyan", { r: 0, g: 255, b: 255 }],
  ["magenta", { r: 255, g: 0, b: 255 }],
  ["navy", { r: 0, g: 0, b: 128 }],
  ["teal", { r: 0, g: 128, b: 128 }],
  ["maroon", { r: 128, g: 0, b: 0 }],
  ["green", { r: 0, g: 128, b: 0 }],
  ["purple", { r: 128, g: 0, b: 128 }],
  ["silver", { r: 192, g: 192, b: 192 }],
  ["gray", { r: 128, g: 128, b: 128 }],
  ["coral", { r: 255, g: 127, b: 80 }],
  ["salmon", { r: 250, g: 128, b: 114 }],
  ["goldenrod", { r: 218, g: 165, b: 32 }],
  ["tomato", { r: 255, g: 99, b: 71 }],
  ["steelblue", { r: 70, g: 130, b: 180 }],
  ["orange", { r: 255, g: 165, b: 0 }],
  ["pink", { r: 255, g: 192, b: 203 }],
  ["lavender", { r: 230, g: 230, b: 250 }],
  ["chocolate", { r: 210, g: 105, b: 30 }],
  ["crimson", { r: 220, g: 20, b: 60 }],
  ["indigo", { r: 75, g: 0, b: 130 }],
  ["violet", { r: 238, g: 130, b: 238 }],
  ["gold", { r: 255, g: 215, b: 0 }],
  ["tan", { r: 210, g: 180, b: 140 }],
  ["khaki", { r: 240, g: 230, b: 140 }],
];

function findNamedColor(rgb: RGB): string | null {
  let best: string | null = null;
  let bestDist = 31;
  for (const [name, named] of CSS_NAMED) {
    const dist = Math.sqrt(
      Math.pow(rgb.r - named.r, 2) +
        Math.pow(rgb.g - named.g, 2) +
        Math.pow(rgb.b - named.b, 2),
    );
    if (dist < bestDist) {
      bestDist = dist;
      best = name;
    }
  }
  return best;
}

export function convertFromRgb(rgb: RGB): ConversionResult {
  return {
    hex: rgbToHex(rgb),
    rgb: { r: clamp(rgb.r, 0, 255), g: clamp(rgb.g, 0, 255), b: clamp(rgb.b, 0, 255) },
    hsl: rgbToHsl(rgb),
    hsv: rgbToHsv(rgb),
    wcag: getWcag(rgb),
    harmonics: getHarmonics(rgb),
    namedColor: findNamedColor(rgb),
  };
}
