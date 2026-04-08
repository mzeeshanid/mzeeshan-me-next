import {
  FaBolt,
  FaCodeBranch,
  FaDownload,
  FaFileImage,
  FaLock,
  FaShuffle,
} from "react-icons/fa6";
import type {
  HeroContent,
  ImageConversionRoute,
  ImageFormatConverterDetailData,
  ImageFormatConverterIndexData,
} from "./types";
import {
  getImageFormatLabel,
  imageConversionRoutes,
} from "./imageConversionRoutes";

const sharedHeroContent: HeroContent = {
  badge: "Browser Tool",
  title: "Image Format Converter",
  description:
    "Pick a source and target format, then convert images directly in your browser without uploading them to a server.",
  browserOnlyTitle: "Runs entirely in your browser",
  browserOnlyDescription:
    "Your image stays on your device. Nothing is uploaded to a server during conversion.",
  selectSourceLabel: "From",
  selectTargetLabel: "To",
  selectPlaceholder: "Choose format",
  sourceHelp: "Select the format of the image you have.",
  targetHelp: "Select the format you want to download.",
  uploadTitle: "Upload image",
  uploadDescription:
    "Drop an image here or choose one from your device to convert it locally.",
  uploadHint: "No server upload. Conversion happens in the browser.",
  originalTitle: "Original image",
  resultTitle: "Converted image",
  convertButtonLabel: "Convert Image",
  convertButtonLoadingLabel: "Converting...",
  downloadButtonLabel: "Download Converted Image",
  unavailablePairMessage:
    "This conversion pair is not available yet. Try a related format or check a coming soon page.",
  choosePairMessage: "Choose a source and target format to start.",
  comingSoonMessage:
    "This conversion page is planned, but the browser conversion flow is not live yet.",
  qualityLabel: "Quality",
  qualityHint: "Lower quality can reduce file size for JPG and WebP output.",
  transparencyNote:
    "JPG output does not support transparency. Transparent areas will be flattened during conversion.",
  browserSupportWarning:
    "Your browser may not support this format. The output may not work in all browsers.",
};

export const imageFormatConverterIndexData: ImageFormatConverterIndexData = {
  header: {
    title: "Image Format Converter",
    subtitle: "Convert images locally in your browser.",
    icon: "/assets/image_format_converter_icon.png",
    alt: "Image Format Converter icon",
    rounded: false,
  },
  meta: {
    title: "Image Format Converter",
    description:
      "Convert image formats in your browser without uploading files to a server. Switch between WebP, PNG, JPG, and more from one reusable conversion workflow.",
    url: "/tools/image-format-converter",
    image: {
      src: "/assets/image_format_converter_icon.png",
      type: "image/png",
    },
  },
  hero: sharedHeroContent,
  supported: {
    header: {
      badge: "Supported",
      title: "Choose a conversion path",
      description:
        "Start from the cluster hub, then jump into the exact image conversion page you need.",
    },
  },
  browserSupport: {
    header: {
      badge: "Browser Support",
      title: "Image format browser compatibility",
      description:
        "All formats supported by this converter and their browser compatibility. Click any browser to see more details.",
    },
  },
  intro: {
    header: {
      badge: "About",
      title: "What image conversion does",
      description:
        "Image conversion changes a file from one format into another so it is easier to use in browsers, apps, email, design workflows, and publishing systems.",
    },
    cards: [
      {
        title: "Format-specific compatibility",
        description:
          "Some platforms still prefer PNG or JPG, while others benefit from WebP compression. Converting lets you fit the requirements of the destination system.",
      },
      {
        title: "Smaller file sizes",
        description:
          "Choosing the right format can make images lighter to load and easier to share without changing the actual content of the image.",
      },
      {
        title: "Browser-first workflow",
        description:
          "This tool family is designed for quick, local conversion without pushing images through a backend service.",
      },
    ],
  },
  benefits: {
    header: {
      badge: "Why Convert",
      title: "Why image format conversion matters",
      description:
        "Different formats solve different problems. A good converter helps you move between them quickly and safely.",
    },
    cards: [
      {
        title: "Better publishing flexibility",
        description:
          "Convert to the exact format your CMS, store listing, app workflow, or client handoff requires.",
      },
      {
        title: "Privacy-friendly",
        description:
          "Because the conversion runs in your browser, you do not need to upload private assets just to re-export them.",
      },
      {
        title: "Cleaner workflow",
        description:
          "Use one consistent interface for multiple conversion pages instead of hunting for separate utilities every time.",
      },
    ],
  },
  features: {
    header: {
      badge: "Features",
      title: "Built for quick browser-side conversion",
      description:
        "The cluster shares one reusable workflow, then adapts the output to the selected source and target format.",
    },
    items: [
      {
        icon: FaShuffle,
        title: "Switch formats from the hero",
        description:
          "Use the source and target dropdowns to jump to another conversion page without leaving the tool family.",
      },
      {
        icon: FaLock,
        title: "No server upload",
        description:
          "Conversion happens locally in the browser so your image file stays on your device.",
      },
      {
        icon: FaFileImage,
        title: "Preview before download",
        description:
          "Inspect the original file and the converted output before saving the result.",
      },
      {
        icon: FaDownload,
        title: "Direct download",
        description:
          "Download the converted file immediately after processing completes.",
      },
      {
        icon: FaBolt,
        title: "Fast local processing",
        description:
          "The conversion runs on your device, so there is no upload queue or remote processing delay.",
      },
    ],
  },
  comparison: {
    header: {
      badge: "Comparison",
      title: "Compared with generic file converters",
      description:
        "This cluster focuses on quick browser-based image conversion with privacy and route-level search intent in mind.",
    },
    columns: [
      { key: "feature", title: "Feature" },
      { key: "thisTool", title: "This tool" },
      { key: "convertio", title: "Convertio", link: "https://convertio.co/" },
      { key: "generic", title: "Generic converters" },
    ],
    rows: [
      {
        feature: { text: "SEO focus" },
        thisTool: {
          text: "Dedicated conversion pages for specific source/target pairs",
        },
        convertio: {
          text: "Strong single-conversion landing pages, but built around server-upload workflows",
        },
        generic: {
          text: "Often one broad page covering many file types at once",
        },
      },
      {
        feature: { text: "Privacy signal" },
        thisTool: {
          text: "Browser-based, no upload positioning is part of the core message",
        },
        convertio: {
          text: "Upload-first flow with cloud conversion and download",
        },
        generic: { text: "May rely on backend upload queues" },
      },
      {
        feature: { text: "Internal linking" },
        thisTool: { text: "Cluster root plus related conversion pages" },
        convertio: {
          text: "Related conversion coverage, but less tailored to one site-wide conversion cluster narrative",
        },
        generic: { text: "Less focused route relationships" },
      },
      {
        feature: { text: "Best fit" },
        thisTool: {
          text: "People who want private in-browser conversion and conversion-specific reading sections",
        },
        convertio: {
          text: "People who want a familiar hosted conversion service with broad format coverage",
        },
        generic: {
          text: "People who just need a quick file conversion without much context",
        },
      },
    ],
  },
  relatedArticle: {
    badge: "Learn More",
    title: "Related Article",
    desc: "This placeholder article can be swapped for the dedicated image conversion guide later.",
  },
  faqs: {
    header: {
      badge: "FAQ",
      title: "Common questions",
      description:
        "These answers cover the cluster root. Each detailed conversion page also has its own targeted FAQ set.",
    },
    items: [
      {
        question: "Does this upload my image to a server?",
        answer:
          "No. The image is processed locally in your browser. The file is not uploaded to a backend during conversion.",
      },
      {
        question: "Why have separate pages for each conversion?",
        answer:
          "Dedicated conversion pages are easier to search, easier to link internally, and easier to tailor for each format pair.",
      },
      {
        question: "Can I switch between conversions without going back?",
        answer:
          "Yes. The hero dropdowns let you jump directly to another image conversion page in the same cluster.",
      },
    ],
  },
};

const sharedComparison = {
  header: {
    badge: "Comparison",
    title: "Compared with generic image converters",
    description:
      "The page is built for this exact conversion path instead of burying it inside a giant all-in-one file utility.",
  },
  columns: [
    { key: "feature", title: "Feature" },
    { key: "thisTool", title: "This tool" },
    { key: "convertio", title: "Convertio", link: "https://convertio.co/" },
    { key: "generic", title: "Generic converters" },
  ],
  rows: [
    {
      feature: { text: "Intent match" },
      thisTool: {
        text: "Focused on a single conversion pair with clearer guidance",
      },
      convertio: {
        text: "Strong pair-level coverage, but with a more utility-first flow",
      },
      generic: { text: "Broader coverage but less tailored flow" },
    },
    {
      feature: { text: "Privacy messaging" },
      thisTool: {
        text: "Explicit browser-side processing and no server upload",
      },
      convertio: { text: "Upload and convert model is the normal expectation" },
      generic: {
        text: "Often less prominent or not the main value proposition",
      },
    },
    {
      feature: { text: "Navigation" },
      thisTool: { text: "Related conversions are grouped by source format" },
      convertio: {
        text: "Strong cross-links, but less centered on a reusable on-site conversion cluster",
      },
      generic: { text: "Usually a flat tool list" },
    },
    {
      feature: { text: "Best fit" },
      thisTool: {
        text: "Users who want private local conversion plus contextual help for this exact format pair",
      },
      convertio: {
        text: "Users who want a mainstream hosted converter across many formats",
      },
      generic: {
        text: "Users who just need a broad converter and do not care about workflow detail",
      },
    },
  ],
};

export const webpToPngData: ImageFormatConverterDetailData = {
  routeSlug: "webp-to-png",
  header: {
    title: "WebP to PNG",
    subtitle: "Convert WebP files to PNG locally in your browser.",
    icon: "/assets/image_format_converter_icon.png",
    alt: "WebP to PNG icon",
    rounded: false,
  },
  meta: {
    title: "WebP to PNG Converter",
    description:
      "Convert WebP to PNG in your browser without uploading images to a server. Preview the file, convert it locally, and download the PNG instantly.",
    url: "/tools/image-format-converter/webp-to-png",
    image: {
      src: "/assets/image_format_converter_icon.png",
      type: "image/png",
    },
  },
  hero: {
    ...sharedHeroContent,
    badge: "WebP Converter",
    title: "WebP to PNG Converter",
    description:
      "Convert WebP images to PNG directly in your browser and keep the workflow private, fast, and easy to preview.",
  },
  intro: {
    header: {
      badge: "About",
      title: "What WebP to PNG does",
      description:
        "This conversion turns a WebP image into a PNG file when you need broader compatibility, easier editing, or a lossless output format.",
    },
    cards: [
      {
        title: "Useful for compatibility",
        description:
          "PNG still works smoothly across design tools, older workflows, and systems that do not expect WebP input.",
      },
      {
        title: "Lossless output",
        description:
          "PNG is a strong choice when you want a high-quality export for editing, screenshots, or repeated use.",
      },
      {
        title: "Private workflow",
        description:
          "The conversion happens in the browser, so you do not need to upload product images, drafts, or private assets.",
      },
    ],
  },
  benefits: {
    header: {
      badge: "Benefits",
      title: "Why convert WebP to PNG",
      description:
        "WebP is efficient for delivery, but PNG can be easier to reuse in editing and publishing workflows.",
    },
    cards: [
      {
        title: "Works well in editors",
        description:
          "PNG is often easier to drop into graphics tools, slide decks, and asset handoff flows.",
      },
      {
        title: "Predictable output",
        description:
          "PNG gives you a stable image format for re-export and versioning.",
      },
      {
        title: "No sign-up or upload",
        description:
          "Use the converter instantly without sending files to a server.",
      },
    ],
  },
  useCases: {
    header: {
      badge: "Use Cases",
      title: "When WebP to PNG helps",
      description:
        "This conversion is especially helpful when a downloaded WebP image does not fit the next step in your workflow.",
    },
    items: [
      {
        icon: FaFileImage,
        title: "Design handoff",
        description:
          "Turn downloaded WebP assets into PNG before handing them to a designer or client.",
      },
      {
        icon: FaCodeBranch,
        title: "CMS upload fixes",
        description:
          "Convert to PNG when a publishing system expects a more traditional image format.",
      },
      {
        icon: FaBolt,
        title: "Quick screenshot reuse",
        description:
          "Move a WebP image into a lossless format for mockups, docs, or product notes.",
      },
      {
        icon: FaDownload,
        title: "Archive-ready asset export",
        description:
          "Create a PNG version when you want to keep a dependable copy for future reuse and sharing.",
      },
    ],
  },
  features: {
    header: {
      badge: "Features",
      title: "Made for one clear task",
      description:
        "The page keeps the flow simple: preview, convert in-browser, and download the PNG result.",
    },
    items: [
      {
        icon: FaLock,
        title: "Local conversion",
        description:
          "The browser handles the file so nothing is uploaded to a backend.",
      },
      {
        icon: FaShuffle,
        title: "Quick format switching",
        description:
          "Jump from WebP to PNG into related conversions like WebP to JPG from the same hero.",
      },
      {
        icon: FaDownload,
        title: "Direct download",
        description: "Save the PNG immediately after conversion completes.",
      },
      {
        icon: FaFileImage,
        title: "Preview-led workflow",
        description:
          "Check the original and converted output before downloading the final PNG.",
      },
    ],
  },
  comparison: sharedComparison,
  relatedConversions: {
    header: {
      badge: "Related",
      title: "Related image conversions",
      description:
        "Need a different WebP output? Jump to another format without leaving the image conversion cluster.",
    },
  },
  relatedArticle: {
    badge: "Learn More",
    title: "Related Article",
    desc: "Placeholder article for now. This can point to the dedicated image conversion article later.",
  },
  faqs: {
    header: {
      badge: "FAQ",
      title: "WebP to PNG questions",
      description:
        "Common questions about WebP to PNG conversion, privacy, and browser-based processing.",
    },
    items: [
      {
        question: "Does this upload my WebP image?",
        answer:
          "No. The conversion is handled inside the browser and the image is not uploaded to a server.",
      },
      {
        question: "Why use PNG instead of WebP?",
        answer:
          "PNG can be easier to reuse in editors, documentation, and workflows that do not prefer WebP input.",
      },
      {
        question: "Can I convert another WebP format from here?",
        answer:
          "Yes. Use the related conversions section or the source/target dropdowns in the hero.",
      },
    ],
  },
};

export const webpToJpgData: ImageFormatConverterDetailData = {
  routeSlug: "webp-to-jpg",
  header: {
    title: "WebP to JPG",
    subtitle: "Convert WebP images to JPG in your browser.",
    icon: "/assets/image_format_converter_icon.png",
    alt: "WebP to JPG icon",
    rounded: false,
  },
  meta: {
    title: "WebP to JPG Converter",
    description:
      "Convert WebP to JPG in your browser with no server upload. Adjust quality, preview the result, and download the JPG instantly.",
    url: "/tools/image-format-converter/webp-to-jpg",
    image: {
      src: "/assets/image_format_converter_icon.png",
      type: "image/png",
    },
  },
  hero: {
    ...sharedHeroContent,
    badge: "WebP Converter",
    title: "WebP to JPG Converter",
    description:
      "Create a JPG version of a WebP image directly in your browser, with quality control and no server upload.",
  },
  intro: {
    header: {
      badge: "About",
      title: "What WebP to JPG does",
      description:
        "This conversion turns a WebP file into a JPG when you need a format that fits older tools, email workflows, or looser file size targets.",
    },
    cards: [
      {
        title: "Broad compatibility",
        description:
          "JPG still works well across apps, websites, and document workflows.",
      },
      {
        title: "Helpful for email and docs",
        description:
          "JPG can be easier to reuse in everyday communication and lightweight export workflows.",
      },
      {
        title: "Client-side privacy",
        description: "The image stays in the browser during conversion.",
      },
    ],
  },
  benefits: {
    header: {
      badge: "Benefits",
      title: "Why convert WebP to JPG",
      description:
        "JPG is still one of the most commonly accepted formats for sharing and publishing images quickly.",
    },
    cards: [
      {
        title: "Smaller sharing format",
        description:
          "JPG can be a practical export format when you want broad support and adjustable quality.",
      },
      {
        title: "Works in more legacy tools",
        description:
          "Some older tools and upload flows still behave better with JPG than WebP.",
      },
      {
        title: "One-step export",
        description:
          "Convert and download in the browser without sending files away.",
      },
    ],
  },
  useCases: {
    header: {
      badge: "Use Cases",
      title: "When WebP to JPG makes sense",
      description:
        "This path is useful when the destination cares more about broad compatibility than WebP-specific compression gains.",
    },
    items: [
      {
        icon: FaDownload,
        title: "Email attachments",
        description:
          "Export a JPG when you need a more familiar format for quick sharing.",
      },
      {
        icon: FaFileImage,
        title: "Content uploads",
        description:
          "Use JPG for tools that still treat WebP as a second-class format.",
      },
      {
        icon: FaBolt,
        title: "Fast browser export",
        description:
          "Convert and download a JPG without leaving the current page.",
      },
      {
        icon: FaCodeBranch,
        title: "Legacy workflow support",
        description:
          "Create a JPG when an older app, upload flow, or client process does not work well with WebP.",
      },
    ],
  },
  features: {
    header: {
      badge: "Features",
      title: "Focused on browser-side export",
      description:
        "Adjust quality, convert locally, and download the result without a backend dependency.",
    },
    items: [
      {
        icon: FaLock,
        title: "No upload needed",
        description: "The file stays on your device throughout the conversion.",
      },
      {
        icon: FaShuffle,
        title: "Switch to related WebP outputs",
        description:
          "Jump to WebP to PNG or planned WebP conversions from the same hero.",
      },
      {
        icon: FaDownload,
        title: "Download instantly",
        description: "Save the JPG as soon as the conversion finishes.",
      },
      {
        icon: FaFileImage,
        title: "Preview before save",
        description:
          "See the converted JPG in the browser before downloading it.",
      },
    ],
  },
  comparison: sharedComparison,
  relatedConversions: {
    header: {
      badge: "Related",
      title: "Related image conversions",
      description:
        "Explore other WebP outputs and closely related conversion pages from the same cluster.",
    },
  },
  relatedArticle: {
    badge: "Learn More",
    title: "Related Article",
    desc: "Placeholder article for now. Swap this when the dedicated conversion article is ready.",
  },
  faqs: {
    header: {
      badge: "FAQ",
      title: "WebP to JPG questions",
      description:
        "Answers about JPG output quality, transparency, and browser-side processing.",
    },
    items: [
      {
        question: "Does JPG keep transparency?",
        answer:
          "No. JPG does not support transparency, so transparent areas are flattened during conversion.",
      },
      {
        question: "Can I control JPG quality?",
        answer:
          "Yes. This page includes a quality control so you can balance file size and image fidelity.",
      },
      {
        question: "Does conversion happen in the browser?",
        answer:
          "Yes. The file is processed locally in your browser without server upload.",
      },
    ],
  },
};

export const pngToWebpData: ImageFormatConverterDetailData = {
  routeSlug: "png-to-webp",
  header: {
    title: "PNG to WebP",
    subtitle: "Convert PNG images to WebP in your browser.",
    icon: "/assets/image_format_converter_icon.png",
    alt: "PNG to WebP icon",
    rounded: false,
  },
  meta: {
    title: "PNG to WebP Converter",
    description:
      "Convert PNG to WebP in your browser without uploading your image to a server. Preview, optimize, and download the WebP output instantly.",
    url: "/tools/image-format-converter/png-to-webp",
    image: {
      src: "/assets/image_format_converter_icon.png",
      type: "image/png",
    },
  },
  hero: {
    ...sharedHeroContent,
    badge: "PNG Converter",
    title: "PNG to WebP Converter",
    description:
      "Convert PNG files to WebP locally in your browser when you want a lighter image format for delivery and publishing.",
  },
  intro: {
    header: {
      badge: "About",
      title: "What PNG to WebP does",
      description:
        "This conversion takes a PNG file and creates a WebP version that can be more efficient for modern web delivery and lighter downloads.",
    },
    cards: [
      {
        title: "Smaller web delivery",
        description:
          "WebP is often useful when you want a more web-friendly output than PNG for everyday publishing.",
      },
      {
        title: "Fast browser workflow",
        description:
          "Convert locally, review the output, and download without a server round trip.",
      },
      {
        title: "Same cluster navigation",
        description:
          "Jump to another image format page from the same hero if WebP is not the right target.",
      },
    ],
  },
  benefits: {
    header: {
      badge: "Benefits",
      title: "Why convert PNG to WebP",
      description:
        "This conversion is useful when you want a more delivery-friendly format while keeping the workflow entirely in the browser.",
    },
    cards: [
      {
        title: "Useful for modern sites",
        description:
          "WebP is a practical target when you want lighter images for the web.",
      },
      {
        title: "Quality control",
        description:
          "Use output quality settings to tune the balance between file size and fidelity.",
      },
      {
        title: "No backend dependency",
        description:
          "Process the file locally without uploading artwork or screenshots to a conversion service.",
      },
    ],
  },
  useCases: {
    header: {
      badge: "Use Cases",
      title: "When PNG to WebP helps",
      description:
        "This conversion is especially useful when your source is a PNG and the destination is a web-facing surface.",
    },
    items: [
      {
        icon: FaFileImage,
        title: "Website assets",
        description:
          "Prepare PNG-originated assets for web delivery in a more compact format.",
      },
      {
        icon: FaBolt,
        title: "Quick optimization",
        description: "Create a lighter export without leaving the browser.",
      },
      {
        icon: FaDownload,
        title: "Shareable output",
        description: "Download the WebP file immediately after conversion.",
      },
      {
        icon: FaCodeBranch,
        title: "Performance-focused publishing",
        description:
          "Generate a WebP version before moving images into pages that care about lighter payloads.",
      },
    ],
  },
  features: {
    header: {
      badge: "Features",
      title: "Focused on simple conversion",
      description:
        "Upload a PNG, convert it locally, and download the WebP result with no extra setup.",
    },
    items: [
      {
        icon: FaLock,
        title: "Private conversion",
        description: "The image remains on your device during processing.",
      },
      {
        icon: FaShuffle,
        title: "Format switching in hero",
        description:
          "Use the dropdowns to jump from PNG to another image format path.",
      },
      {
        icon: FaDownload,
        title: "Immediate result",
        description: "Preview and download the converted file right away.",
      },
      {
        icon: FaBolt,
        title: "Quick browser workflow",
        description:
          "Convert the image locally without waiting for server-side processing.",
      },
    ],
  },
  comparison: sharedComparison,
  relatedConversions: {
    header: {
      badge: "Related",
      title: "Related image conversions",
      description:
        "Explore other conversions connected to PNG and WebP within the same cluster.",
    },
  },
  relatedArticle: {
    badge: "Learn More",
    title: "Related Article",
    desc: "Placeholder article for now. Replace this with the dedicated image conversion article later.",
  },
  faqs: {
    header: {
      badge: "FAQ",
      title: "PNG to WebP questions",
      description:
        "Answers about WebP output, quality controls, and local browser processing.",
    },
    items: [
      {
        question: "Does PNG to WebP happen in the browser?",
        answer:
          "Yes. The conversion is handled locally in the browser without uploading the file to a server.",
      },
      {
        question: "Can I tune WebP quality?",
        answer: "Yes. WebP output supports quality adjustment on this page.",
      },
      {
        question: "Why convert PNG to WebP?",
        answer:
          "WebP is often more useful when you want a lighter image format for web-facing content.",
      },
    ],
  },
};

export const jpgToPngData: ImageFormatConverterDetailData = {
  routeSlug: "jpg-to-png",
  header: {
    title: "JPG to PNG",
    subtitle: "Convert JPG images to PNG locally in your browser.",
    icon: "/assets/image_format_converter_icon.png",
    alt: "JPG to PNG icon",
    rounded: false,
  },
  meta: {
    title: "JPG to PNG Converter",
    description:
      "Convert JPG to PNG in your browser without uploading your image to a server. Preview the file and download a PNG version instantly.",
    url: "/tools/image-format-converter/jpg-to-png",
    image: {
      src: "/assets/image_format_converter_icon.png",
      type: "image/png",
    },
  },
  hero: {
    ...sharedHeroContent,
    badge: "JPG Converter",
    title: "JPG to PNG Converter",
    description:
      "Turn a JPG into PNG directly in your browser when you need a stable format for editing, documentation, or repeated export.",
  },
  intro: {
    header: {
      badge: "About",
      title: "What JPG to PNG does",
      description:
        "This conversion creates a PNG version of a JPG image for workflows that prefer a more editing-friendly or lossless target format.",
    },
    cards: [
      {
        title: "Useful for editing",
        description:
          "PNG can be easier to reuse in design tools and documentation workflows after the original JPG is received.",
      },
      {
        title: "Broader export workflow",
        description:
          "Converting to PNG can simplify reuse in systems that prefer PNG uploads or handoff.",
      },
      {
        title: "Local by default",
        description: "The file stays in the browser throughout the conversion.",
      },
    ],
  },
  benefits: {
    header: {
      badge: "Benefits",
      title: "Why convert JPG to PNG",
      description:
        "JPG is common for delivery, but PNG can be more convenient for downstream editing and structured asset flows.",
    },
    cards: [
      {
        title: "Editing-friendly target",
        description:
          "PNG is a comfortable handoff format for presentations, docs, and design tools.",
      },
      {
        title: "Predictable browser conversion",
        description:
          "Convert directly without adding a backend upload dependency.",
      },
      {
        title: "Cluster navigation",
        description:
          "Switch to another image format conversion if PNG is not the right target.",
      },
    ],
  },
  useCases: {
    header: {
      badge: "Use Cases",
      title: "When JPG to PNG helps",
      description:
        "This route is helpful when the source is already JPG but the next step in the workflow expects PNG.",
    },
    items: [
      {
        icon: FaFileImage,
        title: "Docs and mockups",
        description:
          "Convert a JPG screenshot or reference asset into PNG before dropping it into documentation.",
      },
      {
        icon: FaCodeBranch,
        title: "Asset handoff",
        description:
          "Produce a PNG version when a team or tool expects PNG-based inputs.",
      },
      {
        icon: FaDownload,
        title: "Quick save",
        description: "Convert and download the PNG in one browser-based step.",
      },
      {
        icon: FaBolt,
        title: "Browser-side cleanup",
        description:
          "Make a quick PNG copy of a JPG without routing the file through a third-party upload service.",
      },
    ],
  },
  features: {
    header: {
      badge: "Features",
      title: "Simple JPG to PNG flow",
      description:
        "Upload, convert locally, preview, and download the result without server-side processing.",
    },
    items: [
      {
        icon: FaLock,
        title: "No upload required",
        description: "The browser handles the full conversion locally.",
      },
      {
        icon: FaShuffle,
        title: "Easy conversion switching",
        description:
          "Move into another format path from the dropdowns without leaving the cluster.",
      },
      {
        icon: FaDownload,
        title: "Direct PNG download",
        description: "Save the converted file immediately after processing.",
      },
      {
        icon: FaFileImage,
        title: "Preview while converting",
        description:
          "Compare the uploaded JPG and the resulting PNG inside the same hero.",
      },
    ],
  },
  comparison: sharedComparison,
  relatedConversions: {
    header: {
      badge: "Related",
      title: "Related image conversions",
      description:
        "Browse closely related format pairs from the same image conversion family.",
    },
  },
  relatedArticle: {
    badge: "Learn More",
    title: "Related Article",
    desc: "Placeholder article for now. Swap it with the dedicated JPG/PNG conversion article later.",
  },
  faqs: {
    header: {
      badge: "FAQ",
      title: "JPG to PNG questions",
      description:
        "Answers about local conversion, compatibility, and PNG output.",
    },
    items: [
      {
        question: "Does JPG to PNG restore transparency?",
        answer:
          "No. Converting a JPG to PNG changes the container format, but it does not recreate transparency that was not present in the original image.",
      },
      {
        question: "Is the file uploaded to a server?",
        answer: "No. The conversion runs entirely in your browser.",
      },
      {
        question: "Why use PNG as the target?",
        answer:
          "PNG can be more convenient for editing, documentation, and workflows that expect PNG files.",
      },
    ],
  },
};

const buildGenericDetailData = (
  route: ImageConversionRoute,
): ImageFormatConverterDetailData => {
  const sourceLabel = getImageFormatLabel(route.sourceFormat);
  const targetLabel = getImageFormatLabel(route.targetFormat);
  const conversionLabel = `${sourceLabel} to ${targetLabel}`;

  return {
    ...webpToPngData,
    routeSlug: route.slug,
    header: {
      ...webpToPngData.header,
      title: conversionLabel,
      subtitle: `Convert ${sourceLabel} images to ${targetLabel} in your browser.`,
    },
    meta: {
      ...webpToPngData.meta,
      title: `${conversionLabel} Converter`,
      description: `Convert ${sourceLabel} to ${targetLabel} in your browser without uploading images to a server. Batch convert, resize, and download ${targetLabel} files locally.`,
      url: route.path,
    },
    hero: {
      ...sharedHeroContent,
      badge: "Browser Image Converter",
      title: `${conversionLabel} Converter`,
      description: `Convert ${sourceLabel} images into ${targetLabel} files locally in your browser. Your images stay on your device while the conversion runs.`,
    },
    intro: {
      header: {
        badge: "Overview",
        title: `Convert ${sourceLabel} into ${targetLabel}`,
        description: `Use this converter when you need a ${targetLabel} copy of a ${sourceLabel} image for compatibility, publishing, design, or handoff workflows.`,
      },
      cards: [
        {
          title: "Browser-based",
          description:
            "The image is decoded and encoded locally in your browser without a server upload.",
        },
        {
          title: "Batch friendly",
          description: `Convert multiple ${sourceLabel} files to ${targetLabel} and download the successful results together.`,
        },
        {
          title: "Resize optional",
          description:
            "Keep the original size or resize by width or height while preserving aspect ratio.",
        },
      ],
    },
    benefits: {
      header: {
        badge: "Benefits",
        title: `Why convert ${sourceLabel} to ${targetLabel}`,
        description: `${targetLabel} can be useful when another app, workflow, or publishing destination expects that image format.`,
      },
      cards: [
        {
          title: "Better compatibility",
          description: `Create ${targetLabel} files for tools and workflows that do not accept ${sourceLabel}.`,
        },
        {
          title: "Local privacy",
          description:
            "Keep sensitive images on your device during conversion.",
        },
        {
          title: "Batch export",
          description: `Process several ${sourceLabel} files at once instead of converting them one by one.`,
        },
      ],
    },
    useCases: {
      header: {
        badge: "Use Cases",
        title: `When to use ${conversionLabel}`,
        description: `Common cases where a ${targetLabel} output can fit better than the original ${sourceLabel} file.`,
      },
      items: [
        {
          icon: FaFileImage,
          title: "Format compatibility",
          description: `Export ${targetLabel} files for tools or platforms that prefer ${targetLabel}.`,
        },
        {
          icon: FaCodeBranch,
          title: "Asset handoff",
          description: `Create a ${targetLabel} version when a team, CMS, or app pipeline expects that format.`,
        },
        {
          icon: FaDownload,
          title: "Quick local save",
          description: `Convert and download ${targetLabel} results in one browser-based batch.`,
        },
        {
          icon: FaBolt,
          title: "Browser-side cleanup",
          description: `Make a ${targetLabel} copy of ${sourceLabel} files without sending them through a third-party upload service.`,
        },
      ],
    },
    features: {
      ...webpToPngData.features,
      header: {
        badge: "Features",
        title: `Simple ${conversionLabel} flow`,
        description:
          "Upload, convert locally, optionally resize, and download the result without server-side processing.",
      },
    },
    faqs: {
      header: {
        badge: "FAQ",
        title: `${conversionLabel} questions`,
        description:
          "Answers about local conversion, compatibility, and output behavior.",
      },
      items: [
        {
          question: `Is ${sourceLabel} to ${targetLabel} conversion uploaded to a server?`,
          answer:
            "No. The conversion runs locally in your browser and the image stays on your device.",
        },
        {
          question: `Can I batch convert ${sourceLabel} files to ${targetLabel}?`,
          answer:
            "Yes. You can select up to 20 images and the converter processes them asynchronously with a maximum of 5 active conversions at once.",
        },
        {
          question: "Can I resize while converting?",
          answer:
            "Yes. Enable Resize, enter a width or height, and the other dimension is calculated from the original image aspect ratio.",
        },
      ],
    },
  };
};

const specificDetailDataBySlug: Record<string, ImageFormatConverterDetailData> =
  {
    "webp-to-png": webpToPngData,
    "webp-to-jpg": webpToJpgData,
    "png-to-webp": pngToWebpData,
    "jpg-to-png": jpgToPngData,
    "webp-to-tiff": {
      ...webpToPngData,
      routeSlug: "webp-to-tiff",
      header: {
        ...webpToPngData.header,
        title: "WebP to TIFF",
        subtitle: "Convert WebP images to TIFF in your browser.",
      },
      meta: {
        ...webpToPngData.meta,
        title: "WebP to TIFF Converter",
        description:
          "Convert WebP to TIFF in your browser without uploading images to a server. Batch convert, resize, and download TIFF files locally.",
        url: "/tools/image-format-converter/webp-to-tiff",
      },
      hero: {
        ...sharedHeroContent,
        badge: "Browser Image Converter",
        title: "WebP to TIFF Converter",
        description:
          "Convert WebP images into TIFF files locally in your browser. Your images stay on your device while the conversion runs.",
      },
      intro: {
        header: {
          badge: "Overview",
          title: "Convert WebP into TIFF",
          description:
            "Use this converter when you need a TIFF copy of a WebP image for archival, print, or compatibility workflows.",
        },
        cards: [
          {
            title: "Browser-based",
            description:
              "The image is decoded and encoded locally in your browser without a server upload.",
          },
          {
            title: "Batch friendly",
            description:
              "Convert multiple WebP files to TIFF and download the successful results together.",
          },
          {
            title: "Resize optional",
            description:
              "Keep the original size or resize by width or height while preserving aspect ratio.",
          },
        ],
      },
      benefits: {
        header: {
          badge: "Benefits",
          title: "Why convert WebP to TIFF",
          description:
            "TIFF can be useful when a tool, archive, or print workflow expects a TIFF-style image container.",
        },
        cards: [
          {
            title: "Better compatibility",
            description:
              "Create TIFF files for tools and workflows that do not accept WebP.",
          },
          {
            title: "Local privacy",
            description:
              "Keep sensitive images on your device during conversion.",
          },
          {
            title: "Batch export",
            description:
              "Process several WebP files at once instead of converting them one by one.",
          },
        ],
      },
    },
    "png-to-avif": {
      ...webpToPngData,
      routeSlug: "png-to-avif",
      header: {
        ...webpToPngData.header,
        title: "PNG to AVIF",
        subtitle: "Convert PNG images to AVIF format in your browser.",
      },
      meta: {
        ...webpToPngData.meta,
        title: "PNG to AVIF Converter",
        description:
          "Convert PNG to AVIF in your browser without uploading to a server. AVIF offers superior compression compared to WebP and JPEG.",
        url: "/tools/image-format-converter/png-to-avif",
      },
      hero: {
        ...sharedHeroContent,
        badge: "AVIF Converter",
        title: "PNG to AVIF Converter",
        description:
          "Convert PNG images to AVIF format locally in your browser. AVIF provides excellent compression with high quality.",
      },
      intro: {
        header: {
          badge: "Overview",
          title: "Convert PNG into AVIF",
          description:
            "Use this converter when you need an AVIF copy of a PNG image for better web performance and smaller file sizes.",
        },
        cards: [
          {
            title: "Browser-based",
            description:
              "The image is encoded locally in your browser without a server upload.",
          },
          {
            title: "Superior compression",
            description:
              "AVIF offers better compression than WebP and JPEG at similar quality levels.",
          },
          {
            title: "High quality",
            description:
              "Support for high-quality image encoding with adjustable quality settings.",
          },
        ],
      },
      benefits: {
        header: {
          badge: "Benefits",
          title: "Why convert PNG to AVIF",
          description:
            "AVIF is ideal for web delivery and offers the best compression-to-quality ratio among supported formats.",
        },
        cards: [
          {
            title: "Better compression",
            description:
              "AVIF files are typically 50% smaller than PNG at similar quality.",
          },
          {
            title: "Modern format",
            description:
              "AVIF is the next-generation image format adopted by major browsers.",
          },
          {
            title: "Local privacy",
            description: "Keep your images on your device during conversion.",
          },
        ],
      },
      useCases: {
        header: {
          badge: "Use Cases",
          title: "When PNG to AVIF helps",
          description:
            "PNG to AVIF is especially useful for web performance and modern applications.",
        },
        items: [
          {
            icon: FaBolt,
            title: "Web optimization",
            description: "Create AVIF images for faster website loading times.",
          },
          {
            icon: FaFileImage,
            title: "Modern apps",
            description:
              "Use AVIF for apps and platforms that support the format.",
          },
          {
            icon: FaDownload,
            title: "Archive storage",
            description:
              "Store images in efficient AVIF format for space savings.",
          },
          {
            icon: FaCodeBranch,
            title: "Content delivery",
            description: "Serve AVIF images to users with modern browsers.",
          },
        ],
      },
      features: {
        header: {
          badge: "Features",
          title: "Simple PNG to AVIF conversion",
          description:
            "Upload, convert locally, optionally resize, and download the result without server-side processing.",
        },
        items: [
          {
            icon: FaLock,
            title: "No upload required",
            description: "The browser handles the full conversion locally.",
          },
          {
            icon: FaShuffle,
            title: "Quality control",
            description:
              "Adjust quality settings to balance file size and image fidelity.",
          },
          {
            icon: FaDownload,
            title: "Direct download",
            description:
              "Save the converted file immediately after processing.",
          },
          {
            icon: FaFileImage,
            title: "Preview before save",
            description:
              "See the converted AVIF in the browser before downloading.",
          },
        ],
      },
      comparison: {
        header: {
          badge: "Comparison",
          title: "AVIF vs PNG",
          description:
            "AVIF offers significant advantages over PNG for web use.",
        },
        columns: [
          { key: "feature", title: "Feature" },
          { key: "avif", title: "AVIF" },
          { key: "png", title: "PNG" },
        ],
        rows: [
          {
            feature: { text: "Compression efficiency" },
            avif: { text: "Excellent" },
            png: { text: "Good (lossless)" },
          },
          {
            feature: { text: "Browser support" },
            avif: { text: "96%+" },
            png: { text: "100%" },
          },
          {
            feature: { text: "Best for web" },
            avif: { text: "Yes" },
            png: { text: "Legacy" },
          },
        ],
      },
      faqs: {
        header: {
          badge: "FAQ",
          title: "PNG to AVIF questions",
          description:
            "Answers about AVIF output, browser support, and quality settings.",
        },
        items: [
          {
            question: "Which browsers support AVIF?",
            answer:
              "AVIF is supported in Chrome 79+, Firefox 113+, Safari 16+, and Edge 85+. Approximately 96% of browsers support it.",
          },
          {
            question: "Does AVIF support quality control?",
            answer:
              "Yes. You can adjust the quality setting to balance file size and image fidelity.",
          },
          {
            question: "Is the conversion done in the browser?",
            answer:
              "Yes. The file is processed locally in your browser without server upload.",
          },
        ],
      },
    },
    "jpg-to-avif": {
      ...webpToPngData,
      routeSlug: "jpg-to-avif",
      header: {
        ...webpToPngData.header,
        title: "JPG to AVIF",
        subtitle: "Convert JPG images to AVIF format in your browser.",
      },
      meta: {
        ...webpToPngData.meta,
        title: "JPG to AVIF Converter",
        description:
          "Convert JPG to AVIF in your browser without uploading to a server. AVIF offers superior compression compared to JPEG.",
        url: "/tools/image-format-converter/jpg-to-avif",
      },
      hero: {
        ...sharedHeroContent,
        badge: "AVIF Converter",
        title: "JPG to AVIF Converter",
        description:
          "Convert JPG images to AVIF format locally in your browser. AVIF provides excellent compression with high quality.",
      },
      intro: {
        header: {
          badge: "Overview",
          title: "Convert JPG into AVIF",
          description:
            "Use this converter when you need an AVIF copy of a JPG image for better web performance and smaller file sizes.",
        },
        cards: [
          {
            title: "Browser-based",
            description:
              "The image is encoded locally in your browser without a server upload.",
          },
          {
            title: "Superior compression",
            description:
              "AVIF offers better compression than JPEG at similar quality levels.",
          },
          {
            title: "High quality",
            description:
              "Support for high-quality image encoding with adjustable quality settings.",
          },
        ],
      },
      benefits: {
        header: {
          badge: "Benefits",
          title: "Why convert JPG to AVIF",
          description:
            "AVIF is ideal for web delivery and offers the best compression-to-quality ratio among supported formats.",
        },
        cards: [
          {
            title: "Better compression",
            description:
              "AVIF files are typically 50% smaller than JPEG at similar quality.",
          },
          {
            title: "Modern format",
            description:
              "AVIF is the next-generation image format adopted by major browsers.",
          },
          {
            title: "Local privacy",
            description: "Keep your images on your device during conversion.",
          },
        ],
      },
      useCases: {
        header: {
          badge: "Use Cases",
          title: "When JPG to AVIF helps",
          description:
            "JPG to AVIF is especially useful for web performance and modern applications.",
        },
        items: [
          {
            icon: FaBolt,
            title: "Web optimization",
            description: "Create AVIF images for faster website loading times.",
          },
          {
            icon: FaFileImage,
            title: "Modern apps",
            description:
              "Use AVIF for apps and platforms that support the format.",
          },
          {
            icon: FaDownload,
            title: "Archive storage",
            description:
              "Store images in efficient AVIF format for space savings.",
          },
          {
            icon: FaCodeBranch,
            title: "Content delivery",
            description: "Serve AVIF images to users with modern browsers.",
          },
        ],
      },
      features: {
        header: {
          badge: "Features",
          title: "Simple JPG to AVIF conversion",
          description:
            "Upload, convert locally, optionally resize, and download the result without server-side processing.",
        },
        items: [
          {
            icon: FaLock,
            title: "No upload required",
            description: "The browser handles the full conversion locally.",
          },
          {
            icon: FaShuffle,
            title: "Quality control",
            description:
              "Adjust quality settings to balance file size and image fidelity.",
          },
          {
            icon: FaDownload,
            title: "Direct download",
            description:
              "Save the converted file immediately after processing.",
          },
          {
            icon: FaFileImage,
            title: "Preview before save",
            description:
              "See the converted AVIF in the browser before downloading.",
          },
        ],
      },
      comparison: {
        header: {
          badge: "Comparison",
          title: "AVIF vs JPEG",
          description:
            "AVIF offers significant advantages over JPEG for web use.",
        },
        columns: [
          { key: "feature", title: "Feature" },
          { key: "avif", title: "AVIF" },
          { key: "jpeg", title: "JPEG" },
        ],
        rows: [
          {
            feature: { text: "Compression efficiency" },
            avif: { text: "Excellent" },
            jpeg: { text: "Good" },
          },
          {
            feature: { text: "Browser support" },
            avif: { text: "96%+" },
            jpeg: { text: "100%" },
          },
          {
            feature: { text: "Best for web" },
            avif: { text: "Yes" },
            jpeg: { text: "Legacy" },
          },
        ],
      },
      faqs: {
        header: {
          badge: "FAQ",
          title: "JPG to AVIF questions",
          description:
            "Answers about AVIF output, browser support, and quality settings.",
        },
        items: [
          {
            question: "Which browsers support AVIF?",
            answer:
              "AVIF is supported in Chrome 79+, Firefox 113+, Safari 16+, and Edge 85+. Approximately 96% of browsers support it.",
          },
          {
            question: "Does AVIF support quality control?",
            answer:
              "Yes. You can adjust the quality setting to balance file size and image fidelity.",
          },
          {
            question: "Is the conversion done in the browser?",
            answer:
              "Yes. The file is processed locally in your browser without server upload.",
          },
        ],
      },
    },
    "png-to-ico": {
      ...webpToPngData,
      routeSlug: "png-to-ico",
      header: {
        ...webpToPngData.header,
        title: "PNG to ICO",
        subtitle: "Convert PNG images to ICO format for favicons and icons.",
      },
      meta: {
        ...webpToPngData.meta,
        title: "PNG to ICO Converter",
        description:
          "Convert PNG to ICO format in your browser without uploading. Create favicons and icons for Windows applications.",
        url: "/tools/image-format-converter/png-to-ico",
      },
      hero: {
        ...sharedHeroContent,
        badge: "ICO Converter",
        title: "PNG to ICO Converter",
        description:
          "Convert PNG images to ICO format locally in your browser. ICO is the standard format for Windows icons and favicons.",
      },
      intro: {
        header: {
          badge: "Overview",
          title: "Convert PNG into ICO",
          description:
            "ICO (Icon) format is used for Windows icons, favicons, and application icons. Convert PNG images to ICO for web and desktop use.",
        },
        cards: [
          {
            title: "Browser-based",
            description:
              "The image is encoded locally in your browser without a server upload.",
          },
          {
            title: "Favicon ready",
            description: "Create ICO files suitable for website favicons.",
          },
          {
            title: "Icon format",
            description:
              "ICO is the standard format for Windows application icons.",
          },
        ],
      },
      benefits: {
        header: {
          badge: "Benefits",
          title: "Why convert PNG to ICO",
          description:
            "ICO format is essential for web and Windows application icons.",
        },
        cards: [
          {
            title: "Web favicons",
            description: "Create proper favicon.ico files for websites.",
          },
          {
            title: "App icons",
            description: "Generate icons for Windows applications.",
          },
          {
            title: "Local privacy",
            description: "Keep your images on your device during conversion.",
          },
        ],
      },
      useCases: {
        header: {
          badge: "Use Cases",
          title: "When PNG to ICO helps",
          description: "ICO is essential for website and application icons.",
        },
        items: [
          {
            icon: FaFileImage,
            title: "Website favicon",
            description: "Create proper favicon.ico for your website.",
          },
          {
            icon: FaCodeBranch,
            title: "App icons",
            description: "Generate icons for Windows applications.",
          },
          {
            icon: FaDownload,
            title: "Quick conversion",
            description: "Convert and download ICO files instantly.",
          },
          {
            icon: FaBolt,
            title: "Local processing",
            description: "Convert images without uploading to a server.",
          },
        ],
      },
      features: {
        header: {
          badge: "Features",
          title: "Simple PNG to ICO conversion",
          description:
            "Upload, convert locally, and download the ICO result without server-side processing.",
        },
        items: [
          {
            icon: FaLock,
            title: "No upload required",
            description: "The browser handles the full conversion locally.",
          },
          {
            icon: FaShuffle,
            title: "Multiple input formats",
            description: "Convert from PNG, JPG, WebP, and other formats.",
          },
          {
            icon: FaDownload,
            title: "Direct download",
            description:
              "Save the converted file immediately after processing.",
          },
          {
            icon: FaFileImage,
            title: "Preview before save",
            description:
              "See the converted ICO in the browser before downloading.",
          },
        ],
      },
      comparison: {
        header: {
          badge: "Comparison",
          title: "ICO vs PNG for icons",
          description: "ICO is the native Windows icon format.",
        },
        columns: [
          { key: "feature", title: "Feature" },
          { key: "ico", title: "ICO" },
          { key: "png", title: "PNG" },
        ],
        rows: [
          {
            feature: { text: "Windows support" },
            ico: { text: "Native" },
            png: { text: "Limited" },
          },
          {
            feature: { text: "Web favicon" },
            ico: { text: "Standard" },
            png: { text: "Modern alternative" },
          },
          {
            feature: { text: "Multiple sizes" },
            ico: { text: "Yes" },
            png: { text: "No" },
          },
        ],
      },
      faqs: {
        header: {
          badge: "FAQ",
          title: "PNG to ICO questions",
          description:
            "Answers about ICO output, use cases, and browser processing.",
        },
        items: [
          {
            question: "What is ICO format used for?",
            answer:
              "ICO is primarily used for Windows icons, favicons, and application icons.",
          },
          {
            question: "Can I use ICO on websites?",
            answer:
              "Yes. favicon.ico is the traditional format for website favicons.",
          },
          {
            question: "Is the conversion done in the browser?",
            answer:
              "Yes. The file is processed locally in your browser without server upload.",
          },
        ],
      },
    },
  };

export const imageFormatConverterDetailDataBySlug: Record<
  string,
  ImageFormatConverterDetailData
> = Object.fromEntries(
  imageConversionRoutes.map((route) => [
    route.slug,
    specificDetailDataBySlug[route.slug] ?? buildGenericDetailData(route),
  ]),
);
