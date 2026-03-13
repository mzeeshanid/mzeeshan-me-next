export type SampleFilesFAQItem = {
    question: string;
    answer: string;
};

export type SampleFilesFaqsData = {
    badge: string;
    title: string;
    subtitle: string;
    faqs: SampleFilesFAQItem[];
};

export const sampleFilesFAQData: SampleFilesFaqsData = {
    badge: "FAQs",
    title: "Got Questions?",
    subtitle: "Get answers to common questions",
    faqs: [
        {
            question: "What is Sample Files?",
            answer:
            "Its a web app, that allow developers and testers to download free sample files for testing purpose.",
        },
        {
            question: "How many file types are there?",
            answer: "Currently we have more than 55 different file types.",
        },
        {
            question: "Can we download file in different sizes?",
            answer:
            "Yes, we have multiple variants available for each file type based on size.",
        },
        {
            question: "What if required file type is not available?",
            answer:
            "You can send a request for required file type by typing extension in the field above.",
        }
    ],
};
