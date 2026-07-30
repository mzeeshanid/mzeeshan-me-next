import {
  SampleFilesFAQGroup,
  SampleFilesFAQItem,
  SampleFilesFaqsData,
} from "./sampleFilesFaqsData";

// Privacy/licensing policy is identical across categories — only the
// wording adapts to the category's singular noun (e.g. "video", "document").
function buildPrivacyGroup(singularLabel: string): SampleFilesFAQGroup {
  return {
    title: "Privacy & Legal",
    faqs: [
      {
        question: `Are the sample ${singularLabel} files free to download without registration?`,
        answer:
          "Yes — **100% free**, no account required, no sign-up, no email address. Every file is available for immediate download, with no hidden paywalls, download rate limits, or premium tiers.",
      },
      {
        question: `Do you track or store any personal data when I download a ${singularLabel} file?`,
        answer:
          "No personally identifiable data is collected or stored. Downloads are anonymous, and no account or login is required to download a file.\n\n" +
          "To help prioritize which variants to add next, we track aggregate download counts per file type — but this is never tied to any personally identifiable information.",
      },
      {
        question: `Can I use these sample ${singularLabel} files in commercial projects or share them with my team?`,
        answer:
          "Yes. Feel free to use all files for personal and commercial testing and development purposes. You can share direct download URLs with teammates or include them in internal test fixtures.\n\n" +
          "The one restriction: redistribution of the files as standalone products is not licensed.",
      },
    ],
  };
}

function buildCategoryFaqsData(
  subtitle: string,
  usage: SampleFilesFAQItem[],
  technical: SampleFilesFAQItem[],
  singularLabel: string,
): SampleFilesFaqsData {
  const groups: SampleFilesFAQGroup[] = [
    { title: "Usage", faqs: usage },
    { title: "Technical & Testing", faqs: technical },
    buildPrivacyGroup(singularLabel),
  ];

  return {
    badge: "FAQs",
    title: "Got Questions?",
    subtitle,
    groups,
    faqs: groups.flatMap((g) => g.faqs),
  };
}

export const sampleFilesCategoryFaqsData: Record<string, SampleFilesFaqsData> = {
  videos: buildCategoryFaqsData(
    "Answers to common questions about testing with video files",
    [
      {
        question: "What video formats are available for download?",
        answer:
          "We offer **11 video formats** for testing, including MP4, MOV, MKV, WEBM, AVI, FLV, WMV, 3GP, 3G2, MPG, and OGV. Each format has multiple variants covering different resolutions, codecs, and frame rates.",
      },
      {
        question: "How do I find the right video variant for my test case?",
        answer:
          "Use the search bar in the hero to jump straight to a format by name, or browse the extensions grid below. On each format's page, variants are grouped into labeled sections such as **Resolution**, **Frame Rate**, and **Codec**, with a short description of the exact scenario each one covers.",
      },
      {
        question: "What if the specific video variant I need isn't available?",
        answer:
          "If a variant you need isn't available yet, submit a request using the **file request form** on this page. New variants are added regularly based on real developer and QA requests.",
      },
    ],
    [
      {
        question: "What video codecs are supported in the sample files?",
        answer:
          "Variants are encoded in [H.264 (AVC)](https://en.wikipedia.org/wiki/Advanced_Video_Coding), [H.265 (HEVC)](https://en.wikipedia.org/wiki/High_Efficiency_Video_Coding), and VP9, across container formats including MP4, MKV, MOV, and WebM — so you can catch codec-specific playback or transcoding failures before your users do.",
      },
      {
        question: "Can I test different resolutions and frame rates?",
        answer:
          "Yes. Video variants range from 480p SD up to 4K UHD, with multiple frame rate options for playback and transcoding tests, and both portrait and landscape orientations are provided.",
      },
      {
        question: "Are there corrupt or zero-byte video files for testing error handling?",
        answer:
          "Yes. We include intentionally malformed files, zero-byte (empty) files, truncated files, and files with invalid headers — specifically designed to help you verify that your app **fails gracefully** instead of crashing or hanging.",
      },
    ],
    "video",
  ),

  audios: buildCategoryFaqsData(
    "Answers to common questions about testing with audio files",
    [
      {
        question: "What audio formats are available for download?",
        answer:
          "We offer **11 audio formats**, including MP3, WAV, FLAC, AAC, OGG, OPUS, WMA, AIFF, M4A, M4R, and MMF — covering both lossy and lossless codecs for testing playback, streaming, and conversion pipelines.",
      },
      {
        question: "How do I find the right audio variant for my test case?",
        answer:
          "Use the search bar in the hero to jump straight to a format by name, or browse the extensions grid below. On each format's page, variants are grouped into labeled sections such as **Channels**, **Sample Rate & Bit Depth**, and **Duration**, so you can pick the exact scenario your app needs to handle.",
      },
      {
        question: "What if the specific audio variant I need isn't available?",
        answer:
          "If a variant you need isn't available yet, submit a request using the **file request form** on this page. New variants are added regularly based on real developer and QA requests.",
      },
    ],
    [
      {
        question: "What channel configurations are available — mono, stereo, or surround?",
        answer:
          "Audio variants are available in mono, stereo, [5.1 surround](https://en.wikipedia.org/wiki/5.1_surround_sound), and 7.1 surround channel configurations, so you can validate audio pipelines end-to-end across single-speaker and multi-channel playback setups.",
      },
      {
        question: "What sample rates and bit depths are covered?",
        answer:
          "Variants span multiple sample rates (44.1 kHz, 48 kHz, 96 kHz) and bit depths, across both lossy codecs (MP3, AAC, OGG) and lossless codecs (FLAC, WAV, AIFF) — useful for testing codec-specific quality and compatibility issues.",
      },
      {
        question: "Are there corrupt or silent audio files for testing error handling?",
        answer:
          "Yes. We include intentionally malformed files, zero-byte (empty) files, and files with invalid headers — designed to help you verify that your audio pipeline **fails gracefully** instead of crashing.",
      },
    ],
    "audio",
  ),

  docs: buildCategoryFaqsData(
    "Answers to common questions about testing with document files",
    [
      {
        question: "What document formats are available for download?",
        answer:
          "We offer **13 document formats**, including PDF, DOCX, DOC, RTF, TXT, CSV, XLSX, XLS, PPTX, and PPT, plus Apple's KEY, NUMBERS, and PAGES formats — covering the most common office and data-exchange formats.",
      },
      {
        question: "How do I find the right document variant for my test case?",
        answer:
          "Use the search bar in the hero to jump straight to a format by name, or browse the extensions grid below. On each format's page, variants are grouped into labeled sections such as **Document Structure** and **Text Formatting**, so you can pick the exact scenario your app needs to handle.",
      },
      {
        question: "What if the specific document variant I need isn't available?",
        answer:
          "If a variant you need isn't available yet, submit a request using the **file request form** on this page. New variants are added regularly based on real developer and QA requests.",
      },
    ],
    [
      {
        question: "Can I get CSV files for data parsing and spreadsheet import tests?",
        answer:
          "Yes. CSV variants include different delimiters, quoted fields, Unicode content, and malformed versions — useful for stress-testing how your parser or spreadsheet importer handles edge cases and bad input.",
      },
      {
        question: "Are there sample files for testing document formatting edge cases?",
        answer:
          "Yes. DOCX, RTF, and PDF variants include edge-case formatting like embedded tables, images, headers/footers, and special characters — useful for testing conversion tools and rendering engines. [RTF](https://en.wikipedia.org/wiki/Rich_Text_Format), for instance, is still widely supported for cross-platform formatted-text exchange today.",
      },
      {
        question: "Are there corrupt or zero-byte document files for testing error handling?",
        answer:
          "Yes. We include intentionally malformed files, zero-byte (empty) files, and files with invalid headers across several formats — designed to help you verify that your app **fails gracefully** instead of crashing or hanging.",
      },
    ],
    "document",
  ),

  images: buildCategoryFaqsData(
    "Answers to common questions about testing with image files",
    [
      {
        question: "What image formats are available for download?",
        answer:
          "We offer **11 image formats**, including PNG, JPG, GIF, WebP, SVG, BMP, TIFF, TGA, HDR, EPS, and WBMP — covering both raster and vector formats for testing image pipelines.",
      },
      {
        question: "How do I find the right image variant for my test case?",
        answer:
          "Use the search bar in the hero to jump straight to a format by name, or browse the extensions grid below. On each format's page, variants are grouped into labeled sections such as **Resolution**, **DPI**, and **Color Profile**, so you can pick the exact scenario your app needs to handle.",
      },
      {
        question: "What if the specific image variant I need isn't available?",
        answer:
          "If a variant you need isn't available yet, submit a request using the **file request form** on this page. New variants are added regularly based on real developer and QA requests.",
      },
    ],
    [
      {
        question: "What image variants are available for testing transparency and color profiles?",
        answer:
          "Image variants include transparency (alpha channel), [CMYK](https://en.wikipedia.org/wiki/CMYK_color_model) color space for print pipeline testing, high-DPI/Retina-resolution files, and grayscale — across formats like PNG, JPEG, and WebP.",
      },
      {
        question: "Can I test vector formats like SVG and EPS?",
        answer:
          "Yes. SVG and EPS variants are available for testing vector rendering, scaling, and print pipelines — alongside raster formats like PNG, JPG, BMP, and TIFF for pixel-based testing.",
      },
      {
        question: "Are there corrupt or zero-byte image files for testing error handling?",
        answer:
          "Yes. We include intentionally malformed files, zero-byte (empty) files, and files with invalid headers — specifically designed to help you verify that your app **fails gracefully** instead of crashing or hanging.",
      },
    ],
    "image",
  ),

  archives: buildCategoryFaqsData(
    "Answers to common questions about testing with archive files",
    [
      {
        question: "What archive formats are available for download?",
        answer:
          "We offer **6 archive formats**, including ZIP, RAR, 7ZIP, TAR, TAR.GZ, and TAR.BZ — covering the most common compression formats used for file distribution and backups.",
      },
      {
        question: "How do I find the right archive variant for my test case?",
        answer:
          "Use the search bar in the hero to jump straight to a format by name, or browse the extensions grid below. On each format's page, variants are grouped into labeled sections such as **Compression** and **Content Type**, so you can pick the exact scenario your app needs to handle.",
      },
      {
        question: "What if the specific archive variant I need isn't available?",
        answer:
          "If a variant you need isn't available yet, submit a request using the **file request form** on this page. New variants are added regularly based on real developer and QA requests.",
      },
    ],
    [
      {
        question: "Can I test different compression levels and archive sizes?",
        answer:
          "Yes. Archive variants range from small test archives to large multi-file bundles, useful for stress-testing extraction speed, memory usage, and upload/download handling.",
      },
      {
        question: "Which compression algorithms do the archive variants use?",
        answer:
          "Variants cover ZIP's [DEFLATE](https://en.wikipedia.org/wiki/DEFLATE) compression, [7-Zip](https://en.wikipedia.org/wiki/7-Zip)'s LZMA, RAR's proprietary format, and gzip/bzip2-based TAR variants — useful for testing extraction libraries across different compression algorithms.",
      },
      {
        question: "Are there corrupt or zero-byte archive files for testing error handling?",
        answer:
          "Yes. We include intentionally malformed files, zero-byte (empty) files, and files with invalid headers — specifically designed to help you verify that your app **fails gracefully** instead of crashing or hanging.",
      },
    ],
    "archive",
  ),

  others: buildCategoryFaqsData(
    "Answers to common questions about testing with these files",
    [
      {
        question: "What file formats are available in the Others category?",
        answer:
          "This category covers formats that don't fit neatly elsewhere — currently **JSON**, **XML**, and the font formats **OTF** and **TTF** — with more added over time based on developer requests.",
      },
      {
        question: "How do I find the right variant for my test case?",
        answer:
          "Use the search bar in the hero to jump straight to a format by name, or browse the extensions grid below. On each format's page, variants are grouped into labeled sections with a short description of the exact scenario each one covers, so you can pick the right file without guessing.",
      },
      {
        question: "What if the specific variant I need isn't available?",
        answer:
          "If a variant you need isn't available yet, submit a request using the **file request form** on this page. New variants are added regularly based on real developer and QA requests.",
      },
    ],
    [
      {
        question: "Can I get sample JSON or XML files for data parsing tests?",
        answer:
          "Yes. Structured data variants include JSON with nested objects, arrays, and edge-case values, and XML with namespaces and schema variations — plus malformed versions to test how your parser handles bad input.",
      },
      {
        question: "Are TTF and OTF font files suitable for testing font-loading and rendering?",
        answer:
          "Yes. [TrueType (TTF)](https://en.wikipedia.org/wiki/TrueType) and [OpenType (OTF)](https://en.wikipedia.org/wiki/OpenType) font variants are useful for testing font-loading pipelines, glyph rendering, and web font embedding via `@font-face`.",
      },
      {
        question: "Are there malformed or corrupt files for testing error handling?",
        answer:
          "Yes. We include intentionally malformed JSON/XML files and invalid font files — designed to help you verify that your parser or renderer **fails gracefully** instead of crashing.",
      },
    ],
    "miscellaneous",
  ),
};
