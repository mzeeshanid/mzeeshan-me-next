import { FaAppStore, FaDownload, FaStar, FaUsers } from "react-icons/fa6";
import { MyAppStatsDataModel } from "../myAppStatsData";

export const mzVisitsStats: MyAppStatsDataModel = {
    headline: "App Performance at a Glance",
    stats: [
        {
            label: "Downloads",
            value: "5",
            unit: "K+",
            helper: "On the AppStore",
            icon: FaDownload
        },
        {
            label: "Rating",
            value: "4.6",
            unit: "+",
            helper: "Users feedback",
            icon: FaStar
        },
        {
            label: "Active Users",
            value: "500",
            unit: "+",
            helper: "Monthly active users",
            icon: FaUsers
        },
        {
            label: "Reviews",
            value: "12",
            unit: "+",
            helper: "On the AppStore",
            icon: FaAppStore
        }
    ]

}
