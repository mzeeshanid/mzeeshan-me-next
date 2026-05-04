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
    subtitle: "Answers to common questions from developers and testers",
    faqs: [
        {
            question: "What file types are available for download?",
            answer:
                "We offer 55+ file types across audio, video, image, document, and data categories — including MP3, WAV, FLAC, MP4, MKV, PDF, DOCX, PNG, JPEG, CSV, JSON, XML, and many more. Every format has multiple variants so you can test exactly the scenario your app needs to handle.",
        },
        {
            question: "Are the sample files free to download without registration?",
            answer:
                "Yes — 100% free, no account required, no sign-up, no email address. Every file is available for immediate download. There are no hidden paywalls, rate limits on downloads, or premium tiers.",
        },
        {
            question: "Can I use these files in automated tests or CI/CD pipelines?",
            answer:
                "Absolutely. Every file has a permanent, direct download URL with no redirects, no CAPTCHAs, and no rate limiting. You can reference the URLs directly in your test suites, GitHub Actions workflows, Jenkinsfiles, or shell scripts for fully automated file-upload and processing tests.",
        },
        {
            question: "What audio variants are available for testing?",
            answer:
                "Audio files are available in mono, stereo, 5.1 surround, and 7.1 surround channel configurations across multiple sample rates (44.1 kHz, 48 kHz, 96 kHz) and bit depths. Formats include MP3, WAV, FLAC, AAC, OGG, and AIFF — covering the full range of scenarios needed for media player, streaming app, and audio pipeline testing.",
        },
        {
            question: "Do you have video test files in different codecs like H.264, H.265, or VP9?",
            answer:
                "Yes. Video sample files are available encoded in H.264 (AVC), H.265 (HEVC), and VP9, with container formats including MP4, MKV, MOV, and WebM. Both portrait and landscape orientations are provided. This lets you catch codec-specific playback or transcoding failures before your users do.",
        },
        {
            question: "Are there sample files for testing error handling — like corrupt or zero-byte files?",
            answer:
                "Yes. We include intentionally malformed files, zero-byte (empty) files, truncated files, and files with invalid headers across several formats. These are specifically designed to help you verify that your app fails gracefully — showing the right error message instead of crashing or hanging.",
        },
        {
            question: "What image variants are available for testing?",
            answer:
                "Image test files include variants with transparency (alpha channel), CMYK color space (for print pipeline testing), high-DPI / Retina-resolution files, grayscale, and different bit depths. Formats include PNG, JPEG, WebP, TIFF, SVG, BMP, and HEIC.",
        },
        {
            question: "How do I download a sample file programmatically or via a direct URL?",
            answer:
                "Each variant has a stable, permanent URL shown on its detail page. You can use curl, wget, fetch(), axios, or any HTTP client to download it directly. Example: curl -O https://samplefiles.io/files/audio/mp3/sample-3s.mp3. No authentication headers or cookies are required.",
        },
        {
            question: "Do you have large sample files for upload and bandwidth testing?",
            answer:
                "Yes. Many formats offer large file variants — from a few KB up to several hundred MB — specifically for stress-testing file upload endpoints, validating multipart form handling, or measuring throughput under load. File sizes are clearly labeled on each variant so you can pick the right one for your scenario.",
        },
        {
            question: "Can I get sample CSV, JSON, or XML files for data parsing tests?",
            answer:
                "Yes. Structured data sample files include CSV with various delimiters, quoted fields, and Unicode content; JSON with nested objects, arrays, and edge-case values; and XML with namespaces and schema variations. Variants also include malformed versions to test how your parser handles bad input.",
        },
        {
            question: "How is this different from sites that only offer files by size (small, medium, large)?",
            answer:
                "Size-only variants tell you almost nothing about real-world behaviour. This library organises files by testing scenario — so instead of \"large MP3\", you get \"mono 96 kHz FLAC\" or \"5.1 surround AAC\". Every variant maps to a specific developer or QA use case, so you can write tests against the exact condition your app needs to handle.",
        },
        {
            question: "What if the specific file variant I need isn't available?",
            answer:
                "Use the file request form on the page to describe the format, codec, channel configuration, or edge case you need. Requests from developers and QA engineers drive what gets added next — new variants are published regularly based on community feedback.",
        },
        {
            question: "Do you track or store any personal data when I download a file?",
            answer:
                "No personal data is collected or stored. Downloads are anonymous — we do not log IP addresses tied to individuals, require login, or use tracking pixels. Aggregate download counts per file type are tracked to prioritise new variants, but nothing that identifies you.",
        },
        {
            question: "Can I use these sample files in commercial projects or share them with my team?",
            answer:
                "Yes. All sample files are free to use for personal and commercial testing and development purposes. You can share direct download URLs with teammates or include them in internal test fixtures. The files are not licensed for redistribution as standalone products.",
        },
    ],
};
