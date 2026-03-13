import myAppsData, { MyApp } from "../home/myAppsData";
import { MyAppReviewItemDataModel } from "./myAppReviewsData";
import { mz100ReviewsData } from "./mz100/mz100ReviewsData";
import { mzFileManageReviewsData } from "./mzFileManage/mzFileManageReviewsData";
import { mzPlayerHDReviewsData } from "./mzPlayerHD/mzPlayerHDReviewsData";
import { mzVisitsReviewsData } from "./mzVisits/mzVisitsReviewsData";

export type MyAppsTestimonialDataModel = {
    badge: string,
    title: string,
    details: string,

    testimonials: MyAppsTestimonialItemDataModel[]
}

export type MyAppsTestimonialItemDataModel = {
    app: MyApp,
    review: MyAppReviewItemDataModel
}

export const myAppsTestimonialData: MyAppsTestimonialDataModel = {
    badge: "Testimonials",
    title: "What Users Say",
    details: "Here are some testimonials from users who have used the apps. These testimonials highlight the user experiences and feedback that users have had with the apps.",
    testimonials: [
        {
            app: myAppsData().apps[0],
            review: mzFileManageReviewsData.reviews[1]
        },
        {
            app: myAppsData().apps[0],
            review: mzFileManageReviewsData.reviews[0]
        },
        {
            app: myAppsData().apps[1],
            review: mzPlayerHDReviewsData.reviews[0]
        },
        {
            app: myAppsData().apps[2],
            review: mzVisitsReviewsData.reviews[0]
        },
        {
            app: myAppsData().apps[3],
            review: mz100ReviewsData.reviews[0]
        }
    ]
}