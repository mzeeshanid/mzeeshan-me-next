/**
 * Type definitions for Sample Files Extension Details JSON structure
 * Each section is optional - only render if data exists
 */

export interface ExtensionFaqDataItem {
  question: string;
  answer: string;
}

export interface ExtensionFaqData {
  title: string;
  items: ExtensionFaqDataItem[];
}

export interface ExtensionWhatIsData {
  title: string;
  content: string;
}

export interface ExtensionHistoryData {
  title: string;
  description: string;
  ownerWebsite?: string;
}

export interface ExtensionBenefitsData {
  title: string;
  items: string[];
}

export interface ExtensionHowToUseData {
  title: string;
  items: string[];
}

export interface ExtensionUseCaseItemData {
  title: string;
  description: string;
}

export interface ExtensionUseCasesData {
  title: string;
  cards: ExtensionUseCaseItemData[];
}

export interface ExtensionCompatibilityDataItem {
  name: string;
  type: string;
}

export interface ExtensionCompatibilityData {
  title: string;
  platforms: ExtensionCompatibilityDataItem[];
}

export interface ExtensionTechnicalDetailDataModel {
  title: string;
  detail: string;
}

export interface ExtensionTechnicalDetailsData {
  title: string;
  specifications: ExtensionTechnicalDetailDataModel[];
}

export interface RelatedExtensionDataItem {
  extension: string;
  description: string;
}

export interface RelatedExtensionData {
  title: string;
  related: RelatedExtensionDataItem[];
}

export interface SampleFilesExtensionDetailSections {
  faq?: ExtensionFaqData;
  whatIs?: ExtensionWhatIsData;
  history?: ExtensionHistoryData;
  benefits?: ExtensionBenefitsData;
  howToUse?: ExtensionHowToUseData;
  useCases?: ExtensionUseCasesData;
  compatibility?: ExtensionCompatibilityData;
  technicalDetails?: ExtensionTechnicalDetailsData;
  relatedExtensions?: RelatedExtensionData;
}

export interface SampleFilesExtensionDetailsData {
  sections?: SampleFilesExtensionDetailSections;
}
