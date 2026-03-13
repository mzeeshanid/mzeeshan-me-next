import { FaAppStore, FaDownload, FaStar, FaUsers } from "react-icons/fa6";
import { MyAppStatsDataModel } from "../myAppStatsData";

export const mzPlayerHDStats: MyAppStatsDataModel = {
    headline: "App Performance at a Glance",
    stats: [
        {
            label: "Downloads",
            value: "2.8",
            unit: "K+",
            helper: "On the AppStore",
            icon: FaDownload
        },
        {
            label: "Rating",
            value: "4.3",
            unit: "+",
            helper: "Users feedback",
            icon: FaStar
        },
        {
            label: "Active Users",
            value: "100",
            unit: "+",
            helper: "Monthly active users",
            icon: FaUsers
        },
        {
            label: "Reviews",
            value: "8",
            unit: "+",
            helper: "On the AppStore",
            icon: FaAppStore
        }
    ]

}
