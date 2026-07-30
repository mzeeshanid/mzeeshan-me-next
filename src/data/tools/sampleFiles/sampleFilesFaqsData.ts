export type SampleFilesFAQItem = {
    question: string;
    answer: string;
};

export type SampleFilesFAQGroup = {
    title: string;
    faqs: SampleFilesFAQItem[];
};

export type SampleFilesFaqsData = {
    badge: string;
    title: string;
    subtitle: string;
    faqs: SampleFilesFAQItem[];
    groups?: SampleFilesFAQGroup[];
};

const usageFaqs: SampleFilesFAQItem[] = [
    {
        question: "What file types are available for download?",
        answer:
            "We offer **55+ file types** across audio, video, image, document, and data categories, including:\n\n" +
            "- Audio: MP3, WAV, FLAC\n" +
            "- Video: MP4, MKV\n" +
            "- Documents: PDF, DOCX\n" +
            "- Images: PNG, JPEG\n" +
            "- Data: CSV, JSON, XML\n\n" +
            "Every format has multiple variants so you can test the exact scenario your app needs to handle.",
    },
    {
        question: "How do I find the right file variant for my test case?",
        answer:
            "Use the search bar in the hero to jump straight to an extension by name, or browse by category — Video, Audio, Documents, Images, Archives, and more. On each extension's page, variants are grouped into labeled sections such as **Codec**, **Resolution**, or **Channels**, with a short description of the exact scenario each one covers, so you can pick the right file without guessing.",
    },
    {
        question: "What if the specific file variant I need isn't available?",
        answer:
            "If a variant you need — the kind QA engineers and developers ask for most — isn't available yet, submit a request using the **file request form** on this page. New variants are added regularly based on real requests.",
    },
];

const technicalFaqs: SampleFilesFAQItem[] = [
    {
        question: "How is this different from other sites of sample files?",
        answer:
            "Most sample file sites — including [file-examples.com](https://file-examples.com/) and [filesamples.com](https://filesamples.com/) — only offer variants by generic size (small, medium, large). That tells you almost nothing about real-world behavior.\n\n" +
            "This library is organized around actual testing scenarios instead. Need an MP4 encoded specifically in **H.264**, **AV1**, **HEVC**, or **VP9**? You won't find that level of detail on general-purpose sample file sites — every variant here maps to a concrete developer or QA use case, not just a file size.",
    },
    {
        question: "Are these AI generated files?",
        answer:
            "No — these are not AI generated files. Every sample is produced with the actual software or command-line tool that creates that format. For example, `ffmpeg` is used to generate the codec-specific video and audio variants, and Apple's Preview app is used to export TIFF images.\n\n" +
            "AI assistance is only used during research — to help identify the most common, real-world use cases and variant types developers and QA engineers actually need for each file extension.",
    },
    {
        question: "Are there sample files for testing error handling — like corrupt or zero-byte files?",
        answer:
            "Yes. We include intentionally malformed files, zero-byte (empty) files, truncated files, and files with invalid headers across several formats — specifically designed to help you verify that your app **fails gracefully** instead of crashing or hanging.",
    },
];

const privacyFaqs: SampleFilesFAQItem[] = [
    {
        question: "Are the sample files free to download without registration?",
        answer:
            "Yes — **100% free**, no account required, no sign-up, no email address. Every file is available for immediate download, with no hidden paywalls, download rate limits, or premium tiers.",
    },
    {
        question: "Do you track or store any personal data when I download a file?",
        answer:
            "No personally identifiable data is collected or stored. Downloads are anonymous, and no account or login is required to download a file.\n\n" +
            "To help prioritize which variants to add next, we track aggregate download counts per file type — but this is never tied to any personally identifiable information.",
    },
    {
        question: "Can I use these sample files in commercial projects or share them with my team?",
        answer:
            "Yes. Feel free to use all files from the Sample Files app for personal and commercial testing and development purposes. You can share direct download URLs with teammates or include them in internal test fixtures.\n\n" +
            "The one restriction: redistribution of the files as standalone products is not licensed.",
    },
];

export const sampleFilesFAQData: SampleFilesFaqsData = {
    badge: "FAQs",
    title: "Got Questions?",
    subtitle: "Answers to common questions from developers and testers",
    groups: [
        { title: "Usage", faqs: usageFaqs },
        { title: "Technical & Testing", faqs: technicalFaqs },
        { title: "Privacy & Legal", faqs: privacyFaqs },
    ],
    faqs: [...usageFaqs, ...technicalFaqs, ...privacyFaqs],
};
