import { freelanceTaxYears, FreelanceTaxYearData } from "@/data/tools/freelanceTaxCalculator/freelanceTaxYearsData";

export type FreelanceTaxResult = {
  monthlyIncome: number;
  annualGross: number;
  annualTax: number;
  monthlyTax: number;
  annualTakeHome: number;
  monthlyTakeHome: number;
  effectiveTaxRate: number;
  isPSEB: boolean;
  yearData: FreelanceTaxYearData;
};

export function calculateFreelanceTax(
  monthlyIncome: number,
  yearKey: string,
  isPSEB: boolean
): FreelanceTaxResult {
  const yearData = freelanceTaxYears.find((y) => y.year === yearKey) ?? freelanceTaxYears[0];
  const rate = isPSEB ? yearData.psebRate : yearData.nonPsebRate;

  const annualGross = monthlyIncome * 12;
  const annualTax = annualGross * rate;
  const monthlyTax = annualTax / 12;
  const annualTakeHome = annualGross - annualTax;
  const monthlyTakeHome = monthlyIncome - monthlyTax;
  const effectiveTaxRate = rate * 100;

  return {
    monthlyIncome,
    annualGross,
    annualTax,
    monthlyTax,
    annualTakeHome,
    monthlyTakeHome,
    effectiveTaxRate,
    isPSEB,
    yearData,
  };
}

export function formatPKR(amount: number): string {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}
