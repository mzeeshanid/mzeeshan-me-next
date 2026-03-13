import { AspectRatioSectionHeaderModel } from "./aspectRatioData"

export type AspectRatioResolutionModel = {
    label: string        // e.g. "Full HD"
    width: number
    height: number
}

export type AspectRatioItemModel = {
    label: string        // Display name
    ratio: string        // e.g. "16:9"
    width: number        // Base ratio width
    height: number      // Base ratio height
    description: string // Where it is commonly used
    resolutions: AspectRatioResolutionModel[]
}

export type AspectRatioCommonData = {
    header: AspectRatioSectionHeaderModel,
    items: AspectRatioItemModel[]
}
export const aspectRatioCommon: AspectRatioCommonData = {
    header: {
        badge: "Common Aspect Ratios",
        title: "Popular Aspect Ratios & Resolutions",
        desc: "Explore widely used aspect ratios across devices, media, and design to choose the right one for your needs."
    },
    items: [
        {
            label: "HD / Full HD",
            ratio: "16:9",
            width: 16,
            height: 9,
            description: "YouTube, TVs, monitors, modern screens",
            resolutions: [
                { label: "HD", width: 1280, height: 720 },
                { label: "Full HD", width: 1920, height: 1080 },
                { label: "2K", width: 2560, height: 1440 },
                { label: "4K UHD", width: 3840, height: 2160 },
            ],
        },
        {
            label: "Cinema Widescreen",
            ratio: "21:9",
            width: 21,
            height: 9,
            description: "Ultrawide monitors, cinematic video",
            resolutions: [
                { label: "UW Full HD", width: 2560, height: 1080 },
                { label: "UW QHD", width: 3440, height: 1440 },
                { label: "UW 5K", width: 5120, height: 2160 },
            ],
        },
        {
            label: "Classic TV",
            ratio: "4:3",
            width: 4,
            height: 3,
            description: "Old TVs, presentations, standard monitors",
            resolutions: [
                { label: "SD", width: 640, height: 480 },
                { label: "XGA", width: 1024, height: 768 },
                { label: "UXGA", width: 1600, height: 1200 },
            ],
        },
        {
            label: "Vertical",
            ratio: "9:16",
            width: 9,
            height: 16,
            description: "TikTok, Reels, Stories, Shorts",
            resolutions: [
                { label: "HD Vertical", width: 720, height: 1280 },
                { label: "Full HD Vertical", width: 1080, height: 1920 },
                { label: "4K Vertical", width: 2160, height: 3840 },
            ],
        },
        {
            label: "Square",
            ratio: "1:1",
            width: 1,
            height: 1,
            description: "Social media feeds, avatars, thumbnails",
            resolutions: [
                { label: "Small", width: 512, height: 512 },
                { label: "Medium", width: 1080, height: 1080 },
                { label: "Large", width: 2048, height: 2048 }
            ],
        },
        {
            label: "Portrait",
            ratio: "4:5",
            width: 4,
            height: 5,
            description: "Instagram portrait, posters",
            resolutions: [
                { label: "Web", width: 1080, height: 1350 },
                { label: "Print", width: 2400, height: 3000 },
            ],
        }
    ],
}

export type AspectRatioLinearCommonRatioModel = {
    label: string,
    value: string,
    width: number,
    height: number
}
export const aspectRatioLinearCommonRatios: AspectRatioLinearCommonRatioModel[] = [
  { label: "Full HD (1920×1080)", value: "0", width: 1920, height: 1080 },
  { label: "QHD / 2K (2560×1440)", value: "1", width: 2560, height: 1440 },
  { label: "4K UHD (3840×2160)", value: "2", width: 3840, height: 2160 },

  { label: "Mobile FHD+ (1080×2400)", value: "3", width: 1080, height: 2400 },
  { label: "Instagram Stories / Reels (1080×1920)", value: "4", width: 1080, height: 1920 },
  { label: "Instagram Vertical Post (1080×1350)", value: "5", width: 1080, height: 1350 },
  { label: "Square Image (1080×1080)", value: "6", width: 1080, height: 1080 },

  { label: "Desktop Wide (1366×768)", value: "7", width: 1366, height: 768 },
  { label: "Tablet Portrait (768×1024)", value: "8", width: 768, height: 1024 },
  { label: "Desktop (1360×900)", value: "9", width: 1360, height: 900 },
  { label: "Desktop (1600×900)", value: "10", width: 1600, height: 900 },

  { label: "Twitter Link Preview (1200×628)", value: "11", width: 1200, height: 628 },
]
