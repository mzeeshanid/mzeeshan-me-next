import { TbBrandGoogleDrive, TbBroadcast, TbEye, TbHandStop, TbWorldShare } from "react-icons/tb"
import { DriveDirectSectionHeaderModel } from "./driveDirectData"
import { IconType } from "react-icons"

/* Limitation Data */
export type DriveDirectLimitationData = {
    header: DriveDirectSectionHeaderModel,
    limitations: DriveDirectLimitationItemModel[]
}

export type DriveDirectLimitationItemModel = {
    title: string,
    desc: string
    icon: IconType
}

export const driveDirectLimitationData: DriveDirectLimitationData = {
    header: {
        badge: "Limitations",
        title: "Drive Direct Limitations",
        desc: "Known limitations of using Drive Direct for generating direct download links from Google Drive."
    },
    limitations: [
        {
            title: "File Visibility",
            desc: "The Google Drive file must be set to 'Anyone with the link'. Otherwise only allowed people can download the file.",
            icon: TbEye
        },
        {
            title: "File Size Limits",
            desc: "For larger files direct link may open a warning page that Google cannot scan this file for viruses. But can be downloaded after acknowledgement.",
            icon: TbHandStop
        },
        {
            title: "Sharing Restrictions",
            desc: "Extremely high traffic or large numbers of downloads on a single file may temporarily disable the download link.",
            icon: TbWorldShare
        },
        {
            title: "Files on Google Drive",
            desc: "The direct link only work with uploaded files on Google Drive. It does not work for documents created with Google Docs.",
            icon: TbBrandGoogleDrive
        },
        {
            title: "Video Streaming",
            desc: "Streaming and inline viewing of video files via direct link may not be supported by all browsers. The file will be downloaded instead.",
            icon: TbBroadcast
        }
    ]
}