import { BasicImageDataModel } from "@/data/basicImage/basicImageDataModel"

/* Hero Data */
export type DriveDirectHeroData = {
    heroTitle: string,
    heroDesc: string,
    heroImage: BasicImageDataModel,
    heroSingleLinkCTA: string,
    heroMultiLinkCTA: string,
    heroFootNote: string
}

export const driveDirectHeroData: DriveDirectHeroData = {
    heroTitle: "Google Drive Direct Download Link Generator",
    heroDesc: "Paste your Google Drive share link — get a direct download URL for embedding, sharing & automation.",
    heroImage: {
        alt: "drive direct hero image",
        width: 400,
        height: 400,
        src: `/assets/drive_direct_hero.png`
    },
    heroSingleLinkCTA: "Generate Direct Link",
    heroMultiLinkCTA: "Generate Direct Links",
    heroFootNote: "No login • Free to use • No uploads"
}