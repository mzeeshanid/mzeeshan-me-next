import { BasicImageDataModel } from "../basicImage/basicImageDataModel";
import mzFileManageIcon from "../../../public/assets/mzfilemanage_appicon.png";
import mzPlayerHDIcon from "../../../public/assets/mzplayer_hd_appicon.png";
import mzVisitsIcon from "../../../public/assets/mzvisit_app_icon.png";
import mz100Icon from "../../../public/assets/mz100_app_icon.png";

export type MyAppsData = {
  tagline: string;
  title: string;
  details: string;
  apps: MyApp[];
}

export type MyApp = {
  title: string;
  caption: string;
  detail: string;
  url: string;
  icon: BasicImageDataModel;
};

const myAppsData = (): MyAppsData => {
  return {
    tagline: "Own iOS Apps",
    title: "My Published iOS Apps",
    details: "Here are some of the iOS applications that I have developed and published on the App Store. These apps showcase my skills in iOS development, user interface design, and user experience optimization.",
    apps: [
      {
        title: "MZFileManage",
        caption: "Fully featured file manager",
        detail:
        "It is the one stop file manager along with powerful download manager, playlist manager and much more!",
        icon: {
          src: mzFileManageIcon,
          alt: "MZFileManage app icon",
          width: 300,
          height: 300,
        },
        url: "/apps/mzfilemanage",
      },
      {
        title: "MZPlayerHD",
        caption: "Free Youtube in background",
        detail:
        "MZPlayerHD allows background playback of youtube videos. Enjoy your videos with advanced HD video player.",
        icon: {
          src: mzPlayerHDIcon,
          alt: "MZPlayerHD app icon",
          width: 300,
          height: 300,
        },
        
        url: "/apps/mzplayerhd",
      },
      {
        title: "MZVisits",
        caption: "See where you had been",
        detail:
        "MZVisits allows to track significant locations on the go. Install now and see where you had been in the past ;)",
        icon: {
          src: mzVisitsIcon,
          alt: "MZVisits app icon",
          width: 300,
          height: 300,
        },
        url: "/apps/mzvisits",
      },
      {
        title: "MZ100",
        caption: "Challenge! Reveal all boxes",
        detail:
        "MZ100! A challenging puzzle to reveal all 100 boxes in shortest possible time. Obviously there are some rules ;)",
        icon: {
          src: mz100Icon,
          alt: "MZ100 app icon",
          width: 300,
          height: 300,
        },
        url: "/apps/mz100",
      },
    ]
  }
}

export default myAppsData;
