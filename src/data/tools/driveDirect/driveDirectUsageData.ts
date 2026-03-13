import { IconType } from "react-icons"
import { DriveDirectSectionHeaderModel } from "./driveDirectData"
import { FaFilePdf, FaImage, FaVideo } from "react-icons/fa6"

/* Usage Data */
export type DriveDirectUsageData = {
    header: DriveDirectSectionHeaderModel,
    usages: DriveDirectUsageItemModel[]
}

export type DriveDirectUsageItemModel = {
    title: string,
    desc: string
    icon: IconType
    link: string
}

export const driveDirectUsageData: DriveDirectUsageData = {
    header: {
        badge: "Usage",
        title: "Demo Use Cases",
        desc: "Here are few use cases where you can use Google Drive Direct Download Link Generator tool."
    },
    usages: [
        {
            title: "Image Downloading",
            desc: "Tap on the button below to download an image using direct download link.",
            icon: FaImage,
            link: "https://drive.google.com/uc?export=download&id=1nGf9ufi2peaiOgzBsaMGx-6Wx1fjmEKG"   
        },
        {
            title: "Video Downloading",
            desc: "Tap on the button below to download a video using direct download link.",
            icon: FaVideo,
            link: "https://drive.google.com/uc?export=download&id=1_afhdDHPhCLj1RFswnjH2SBRfyv2OSOy"   
        },
        {
            title: "PDF Downloading",
            desc: "Tap on the button below to download PDF file using direct download link.",
            icon: FaFilePdf,
            link: "https://drive.google.com/uc?export=download&id=1navrC3Eg93u1-JWqPlsccCd6U44eAlcP"   
        }
    ]
}