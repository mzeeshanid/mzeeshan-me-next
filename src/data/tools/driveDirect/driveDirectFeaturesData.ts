import { IconType } from "react-icons"
import { FaCloud, FaDownload, FaLock, FaShield } from "react-icons/fa6"

/* Features Data */
export type DriveDirectFeaturesHeader = {
    badge: string,
    title: string,
    desc: string
}

export type DriveDirectFeaturesData = {
    header: DriveDirectFeaturesHeader
    features: DriveDirectFeatureDataItem[]
}

export type DriveDirectFeatureDataItem = {
    icon: IconType,
    title: string,
    desc: string
}

export const driveDirectFeaturesData: DriveDirectFeaturesData = {
    header: {
        badge: "Free & Secure",
        title: "Google Drive Shareable to Direct Download Links",
        desc: "Drive Direct offers several advantages that make it the best choice for generating direct download links from Google Drive."
    },
    features: [
        {
            icon: FaDownload,
            title: "Instant Direct Links",
            desc: "Generate direct download links instantly without any delays or waiting times."
        },
        {
            icon: FaLock,
            title: "No Login Required",
            desc: "Use Drive Direct without the need to log in or create an account. Hassle-free."
        },
        {
            icon: FaCloud,
            title: "Free to Use",
            desc: "Drive Direct is completely free with no hidden charges or fees. No limits."
        },
        {
            icon: FaShield,
            title: "Secure and Private",
            desc: "Drive Direct works offline within the browser. No data upload required."
        }
    ],
}