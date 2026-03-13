import { MyAppMetaDataModel } from "../myAppMetaData";

export const mzVisitsMetaData: MyAppMetaDataModel = {
    badge: "Travelling tracker",
    appName: "MZVisits",
    tagline: "See where you had been :)",
    description: "MZVisits allows you to automatically track visits as you travel. For privacy purpose all logged visits will be saved locally within the device.",

    typeWriterPre: "Track your ",
    typeWriterWords: ["travels", "visits", "journeys"],
    typeWriterPost: " automatically.",

    appStoreLink: "https://apps.apple.com/us/app/mzvisits-travelling-tracker/id1459482393",

    heroImage: {
        src: "/assets/mzvisits/mzvisits_hero.png",
        alt: "MZVisits Hero Image",
        width: 650,
        height: 450,
    },

    appIcon: {
        src: "/assets/mzvisit_app_icon.png",
          alt: "MZVisits app icon",
          width: 300,
          height: 300,
    },

    siteUrl: "/apps/mzvisits",

    operatingSystems: "iOS 14.0+",
    category: "Travel, Navigation",
    permissions: [
        "Location Access",
        "Maps",
        "File Storage",
    ],

    keywords: "travel tracker, visit tracker, location tracker, travel log, journey planner, travel app, GPS tracker, trip tracker, travel history, iOS travel app, iPad navigation, location history, travel planning app, visit history tracker"
}
