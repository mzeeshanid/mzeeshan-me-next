import { NavBarHeaderProps } from '@/components/NavBar/NavBarHeader';
import { driveDirectBlockQuoteData, DriveDirectBlockQuoteData } from './driveDirectBlockQuoteData';
import { driveDirectComparisonData, DriveDirectComparisonData } from './driveDirectComparisonData';
import { driveDirectFaqData, DriveDirectFaqData } from './driveDirectFaqData';
import { driveDirectFeaturesData, DriveDirectFeaturesData } from './driveDirectFeaturesData';
import { driveDirectHeaderData } from './driveDirectHeaderData';
import { driveDirectHeroData, DriveDirectHeroData } from './driveDirectHeroData';
import { driveDirectLimitationData, DriveDirectLimitationData } from './driveDirectLimitationData';
import { driveDirectMetaData, DriveDirectMetaMetaData } from './driveDirectMetaData';
import { DriveDirectShareLinkStepsData, driveDirectStepsData } from './driveDirectStepsData';
import { driveDirectUsageData, DriveDirectUsageData } from './driveDirectUsageData';
import { driveDirectUseCasesData, DriveDirectUseCasesData } from './driveDirectUseCasesData';
import { driveDirectWorkingData, DriveDirectWorkingData } from './driveDirectWorkingData';

/* Generic */
export type DriveDirectSectionHeaderModel = {
    badge: string,
    title: string,
    desc: string
}

/* Full Data */
export type DriveDirectDataModel = {
    header: NavBarHeaderProps,
    meta: DriveDirectMetaMetaData,
    hero: DriveDirectHeroData,
    features: DriveDirectFeaturesData,
    steps: DriveDirectShareLinkStepsData,
    faq: DriveDirectFaqData,
    limitation: DriveDirectLimitationData,
    blockQuote: DriveDirectBlockQuoteData, 
    usage: DriveDirectUsageData,
    useCases: DriveDirectUseCasesData,
    working: DriveDirectWorkingData,
    comparison: DriveDirectComparisonData
}

export const driveDirectData = (): DriveDirectDataModel => {
    return {
        header: driveDirectHeaderData,
        meta: driveDirectMetaData,
        hero: driveDirectHeroData,
        features: driveDirectFeaturesData,
        steps: driveDirectStepsData,
        faq: driveDirectFaqData,
        limitation: driveDirectLimitationData,
        blockQuote: driveDirectBlockQuoteData,
        usage: driveDirectUsageData,
        useCases: driveDirectUseCasesData,
        working: driveDirectWorkingData,
        comparison: driveDirectComparisonData
    }
}


