import { MyAppDataModel } from "../myAppData";
import { mzPlayerHDCloneData } from "./mzPlayerHDCloneData";
import { mzPlayerHDFaqs } from "./mzPlayerHDFaqsData";
import { mzPlayerHDFeaturesData } from "./mzPlayerHDFeaturesData";
import { mzPlayerHDMetaData } from "./mzPlayerHDMetaData";
import { mzPlayerHDReviewsData } from "./mzPlayerHDReviewsData";
import { mzPlayerHDScreenshotsData } from "./mzPlayerHDScreenshotsData";
import { mzPlayerHDStats } from "./mzPlayerHDStatsData";

export const mzPlayerHDData: MyAppDataModel = {
    meta: mzPlayerHDMetaData,
    screenshotsData: mzPlayerHDScreenshotsData,
    featuresData: mzPlayerHDFeaturesData,
    faqsData: mzPlayerHDFaqs,
    statsData: mzPlayerHDStats,
    reviewsData: mzPlayerHDReviewsData,
    cloneData: mzPlayerHDCloneData
}
