export type HowItWorksItem = {
  title: string;
  body: string;
  formula?: string;
  link?: { label: string; href: string };
};

export type HowItWorksData = {
  header: { badge: string; title: string; description: string };
  items: HowItWorksItem[];
};

export const colorConverterHowItWorksData: HowItWorksData = {
  header: {
    badge: "How It Works",
    title: "Understanding Color Format Conversion",
    description:
      "Every color format describes the same point in visible light — just from a different angle. Here is the math and reasoning behind each conversion.",
  },
  items: [
    {
      title: "What is HEX?",
      body: "A HEX color code (e.g. #3b82f6) is a base-16 triplet encoding red, green, and blue channels. Each pair of characters maps directly to one byte (0–255). The three-character shorthand #rgb expands to #rrggbb. An 8-digit form (#rrggbbaa) adds an alpha channel for transparency.",
      formula: "#3b82f6  →  R = 0x3b = 59,  G = 0x82 = 130,  B = 0xf6 = 246",
      link: {
        label: "MDN — hex-color",
        href: "https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hex-color",
      },
    },
    {
      title: "What is RGB?",
      body: "RGB (Red, Green, Blue) is the additive colour model used by screens. Each channel ranges from 0 to 255. Mixing all three at full intensity produces white; all at zero produces black. CSS accepts rgb(59, 130, 246) as well as the space-separated CSS Color 4 form rgb(59 130 246 / 80%).",
      formula: "rgb(59, 130, 246)  →  red=59, green=130, blue=246",
      link: {
        label: "MDN — rgb()",
        href: "https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb",
      },
    },
    {
      title: "What is HSL?",
      body: "HSL (Hue, Saturation, Lightness) uses a cylindrical model that matches human colour intuition. Hue is the angle on the colour wheel (0°=red, 120°=green, 240°=blue). Saturation controls vividness (0% = grey, 100% = full colour). Lightness ranges from 0% (black) to 100% (white), with 50% being the pure hue. Designers prefer HSL because adjustments like 'make it 15% lighter' are direct.",
      formula: "hsl(217, 91%, 60%)  →  hue=217°, saturation=91%, lightness=60%",
      link: {
        label: "W3C CSS Color 4 — hsl()",
        href: "https://www.w3.org/TR/css-color-4/#the-hsl-notation",
      },
    },
    {
      title: "What is HSV / HSB?",
      body: "HSV (Hue, Saturation, Value) — also called HSB (Brightness) — uses the same hue as HSL but replaces lightness with value, which equals the maximum channel (the brightness of the lightest pixel). A pure, fully saturated red is hsl(0, 100%, 50%) but hsv(0, 100%, 100%). HSV is the colour model behind Adobe Photoshop's colour picker and most design tool APIs. Adobe Color uses it for the colour wheel.",
      formula: "hsv(217, 76%, 96%)  →  hue=217°, saturation=76%, value=96%",
      link: {
        label: "Adobe Color — colour wheel",
        href: "https://color.adobe.com/create/color-wheel",
      },
    },
    {
      title: "HEX ↔ RGB Conversion",
      body: "Converting HEX to RGB: split the 6 hex digits into three 2-char pairs and parse each as base-16. Converting RGB to HEX: convert each integer (0–255) to its 2-digit hex representation and concatenate. Short-form #rgb is expanded to #rrggbb before parsing.",
      formula: "hexToRgb('#3b82f6') → { r:59, g:130, b:246 }\nrgbToHex(59,130,246) → '#3b82f6'",
    },
    {
      title: "RGB ↔ HSL Conversion",
      body: "Normalise R, G, B to [0, 1]. Compute max and min. Lightness L = (max + min) / 2. Saturation S = delta / (1 − |2L − 1|) where delta = max − min. Hue is determined by which channel is dominant, then scaled to [0°, 360°). The inverse (HSL → RGB) computes chroma from H, S, L and reconstructs channels using the CSS Color 4 reference algorithm.",
      formula: "L = (max + min) / 2\nS = delta / (1 − |2L − 1|)\nH = 60 × sector_offset",
      link: {
        label: "W3C CSS Color 4 — HSL algorithm",
        href: "https://www.w3.org/TR/css-color-4/#hsl-to-rgb",
      },
    },
    {
      title: "WCAG Contrast Ratio",
      body: "Relative luminance linearises each sRGB channel (undoing gamma), then weights them by the eye's sensitivity (green ≫ blue). Contrast ratio = (L_lighter + 0.05) / (L_darker + 0.05). WCAG 2.1 requires 4.5:1 for normal text (AA) and 7:1 for enhanced legibility (AAA) against the background colour.",
      formula: "L = 0.2126R_lin + 0.7152G_lin + 0.0722B_lin\nratio = (max(L1,L2)+0.05) / (min(L1,L2)+0.05)",
      link: {
        label: "WCAG 2.1 §1.4.3 — Contrast (Minimum)",
        href: "https://www.w3.org/TR/WCAG21/#contrast-minimum",
      },
    },
  ],
};
