export type PakTaxToolId = "salary" | "freelance";

export type PakTaxRelatedTool = {
  id: PakTaxToolId;
  label: string;
  path: string;
  description: string;
};

export const pakTaxRelatedToolsData: PakTaxRelatedTool[] = [
  {
    id: "salary",
    label: "Salary Tax Calculator",
    path: "/tools/salary-tax-calculator",
    description:
      "Calculate your net take-home salary for FY 2025-26 based on FBR salaried income tax slabs — with visual charts and step-by-step breakdown.",
  },
  {
    id: "freelance",
    label: "Freelance Tax Calculator",
    path: "/tools/freelance-tax-calculator",
    description:
      "Calculate your freelance income tax under PSEB (0.25%) or standard Section 154A (1%) withholding on foreign income.",
  },
];
