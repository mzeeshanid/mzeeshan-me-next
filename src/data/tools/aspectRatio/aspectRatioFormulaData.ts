import { AspectRatioSectionHeaderModel } from "./aspectRatioData"

/* Working Data */
export type AspectRatioFormulaData = {
    header: AspectRatioSectionHeaderModel,
    blockquote: string,
    formulas: [
        {heading: string, text: string},
        {heading: string, text: string},
    ]
}

export const aspectRatioFormulaData: AspectRatioFormulaData = {
    header: {
        badge: "Formula",
        title: "Aspect Ratio Formula",
        desc: "Understand the mathematical formulas used to calculate aspect ratios.",
    },
    blockquote: "Note: Substitute the values accordingly to maintain the aspect ratio.",
    formulas: [
        {
            heading: "For New Width",
            text: "(New Height x Original Width) / Original Height"
        },
        {
            heading: "For New Height",
            text: "(Original Height / Original Width) x New Width"
        }
    ]
}
