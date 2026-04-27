import { BasicImageDataModel } from "@/data/basicImage/basicImageDataModel"

/* Meta Data */
export type AspectRatioMetaData = {
    title: string,
    desc: string,
    image: BasicImageDataModel,
    url: string
}

export const aspectRatioMetaData: AspectRatioMetaData = {
    title: "Free Aspect Ratio Calculator – 16:9, 4:3, 21:9 & More",
    desc: "Free online aspect ratio calculator. Enter width or height to get the missing dimension. Supports 16:9, 4:3, 21:9 & custom ratios for images and video.",
    image: {
        alt: "aspect ratio calculator hero image",
        width: 333,
        height: 250,
        src: `/assets/aspect_ratio_hero.png`
    },
    url: `/tools/aspect-ratio-calculator`
}