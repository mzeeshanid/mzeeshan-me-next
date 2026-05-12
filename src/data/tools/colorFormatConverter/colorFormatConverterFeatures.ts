import type { StaticImageData } from "next/image";
import { IconType } from "react-icons";
import { FaBolt, FaCode, FaShieldAlt } from "react-icons/fa";
import { FaEye, FaCircleCheck, FaPalette, FaSliders } from "react-icons/fa6";
import colorConverterIcon from "public/assets/color_format_converter_icon.png";

/* Features */
export type ColorFeature = {
  icon: IconType;
  title: string;
  description: string;
};

export type ColorFeaturesData = {
  header: { badge: string; title: string; description: string };
  features: ColorFeature[];
};

export const colorConverterFeaturesData: ColorFeaturesData = {
  header: {
    badge: "Features",
    title: "Everything You Need for Color Conversion",
    description:
      "Convert between HEX, RGB, HSL, and HSV color formats in one place — with live preview, accessibility checks, and harmony swatches, all running privately in your browser.",
  },
  features: [
    {
      icon: FaSliders,
      title: "4 Color Formats in One Place",
      description:
        "Select your source format — HEX, RGB, HSL, or HSV — and instantly see all three remaining formats as output. No switching between tools.",
    },
    {
      icon: FaEye,
      title: "Live Color Preview",
      description:
        "A large color swatch updates in real time as you type. Includes a CSS named-color badge when your color is close to a standard web color.",
    },
    {
      icon: FaCircleCheck,
      title: "WCAG Contrast Checker",
      description:
        "Instantly see whether your color meets WCAG AA (4.5:1) or AAA (7:1) contrast requirements against white and black — essential for accessible UI design.",
    },
    {
      icon: FaPalette,
      title: "Color Harmony Swatches",
      description:
        "Complementary, analogous, and triadic harmonics are calculated automatically so you can explore related colors without leaving the page.",
    },
    {
      icon: FaCode,
      title: "Code Examples in 6 Languages",
      description:
        "Ready-to-copy conversion functions for JavaScript, Python, Swift, PHP, CSS, and Kotlin — covering all six color conversion directions.",
    },
    {
      icon: FaShieldAlt,
      title: "100% Browser-Based",
      description:
        "All conversions happen in your browser using pure math. No data is sent to a server, no account required, and no ads to distract you.",
    },
    {
      icon: FaBolt,
      title: "Real-Time, Zero Clicks",
      description:
        "Results update instantly as you type or adjust sliders — no Convert button to click. Switch formats seamlessly with all inputs kept in sync.",
    },
  ],
};

/* Header (NavBar) */
export type ColorConverterHeaderData = {
  title: string;
  subtitle: string;
  icon: StaticImageData;
  alt: string;
};

export const colorConverterHeaderData: ColorConverterHeaderData = {
  title: "Color Converter",
  subtitle: "Convert It!",
  icon: colorConverterIcon,
  alt: "Color Format Converter icon",
};

/* SEO Meta */
export type ColorConverterMetaData = {
  title: string;
  description: string;
  url: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    type: string;
  };
};

export const colorConverterMetaData: ColorConverterMetaData = {
  title: "HEX to RGB Converter Online – RGB HSL HSV Color Format Converter",
  description:
    "Free online color format converter. Convert HEX to RGB, RGB to HSL, HSL to HEX, and HSV instantly — with live color preview, WCAG contrast checker, harmony swatches, and code examples in 6 languages. No ads, no uploads.",
  url: "/tools/color-format-converter",
  image: {
    src: "/assets/color_format_converter_icon.png",
    alt: "Color Format Converter — HEX RGB HSL HSV",
    width: 300,
    height: 300,
    type: "image/png",
  },
};
