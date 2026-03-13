import { IconType } from "react-icons"
import { FaDownload, FaFile, FaNetworkWired, FaUsers } from "react-icons/fa6"

export type SampleFilesStatsDataModel = {
    headline: string,
    stats: SampleFilesStatItemDataModel[]
}

export type SampleFilesStatItemDataModel = {
    label: string,
    value: string,
    unit?: string,
    helper: string,
    icon?: IconType
}

export const sampleFilesStatsData: SampleFilesStatsDataModel = {
    headline: "App Performance at a Glance",
    stats: [
        {
            label: "File Types",
            value: "55",
            unit: "+",
            helper: "Different formats",
            icon: FaFile
        },
        {
            label: "Downloads",
            value: "50",
            unit: "k+",
            helper: "Files downloaded",
            icon: FaDownload
        },
        {
            label: "File Requests",
            value: "15",
            unit: "+",
            helper: "Requested by users",
            icon: FaNetworkWired
        },
        {
            label: "Page Visits",
            value: "100",
            unit: "k+",
            helper: "Monthly visitors",
            icon: FaUsers
        }
    ]
}