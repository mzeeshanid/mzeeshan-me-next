import { FaAppStore, FaDownload, FaStar, FaUsers } from "react-icons/fa6";
import { MyAppStatsDataModel } from "../myAppStatsData";

export const mz100Stats: MyAppStatsDataModel = {
    headline: "App Performance at a Glance",
    stats: [
        {
            label: "Downloads",
            value: "15",
            unit: "K+",
            helper: "On the AppStore",
            icon: FaDownload
        },
        {
            label: "Rating",
            value: "4.5",
            unit: "+",
            helper: "Users feedback",
            icon: FaStar
        },
        {
            label: "Active Users",
            value: "3",
            unit: "K+",
            helper: "Monthly active users",
            icon: FaUsers
        },
        {
            label: "Reviews",
            value: "25",
            unit: "+",
            helper: "On the AppStore",
            icon: FaAppStore
        }
    ]

}
