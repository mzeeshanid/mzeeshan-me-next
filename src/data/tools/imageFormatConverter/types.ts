import type { StaticImageData } from "next/image";
import { IconType } from "react-icons";

export type ImageConversionStatus = "active" | "coming_soon";
export type ImageFormat = "png" | "jpg" | "webp" | "bmp" | "tiff" | "gif" | "avif" | "ico" | "heic";

export type ImageFormatBrowserSupport = {
  supported: boolean;
  browsers: string[];
  since: string;
};

export type ImageConversionRoute = {
  slug: string;
  sourceFormat: ImageFormat;
  targetFormat: ImageFormat;
  path: string;
  label: string;
  status: ImageConversionStatus;
  acceptedMimeTypes: string[];
  outputMimeType?: string;
  outputExtension?: string;
  supportsQuality?: boolean;
  privacyHighlight: string;
};

export type ToolHeaderData = {
  title: string;
  subtitle: string;
  icon: StaticImageData;
  alt: string;
  rounded: boolean;
};

export type ToolMetaData = {
  title: string;
  description: string;
  url: string;
  image: {
    src: string;
    type: string;
  };
  keywords?: string;
};

export type SectionHeaderData = {
  badge: string;
  title: string;
  description: string;
};

export type TextCardItem = {
  title: string;
  description: string;
};

export type IconCardItem = {
  icon: IconType;
  title: string;
  description: string;
};

export type ComparisonColumn = {
  key: string;
  title: string;
  link?: string;
};

export type ComparisonCell = {
  text: string;
};

export type ComparisonRow = Record<string, ComparisonCell>;

export type FaqItem = {
  question: string;
  answer: string;
};

export type RelatedArticleHeader = {
  badge: string;
  title: string;
  desc: string;
};

export type HeroContent = {
  badge: string;
  title: string;
  description: string;
  browserOnlyTitle: string;
  browserOnlyDescription: string;
  selectSourceLabel: string;
  selectTargetLabel: string;
  selectPlaceholder: string;
  sourceHelp: string;
  targetHelp: string;
  uploadTitle: string;
  uploadDescription: string;
  uploadHint: string;
  originalTitle: string;
  resultTitle: string;
  convertButtonLabel: string;
  convertButtonLoadingLabel: string;
  downloadButtonLabel: string;
  unavailablePairMessage: string;
  choosePairMessage: string;
  comingSoonMessage: string;
  qualityLabel: string;
  qualityHint: string;
  transparencyNote: string;
  browserSupportWarning: string;
};

export type ImageFormatConverterIndexData = {
  header: ToolHeaderData;
  meta: ToolMetaData;
  hero: HeroContent;
  supported: {
    header: SectionHeaderData;
  };
  browserSupport: {
    header: SectionHeaderData;
  };
  intro: {
    header: SectionHeaderData;
    cards: TextCardItem[];
  };
  benefits: {
    header: SectionHeaderData;
    cards: TextCardItem[];
  };
  features: {
    header: SectionHeaderData;
    items: IconCardItem[];
  };
  comparison: {
    header: SectionHeaderData;
    columns: ComparisonColumn[];
    rows: ComparisonRow[];
  };
  relatedArticle: RelatedArticleHeader;
  faqs: {
    header: SectionHeaderData;
    items: FaqItem[];
  };
};

export type ImageFormatConverterDetailData = {
  routeSlug: string;
  header: ToolHeaderData;
  meta: ToolMetaData;
  hero: HeroContent;
  intro: {
    header: SectionHeaderData;
    cards: TextCardItem[];
  };
  benefits: {
    header: SectionHeaderData;
    cards: TextCardItem[];
  };
  useCases: {
    header: SectionHeaderData;
    items: IconCardItem[];
  };
  features: {
    header: SectionHeaderData;
    items: IconCardItem[];
  };
  comparison: {
    header: SectionHeaderData;
    columns: ComparisonColumn[];
    rows: ComparisonRow[];
  };
  relatedConversions: {
    header: SectionHeaderData;
  };
  relatedArticle: RelatedArticleHeader;
  faqs: {
    header: SectionHeaderData;
    items: FaqItem[];
  };
};
