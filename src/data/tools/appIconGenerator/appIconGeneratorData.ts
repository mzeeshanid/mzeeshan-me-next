import {
  FaAndroid,
  FaApple,
  FaBolt,
  FaDownload,
  FaFileZipper,
  FaFont,
  FaIcons,
  FaLayerGroup,
  FaWandMagicSparkles,
} from "react-icons/fa6";
import {
  MdImage,
  MdPhoneIphone,
  MdOutlineWatch,
  MdOutlineLaptopMac,
  MdTabletMac,
} from "react-icons/md";

export const appIconGeneratorHeaderData = {
  badge: "App Icon Tool",
  title: "App Icon Generator",
  description: "Generate platform-specific app icons instantly",
  subtitle: "Generate platform-specific app icons instantly",
  icon: "/assets/app_icon_generator_app_icon.png",
  alt: "App Icon Generator icon",
};

export const appIconGeneratorMetaData = {
  title: "App Icon Generator",
  description:
    "Create ready-to-import iOS, Android, macOS, and watchOS app icon sets from a single image and download them as a ZIP.",
  url: "/tools/app-icon-generator",
  image: {
    src: "/assets/app_icon_generator_app_icon.png",
    type: "image/png",
  },
};

export const appIconGeneratorMarqueeIcons = [
  "/assets/app_icon_generator_app_icon.png",
  "/assets/ios_app_icon.png",
  "/assets/mz100_app_icon.png",
  "/assets/react_app_icon.png",
  "/assets/string_metric_app_icon.png",
  "/assets/drive_direct_icon.png",
  "/assets/image_format_converter_icon.png",
  "/assets/json_to_csv_icon.png",
  "/assets/json_to_type_script_icon.png",
  "/assets/json_to_xml_icon.png",
  "/assets/json_to_yaml_icon.png",
  "/assets/promotional_offer_appicon.png",
  "/assets/mzvisit_app_icon.png",
  "/assets/aspect_ratio_app_icon.png",
];

export const appIconGeneratorFeaturesData = {
  header: {
    badge: "Highlights",
    title: "Why use this generator",
    desc: "A full custom icon builder with live previews — not just a resizer.",
  },
  items: [
    {
      icon: FaLayerGroup,
      title: "Custom icon builder",
      desc: "Design icons from scratch using layered foreground and background — choose image, clip art, or styled text for each layer.",
    },
    {
      icon: FaIcons,
      title: "React Icons clip art library",
      desc: "Pick from thousands of icons across Font Awesome, Material Design, and more — no separate icon source needed.",
    },
    {
      icon: FaFont,
      title: "Text with typography styles",
      desc: "Create text-based icons with Regular, Bold, or Italic styling directly in the builder.",
    },
    {
      icon: MdPhoneIphone,
      title: "Live device preview",
      desc: "See your icon rendered in iPhone and Android device frames across 8 real-world contexts before downloading.",
    },
    {
      icon: FaFileZipper,
      title: "Native folder output",
      desc: "Download Xcode AppIcon.appiconset and Android resource folders in a ZIP file you can drop into your project.",
    },
    {
      icon: FaBolt,
      title: "Instant, private generation",
      desc: "All processing happens in the browser — your image never leaves your device, and the ZIP is ready in seconds.",
    },
  ],
};

export const appIconGeneratorHowItWorksData = {
  header: {
    badge: "How It Works",
    title: "Four quick steps",
    desc: "Upload or design, preview in context, then download a project-ready archive.",
  },
  items: [
    {
      icon: MdImage,
      title: "Upload or design",
      desc: "Drop in a source image, or switch to custom mode to build your icon from layers — image, React Icons clip art, or styled text.",
    },
    {
      icon: FaApple,
      title: "Select target platforms",
      desc: "Toggle the Apple and Android outputs you need. Choose individual device targets — iPhone, iPad, watchOS, macOS, and Android.",
    },
    {
      icon: MdPhoneIphone,
      title: "Preview in context",
      desc: "Review your icon rendered in iPhone and Android device frames across home screen, spotlight, settings, notifications, and more.",
    },
    {
      icon: FaDownload,
      title: "Download the ZIP",
      desc: "Get a ZIP archive with platform-specific folders and metadata files ready for direct import into Xcode and Android Studio.",
    },
  ],
};

export const appIconGeneratorComparisonData = {
  header: {
    badge: "Comparison",
    title: "Compared with other generators",
    desc: "A focused browser-first workflow with clearer platform control than many older tools.",
  },
  columns: [
    { key: "feature", title: "Feature" },
    { key: "thisTool", title: "This tool" },
    { key: "competitor", title: "appicon.co", link: "https://www.appicon.co/" },
    {
      key: "competitorTwo",
      title: "AppIconly",
      link: "https://www.appiconly.com/",
    },
  ],
  rows: [
    {
      feature: { text: "Platform grouping" },
      thisTool: {
        text: "Separate Apple device toggles plus Android naming control",
      },
      competitor: { text: "Simpler but less granular flow" },
      competitorTwo: {
        text: "Broad platform support with a more generalized setup",
      },
    },
    {
      feature: { text: "Icon builder" },
      thisTool: {
        text: "Full layer builder — image, React Icons clip art library, or styled text as foreground/background",
      },
      competitor: { text: "Image upload only" },
      competitorTwo: { text: "Image upload only" },
    },
    {
      feature: { text: "Text styles" },
      thisTool: { text: "Regular, Bold, and Italic text directly on the icon canvas" },
      competitor: { text: "Not supported" },
      competitorTwo: { text: "Not supported" },
    },
    {
      feature: { text: "Live device preview" },
      thisTool: {
        text: "iPhone and Android device frames across 8 contexts (home screen, spotlight, settings, and more)",
      },
      competitor: { text: "Basic preview" },
      competitorTwo: { text: "Shape-based previews, no device frames" },
    },
    {
      feature: { text: "Output clarity" },
      thisTool: {
        text: "Explicit ZIP folder structure for Xcode and Android Studio",
      },
      competitor: { text: "Good output but fewer inline explanations" },
      competitorTwo: {
        text: "Strong previews, but less emphasis on native project folder expectations",
      },
    },
    {
      feature: { text: "Best fit" },
      thisTool: {
        text: "Developers who want to design, preview, and export icons without leaving the browser",
      },
      competitor: { text: "Quick exports with a simpler utility feel" },
      competitorTwo: {
        text: "Users who want previews and styling controls before export",
      },
    },
  ],
};

export const appIconGeneratorFaqsData = {
  header: {
    badge: "FAQ",
    title: "Common questions",
    desc: "Everything you need to know before generating icon packs.",
  },
  faqs: [
    {
      question: "What image should I upload?",
      answer:
        "A square 1024 × 1024 image works best. PNG is ideal, but JPG and WEBP are also accepted.",
    },
    {
      question: "What do the iOS and macOS files include?",
      answer:
        "The Apple output includes an AppIcon.appiconset folder and a Contents.json file so the archive can be imported directly into Xcode.",
    },
    {
      question: "How is the Android file name used?",
      answer:
        "The Android file name is applied to all generated Android icon assets and adaptive icon XML files.",
    },
    {
      question: "Can I use the ZIP directly in my projects?",
      answer:
        "Yes. The ZIP is structured for direct use in Xcode and Android Studio resource folders, though you should still review the generated assets before shipping.",
    },
  ],
};

export const appIconGeneratorPlatformCardData = {
  apple: {
    title: "iOS and macOS",
    items: [
      {
        key: "iphone",
        label: "iPhone",
        count: 11,
        icon: MdPhoneIphone,
        description: "Home screen, Settings, and App Store",
        sizeGuide: "20, 29, 40, 58, 60, 76, 80, 87, 120, 152, 180 points",
      },
      {
        key: "ipad",
        label: "iPad",
        count: 13,
        icon: MdTabletMac,
        description: "iPad home screen and App Store",
        sizeGuide:
          "20, 29, 40, 58, 60, 76, 80, 87, 120, 152, 167, 180, 1024 points",
      },
      {
        key: "watchos",
        label: "watchOS",
        count: 8,
        icon: MdOutlineWatch,
        description: "Watch app and notifications",
        sizeGuide: "24, 27.5, 29, 40, 44, 46, 50, 58 points",
      },
      {
        key: "macos",
        label: "macOS",
        count: 11,
        icon: MdOutlineLaptopMac,
        description: "Mac app and App Store",
        sizeGuide: "16, 32, 64, 128, 256, 512, 1024 points and scaled variants",
      },
    ],
  },
  android: {
    title: "Android",
    items: [
      {
        key: "android",
        label: "Android",
        count: 4,
        icon: FaAndroid,
        description: "mdpi, hdpi, xhdpi, xxhdpi",
        sizeGuide: "mdpi, hdpi, xhdpi, xxhdpi",
      },
    ],
  },
};

export const appIconGeneratorValuePropsData = {
  header: {
    badge: "What Sets It Apart",
    title: "More than a resizer",
    desc: "Most icon generators just resize your image. This tool lets you design, preview, and export — all from the browser.",
  },
  items: [
    {
      icon: FaIcons,
      title: "React Icons clip art library",
      desc: "Access thousands of icons from Font Awesome, Material Design, Remix Icons, and more. Search and pick any icon as your foreground layer — no external source or design app required.",
    },
    {
      icon: FaFont,
      title: "Text with typography styles",
      desc: "Type any character or word and apply Regular, Bold, or Italic styling. The builder renders it directly onto the icon canvas at full resolution.",
    },
    {
      icon: MdPhoneIphone,
      title: "Live device mockup preview",
      desc: "See your icon in iPhone and Android device frames across 8 real-world contexts — home screen, spotlight, settings, notification bar, App Store, and Google Play — before you export.",
    },
    {
      icon: FaWandMagicSparkles,
      title: "Cleaner than Android Studio",
      desc: "Skip the heavyweight IDE setup. Get the same adaptive icon output — foreground, background, legacy, round, and monochrome — with a drag-and-drop interface that takes seconds to learn.",
    },
  ],
};
