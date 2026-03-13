import { IconType } from "react-icons";
import { 
    MdOutlineSpeed, 
    MdOutlinePeopleOutline, 
    MdOutlineTrendingUp, 
    MdOutlineMemory, 
    MdOutlineMoney,
    MdOutlineVerifiedUser 
} from "react-icons/md";

type MyPerformanceData = {
    tagline: string;
    title: string;
    detail: string;
    stats: MyPerformanceStatItem[];
}

type MyPerformanceStatItem = {
    title: string;
    value: string;
    icon: IconType;
}

const myPerformanceData = () : MyPerformanceData => {
    return {
        tagline: "Carrier Achievements",
        title: "Performance Metrics",
        detail: "During my career, I have focused on delivering enterprise-grade performance and reliability, helping businesses scale with confidence and achieve measurable results. Due to NDA I am unable to share apps here but below are some metrics that reflect my commitment to excellence.",
        stats: [
            {
                title: "Crash Free Sessions",
                value: "99.5%",
                icon: MdOutlineVerifiedUser,
            },
            {
                title: "Marriage Profiles",
                value: "1.4M+",
                icon: MdOutlinePeopleOutline,
            },
            {
                title: "Monthly Active Users",
                value: "30k+",
                icon: MdOutlineTrendingUp,
            },
            {
                title: "Performance Improvements",
                value: "1.5x",
                icon: MdOutlineSpeed,
            },
            {
                title: "Memory Optimization",
                value: "200MB+",
                icon: MdOutlineMemory,
            },
            {
                title: "Increase in revenue",
                value: "2.5x",
                icon: MdOutlineMoney,
            },
            
        ],
    }
}

export default myPerformanceData;