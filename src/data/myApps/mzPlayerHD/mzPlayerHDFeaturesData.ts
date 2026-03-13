import { FaSearch, FaHeart, FaPlayCircle } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MyAppFeaturesDataModel } from "../myAppFeaturesData";

export const mzPlayerHDFeaturesData: MyAppFeaturesDataModel = {
    header: {
        badge: "Features",
        title: "Your personal YouTube player",
        detail: "Search, save, and play your favorite YouTube videos in HD with background playback support"
    },
    features: [
        {
            title: "Search YouTube Videos",
            icon: FaMagnifyingGlass,
            bullets: [
                "Search videos with keywords.",
                "Advanced filters for better results.",
                "Sort search results by relevance, views, and date.",
                "Search suggestions as you type."
            ]
        },
        {
            title: "HD Video Player",
            icon: FaPlayCircle,
            bullets: [
                "Watch videos in HD quality.",
                "Support for background playback.",
                "Advanced custom video player.",
                "Gesture driven player controls.",
            ]
        },
        {
            title: "Favourite Videos",
            icon: FaHeart,
            bullets: [
                "Mark videos as favourite.",
                "Manage your favourite list.",
                "Share your favourite videos.",
                "Access favorites offline.",
            ]
        },
        {
            title: "More Features",
            icon: FaSearch,
            bullets: [
                "Sticky mini player at the bottom.",
                "Safety instructions for children.",
                "Background audio playback.",
                "Playback history tracking.",
            ]
        }
    ]
};
