import appIconGeneratorAppIcon from "../../../../public/assets/app_icon_generator_app_icon.png";
import {
  FaAndroid,
  FaApple,
  FaBolt,
  FaDownload,
  FaFileZipper,
  FaFont,
  FaIcons,
  FaFeather,
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
  icon: appIconGeneratorAppIcon,
  alt: "App Icon Generator icon",
};

export const appIconGeneratorMetaData = {
  title: "Free App Icon Generator - iOS, Android, macOS Icons Online Tool",
  description:
    "Free app icon generator for iOS, Android, macOS, and watchOS. Build icons with the layer builder, preview in device frames, and export a ZIP ready for Xcode and Android Studio. No upload required.",
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
    {
      icon: FaFeather,
      title: "MVP-ready in minutes",
      desc: "Minimal and simple by design — gives your app a polished, functional icon that looks far better than any default placeholder, without needing a designer.",
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
      question: "What image size and format works best for generating app icons?",
      answer:
        "A square PNG at 1024 × 1024 pixels gives the sharpest results across all sizes. JPG and WEBP are also accepted. Avoid padding or rounded corners in the source image — the iOS and Android platforms apply their own corner masks at runtime.",
    },
    {
      question: "What iOS icon sizes does this tool generate?",
      answer:
        "For iPhone it generates 14 sizes covering 20, 29, 38, 40, 60, 64, and 68 pt at @2x / @3x, plus the 1024 × 1024 App Store icon. Enabling iPad adds 76@2x and 83.5@2x. watchOS produces 20 sizes (22–129 pt @2x plus 1024). macOS generates 10 sizes from 16@1x through 512@2x. All targets follow the universal iOS appiconset idiom Xcode expects.",
    },
    {
      question: "What is the difference between the Sizes folder and the iOS 26+ folder in the ZIP?",
      answer:
        "The Sizes folder is a standard AppIcon.appiconset with a Contents.json that covers all legacy Xcode size slots. The iOS 26+ folder is a separate appiconset with only the 1024 × 1024 slot, which is the format Apple introduced for iOS 26 where the OS handles all resizing. Including both lets you support every Xcode version without changes.",
    },
    {
      question: "How do dark and tinted appearance iOS icons work?",
      answer:
        "iOS 18 and later allow apps to supply dark and tinted variants of their icon alongside the default light variant. When enabled, the generator produces three sets of icons — Any (light), Dark, and Tinted — each with its own Contents.json appearances entry. The Sizes folder includes all variants at every legacy size; the iOS 26+ folder includes all three at 1024 × 1024. Each variant has its own independent Background and Foreground layer so you can design them separately.",
    },
    {
      question: "How do I import the generated iOS icons into Xcode?",
      answer:
        "Open the ZIP, locate the iOS folder, and drag the AppIcon.appiconset folder directly into your Xcode project's Assets.xcassets. Xcode reads the Contents.json inside the folder and maps each image to the correct slot automatically. No manual slot assignment is needed.",
    },
    {
      question: "What does the Android icon output include?",
      answer:
        "The Android output includes launcher icons in four mipmap densities (mdpi 48px, hdpi 72px, xhdpi 96px, xxhdpi 144px), a foreground layer PNG at 432px for adaptive icons, a background XML drawable, and an adaptive-icon XML in mipmap-anydpi-v26 for both the square and round variants. This matches the folder structure Android Studio expects under res/.",
    },
    {
      question: "How do I add the Android icons to my Android Studio project?",
      answer:
        "Extract the ZIP and copy the android/ folder contents into your project's app/src/main/res/ directory. The mipmap-* and drawable folders drop in directly. Android Studio will pick up the adaptive icon XML automatically on API 26+ devices and fall back to the legacy PNGs on older ones.",
    },
    {
      question: "Can I generate icons for macOS and watchOS as well?",
      answer:
        "Yes. In the iOS and macOS panel, enable macOS to get the 10-size set (16–512 pt at @1x and @2x) in mac idiom format, and enable watchOS to get all 20 complication and App Store sizes. All platforms share the same source design from the builder and are exported together in one ZIP download.",
    },
    {
      question: "Is my image uploaded to a server?",
      answer:
        "No. All icon generation runs entirely in the browser using the Canvas API. Your source image and the generated ZIP never leave your device. There is no server-side processing, no account required, and no file storage.",
    },
    {
      question: "What should I enter as the Android file name?",
      answer:
        "Use a lowercase snake_case name like ic_launcher or my_app_icon. The name is applied to every Android asset file and referenced inside the adaptive-icon XML. If you enter a name that starts with a number or contains special characters, it will be sanitized automatically to a valid Android resource identifier.",
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
        count: 14,
        icon: MdPhoneIphone,
        description: "Home screen, Settings, Spotlight, and App Store",
        sizeGuide:
          "20@2x/3x, 29@2x/3x, 38@2x/3x, 40@2x/3x, 60@2x/3x, 64@2x/3x, 68@2x, 1024 (App Store) — universal iOS format",
      },
      {
        key: "ipad",
        label: "iPad",
        count: 16,
        icon: MdTabletMac,
        description: "iPad home screen, Settings, and App Store",
        sizeGuide:
          "All iPhone sizes plus 76@2x (iPad home screen) and 83.5@2x (iPad Pro) — universal iOS format",
      },
      {
        key: "watchos",
        label: "watchOS",
        count: 20,
        icon: MdOutlineWatch,
        description: "Watch faces, complications, and App Store",
        sizeGuide:
          "22, 24, 27.5, 29, 30, 32, 33, 40, 43.5, 44, 46, 50, 51, 54, 86, 98, 108, 117, 129 @2x + 1024 (App Store)",
      },
      {
        key: "macos",
        label: "macOS",
        count: 10,
        icon: MdOutlineLaptopMac,
        description: "Mac app icon and App Store",
        sizeGuide:
          "16, 32, 128, 256, 512 @1x and @2x — mac idiom format",
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
