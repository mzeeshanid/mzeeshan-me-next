export type TaxSlab = {
  min: number;
  max: number | null;
  fixedTax: number;
  rate: number;
  excessOver: number;
};

export type TaxYearData = {
  year: string;
  label: string;
  urlSlug: string;
  effectiveFrom: string;
  effectiveTo: string;
  isUpcoming?: boolean;
  slabs: TaxSlab[];
};

export const CURRENT_TAX_YEAR = "2026-27";
export const UPCOMING_BUDGET_ANNOUNCEMENT = "June 12, 2026";

// To add a new fiscal year: prepend a new object to this array and update CURRENT_TAX_YEAR.
export const taxYears: TaxYearData[] = [
  {
    year: "2026-27",
    label: "FY 2026-27 (Current)",
    urlSlug: "salary-tax-calculator-2026-2027-pakistan",
    effectiveFrom: "July 1, 2026",
    effectiveTo: "June 30, 2027",
    isUpcoming: true,
    // Budget not announced yet — using FY 2025-26 slabs as placeholder
    slabs: [
      { min: 0,         max: 600000,   fixedTax: 0,         rate: 0.00, excessOver: 0 },
      { min: 600000,    max: 1200000,  fixedTax: 0,         rate: 0.01, excessOver: 600000 },
      { min: 1200000,   max: 2200000,  fixedTax: 6000,      rate: 0.11, excessOver: 1200000 },
      { min: 2200000,   max: 3200000,  fixedTax: 116000,    rate: 0.23, excessOver: 2200000 },
      { min: 3200000,   max: 4100000,  fixedTax: 346000,    rate: 0.30, excessOver: 3200000 },
      { min: 4100000,   max: null,     fixedTax: 616000,    rate: 0.35, excessOver: 4100000 },
    ],
  },
  {
    year: "2025-26",
    label: "FY 2025-26",
    urlSlug: "salary-tax-calculator-2025-2026-pakistan",
    effectiveFrom: "July 1, 2025",
    effectiveTo: "June 30, 2026",
    slabs: [
      { min: 0,         max: 600000,   fixedTax: 0,         rate: 0.00, excessOver: 0 },
      { min: 600000,    max: 1200000,  fixedTax: 0,         rate: 0.01, excessOver: 600000 },
      { min: 1200000,   max: 2200000,  fixedTax: 6000,      rate: 0.11, excessOver: 1200000 },
      { min: 2200000,   max: 3200000,  fixedTax: 116000,    rate: 0.23, excessOver: 2200000 },
      { min: 3200000,   max: 4100000,  fixedTax: 346000,    rate: 0.30, excessOver: 3200000 },
      { min: 4100000,   max: null,     fixedTax: 616000,    rate: 0.35, excessOver: 4100000 },
    ],
  },
  {
    year: "2024-25",
    label: "FY 2024-25",
    urlSlug: "salary-tax-calculator-2024-2025-pakistan",
    effectiveFrom: "July 1, 2024",
    effectiveTo: "June 30, 2025",
    slabs: [
      { min: 0,         max: 600000,   fixedTax: 0,         rate: 0.00, excessOver: 0 },
      { min: 600000,    max: 1200000,  fixedTax: 0,         rate: 0.05, excessOver: 600000 },
      { min: 1200000,   max: 2200000,  fixedTax: 30000,     rate: 0.15, excessOver: 1200000 },
      { min: 2200000,   max: 3200000,  fixedTax: 180000,    rate: 0.25, excessOver: 2200000 },
      { min: 3200000,   max: 4100000,  fixedTax: 430000,    rate: 0.30, excessOver: 3200000 },
      { min: 4100000,   max: null,     fixedTax: 700000,    rate: 0.35, excessOver: 4100000 },
    ],
  },
  {
    year: "2023-24",
    label: "FY 2023-24",
    urlSlug: "salary-tax-calculator-2023-2024-pakistan",
    effectiveFrom: "July 1, 2023",
    effectiveTo: "June 30, 2024",
    slabs: [
      { min: 0,         max: 600000,   fixedTax: 0,         rate: 0.00,  excessOver: 0 },
      { min: 600000,    max: 1200000,  fixedTax: 0,         rate: 0.025, excessOver: 600000 },
      { min: 1200000,   max: 2400000,  fixedTax: 15000,     rate: 0.125, excessOver: 1200000 },
      { min: 2400000,   max: 3600000,  fixedTax: 165000,    rate: 0.225, excessOver: 2400000 },
      { min: 3600000,   max: 6000000,  fixedTax: 435000,    rate: 0.275, excessOver: 3600000 },
      { min: 6000000,   max: null,     fixedTax: 1095000,   rate: 0.35,  excessOver: 6000000 },
    ],
  },
];
