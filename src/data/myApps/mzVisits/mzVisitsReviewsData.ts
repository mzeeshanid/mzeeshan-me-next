import { FaAppStore } from "react-icons/fa6";
import { MyAppReviewDataModel } from "../myAppReviewsData";

export const mzVisitsReviewsData: MyAppReviewDataModel = {
    title: "What Users Are Saying",
    reviews: [
        {
            name: "TravelEnthusiast",
            rating: 5,
            countryCode: "US",
            country: "United States",
            text: "This app is amazing! I can now see all the places I've visited over the years. The map feature is beautiful and the data privacy aspect is fantastic. Worth every penny!",
            icon: FaAppStore,
            isVerified: true,
            date: "2024-05-10",
            source: "App Store"
        },
        {
            name: "AdventureSeekerAlex",
            rating: 5,
            countryCode: "UK",
            country: "United Kingdom",
            text: "Perfect app for tracking my travels! The automatic logging works seamlessly and I love that everything is stored locally. Great alternative to location tracking services.",
            icon: FaAppStore,
            isVerified: true,
            date: "2024-04-22",
            source: "App Store"
        },
        {
            name: "WanderlustDreamer",
            rating: 4,
            countryCode: "AU",
            country: "Australia",
            text: "Really useful for keeping track of my journeys. The sorting and filtering features are intuitive. Would love to see a feature for adding photos to visits in future updates.",
            icon: FaAppStore,
            isVerified: true,
            date: "2024-03-15",
            source: "App Store"
        },
        {
            name: "NomadLife",
            rating: 5,
            countryCode: "CA",
            country: "Canada",
            text: "Best travel tracking app I've used! The privacy-first approach gives me peace of mind, and the interface is so clean and easy to use. Highly recommended!",
            icon: FaAppStore,
            isVerified: true,
            date: "2024-02-28",
            source: "App Store"
        }
    ]
}
