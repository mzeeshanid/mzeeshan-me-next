import { FaSearch, FaSortAmountDown, FaFileImport } from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";
import { MyAppFeaturesDataModel } from "../myAppFeaturesData";

export const mzVisitsFeaturesData: MyAppFeaturesDataModel = {
    header: {
        badge: "Features",
        title: "Track your journeys automatically",
        detail: "Automatically log your travels with privacy-first approach - all data stored locally on your device"
    },
    features: [
        {
            title: "Map Visualization",
            icon: FaMapLocation,
            bullets: [
                "See all logged visits on the map.",
                "Visual representation of your travels.",
                "Zoom and pan controls for easy navigation.",
                "Multiple map view options.",
            ]
        },
        {
            title: "Search & Filter",
            icon: FaSearch,
            bullets: [
                "Search logged visits with reference to address.",
                "Filter by location and date range.",
                "Quick find your specific visits.",
                "Location-based search suggestions.",
            ]
        },
        {
            title: "Sort & Organize",
            icon: FaSortAmountDown,
            bullets: [
                "Sort visits by date added, city and country.",
                "Organize your travel history easily.",
                "View statistics by location.",
                "Track visits by time period.",
            ]
        },
        {
            title: "Import, Export & Manual Entry",
            icon: FaFileImport,
            bullets: [
                "Import and export all visits.",
                "Manually add new visit anytime.",
                "Share your travel data.",
                "Backup your visit history.",
            ]
        }
    ]
};
