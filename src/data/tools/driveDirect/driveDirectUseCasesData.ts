import { IconType } from "react-icons"
import { FaRobot, FaWordpress, FaVideo, FaLayerGroup } from "react-icons/fa6"
import { DriveDirectSectionHeaderModel } from "./driveDirectData"

/* Use Cases Data */
export type DriveDirectUseCasesData = {
    header: DriveDirectSectionHeaderModel,
    useCases: DriveDirectUseCaseItemModel[]
}

export type DriveDirectUseCaseItemModel = {
    title: string,
    desc: string
    icon: IconType
}

export const driveDirectUseCasesData: DriveDirectUseCasesData = {
    header: {
        badge: "Use Cases",
        title: "Where You Can Use Direct Links",
        desc: "Popular scenarios where a Google Drive direct download link comes in handy."
    },
    useCases: [
        {
            title: "Auto-Download Files",
            desc: "Use the generated link in a download button, script, or automation workflow so the Google Drive file downloads automatically instead of opening the preview page first.",
            icon: FaRobot
        },
        {
            title: "WordPress & Website Buttons",
            desc: "Paste the direct link into a WordPress download button, plugin, or plain HTML anchor tag to let visitors download the file straight from your site.",
            icon: FaWordpress
        },
        {
            title: "Direct Video Links",
            desc: "Turn a shared Google Drive video into a direct link you can use in an HTML5 video player or as a direct video download, instead of the Drive preview player.",
            icon: FaVideo
        },
        {
            title: "Bulk Link Generation",
            desc: "Generate multiple direct download links from Google Drive at once using the 'Multiple' tab or the API, ideal for resource libraries and automated pipelines.",
            icon: FaLayerGroup
        }
    ]
}
