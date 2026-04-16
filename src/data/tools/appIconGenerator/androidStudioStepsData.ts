import type { IconType } from "react-icons";
import { FaFolderTree, FaWandMagicSparkles } from "react-icons/fa6";

export type AndroidStudioStepItem = {
  title: string;
  subtitle: string;
  desc: string;
  icon: IconType;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export type AndroidStudioStepsData = {
  header: {
    badge: string;
    title: string;
    desc: string;
  };
  intro: string;
  steps: AndroidStudioStepItem[];
  docs: {
    label: string;
    href: string;
    desc: string;
  };
  video: {
    label: string;
    href: string;
    embedId: string;
    desc: string;
  };
};

export const androidStudioStepsData: AndroidStudioStepsData = {
  header: {
    badge: "Native Alternative",
    title: "Generate Icons in Android Studio",
    desc: "Did you know Android Studio ships with a built-in Image Asset Studio? Generate adaptive, legacy, and round launcher icons in every required density — all without leaving your IDE.",
  },
  intro:
    "Android Studio's Image Asset Studio handles the full adaptive icon pipeline natively: foreground layer, background layer, monochrome variant, legacy fallbacks, round icons, and Play Store artwork — all exported into the correct res/ directories in a single click. It mirrors everything this online generator does, making it a solid choice when you're already inside the IDE.",
  steps: [
    {
      title: "Step 1",
      subtitle: "Open Image Asset Studio",
      desc: "In the **Project** panel, expand your module and right-click the **`res`** folder. From the context menu choose **New → Image Asset**. Android Studio will open the **Configure Image Asset** dialog (also called Asset Studio).\n\n> **Tip:** If you don't see the `res` folder, make sure the Project view is set to **Android** (not Project) in the top-left dropdown of the panel.",
      icon: FaFolderTree,
      image: {
        src: "/assets/android_studio_icon_generator_step_1.png",
        alt: "Right-clicking the res folder in Android Studio and selecting New → Image Asset",
        width: 900,
        height: 600,
      },
    },
    {
      title: "Step 2",
      subtitle: "Configure Your Adaptive Icon",
      desc: "The **Configure Image Asset** dialog opens with four tabs: **Foreground Layer**, **Background Layer**, **Monochrome**, and **Options**. Set the icon type to **Launcher Icons (Adaptive and Legacy)**, then:\n\n- **Foreground Layer** — choose Image, Clip Art, or Text as your asset type, set trim and resize.\n- **Background Layer** — pick a solid colour or image for the background.\n- **Monochrome** — optional tinted icon for Android 13+ themed icons.\n- **Options** — toggle legacy, round, and Google Play Store icon generation.\n\nThe live preview on the right shows your icon rendered as Circle, Squircle, Rounded Square, Square, and Full Bleed shapes in real time. Click **Next**, confirm the output paths, then **Finish**.",
      icon: FaWandMagicSparkles,
      image: {
        src: "/assets/android_studio_icon_generator_step_2.png",
        alt: "Android Studio Asset Studio dialog showing the Configure Image Asset panel with foreground layer, background layer, and live shape previews",
        width: 900,
        height: 600,
      },
    },
  ],
  docs: {
    label: "Official Android Documentation",
    href: "https://developer.android.com/studio/write/create-app-icons",
    desc: "Create app icons using Image Asset Studio — the complete guide on developer.android.com covering adaptive icons, legacy icons, notification icons, and TV / Wear OS banners.",
  },
  video: {
    label: "Official Tutorial Video",
    href: "https://www.youtube.com/watch?v=5MHFYfXno9c",
    embedId: "5MHFYfXno9c",
    desc: "Watch the official Android Developers tutorial on creating launcher icons with Image Asset Studio.",
  },
};
