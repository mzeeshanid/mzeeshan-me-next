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
    desc: "Free online aspect ratio calculator. Enter your original width and height, then instantly get the new dimension — perfect for resizing images, videos, and responsive layouts without distortion.",
    image: {
        alt: "aspect ratio calculator hero image",
        width: 333,
        height: 250,
        src: `/assets/aspect_ratio_hero.png`
    },
    url: `/tools/aspect-ratio-calculator`
}