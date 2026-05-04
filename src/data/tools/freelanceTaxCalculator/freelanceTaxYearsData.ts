export type FreelanceTaxYearData = {
  year: string;
  label: string;
  effectiveFrom: string;
  effectiveTo: string;
  psebRate: number;
  nonPsebRate: number;
};

export const CURRENT_FREELANCE_TAX_YEAR = "2025-26";

export const freelanceTaxYears: FreelanceTaxYearData[] = [
  {
    year: "2025-26",
    label: "FY 2025-26 (Current)",
    effectiveFrom: "July 1, 2025",
    effectiveTo: "June 30, 2026",
    psebRate: 0.0025,
    nonPsebRate: 0.01,
  },
  {
    year: "2024-25",
    label: "FY 2024-25",
    effectiveFrom: "July 1, 2024",
    effectiveTo: "June 30, 2025",
    psebRate: 0.0025,
    nonPsebRate: 0.01,
  },
];
