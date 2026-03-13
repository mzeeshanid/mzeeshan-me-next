import { IconType } from "react-icons"
import { FaBolt, FaLock, FaMobile, FaRulerCombined } from "react-icons/fa6"
import { AspectRatioSectionHeaderModel } from "./aspectRatioData"

export type AspectRatioFeaturesData = {
  header: AspectRatioSectionHeaderModel
  features: AspectRatioFeatureDataItem[]
}

export type AspectRatioFeatureDataItem = {
  icon: IconType
  title: string
  desc: string
}

export const aspectRatioFeaturesData: AspectRatioFeaturesData = {
  header: {
    badge: "Fast & Accurate",
    title: "Resize Without Distortion",
    desc:
      "The Aspect Ratio Calculator helps you scale images, videos, and designs while preserving the original proportions.",
  },
  features: [
    {
      icon: FaRulerCombined,
      title: "Perfect Proportions",
      desc:
        "Maintain the correct aspect ratio when resizing width or height to avoid stretching or squashing.",
    },
    {
      icon: FaBolt,
      title: "Instant Calculation",
      desc:
        "Get instant visualizations as you type — no page reloads, no delays.",
    },
    {
      icon: FaMobile,
      title: "Works on Any Device",
      desc:
        "Fully responsive and optimized for desktop, tablet, and mobile screens.",
    },
    {
      icon: FaLock,
      title: "Private & Secure",
      desc:
        "All calculations are mathematical and happen locally in your browser.",
    },
  ],
}
