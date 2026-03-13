import { BasicImageDataModel } from "@/data/basicImage/basicImageDataModel"

/* Meta Data */
export type AspectRatioMetaData = {
    title: string,
    desc: string,
    image: BasicImageDataModel,
    url: string
}

export const aspectRatioMetaData: AspectRatioMetaData = {
    title: "Aspect Ratio Calculator",
    desc: "A tool that allows to calculate aspect ratio by entering original size and desired width or height.",
    image: {
        alt: "aspect ratio calculator hero image",
        width: 333,
        height: 250,
        src: `/assets/aspect_ratio_hero.png`
    },
    url: `/tools/aspect-ratio-calculator`
}