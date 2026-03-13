/* FAQ Data */
export type StringMetricsFaqItem = {
    question: string;
    answer: string;
}

export type StringMetricsFaqsData = {
    header: {
        badge: string;
        title: string;
        desc: string;
    };
    faqs: StringMetricsFaqItem[];
}

export const stringMetricsFaqsData: StringMetricsFaqsData = {
    header: {
        badge: "FAQs",
        title: "Got Questions?",
        desc: "Answers to common questions about using the String Metrics tool."
    },
    faqs: [
        {
            question: "What is string metrics?",
            answer: "String metrics are mathematical measures used to compare and quantify the similarity or difference between two strings. They are essential tools in computer science for tasks like spell checking, DNA sequencing, plagiarism detection, and fuzzy matching."
        },
        {
            question: "What algorithms are supported?",
            answer: "Our tool supports seven popular string comparison algorithms: Jaro-Winkler, Levenshtein, Normalized Levenshtein, Damerau, Optimal String Alignment (OSA), Longest Common Subsequence (LCS), and Metric LCS. Each algorithm has different strengths suited for specific use cases."
        },
        {
            question: "Which algorithm should I use?",
            answer: "The choice depends on your specific needs: Use Jaro-Winkler for names and short strings, Levenshtein for general purpose matching, Damerau when transpositions are common (typing errors), LCS for finding common patterns in sequences, and Normalized Levenshtein when you need similarity percentages."
        },
        {
            question: "What is the difference between similarity and distance?",
            answer: "Similarity measures how alike two strings are (higher = more similar), while distance measures how different they are (higher = more different). For example, similarity of 80% means 20% different. Some algorithms return similarity, others return distance."
        },
        {
            question: "Is the tool free to use?",
            answer: "Yes, the String Metrics tool is completely free to use with no hidden charges or limitations. You can compare as many string pairs as you need."
        },
        {
            question: "How accurate are the results?",
            answer: "The results are mathematically precise implementations of well-established algorithms. Each algorithm has different characteristics - some are more sensitive to certain types of differences. We recommend testing with known examples to understand each algorithm's behavior."
        },
        {
            question: "Can I use this for spell checking?",
            answer: "Yes, algorithms like Levenshtein and Damerau are commonly used for spell checking and fuzzy matching. They can suggest corrections by finding the closest matching words from a dictionary."
        },
        {
            question: "What are the time complexities of these algorithms?",
            answer: "Most algorithms here have O(n*m) time complexity where n and m are the string lengths. Jaro-Winkler is more efficient at O(n). The actual performance depends on string lengths and the specific algorithm used."
        },
        {
            question: "Can I use this for DNA sequence comparison?",
            answer: "Yes, several algorithms including Levenshtein and LCS are commonly used in bioinformatics for DNA sequence comparison and alignment. LCS is particularly useful for finding common genetic patterns."
        },
        {
            question: "Do you store my data?",
            answer: "No, all comparisons are performed locally in your browser. Your strings are not sent to any server or stored anywhere. Your data remains completely private and secure."
        }
    ]
};
