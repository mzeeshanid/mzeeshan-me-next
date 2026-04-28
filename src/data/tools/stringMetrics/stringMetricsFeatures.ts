import type { StaticImageData } from "next/image";
import { IconType } from "react-icons";
import { FaBolt, FaCode, FaGlobe, FaShieldAlt } from "react-icons/fa";
import { FaMagnifyingGlass, FaWandMagicSparkles } from "react-icons/fa6";
import stringMetricIcon from "../../../../public/assets/string_metric_app_icon.png";

/* Features Data */
export type StringMetricsFeature = {
    icon: IconType;
    title: string;
    description: string;
}

export type StringMetricsFeaturesData = {
    header: {
        badge: string;
        title: string;
        description: string;
    };
    features: StringMetricsFeature[];
}

export const stringMetricsFeaturesData: StringMetricsFeaturesData = {
    header: {
        badge: "Features",
        title: "Powerful String Comparison",
        description: "Our String Metrics tool provides comprehensive string analysis with multiple algorithms."
    },
    features: [
        {
            icon: FaCode,
            title: "7 Advanced Algorithms",
            description: "Compare strings using industry-standard algorithms including Jaro-Winkler, Levenshtein, Damerau, and more."
        },
        {
            icon: FaBolt,
            title: "Instant Results",
            description: "Get similarity scores and distance metrics instantly. All calculations happen in real-time."
        },
        {
            icon: FaMagnifyingGlass,
            title: "Detailed Analysis",
            description: "View both similarity percentages and numeric distances for each algorithm side by side."
        },
        {
            icon: FaWandMagicSparkles,
            title: "Multiple Metrics",
            description: "Get comprehensive results including similarity scores, edit distances, and normalized values."
        },
        {
            icon: FaShieldAlt,
            title: "Private & Secure",
            description: "All processing happens locally in your browser. Your data never leaves your device."
        },
        {
            icon: FaGlobe,
            title: "Cross-Platform",
            description: "Works seamlessly on desktop, tablet, and mobile devices with responsive design."
        }
    ]
};

/* Header Data */
export type StringMetricsHeaderData = {
    title: string;
    subtitle: string;
    icon: StaticImageData;
    alt: string;
}

export const stringMetricsHeaderData: StringMetricsHeaderData = {
    title: "String Metrics",
    subtitle: "Compare it!",
    icon: stringMetricIcon,
    alt: "String Metrics app icon"
};

/* Meta Data */
export type StringMetricsMetaData = {
    title: string;
    description: string;
    image: {
        alt: string;
        width: number;
        height: number;
        src: string;
        type: string;
    };
    url: string;
}

export const stringMetricsMetaData: StringMetricsMetaData = {
    title: "String Metrics - Compare String Similarity",
    description: "Compare strings using multiple algorithms including Jaro-Winkler, Levenshtein, Damerau, and more. Free online tool for string similarity analysis.",
    image: {
        alt: "String Metrics hero image",
        width: 400,
        height: 400,
        src: "/assets/string_metric_app_icon.png",
        type: "image/png"
    },
    url: "/tools/string-metrics"
};

/* Hero Data */
export type StringMetricsHeroData = {
    heroTitle: string;
    heroDescription: string;
    heroFootNote: string;
    sourcePlaceholder: string;
    targetPlaceholder: string;
    compareButtonText: string;
}

export const stringMetricsHeroData: StringMetricsHeroData = {
    heroTitle: "String Metrics Calculator",
    heroDescription: "Compare two strings using multiple similarity algorithms. Find similarity scores and edit distances instantly.",
    heroFootNote: "Free to use • No uploads • Private & Secure",
    sourcePlaceholder: "Enter source string...",
    targetPlaceholder: "Enter target string...",
    compareButtonText: "Compare"
};
