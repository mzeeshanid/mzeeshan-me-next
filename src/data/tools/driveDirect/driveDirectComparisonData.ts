import { IconType } from "react-icons"
import { DriveDirectSectionHeaderModel } from "./driveDirectData"
import { FaCheck, FaExclamation, FaX } from "react-icons/fa6"

/* Comparison Data */
export type DriveDirectComparisonData = {
    header: DriveDirectSectionHeaderModel,
    columns: DriveDirectComparisonColumn[],
    rows: DriveDirectComparisonRowModel[]
}

export type DriveDirectComparisonColumn = {
    title: string,
    key: string,
    link?: string,
}

export type DriveDirectComparisonRowModel = {
    feature: DriveDirectComparisonItemModel,
    driveDirect: DriveDirectComparisonItemModel,
    gdocs2direct: DriveDirectComparisonItemModel,
    raptorkit: DriveDirectComparisonItemModel,
}

export type DriveDirectComparisonItemModel = {
    icon?: IconType,
    text: string,
    color: string
}

export const driveDirectComparisonData: DriveDirectComparisonData = {
    header: {
        badge: "Comparison",
        title: "How Drive Direct Stands Out",
        desc: "See how Drive Direct compares to other similar tools in the market."
    },
    columns: [
        {
            title: "Features",
            key: "feature"
        },
        {
            title: "Drive Direct",
            key: "driveDirect"
        },
        {
            title: "GDocs2Direct",
            link: "https://sites.google.com/site/gdocs2direct/",
            key: "gdocs2direct"
        },
        {
            title: "RaptorKit",
            link: "https://raptorkit.com/google-drive-direct-download-link-generator/",
            key: "raptorkit"
        }
    ],
    rows: [
        {
            feature: {
                text: "No Login Required",
                color: "fg.success"
            },
            driveDirect: {
                text: "Yes",
                icon: FaCheck,
                color: "fg.success"
            },
            gdocs2direct: {
                text: "Yes",
                icon: FaCheck,
                color: "fg.success"
            },
            raptorkit: {
                text: "Yes",
                icon: FaCheck,
                color: "fg.success"
            }
        },
        {
            feature: {
                text: "Multiple Links Support",
                color: "fg.success"
            },
            driveDirect: {
                text: "Yes",
                icon: FaCheck,
                color: "fg.success"
            },
            gdocs2direct: {
                text: "No",
                icon: FaX,
                color: "fg.error"
            },
            raptorkit: {
                text: "No",
                icon: FaX,
                color: "fg.error"
            }   
        },
        {
            feature: {
                text: "API Access",
                color: "fg.success"
            },
            driveDirect: {
                text: "Yes",
                icon: FaCheck,
                color: "fg.success"
            },
            gdocs2direct: {
                text: "No",
                icon: FaX,
                color: "fg.error"
            },
            raptorkit: {
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
            driveDirect: {
                text: "Mobile & Desktop",
                icon: FaCheck,
                color: "fg.success"
            },
            gdocs2direct: {
                text: "Basic display",
                icon: FaX,
                color: "fg.error"
            },
            raptorkit: {
                text: "Basic display",
                icon: FaX,
                color: "fg.error"
            }
        },
        {
            feature: {
                text: "Secure & Private",
                color: "fg.success"
            },
            driveDirect: {
                text: "No data stored",
                icon: FaCheck,
                color: "fg.success"
            },
            gdocs2direct: {
                text: "Yes",
                icon: FaExclamation,
                color: "fg.warning"
            },
            raptorkit: {
                text: "Yes",
                icon: FaExclamation,
                color: "fg.warning"
            }
        }
    ]
}