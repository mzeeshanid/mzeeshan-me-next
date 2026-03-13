import { IconType } from "react-icons";
import { BsLaptopFill } from "react-icons/bs";
import { FaTachometerAlt } from "react-icons/fa";
import { RiLayout6Fill } from "react-icons/ri";
import { FaLaptop, FaLock, FaMoneyBill, FaShield, FaUnlock } from "react-icons/fa6";

export type MyToolFeature = {
    title: string;
    description: string;
    icon: IconType;
};

export type MyToolsFeaturesData = {
    badge: string;
    title: string;
    subtitle: string;
    features: MyToolFeature[];
};

export const myToolsFeaturesData: MyToolsFeaturesData = {
    badge: "Features",
    title: "Why Use These Tools?",
    subtitle: "Designed to simplify your workflow and boost productivity",
    features: [
        {
            title: "Free to Use",
            description: "All tools are free. No subscriptions, or premium tiers.",
            icon: FaMoneyBill,
        },
        {
            title: "No Registration",
            description: "Start using tools instantly without creating an account.",
            icon: FaUnlock,
        },
        {
            title: "Fast & Reliable",
            description: "Optimized for speed and reliability with instant processing.",
            icon: FaTachometerAlt,
        },
        {
            title: "Privacy Focused",
            description: "Every tool is built with privacy first in mind.",
            icon: FaShield,
        },
        {
            title: "Easy to Use",
            description: "Intuitive interfaces designed for users of all technical levels.",
            icon: RiLayout6Fill,
        },
        {
            title: "Cross Platform",
            description: "Works on any device with a modern web browser.",
            icon: BsLaptopFill,
        },
    ],
};
