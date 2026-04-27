import { IconType } from "react-icons";
import { FaBolt, FaClock, FaLock, FaMobile, FaRepeat } from "react-icons/fa6";

export type UnixTimestampSectionHeader = {
  badge: string;
  title: string;
  desc: string;
};

export type UnixTimestampFeatureItem = {
  icon: IconType;
  title: string;
  desc: string;
};

export type UnixTimestampFeaturesData = {
  header: UnixTimestampSectionHeader;
  features: UnixTimestampFeatureItem[];
};

export const unixTimestampFeaturesData: UnixTimestampFeaturesData = {
  header: {
    badge: "Fast & Accurate",
    title: "Everything You Need for Epoch Time",
    desc: "The Unix Timestamp Converter handles both directions — timestamp to date and date to timestamp — with live clock, auto-detection, and multiple output formats.",
  },
  features: [
    {
      icon: FaClock,
      title: "Live Unix Clock",
      desc: "See the current epoch time in seconds and milliseconds, updating every second in real time.",
    },
    {
      icon: FaRepeat,
      title: "Bidirectional Conversion",
      desc: "Convert a Unix timestamp to a human-readable date, or pick any date and time to get its epoch value instantly.",
    },
    {
      icon: FaBolt,
      title: "Auto-Detect Seconds vs ms",
      desc: "Paste any timestamp and the converter automatically figures out whether it is in seconds or milliseconds.",
    },
    {
      icon: FaMobile,
      title: "Works on Any Device",
      desc: "Fully responsive layout optimised for desktop, tablet, and mobile — no app required.",
    },
    {
      icon: FaLock,
      title: "Private & Offline",
      desc: "All conversions run in your browser using the native Date API. No data ever leaves your device.",
    },
  ],
};
