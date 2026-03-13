import { IconType } from "react-icons";
import { FaBalanceScale, FaCompressArrowsAlt, FaDna, FaRandom, FaSlidersH, FaSpellCheck } from "react-icons/fa";
import { FaArrowsLeftRight, FaCode, FaListOl, FaMagnifyingGlass, FaPencil, FaRuler, FaWaveSquare } from "react-icons/fa6";

/* Algorithm Data */
export type StringMetricsAlgorithm = {
    id: string;
    name: string;
    description: string;
    icon: IconType;
    timeComplexity: string;
    spaceComplexity: string;
    useCases: string[];
    bestFor: string;
}

export type StringMetricsAlgorithmsData = {
    algorithms: StringMetricsAlgorithm[];
}

export const stringMetricsAlgorithmsData: StringMetricsAlgorithmsData = {
    algorithms: [
        {
            id: "jaro-winkler",
            name: "Jaro-Winkler",
            description: "Jaro-Winkler similarity is a measure of similarity between two strings that gives more weight to matching prefixes. It's particularly effective for short strings and names.",
            icon: FaBalanceScale,
            timeComplexity: "O(n)",
            spaceComplexity: "O(n)",
            useCases: ["Name matching", "Record linkage", "Data deduplication"],
            bestFor: "Short strings and names"
        },
        {
            id: "levenshtein",
            name: "Levenshtein",
            description: "Levenshtein distance (also known as Edit Distance) measures the minimum number of single-character edits (insertions, deletions, or substitutions) required to change one string into another.",
            icon: FaPencil,
            timeComplexity: "O(n*m)",
            spaceComplexity: "O(n*m)",
            useCases: ["Fuzzy string matching", "Spell checking", "DNA sequencing"],
            bestFor: "General purpose string comparison"
        },
        {
            id: "normalized-levenshtein",
            name: "Normalized Levenshtein",
            description: "Normalized Levenshtein distance converts the standard Levenshtein distance to a 0-1 scale where 0 means identical and 1 means completely different.",
            icon: FaRuler,
            timeComplexity: "O(n*m)",
            spaceComplexity: "O(n*m)",
            useCases: ["Similarity scoring", "Threshold-based matching", "Ranking results"],
            bestFor: "When you need similarity scores"
        },
        {
            id: "damerau",
            name: "Damerau",
            description: "Damerau-Levenshtein distance is an extension of Levenshtein distance that also accounts for transpositions of two adjacent characters.",
            icon: FaArrowsLeftRight,
            timeComplexity: "O(n*m)",
            spaceComplexity: "O(n*m)",
            useCases: ["Typo detection", "OCR error correction", "Spelling mistakes"],
            bestFor: "When transposition errors are common"
        },
        {
            id: "osa",
            name: "Optimal String Alignment",
            description: "Optimal String Alignment (OSA) distance is a restricted version of Damerau-Levenshtein that doesn't allow overlapping transpositions.",
            icon: FaSlidersH,
            timeComplexity: "O(n*m)",
            spaceComplexity: "O(n*m)",
            useCases: ["Fast string matching", "Autocomplete", "Search suggestions"],
            bestFor: "Performance-critical applications"
        },
        {
            id: "lcs",
            name: "Longest Common Subsequence",
            description: "LCS finds the longest subsequence common to two sequences. A subsequence is a sequence that appears in the same relative order but not necessarily contiguous.",
            icon: FaListOl,
            timeComplexity: "O(n*m)",
            spaceComplexity: "O(n*m)",
            useCases: ["File diff tools", "Version control", "Plagiarism detection"],
            bestFor: "Finding common patterns"
        },
        {
            id: "mlcs",
            name: "Metric Longest Common Subsequence",
            description: "MLCS is a metric version of LCS that satisfies the triangle inequality and provides a true distance metric for string comparison.",
            icon: FaDna,
            timeComplexity: "O(n*m)",
            spaceComplexity: "O(n*m)",
            useCases: ["Clustering analysis", "Bioinformatics", "Pattern recognition"],
            bestFor: "When you need a true distance metric"
        }
    ]
};
