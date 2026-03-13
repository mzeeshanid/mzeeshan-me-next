import { IconType } from "react-icons";
import { FaBolt, FaCode, FaDatabase, FaFingerprint, FaGlobe, FaRocket, FaShieldAlt, FaSpellCheck } from "react-icons/fa";
import { FaArrowsSpin, FaMagnifyingGlass, FaNetworkWired, FaScaleBalanced, FaStopwatch } from "react-icons/fa6";

/* Stats Data */
export type StringMetricsStatItem = {
    label: string;
    value: string;
    description: string;
    icon: IconType;
}

export type StringMetricsStatsData = {
    badge: string;
    title: string;
    description: string;
    stats: StringMetricsStatItem[];
}

export const stringMetricsStatsData: StringMetricsStatsData = {
    badge: "Performance",
    title: "String Metrics at a Glance",
    description: "Understanding the performance and characteristics of different string comparison algorithms.",
    stats: [
        {
            label: "Algorithms",
            value: "7",
            description: "Industry-standard string comparison algorithms",
            icon: FaCode
        },
        {
            label: "Real-time",
            value: "Instant",
            description: "Results computed in milliseconds",
            icon: FaBolt
        },
        {
            label: "Client-side",
            value: "100%",
            description: "All processing happens in your browser",
            icon: FaShieldAlt
        },
        {
            label: "Use Cases",
            value: "50+",
            description: "Different application scenarios supported",
            icon: FaGlobe
        }
    ]
};

/* Complexity Data */
export type StringMetricsComplexityItem = {
    algorithm: string;
    timeComplexity: string;
    spaceComplexity: string;
    description: string;
}

export type StringMetricsComplexityData = {
    header: {
        badge: string;
        title: string;
        description: string;
    };
    complexities: StringMetricsComplexityItem[];
}

export const stringMetricsComplexityData: StringMetricsComplexityData = {
    header: {
        badge: "Complexity",
        title: "Algorithm Complexity",
        description: "Understanding the computational complexity of each algorithm."
    },
    complexities: [
        {
            algorithm: "Jaro-Winkler",
            timeComplexity: "O(n)",
            spaceComplexity: "O(n)",
            description: "Most efficient for longer strings due to prefix weighting"
        },
        {
            algorithm: "Levenshtein",
            timeComplexity: "O(n×m)",
            spaceComplexity: "O(n×m)",
            description: "Standard edit distance with insertions, deletions, and substitutions"
        },
        {
            algorithm: "Normalized Levenshtein",
            timeComplexity: "O(n×m)",
            spaceComplexity: "O(n×m)",
            description: "Levenshtein normalized to 0-1 scale"
        },
        {
            algorithm: "Damerau",
            timeComplexity: "O(n×m)",
            spaceComplexity: "O(n×m)",
            description: "Extended Levenshtein with transposition support"
        },
        {
            algorithm: "Optimal String Alignment",
            timeComplexity: "O(n×m)",
            spaceComplexity: "O(n×m)",
            description: "Restricted Damerau for faster computation"
        },
        {
            algorithm: "Longest Common Subsequence",
            timeComplexity: "O(n×m)",
            spaceComplexity: "O(n×m)",
            description: "Finds longest common subsequence in strings"
        },
        {
            algorithm: "Metric LCS",
            timeComplexity: "O(n×m)",
            spaceComplexity: "O(n×m)",
            description: "True metric version of LCS"
        }
    ]
};

/* Use Cases Data */
export type StringMetricsUseCase = {
    title: string;
    description: string;
    icon: IconType;
    algorithms: string[];
}

export type StringMetricsUseCasesData = {
    header: {
        badge: string;
        title: string;
        description: string;
    };
    useCases: StringMetricsUseCase[];
}

export const stringMetricsUseCasesData: StringMetricsUseCasesData = {
    header: {
        badge: "Use Cases",
        title: "Practical Applications",
        description: "See how different algorithms are used in real-world applications."
    },
    useCases: [
        {
            title: "Spell Checking",
            description: "Find the closest matching word from a dictionary to suggest corrections for misspellings.",
            icon: FaSpellCheck,
            algorithms: ["Levenshtein", "Damerau", "Normalized Levenshtein"]
        },
        {
            title: "Data Deduplication",
            description: "Identify duplicate or near-duplicate records in databases and datasets.",
            icon: FaDatabase,
            algorithms: ["Jaro-Winkler", "Levenshtein", "Normalized Levenshtein"]
        },
        {
            title: "Fuzzy Search",
            description: "Implement search functionality that finds results even with typos or partial matches.",
            icon: FaMagnifyingGlass,
            algorithms: ["Jaro-Winkler", "Levenshtein", "OSA"]
        },
        {
            title: "DNA Sequencing",
            description: "Compare genetic sequences to find similarities and evolutionary relationships.",
            icon: FaFingerprint,
            algorithms: ["LCS", "Metric LCS", "Levenshtein"]
        },
        {
            title: "Version Control",
            description: "Detect changes between versions of text or code files.",
            icon: FaArrowsSpin,
            algorithms: ["LCS", "Levenshtein"]
        },
        {
            title: "Plagiarism Detection",
            description: "Identify copied text by finding common subsequences between documents.",
            icon: FaScaleBalanced,
            algorithms: ["LCS", "Metric LCS", "Normalized Levenshtein"]
        }
    ]
};
