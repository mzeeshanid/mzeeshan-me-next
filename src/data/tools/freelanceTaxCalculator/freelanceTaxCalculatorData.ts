import type { StaticImageData } from "next/image";
import { IconType } from "react-icons";
import { FaBolt, FaChartPie, FaShieldAlt, FaUserCheck } from "react-icons/fa";
import { FaCalendarDays, FaShuffle } from "react-icons/fa6";
import freelanceTaxIcon from "public/assets/freelance_tax_calculator_icon.png";

export type FreelanceTaxFeature = {
  icon: IconType;
  title: string;
  description: string;
};

export type FreelanceTaxFeaturesData = {
  header: {
    badge: string;
    title: string;
    description: string;
  };
  features: FreelanceTaxFeature[];
};

export const freelanceTaxFeaturesData: FreelanceTaxFeaturesData = {
  header: {
    badge: "Features",
    title: "Everything You Need to Understand Your Freelance Tax",
    description:
      "A fast, transparent, and accurate Pakistan freelance income tax calculator — built for IT exporters and digital freelancers earning in foreign currency.",
  },
  features: [
    {
      icon: FaBolt,
      title: "Instant Calculation",
      description:
        "Enter your monthly income and toggle your PSEB status — see your full tax breakdown instantly with no page reloads.",
    },
    {
      icon: FaChartPie,
      title: "Visual Breakdown",
      description:
        "See a donut chart of take-home vs tax, and a bar chart of your net income across all 12 months.",
    },
    {
      icon: FaShuffle,
      title: "PSEB vs Non-PSEB Comparison",
      description:
        "Toggle between PSEB registered (0.25%) and unregistered (1%) in one click to see the exact PKR difference in your pocket.",
    },
    {
      icon: FaUserCheck,
      title: "Who Qualifies Section",
      description:
        "Clear guidance on who this tool applies to — IT exporters vs local service providers — so you use the right calculator.",
    },
    {
      icon: FaCalendarDays,
      title: "Multi-Year Support",
      description:
        "Switch between FY 2025-26 and 2024-25 to compare how freelance tax rates have applied year over year.",
    },
    {
      icon: FaShieldAlt,
      title: "100% Private",
      description:
        "All calculations happen entirely in your browser. Your income figures are never sent to any server.",
    },
  ],
};

export type FreelanceTaxHeaderData = {
  title: string;
  subtitle: string;
  icon: StaticImageData;
  alt: string;
};

export const freelanceTaxHeaderData: FreelanceTaxHeaderData = {
  title: "Freelance Tax Calculator",
  subtitle: "Pakistan FBR",
  icon: freelanceTaxIcon,
  alt: "Pakistan Freelance Tax Calculator icon",
};

export type FreelanceTaxMetaData = {
  title: string;
  description: string;
  url: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    type: string;
  };
};

export const freelanceTaxMetaData: FreelanceTaxMetaData = {
  title:
    "Pakistan Freelance Tax Calculator 2025-26 | PSEB 0.25% & FBR Section 154A",
  description:
    "Calculate your Pakistan freelance income tax for FY 2025-26. PSEB-registered freelancers pay 0.25%, non-registered pay 1% on foreign income under FBR Section 154A. Instant breakdown with visual charts.",
  url: "/tools/freelance-tax-calculator",
  image: {
    src: "/assets/freelance_tax_calculator_icon.png",
    alt: "Pakistan Freelance Tax Calculator",
    width: 300,
    height: 300,
    type: "image/png",
  },
};
