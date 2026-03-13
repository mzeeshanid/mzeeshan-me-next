import { MyAppDataModel } from "../myAppData";
import { mzFileManageCloneData } from "./mzFileManageCloneData";
import { mzFileManageFaqs } from "./mzFileManageFaqsData";
import { mzFileManageFeaturesData } from "./mzFileManageFeaturesData";
import { mzFileManageMetaData } from "./mzFileManageMetaData";
import { mzFileManageReviewsData } from "./mzFileManageReviewsData";
import { mzFileManageScreenshotsData } from "./mzFileManageScreenshotsData";
import { mzFileManageStats } from "./mzFileManageStatsData";

export const mzFileManageData: MyAppDataModel = {
    meta: mzFileManageMetaData,
    screenshotsData: mzFileManageScreenshotsData,
    featuresData: mzFileManageFeaturesData,
    faqsData: mzFileManageFaqs,
    statsData: mzFileManageStats,
    reviewsData: mzFileManageReviewsData,
    cloneData: mzFileManageCloneData
}