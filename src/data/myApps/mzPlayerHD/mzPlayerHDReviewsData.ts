import { FaAppStore } from "react-icons/fa6";
import { MyAppReviewDataModel } from "../myAppReviewsData";

export const mzPlayerHDReviewsData: MyAppReviewDataModel = {
    title: "What Users Are Saying",
    reviews: [
        {
            name: "Appsiuse",
            rating: 5,
            countryCode: "NL",
            country: "Netherlands",
            text: "Underrated gem. YouTube in background without subscription.",
            icon: FaAppStore,
            isVerified: true,
            date: "2024-05-01",
            source: "App Store"
        },
        {
            name: "Thicks2011",
            rating: 4,
            countryCode: "US",
            country: "United States",
            text: "Great app! Would love to have a feature that would allow you to filter your search such as searching only videos 20 or more minutes long.",
            icon: FaAppStore,
            isVerified: true,
            date: "2024-04-15",
            source: "App Store"
        },
        {
            name: "Dustbuster4676",
            rating: 4,
            countryCode: "PK",
            country: "Pakistan",
            text: "This is a great app but needs playlist abilities. If you add the ability to share YouTube links and play playlists, this would be perfect for me!",
            icon: FaAppStore,
            isVerified: true,
            date: "2024-04-20",
            source: "App Store"
        },
        {
            name: "15yr-old",
            rating: 5,
            countryCode: "US",
            country: "United States",
            text: "I hate the fact that YouTube doesn't play in the background and I found this and it solved the problem!",
            icon: FaAppStore,
            isVerified: true,
            date: "2024-03-10",
            source: "App Store"
        }
    ]
}
