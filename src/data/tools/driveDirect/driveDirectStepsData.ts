import { IconType } from "react-icons"
import { LiaGoogleDrive } from "react-icons/lia"
import { MdOutlineLink, MdOutlinePublic } from "react-icons/md"
import { RiAiGenerate } from "react-icons/ri"
import { DriveDirectSectionHeaderModel } from "./driveDirectData"

/* Steps Data */
export type DriveDirectShareLinkStepsData = {
    header: DriveDirectSectionHeaderModel,
    steps: DriveDirectShareLinkStepItem[]
}

export type DriveDirectShareLinkStepItem = {
    title: string,
    subtitle: string,
    desc: string,
    icon: IconType,
    image: {
        alt: string,
        width: number,
        height: number,
        src: string
    }
}

export const driveDirectStepsData: DriveDirectShareLinkStepsData = {
    header: {
        badge: "Steps",
        title: "Getting Shareable Links",
        desc: "Follow these simple steps to get shareable links from Google Drive."
    },
    steps: [
        {
            title: "Step 1",
            subtitle: "Getting shareable link",
            desc: "Goto **[Google Drive](https://drive.google.com/)** and right click the file that you want to share, then click on **'Share'**",
            icon: LiaGoogleDrive,
            image: {
                alt: "Step 1 Image",
                width: 600,
                height: 400,
                src: `/assets/drive_direct_step_1.png`
            }
        },
        {
            title: "Step 2",
            subtitle: "Update visibility",
            desc: "From the presented pop up, under the **General access** change the visibility to **'Anyone with the link'.**",
            icon: MdOutlinePublic,
            image: {
                alt: "Step 2 Image",
                width: 600,
                height: 400,
                src: `/assets/drive_direct_step_2.png`
            }
        },
        {
            title: "Step 3",
            subtitle: "Copy link",
            desc: "Click on **'Copy link'.**",
            icon: MdOutlineLink,
            image: {
                alt: "Step 3 Image",
                width: 600,
                height: 400,
                src: `/assets/drive_direct_step_3.png`
            }
        },
        {
            title: "Step 4",
            subtitle: "Generating direct download link",
            desc: "Paste the copied shareable link into the input box above and click on **'Generate Direct Link'.**",
            icon: RiAiGenerate,
            image: {
                alt: "Step 4 Image",
                width: 600,
                height: 400,
                src: `/assets/drive_direct_step_4.png`
            }
        }
    ]
}