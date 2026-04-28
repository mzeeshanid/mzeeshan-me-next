import { MyAppMetaDataModel } from "../myAppMetaData";
import mzFileManageHero from "../../../../public/assets/mzfilemanage/mzfilemanage_hero.png";
import mzFileManageIcon from "../../../../public/assets/mzfilemanage_appicon.png";

export const mzFileManageMetaData: MyAppMetaDataModel = {
    badge: "File and download manager",
    appName: "MZFileManage",
    tagline: "Featured file manager",
    description: "MZFileManager is the one-stop file manager along with a powerful download manager, playlist manager and much more!",

    typeWriterPre: "All your ",
    typeWriterWords: ["files", "downloads", "playlists"],
    typeWriterPost: " in one app.",

    appStoreLink: "https://apps.apple.com/us/app/mzfilemanager/id1436458918",

    heroImage: {
        src: mzFileManageHero,
        alt: "MZFileManage Hero Image",
        width: 650,
        height: 450,
    },

    appIcon: {
        src: mzFileManageIcon,
        alt: "MZFileManage app icon",
        width: 300,
        height: 300,
    },

    siteUrl: "/apps/mzfilemanage",

    operatingSystems: "iOS 14.0+",
    category: "Utilities",
    permissions: [
        "Access to Files and Folders",
        "Network Access for Downloads",
        "Notifications",
    ],

    keywords: "file manager app, download manager app, iOS file manager, file management app, all in one file manager, mobile download manager, background download app, file organizer app, iPhone file manager, iPad file manager, playlist manager app, document manager app, file explorer app, download accelerator app, file sharing app, cloud file manager"
}
