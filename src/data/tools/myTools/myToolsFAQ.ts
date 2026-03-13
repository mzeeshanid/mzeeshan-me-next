export type MyToolsFAQItem = {
    question: string;
    answer: string;
};

export type MyToolsFAQData = {
    badge: string;
    title: string;
    subtitle: string;
    faqs: MyToolsFAQItem[];
};

export const myToolsFAQData: MyToolsFAQData = {
    badge: "FAQs",
    title: "Got Questions?",
    subtitle: "Get answers to common questions about our tools",
    faqs: [
        {
            question: "Are these tools really free?",
            answer: "Yes! All tools are completely free to use. There are no hidden costs, premium features, or subscription requirements. You can use them as much as you want.",
        },
        {
            question: "Do you store my data?",
            answer: "No, we don't store any of your data. Most tools process everything in your browser locally. Your privacy is our priority.",
        },
        {
            question: "Can I use these tools offline?",
            answer: "Some tools can be used offline by downloading the page and opening it locally. Most tools require internet connection for full functionality.",
        },
        {
            question: "Which browsers are supported?",
            answer: "All modern browsers are supported including Chrome, Firefox, Safari, Edge, and Opera. We recommend using the latest version for the best experience.",
        },
        {
            question: "Can I report bugs or suggest features?",
            answer: "Absolutely! We welcome feedback. You can report issues or suggest features by contacting us directly.",
        },
        {
            question: "Are there API endpoints available?",
            answer: "Currently, tools are designed for web browser use. API endpoints may be available in the future. Stay tuned for updates!",
        },
    ],
};
