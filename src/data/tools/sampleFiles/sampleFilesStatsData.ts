import { IconType } from "react-icons"
import { FaCopy, FaDownload, FaFile, FaLayerGroup, FaNetworkWired } from "react-icons/fa6"

export type SampleFilesStatKey =
  | "totalDownloads"
  | "totalExtensions"
  | "totalVariants"
  | "totalCategories"
  | "totalRequests";

export type SampleFilesStatsDataModel = {
    headline: string,
    stats: SampleFilesStatItemDataModel[]
}

export type SampleFilesStatItemDataModel = {
    key: SampleFilesStatKey,
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
            key: "totalDownloads",
            label: "Total Downloads",
            value: "50",
            unit: "k+",
            helper: "Files downloaded",
            icon: FaDownload
        },
        {
            key: "totalExtensions",
            label: "File Formats",
            value: "55",
            unit: "+",
            helper: "Supported extensions",
            icon: FaFile
        },
        {
            key: "totalVariants",
            label: "Sample Files",
            value: "200",
            unit: "+",
            helper: "Downloadable files",
            icon: FaCopy
        },
        {
            key: "totalCategories",
            label: "File Categories",
            value: "5",
            unit: "+",
            helper: "Type categories",
            icon: FaLayerGroup
        },
        {
            key: "totalRequests",
            label: "File Requests",
            value: "15",
            unit: "+",
            helper: "Requested by users",
            icon: FaNetworkWired
        }
    ]
}

export const formatStatsValue = (n: number): { value: string; unit?: string } => {
    if (n >= 1_000_000) return { value: (n / 1_000_000).toFixed(1), unit: "M+" };
    if (n >= 1_000) return { value: (n / 1_000).toFixed(1), unit: "k+" };
    return { value: String(n), unit: "+" };
};
