import { MyAppCloneDataModel } from "./myAppCloneData"
import { MyAppFaqData } from "./myAppFaqsData"
import { MyAppFeaturesDataModel } from "./myAppFeaturesData"
import { MyAppMetaDataModel } from "./myAppMetaData"
import { MyAppReviewDataModel } from "./myAppReviewsData"
import { MyAppScreenshotsDataModel } from "./myAppScreenshotsData"
import { MyAppStatsDataModel } from "./myAppStatsData"

export type MyAppDataModel = {
    meta: MyAppMetaDataModel,
    screenshotsData: MyAppScreenshotsDataModel,
    featuresData: MyAppFeaturesDataModel,
    faqsData: MyAppFaqData,
    statsData: MyAppStatsDataModel,
    reviewsData: MyAppReviewDataModel,
    cloneData: MyAppCloneDataModel
}