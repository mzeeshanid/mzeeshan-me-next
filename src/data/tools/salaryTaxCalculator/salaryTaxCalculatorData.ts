import type { StaticImageData } from "next/image";
import { IconType } from "react-icons";
import { FaBolt, FaChartPie, FaLayerGroup, FaShieldAlt } from "react-icons/fa";
import { FaCalendarDays, FaTableCells } from "react-icons/fa6";
import salaryTaxIcon from "public/assets/salary_tax_calculator_icon.png";

export type SalaryTaxFeature = {
  icon: IconType;
  title: string;
  description: string;
};

export type SalaryTaxFeaturesData = {
  header: {
    badge: string;
    title: string;
    description: string;
  };
  features: SalaryTaxFeature[];
};

export const salaryTaxFeaturesData: SalaryTaxFeaturesData = {
  header: {
    badge: "Features",
    title: "Everything You Need to Understand Your Tax",
    description:
      "An accurate, transparent, and easy-to-use Pakistan salary tax calculator — built to help salaried employees understand exactly what they earn and what they owe.",
  },
  features: [
    {
      icon: FaBolt,
      title: "Instant Calculation",
      description:
        "Enter your monthly salary and get a full tax breakdown instantly — no button clicks, no page reloads.",
    },
    {
      icon: FaChartPie,
      title: "Visual Breakdown",
      description:
        "See a donut chart showing your take-home vs tax split, and a bar chart of your monthly net salary across the year.",
    },
    {
      icon: FaTableCells,
      title: "Tax Slab Highlighting",
      description:
        "The full FBR slab table is shown for the selected year, with your applicable slab highlighted so you know exactly where you stand.",
    },
    {
      icon: FaLayerGroup,
      title: "Step-by-Step Walkthrough",
      description:
        "See the exact calculation steps using your own numbers — annual income, slab identification, fixed tax, and marginal tax.",
    },
    {
      icon: FaCalendarDays,
      title: "Multi-Year Support",
      description:
        "Switch between FY 2025-26, 2024-25, and 2023-24 to compare how tax rates have changed year over year.",
    },
    {
      icon: FaShieldAlt,
      title: "100% Private",
      description:
        "All calculations happen entirely in your browser. Your salary figures are never sent to any server.",
    },
  ],
};

export type SalaryTaxHeaderData = {
  title: string;
  subtitle: string;
  icon: StaticImageData;
  alt: string;
};

export const salaryTaxHeaderData: SalaryTaxHeaderData = {
  title: "Salary Tax Calculator",
  subtitle: "Pakistan FBR",
  icon: salaryTaxIcon,
  alt: "Pakistan Salary Tax Calculator icon",
};

export type SalaryTaxMetaData = {
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

export const salaryTaxMetaData: SalaryTaxMetaData = {
  title:
    "Pakistan Salary Tax Calculator 2025-26 | FBR Net Take-Home Pay | mzeeshan.me",
  description:
    "Calculate your exact net take-home salary for FY 2025-26. See monthly tax deductions, annual tax, and effective rate based on the latest FBR income tax slabs for salaried individuals in Pakistan. Supports 2025-26, 2024-25, and 2023-24.",
  url: "/tools/salary-tax-calculator",
  image: {
    src: "/assets/salary_tax_calculator_icon.png",
    alt: "Pakistan Salary Tax Calculator",
    width: 300,
    height: 300,
    type: "image/png",
  },
};
