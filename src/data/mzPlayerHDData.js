import { List, ListIcon, ListItem, theme } from "@chakra-ui/react";
import React from "react";
import {
  FaCheckCircle,
  FaExternalLinkAlt,
  FaFilm,
  FaHeart,
  FaSearch,
} from "react-icons/fa";
import mzPlayerHDAppIcon from "../../public/assets/mzplayer_hd_appicon.png";
import appGenericFAQs from "./appGenericFAQs";
import mzPlayerHDReviews from "./mzPlayerHDReviews";
import mzPlayerHDStats from "./mzPlayerHDStats";

import mzPlayerScreenshot1 from "../../public/assets/mzplayerhd/MZPlayerHD_Screenshot_1.png";
import mzPlayerScreenshot2 from "../../public/assets/mzplayerhd/MZPlayerHD_Screenshot_2.png";
import mzPlayerScreenshot3 from "../../public/assets/mzplayerhd/MZPlayerHD_Screenshot_3.png";
import mzPlayerScreenshot4 from "../../public/assets/mzplayerhd/MZPlayerHD_Screenshot_4.png";
import mzPlayerScreenshot5 from "../../public/assets/mzplayerhd/MZPlayerHD_Screenshot_5.png";

export default function MZPlayerHDData() {
  return {
    hero: {
      heroPrefix: "Enjoy ",
      heroSuffix: " videos",
      heroTagLine: "HD YouTube",
      shortDesc:
        "MZPlayerHD allows background playback of youtube videos. Enjoy your videos with advanced HD video player.",
      appUrl: "//apps.apple.com/us/app/mzplayerhd/id1436966516",
      appName: "MZPlayerHD",
      subTitle: "Search & Play HD YouTube Videos",
      author: "By Muhammad Zeeshan",
      appIcon: mzPlayerHDAppIcon,
    },
    features: {
      title: "Search & Play HD YouTube Videos",
      subtitle:
        "MZPlayerHD allows background playback of youtube videos. Enjoy your videos with advanced HD video player.",
      data: [
        {
          title: "Search YouTube Videos",
          icon: <FaSearch size={"full"} color={theme.colors.white} />,
          bullets: (
            <List spacing={1}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color={theme.colors.teal[600]} />{" "}
                Search videos with keywords.
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color={theme.colors.teal[600]} />{" "}
                Advanced filters.
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color={theme.colors.teal[600]} />{" "}
                Sort search results.
              </ListItem>
            </List>
          ),
        },
        {
          title: "Favourite Videos",
          icon: <FaHeart size={"full"} color={theme.colors.white} />,
          bullets: (
            <List spacing={1}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color={theme.colors.teal[600]} />{" "}
                Mark videos as favourite.
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color={theme.colors.teal[600]} />{" "}
                Manage your favourite list.
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color={theme.colors.teal[600]} />{" "}
                Share your favourite videos.
              </ListItem>
            </List>
          ),
        },
        {
          title: "HD Video Player",
          icon: <FaFilm size={"full"} color={theme.colors.white} />,
          bullets: (
            <List spacing={1}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color={theme.colors.teal[600]} />{" "}
                Watch videos in HD quality.
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color={theme.colors.teal[600]} />{" "}
                Support for background playback.
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color={theme.colors.teal[600]} />{" "}
                Advanced custom video player.
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
                Sticky mini player at the bottom.
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color={theme.colors.teal[600]} />{" "}
                Instructions for child safely.
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color={theme.colors.teal[600]} />{" "}
                Search suggestions as you type.
              </ListItem>
            </List>
          ),
        },
      ],
    },
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
      appstoreurl: "//apps.apple.com/us/app/mzplayerhd/id1436966516",
      appstorelinkText: "Evaluate by downloading free from AppStore",
      projectSize: "Xcode project size ~ 200MB",
      features: [
        "Use for unlimited projects",
        "Free support for 45 days",
        "Reskinning (with additional charges)",
        "New features (with additional charges)",
      ],
    },
    screenshots: [
      mzPlayerScreenshot1,
      mzPlayerScreenshot2,
      mzPlayerScreenshot3,
      mzPlayerScreenshot4,
      mzPlayerScreenshot5,
    ],
    stats: mzPlayerHDStats(),
    reviews: mzPlayerHDReviews(),
    faqs: appGenericFAQs(),
  };
}
