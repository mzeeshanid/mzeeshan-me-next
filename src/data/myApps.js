import mz100AppIcon from "../../public/assets/mz100_app_icon.png";
import mzFileManageAppIcon from "../../public/assets/mzfilemanage_appicon.png";
import mzPlayerHDAppIcon from "../../public/assets/mzplayer_hd_appicon.png";
import mzVisitsAppIcon from "../../public/assets/mzvisit_app_icon.png";

function myApps() {
  const apps = [
    {
      title: "MZFileManage",
      detail:
        "It is the one stop file manager along with powerful download manager, playlist manager and much more!",
      image: mzFileManageAppIcon,
      alt: "MZFileManage app icon",
      url: "/mzfilemanage",
    },
    {
      title: "MZPlayerHD",
      detail:
        "MZPlayerHD allows background playback of youtube videos. Enjoy your videos with advanced HD video player.",
      image: mzPlayerHDAppIcon,
      alt: "MZPlayerHD app icon",
      url: "/mzplayerhd",
    },
    {
      title: "MZVisits",
      detail:
        "MZVisits allows to track significant locations on the go. Install now and see where you had been in the past ;)",
      image: mzVisitsAppIcon,
      alt: "MZVisits app icon",
      url: "//apps.apple.com/us/app/mzvisits/id1459482393",
    },
    {
      title: "MZ100",
      detail:
        "MZ100! A challenging puzzle to reveal all 100 boxes in shortest possible time. Obviously there are some rules ;)",
      image: mz100AppIcon,
      alt: "MZ100 app icon",
      url: "//apps.apple.com/us/app/mz100/id1460376599",
    },
  ];
  return apps;
}

export default myApps;
