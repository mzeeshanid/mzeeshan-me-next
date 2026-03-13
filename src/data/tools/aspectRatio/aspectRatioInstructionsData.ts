import { BasicImageDataModel } from "@/data/basicImage/basicImageDataModel"
import { AspectRatioSectionHeaderModel } from "./aspectRatioData"

export type AspectRatioInstructionsData = {
    header: AspectRatioSectionHeaderModel,
    heroImage: BasicImageDataModel,
    steps: {
        title: string,
        desc: string
    }[]
}


export const aspectRatioInstructions: AspectRatioInstructionsData = {
    header: {
        badge: "How It Works",
        title: "Keep Perfect Proportions",
        desc: "Resize your content while maintaining the correct aspect ratio."
    },
    heroImage: {
        alt: "drive direct hero image",
        width: 333,
        height: 250,
        src: `/assets/aspect_ratio_hero.png`
    },
    steps: [
        {
            title: "Size or Ratio",
            desc: "Enter the original width and original height or choose a common aspect ratio.",
        },
        {
            title: "Change One Dimension",
            desc: "Update either the desired width or desired height — the other value will adjust automatically.",
        },
        {
            title: "Use the Results",
            desc: "Copy the new dimensions and apply them to your image, video, or design.",
        },
    ],
}