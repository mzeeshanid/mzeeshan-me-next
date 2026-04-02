import {
  FaAndroid,
  FaApple,
  FaBolt,
  FaDownload,
  FaFileZipper,
  FaLayerGroup,
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
  "/assets/promotional_offer_appicon.png",
  "/assets/mzvisit_app_icon.png",
  "/assets/aspect_ratio_app_icon.png",
];

export const appIconGeneratorFeaturesData = {
  header: {
    badge: "Highlights",
    title: "Why use this generator",
    desc: "Generate production-ready icon packs for Apple and Android platforms in one pass.",
  },
  items: [
    {
      icon: FaLayerGroup,
      title: "Multi-platform support",
      desc: "Create icon packs for iOS, iPadOS, watchOS, macOS, and Android from one source image.",
    },
    {
      icon: FaFileZipper,
      title: "Native folder output",
      desc: "Download Xcode AppIcon.appiconset and Android resource folders in a ZIP file you can drop into your project.",
    },
    {
      icon: FaBolt,
      title: "Batch generation",
      desc: "Produce every required size in one run instead of exporting dozens of files manually.",
    },
    {
      icon: FaDownload,
      title: "Instant download",
      desc: "Generate and download the archive directly in the browser without sending your image to a server.",
    },
  ],
};

export const appIconGeneratorHowItWorksData = {
  header: {
    badge: "How It Works",
    title: "Three quick steps",
    desc: "Upload once, choose targets, and download a project-ready archive.",
  },
  items: [
    {
      icon: MdImage,
      title: "Upload your image",
      desc: "Drop in a square source image. A 1024 × 1024 PNG gives the cleanest results.",
    },
    {
      icon: FaApple,
      title: "Select target platforms",
      desc: "Choose the Apple and Android outputs you need and customize the Android file name if required.",
    },
    {
      icon: FaDownload,
      title: "Download the ZIP",
      desc: "Get a ZIP archive with platform-specific folders and metadata files ready for import.",
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
      feature: { text: "UI/UX" },
      thisTool: { text: "Modern, responsive drag-and-drop workflow" },
      competitor: { text: "More utilitarian interface" },
      competitorTwo: {
        text: "Polished interface with more customization controls",
      },
    },
    {
      feature: { text: "Best fit" },
      thisTool: { text: "Developers who want a clean upload-to-ZIP workflow" },
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
