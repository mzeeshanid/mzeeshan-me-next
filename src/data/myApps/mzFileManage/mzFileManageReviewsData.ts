import { FaAppStore } from "react-icons/fa6";
import { MyAppReviewDataModel } from "../myAppReviewsData";

export const mzFileManageReviewsData: MyAppReviewDataModel = {
    title: "What Users Are Saying",
    reviews: [
        {
            name: "Saeidselfjoor",
            rating: 5,
            countryCode: "US",
            country: "United States",
            text: "it's impossible to make a better download manager thankyou. Just one suggestion pleae add multi-thread downloading to increase speed like internet download manager on windows",
            icon: FaAppStore,
            isVerified: true,
            date: "2024-05-01",
            source: "App Store"
        },
        {
            name: "rafayehmed",
            rating: 4,
            countryCode: "PK",
            country: "Pakistan",
            text: "I love how it downloads the large files while app is in the background and also notifies timely when download finishes. With this app i can easily export downloaded files to my pc wirelessly. The only concerning thing is this app needs direct link to download files, it will be awesome if it detect the download file automatically 👌",
            icon: FaAppStore,
            isVerified: true,
            date: "2024-04-15",
            source: "App Store"
        },
        {
            name: "usaama effendi",
            rating: 5,
            countryCode: "PK",
            country: "Pakistan",
            text: "Exactly what i was looking for. Effortless file sharing with my windows The only thing that need to be done is it should also support other file formats apart from audios and videos to open with in the app.",
            icon: FaAppStore,
            isVerified: true,
            date: "2024-04-20",
            source: "App Store"
        }
    ]
}


