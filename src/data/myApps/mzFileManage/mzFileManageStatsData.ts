import { FaAppStore, FaDownload, FaStar, FaUsers } from "react-icons/fa6";
import { MyAppStatsDataModel } from "../myAppStatsData";

export const mzFileManageStats: MyAppStatsDataModel = {
    headline: "App Performance at a Glance",
    stats: [
        {
            label: "Downloads",
            value: "100",
            unit: "K+",
            helper: "On the AppStore",
            icon: FaDownload
        },
        {
            label: "Ratings",
            value: "50",
            unit: "+",
            helper: "Users feedback",
            icon: FaStar
        },
        {
            label: "Active Users",
            value: "2",
            unit: "K+",
            helper: "Monthly active users",
            icon: FaUsers
        },
        {
            label: "Reviews",
            value: "20",
            unit: "+",
            helper: "On the AppStore",
            icon: FaAppStore
        }
    ]

}