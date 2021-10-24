import { List, ListIcon, ListItem } from "@chakra-ui/react";
import theme from "@chakra-ui/theme";
import React from "react";
import {
  FaCloudDownloadAlt,
  FaCheckCircle,
  FaFileImage,
  FaMusic,
  FaExternalLinkAlt,
} from "react-icons/fa";

import mzFileManagerAppIcon from "../../public/assets/mzfilemanage_appicon.png";

import mzfileManageScreenshot1 from "../../public/assets/mzfilemanage/mzfilemanager_screen_1.jpg";
import mzfileManageScreenshot2 from "../../public/assets/mzfilemanage/mzfilemanager_screen_2.jpg";
import mzfileManageScreenshot3 from "../../public/assets/mzfilemanage/mzfilemanager_screen_3.jpg";
import mzfileManageScreenshot4 from "../../public/assets/mzfilemanage/mzfilemanager_screen_4.jpg";
import mzfileManageScreenshot5 from "../../public/assets/mzfilemanage/mzfilemanager_screen_5.jpg";
import mzfileManageScreenshot6 from "../../public/assets/mzfilemanage/mzfilemanager_screen_6.jpg";
import mzfileManageScreenshot7 from "../../public/assets/mzfilemanage/mzfilemanager_screen_7.jpg";
import mzfileManageScreenshot8 from "../../public/assets/mzfilemanage/mzfilemanager_screen_8.jpg";
import mzfileManageScreenshot9 from "../../public/assets/mzfilemanage/mzfilemanager_screen_9.jpg";

import appGenericFAQs from "./appGenericFAQs";
import mzfileManageReviews from "./mzfileManageReviews";
import mzFileManageStats from "./mzFileManageStats";

export default function MZfileManageData() {
  return {
    hero: {
      heroPrefix: "All your ",
      heroSuffix: " in one single app.",
      heroTagLine: "offline file management",
      shortDesc:
        "MZFileManager is the one-stop file manager along with a powerful download manager, playlist manager and much more!",
      appUrl: "//apps.apple.com/us/app/mzfilemanager/id1436458918",
      appName: "MZFileManager",
      subTitle: "Fully featured file manager!",
      author: "By Muhammad Zeeshan",
      appIcon: mzFileManagerAppIcon,
    },
    features: {
      title: "A better way to manage files",
      subtitle:
        "Fully featured download manager, file manager and playlist manager",
      data: [
        {
          title: "Download Manager",
          icon: <FaCloudDownloadAlt size={"full"} color={theme.colors.white} />,
          bullets: (
            <List spacing={1}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color={theme.colors.teal[600]} />{" "}
                Simultaneous download of multiple files.
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color={theme.colors.teal[600]} />{" "}
                Background downloading of large files.
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color={theme.colors.teal[600]} />{" "}
                Resuming interrupted downloads.
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color={theme.colors.teal[600]} />{" "}
                Show detailed statistics of download task.
              </ListItem>
            </List>
          ),
        },
        {
          title: "File Manager",
          icon: <FaFileImage size={"full"} color={theme.colors.white} />,
          bullets: (
            <List spacing={1}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color={theme.colors.teal[600]} />{" "}
                Easy file sharing over WiFi.
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color={theme.colors.teal[600]} />{" "}
                Support operations e.g. Move, Copy, Paste, Delete etc.
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color={theme.colors.teal[600]} />{" "}
                Search and sort files by Name, Kind, Date, Size.
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color={theme.colors.teal[600]} />{" "}
                Preview supported files within the app.
              </ListItem>
            </List>
          ),
        },
        {
          title: "Playlist Manager",
          icon: <FaMusic size={"full"} color={theme.colors.white} />,
          bullets: (
            <List spacing={1}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color={theme.colors.teal[600]} />{" "}
                Create unlimited playlists.
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color={theme.colors.teal[600]} />{" "}
                Allows background multimedia playback.
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color={theme.colors.teal[600]} />{" "}
                One click play for playlist.
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color={theme.colors.teal[600]} />{" "}
                Gesture driven advanced video player.
              </ListItem>
            </List>
          ),
        },
        {
          title: "More Features",
          icon: <FaExternalLinkAlt size={"full"} color={theme.colors.white} />,
          bullets: (
            <List spacing={1}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color={theme.colors.teal[600]} />{" "}
                Import and export files with other apps using extension.
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color={theme.colors.teal[600]} />{" "}
                Sharing files over AirDrop.
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color={theme.colors.teal[600]} />{" "}
                Editing PDF files on the go.
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color={theme.colors.teal[600]} />{" "}
                Quickly scannable grid / list view for saved files.
              </ListItem>
            </List>
          ),
        },
      ],
    },
    screenshots: [
      mzfileManageScreenshot1,
      mzfileManageScreenshot2,
      mzfileManageScreenshot3,
      mzfileManageScreenshot4,
      mzfileManageScreenshot5,
      mzfileManageScreenshot6,
      mzfileManageScreenshot7,
      mzfileManageScreenshot8,
      mzfileManageScreenshot9,
    ],
    stats: mzFileManageStats(),
    reviews: mzfileManageReviews(),
    clone: {
      heading: "Need a clone? Simple flat pricing",
      subheading:
        "Free support included for 45 days. If you found any bug, I will resolve it free of cost.",
      title: "Pay once, own for lifetime",
      subtitle:
        "One plan for any individual or organization. I offer market competitive price. Feel free get in touch with me if you have any query.",
      tagLine: "Pay once, use anytime",
      price: "$300",
      currency: "USD",
      appstoreurl: "//apps.apple.com/us/app/mzfilemanager/id1436458918",
      appstorelinkText: "Evaluate by downloading free from AppStore",
      projectSize: "Xcode project size ~ 200MB",
      features: [
        "Use for unlimited projects",
        "Free support for 45 days",
        "Reskinning (with additional charges)",
        "New features (with additional charges)",
      ],
    },
    faqs: appGenericFAQs(),
  };
}
