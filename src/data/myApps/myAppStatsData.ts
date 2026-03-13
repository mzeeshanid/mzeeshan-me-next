import { IconType } from "react-icons"
import { FaAppStore, FaDownload, FaStar, FaUsers } from "react-icons/fa6";

export type MyAppStatsDataModel = {
    headline: string,
    stats: MyAppStatItemDataModel[]
}

export type MyAppStatItemDataModel = {
    label: string,
    value: string,
    unit?: string,
    helper: string,
    icon?: IconType
}

export const myAppsStatsData: MyAppStatsDataModel = {
    headline: "App Performance at a Glance",
    stats: [
        {
            label: "Downloads",
            value: "200",
            unit: "K+",
            helper: "On the AppStore",
            icon: FaDownload
        },
        {
            label: "Ratings",
            value: "40",
            unit: "+",
            helper: "Users feedback",
            icon: FaStar
        },
        {
            label: "Active Users",
            value: "4",
            unit: "K+",
            helper: "Monthly active users",
            icon: FaUsers
        },
        {
            label: "Reviews",
            value: "30",
            unit: "+",
            helper: "On the AppStore",
            icon: FaAppStore
        }
    ]

}
