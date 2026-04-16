import { BasicImageDataModel } from "@/data/basicImage/basicImageDataModel"

/* Meta Data */
export type AspectRatioMetaData = {
    title: string,
    desc: string,
    image: BasicImageDataModel,
    url: string
}

export const aspectRatioMetaData: AspectRatioMetaData = {
    title: "Free Aspect Ratio Calculator — Width, Height & 16:9 Video Ratios",
    desc: "Free online aspect ratio calculator. Enter any width or height and get the missing dimension instantly — supports 16:9, 4:3, 4:5, 21:9, and custom ratios. Perfect for resizing images, videos, and YouTube thumbnails without distortion.",
    image: {
        alt: "aspect ratio calculator hero image",
        width: 333,
        height: 250,
        src: `/assets/aspect_ratio_hero.png`
    },
    url: `/tools/aspect-ratio-calculator`
}