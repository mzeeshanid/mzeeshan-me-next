import { MyAppDataModel } from "../myAppData";
import { mz100CloneData } from "./mz100CloneData";
import { mz100Faqs } from "./mz100FaqsData";
import { mz100FeaturesData } from "./mz100FeaturesData";
import { mz100MetaData } from "./mz100MetaData";
import { mz100ReviewsData } from "./mz100ReviewsData";
import { mz100ScreenshotsData } from "./mz100ScreenshotsData";
import { mz100Stats } from "./mz100StatsData";

export const mz100Data: MyAppDataModel = {
    meta: mz100MetaData,
    screenshotsData: mz100ScreenshotsData,
    featuresData: mz100FeaturesData,
    faqsData: mz100Faqs,
    statsData: mz100Stats,
    reviewsData: mz100ReviewsData,
    cloneData: mz100CloneData
}
