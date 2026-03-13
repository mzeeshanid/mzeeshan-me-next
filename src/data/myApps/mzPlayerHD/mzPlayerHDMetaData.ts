import { MyAppMetaDataModel } from "../myAppMetaData";

export const mzPlayerHDMetaData: MyAppMetaDataModel = {
    badge: "YouTube video player",
    appName: "MZPlayerHD",
    tagline: "Search & Play HD YouTube Videos",
    description: "MZPlayerHD allows background playback of youtube videos. Enjoy your videos with advanced HD video player.",

    typeWriterPre: "Search & play ",
    typeWriterWords: ["YouTube videos", "HD quality", "background"],
    typeWriterPost: " with ease.",

    appStoreLink: "https://apps.apple.com/us/app/mzplayerhd/id1436966516",

    heroImage: {
        src: "/assets/mzplayerhd/mzplayerhd_hero.png",
        alt: "MZPlayerHD Hero Image",
        width: 650,
        height: 450,
    },

    appIcon: {
        src: "/assets/mzplayer_hd_appicon.png",
          alt: "MZPlayerHD app icon",
          width: 300,
          height: 300,
    },

    siteUrl: "/apps/mzplayerhd",

    operatingSystems: "iOS 14.0+",
    category: "Entertainment",
    permissions: [
        "Network Access for YouTube",
        "Background Playback",
        "Notifications",
    ],

    keywords: "YouTube video player, HD video player, background playback, YouTube app, video streaming app, YouTube search, HD playback, iOS video player, iPad video player, background video player, YouTube player app, video downloader, streaming app, free video player"
}
