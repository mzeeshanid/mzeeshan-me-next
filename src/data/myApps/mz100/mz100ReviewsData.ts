import { FaAppStore } from "react-icons/fa6";
import { MyAppReviewDataModel } from "../myAppReviewsData";

export const mz100ReviewsData: MyAppReviewDataModel = {
    title: "What Users Are Saying",
    reviews: [
        {
            name: "Puzzlemaster99",
            rating: 5,
            countryCode: "US",
            country: "United States",
            text: "Absolutely addictive! The puzzle mechanics are simple yet challenging. Love the move highlight feature and unlimited undo. Best puzzle game on the App Store!",
            icon: FaAppStore,
            isVerified: true,
            date: "2024-05-15",
            source: "App Store"
        },
        {
            name: "GameLover42",
            rating: 4,
            countryCode: "UK",
            country: "United Kingdom",
            text: "Great game with unique mechanics. The strategic element keeps me coming back for more. Would be perfect if there were more difficulty levels and achievements.",
            icon: FaAppStore,
            isVerified: true,
            date: "2024-04-20",
            source: "App Store"
        },
        {
            name: "BrainGameFan",
            rating: 5,
            countryCode: "CA",
            country: "Canada",
            text: "Finally a puzzle game that makes me think! The 100 box challenge is perfectly balanced between difficulty and fun. Highly recommended for strategy game enthusiasts!",
            icon: FaAppStore,
            isVerified: true,
            date: "2024-03-10",
            source: "App Store"
        }
    ]
}
