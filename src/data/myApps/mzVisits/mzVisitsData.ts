import { MyAppDataModel } from "../myAppData";
import { mzVisitsCloneData } from "./mzVisitsCloneData";
import { mzVisitsFaqs } from "./mzVisitsFaqsData";
import { mzVisitsFeaturesData } from "./mzVisitsFeaturesData";
import { mzVisitsMetaData } from "./mzVisitsMetaData";
import { mzVisitsReviewsData } from "./mzVisitsReviewsData";
import { mzVisitsScreenshotsData } from "./mzVisitsScreenshotsData";
import { mzVisitsStats } from "./mzVisitsStatsData";

export const mzVisitsData: MyAppDataModel = {
    meta: mzVisitsMetaData,
    screenshotsData: mzVisitsScreenshotsData,
    featuresData: mzVisitsFeaturesData,
    faqsData: mzVisitsFaqs,
    statsData: mzVisitsStats,
    reviewsData: mzVisitsReviewsData,
    cloneData: mzVisitsCloneData
}
