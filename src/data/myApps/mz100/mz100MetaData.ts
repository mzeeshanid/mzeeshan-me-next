import { MyAppMetaDataModel } from "../myAppMetaData";
import mz100Hero from "../../../../public/assets/mz100/mz100_hero.png";
import mz100Icon from "../../../../public/assets/mz100_app_icon.png";

export const mz100MetaData: MyAppMetaDataModel = {
    badge: "Game, Puzzle",
    appName: "MZ100",
    tagline: "Challenge! Reveal all boxes",
    description: "MZ100 is a challenging puzzle game to reveal all 100 boxes in shortest possible time. Test your strategy and compete with friends!",

    typeWriterPre: "Reveal ",
    typeWriterWords: ["all boxes", "the puzzle", "your strategy"],
    typeWriterPost: " in time.",

    appStoreLink: "https://apps.apple.com/us/app/mz100/id1460376599",

    heroImage: {
        src: mz100Hero,
        alt: "MZ100 Hero Image",
        width: 650,
        height: 450,
    },

    appIcon: {
        src: mz100Icon,
        alt: "MZ100 app icon",
        width: 300,
        height: 300,
    },

    siteUrl: "/apps/mz100",

    operatingSystems: "iOS 14.0+",
    category: "Game, Puzzle",
    permissions: [
        "Game Center",
        "Notifications",
    ],

    keywords: "puzzle game, brain game, strategy game, iOS game, iPad game, puzzle challenge, box reveal game, logic game, mind game, casual game, free puzzle game, gaming app, challenging puzzle"
}
