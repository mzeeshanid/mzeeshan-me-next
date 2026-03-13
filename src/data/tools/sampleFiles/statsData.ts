import { IconType } from "react-icons";
import { BiSolidCheckShield, BiSolidSelectMultiple } from "react-icons/bi";
import { FaFileAlt } from "react-icons/fa";
import { FaChartSimple, FaDownload, FaMoneyBill1 } from "react-icons/fa6";

export type SampleFileFeature = {
  title: string;
  description: string;
  icon: IconType;
};

export type SampleFilesStatsData = {
  badge: string;
  heading: string;
  details: string;
  features: SampleFileFeature[];
};

export const sampleFilesStatsData: SampleFilesStatsData = {
  badge: "Free & Instant",
  heading: "Ultimate Resource for Sample Files",
  details:
    "A web app that allows developers and testers to download free sample files for testing purposes.",
  features: [
    {
      title: "55+ File Types",
      description:
        "Access a wide variety of file formats for your testing needs.",
      icon: FaFileAlt,
    },
    {
      title: "Multiple Variants",
      description:
        "Download files in different sizes - Small, Medium, and Large.",
      icon: BiSolidSelectMultiple,
    },
    {
      title: "100% Free",
      description:
        "No hidden costs, no registration required, completely free to use.",
      icon: FaMoneyBill1,
    },
    {
      title: "Instant Download",
      description:
        "Download your sample files instantly without any waiting time.",
      icon: FaDownload,
    },
    {
      title: "Privacy Protected",
      description:
        "Your data is safe. We don't track or store any personal information.",
      icon: BiSolidCheckShield,
    },
    {
      title: "Easy to Use",
      description:
        "Simple and intuitive interface that anyone can use without technical knowledge.",
      icon: FaChartSimple,
    },
  ],
};
