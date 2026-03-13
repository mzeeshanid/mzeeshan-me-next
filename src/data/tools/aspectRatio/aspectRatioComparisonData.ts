import { IconType } from "react-icons"
import { FaCheck, FaExclamation, FaX } from "react-icons/fa6"
import { AspectRatioSectionHeaderModel } from "./aspectRatioData"

/* Comparison Data */
export type AspectRatioComparisonData = {
    header: AspectRatioSectionHeaderModel,
    columns: AspectRatioComparisonColumn[],
    rows: AspectRatioComparisonRowModel[]
}

export type AspectRatioComparisonColumn = {
    title: string,
    key: string,
    link?: string,
}

export type AspectRatioComparisonRowModel = {
    feature: AspectRatioComparisonItemModel,
    aspectRatio: AspectRatioComparisonItemModel,
    andrewHedges: AspectRatioComparisonItemModel,
    calculatorSoup: AspectRatioComparisonItemModel,
}

export type AspectRatioComparisonItemModel = {
    icon?: IconType,
    text: string,
    color: string
}

export const aspectRatioComparisonData: AspectRatioComparisonData = {
    header: {
        badge: "Comparison",
        title: "How my Aspect Ratio Calculator Stands Out",
        desc: "See how my Aspect Ratio Calculator compares to other similar tools in the market."
    },
    columns: [
        {
            title: "Features",
            key: "feature"
        },
        {
            title: "Aspect Ratio",
            key: "aspectRatio"
        },
        {
            title: "Andrew Hedges Aspect Ratio",
            link: "https://andrew.hedges.name/experiments/aspect_ratio/",
            key: "andrewHedges"
        },
        {
            title: "CalculatorSoup Aspect Ratio",
            link: "https://www.calculatorsoup.com/calculators/technology/aspect-ratio-calculator.php",
            key: "calculatorSoup"
        }
    ],
    rows: [
        {
            feature: {
                text: "No Login Required",
                color: "fg.success"
            },
            aspectRatio: {
                text: "Yes",
                icon: FaCheck,
                color: "fg.success"
            },
            andrewHedges: {
                text: "Yes",
                icon: FaCheck,
                color: "fg.success"
            },
            calculatorSoup: {
                text: "Yes",
                icon: FaCheck,
                color: "fg.success"
            }
        },
        {
            feature: {
                text: "Visualisation on the go",
                color: "fg.success"
            },
            aspectRatio: {
                text: "Yes",
                icon: FaCheck,
                color: "fg.success"
            },
            andrewHedges: {
                text: "Yes",
                icon: FaCheck,
                color: "fg.success"
            },
            calculatorSoup: {
                text: "No",
                icon: FaX,
                color: "fg.error"
            }   
        },
        {
            feature: {
                text: "Responsive UI",
                color: "fg.success"
            },
            aspectRatio: {
                text: "Mobile & Desktop",
                icon: FaCheck,
                color: "fg.success"
            },
            andrewHedges: {
                text: "Basic display",
                icon: FaX,
                color: "fg.error"
            },
            calculatorSoup: {
                text: "Basic display",
                icon: FaX,
                color: "fg.error"
            }
        },
        {
            feature: {
                text: "Works Offline",
                color: "fg.success"
            },
            aspectRatio: {
                text: "Calculations are mathematical",
                icon: FaCheck,
                color: "fg.success"
            },
            andrewHedges: {
                text: "Yes",
                icon: FaCheck,
                color: "fg.success"
            },
            calculatorSoup: {
                text: "No",
                icon: FaExclamation,
                color: "fg.warning"
            }
        }
    ]
}
