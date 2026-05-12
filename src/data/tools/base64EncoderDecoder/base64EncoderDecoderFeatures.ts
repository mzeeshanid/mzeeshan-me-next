import type { StaticImageData } from "next/image";
import { IconType } from "react-icons";
import { FaBolt, FaCode, FaShieldAlt } from "react-icons/fa";
import { FaFile, FaImage, FaLink } from "react-icons/fa6";
import base64Icon from "public/assets/base64_encoder_decoder_icon.png";

/* Features Data */
export type Base64Feature = {
  icon: IconType;
  title: string;
  description: string;
};

export type Base64FeaturesData = {
  header: {
    badge: string;
    title: string;
    description: string;
  };
  features: Base64Feature[];
};

export const base64FeaturesData: Base64FeaturesData = {
  header: {
    badge: "Features",
    title: "Everything You Need for Base64",
    description:
      "Encode and decode plain text, images, and files entirely in your browser — no server, no tracking, no limits.",
  },
  features: [
    {
      icon: FaShieldAlt,
      title: "100% Private",
      description:
        "All encoding and decoding runs entirely in your browser. Your text, images, and files never leave your device.",
    },
    {
      icon: FaImage,
      title: "Image to Data URI",
      description:
        "Upload any image and instantly get an embeddable Base64 data URI with ready-to-copy HTML, CSS, and Markdown snippets.",
    },
    {
      icon: FaFile,
      title: "File Encoding & Decoding",
      description:
        "Encode any file type to Base64 or decode a Base64 string back to its original file — PDF, DOCX, MP3, and more.",
    },
    {
      icon: FaLink,
      title: "Base64URL Support",
      description:
        "Toggle URL-safe mode to produce Base64URL strings used in JWTs, OAuth tokens, and URL query parameters.",
    },
    {
      icon: FaBolt,
      title: "Real-Time Conversion",
      description:
        "Results update as you type with debounced processing — no button to click for text inputs.",
    },
    {
      icon: FaCode,
      title: "Code Snippets Included",
      description:
        "Ready-to-run encode and decode examples for JavaScript, Python, Java, curl, and PHP alongside the tool.",
    },
  ],
};

/* Header Data */
export type Base64HeaderData = {
  title: string;
  subtitle: string;
  icon: StaticImageData;
  alt: string;
};

export const base64HeaderData: Base64HeaderData = {
  title: "Base64 Tool",
  subtitle: "Encode It!",
  icon: base64Icon,
  alt: "Base64 Encoder Decoder icon",
};

/* Meta Data */
export type Base64MetaData = {
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

export const base64MetaData: Base64MetaData = {
  title: "Base64 Encoder & Decoder — Text, Image & File",
  description:
    "Free online Base64 encoder and decoder. Encode or decode plain text, images, and files to Base64 instantly in your browser — no upload, no tracking. Includes Base64URL mode, ready-to-use HTML/CSS snippets, and code examples.",
  url: "/tools/base64-encoder-decoder",
  image: {
    src: "/assets/base64_encoder_decoder_icon.png",
    alt: "Base64 Encoder Decoder tool",
    width: 300,
    height: 300,
    type: "image/png",
  },
};
