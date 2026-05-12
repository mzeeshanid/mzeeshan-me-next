export type ColorFaqItem = {
  question: string;
  answer: string;
};

export type ColorFaqsData = {
  header: { badge: string; title: string; desc: string };
  faqs: ColorFaqItem[];
};

export const colorConverterFaqsData: ColorFaqsData = {
  header: {
    badge: "FAQs",
    title: "Color Conversion Questions Answered",
    desc: "Everything you need to know about HEX, RGB, HSL, and HSV — from basic definitions to WCAG accessibility and CSS usage.",
  },
  faqs: [
    {
      question: "How do I use this HEX to RGB converter online?",
      answer:
        "Select HEX as the source format, type or paste your hex code (e.g. #3b82f6) into the input field, and the RGB, HSL, and HSV values appear instantly. You can also use the color picker for a visual selection. Click any copy button to grab the value you need.",
    },
    {
      question: "What is the difference between RGB and HSL?",
      answer:
        "RGB describes a color as amounts of red, green, and blue light (0–255 each) — the model your screen uses. HSL describes the same color as hue (0–360°, the position on a color wheel), saturation (0–100%, vividness), and lightness (0–100%, from black to white). HSL is often preferred by designers because 'make it 20% lighter' is simply adding 20 to the L value.",
    },
    {
      question: "What is the formula for converting HEX to RGB?",
      answer:
        "Split the 6-digit HEX string into three 2-character pairs and convert each from base-16 to decimal. For #1a2b3c: R = parseInt('1a', 16) = 26, G = parseInt('2b', 16) = 43, B = parseInt('3c', 16) = 60. Three-character shorthand (#abc) is expanded to #aabbcc before parsing.",
    },
    {
      question: "How do I convert RGB to HSL?",
      answer:
        "Normalise R, G, B to [0, 1]. Compute max and min channel values. Lightness L = (max + min) / 2. Saturation S = delta / (1 − |2L − 1|), where delta = max − min. Hue H is derived from which channel is maximum using a sector formula. The W3C CSS Color 4 specification defines the reference algorithm.",
    },
    {
      question: "What is HSV and how does it differ from HSL?",
      answer:
        "Both HSV and HSL share hue and saturation, but their third channel differs. HSL's lightness is centred at 0.5 (grey at 50%), whereas HSV's value equals the maximum channel — effectively the brightness of the brightest pixel. A fully saturated red is hsl(0, 100%, 50%) but hsv(0, 100%, 100%). HSV is the model used in design software like Adobe Photoshop's colour picker.",
    },
    {
      question: "How do I use a HEX color in CSS?",
      answer:
        "Use it directly: color: #3b82f6; or background-color: #3b82f6;. For transparency, use the 8-digit form: #3b82f6cc (the last two hex digits are alpha, where ff = fully opaque and 00 = fully transparent). In modern CSS you can also write rgb(59 130 246 / 80%) or hsl(217 91% 60% / 80%).",
    },
    {
      question: "What is hex to rgba with opacity?",
      answer:
        "RGBA adds an alpha (opacity) channel to RGB. In CSS, rgba(59, 130, 246, 0.5) is 50% transparent blue. In 8-digit HEX notation, #3b82f680 is the same color at ~50% opacity — the last two hex digits (00–FF) encode alpha, where 80 hex ≈ 128 decimal ≈ 50%. Modern CSS also supports rgb(59 130 246 / 50%) without the 'a' suffix.",
    },
    {
      question: "How do I do an RGB to HSL conversion?",
      answer:
        "Select RGB as the source format in the tool above and enter your R, G, B values. The HSL conversion appears immediately. For the math: normalise each channel to [0,1], find the max and min, derive lightness as their average, compute saturation from the chroma relative to lightness, and calculate hue by comparing the channels — see the 'How Color Conversion Works' section on this page for the full formula.",
    },
    {
      question: "What is WCAG contrast ratio and why does it matter?",
      answer:
        "The Web Content Accessibility Guidelines (WCAG) define a contrast ratio formula that ensures text is readable against its background. AA compliance (minimum) requires 4.5:1 for normal text. AAA (enhanced) requires 7:1. This tool calculates the contrast of your color against white and black so you can quickly evaluate whether it is safe to use as a text or UI color.",
    },
    {
      question: "How is WCAG contrast ratio calculated?",
      answer:
        "Each RGB channel is linearised using the sRGB formula: c ≤ 0.04045 ? c/12.92 : ((c+0.055)/1.055)^2.4. Relative luminance L = 0.2126R + 0.7152G + 0.0722B. Contrast ratio = (L_lighter + 0.05) / (L_darker + 0.05). Pure black (#000000) has L = 0 and pure white (#ffffff) has L = 1, giving a maximum ratio of 21:1.",
    },
    {
      question: "What is the most widely used color format for web development?",
      answer:
        "HEX (#rrggbb) is the most common format in CSS and design handoff tools. RGB (rgb()) and HSL (hsl()) are fully supported in all modern browsers and preferred in code for readability and dynamic manipulation. HSV is primarily used in design software APIs. CSS Color 4 also introduces oklch() and display-p3 for wide-gamut displays.",
    },
    {
      question: "Why does my HEX color look different on different screens?",
      answer:
        "HEX values encode sRGB data, which is the standard colour space for the web. Wide-gamut displays (e.g. iPhone P3, macOS P3) can show more vivid colours outside the sRGB gamut, so the same hex value may appear slightly different. CSS Color 4 introduces display-p3 support: color(display-p3 0.23 0.51 0.96) for richer colours on compatible screens.",
    },
  ],
};
