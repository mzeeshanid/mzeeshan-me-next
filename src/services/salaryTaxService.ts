import { taxYears, TaxYearData, TaxSlab, CURRENT_TAX_YEAR } from "@/data/tools/salaryTaxCalculator/salaryTaxSlabsData";

export type SlabBreakdown = {
  slabLabel: string;
  taxableAmount: number;
  rate: number;
  taxAmount: number;
};

export type TaxCalculationResult = {
  monthlyIncome: number;
  annualGross: number;
  annualTax: number;
  monthlyTax: number;
  annualTakeHome: number;
  monthlyTakeHome: number;
  effectiveTaxRate: number;
  slabIndex: number;
  slabBreakdown: SlabBreakdown[];
};

export const formatPKR = (amount: number): string => {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
};

export const formatNumber = (amount: number): string => {
  return new Intl.NumberFormat("en-PK", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
};

const findSlabIndex = (annualIncome: number, slabs: TaxSlab[]): number => {
  for (let i = slabs.length - 1; i >= 0; i--) {
    if (annualIncome > slabs[i].min) return i;
  }
  return 0;
};

const buildSlabBreakdown = (annualIncome: number, slabs: TaxSlab[]): SlabBreakdown[] => {
  const breakdown: SlabBreakdown[] = [];

  for (let i = 0; i < slabs.length; i++) {
    const slab = slabs[i];
    if (annualIncome <= slab.min) break;

    const upperBound = slab.max === null ? annualIncome : Math.min(annualIncome, slab.max);
    const taxableInSlab = upperBound - slab.excessOver;

    if (taxableInSlab <= 0) continue;

    const taxInSlab = taxableInSlab * slab.rate;

    const maxDisplay = slab.max === null ? "and above" : `– ${formatPKR(slab.max)}`;
    breakdown.push({
      slabLabel: `${formatPKR(slab.min === 0 ? 0 : slab.min + 1)} ${maxDisplay}`,
      taxableAmount: taxableInSlab,
      rate: slab.rate * 100,
      taxAmount: slab.fixedTax > 0 && i === findSlabIndex(annualIncome, slabs) ? slab.fixedTax + taxInSlab - slab.fixedTax : taxInSlab,
    });
  }

  return breakdown;
};

export const calculateAnnualTax = (annualIncome: number, slabs: TaxSlab[]): number => {
  if (annualIncome <= 0) return 0;

  const slabIndex = findSlabIndex(annualIncome, slabs);
  const slab = slabs[slabIndex];
  const excess = annualIncome - slab.excessOver;
  return slab.fixedTax + excess * slab.rate;
};

export const calculateResults = (
  monthlyIncome: number,
  yearKey: string = CURRENT_TAX_YEAR
): TaxCalculationResult => {
  const yearData: TaxYearData = taxYears.find((y) => y.year === yearKey) ?? taxYears[0];
  const annualGross = monthlyIncome * 12;
  const annualTax = calculateAnnualTax(annualGross, yearData.slabs);
  const monthlyTax = annualTax / 12;
  const annualTakeHome = annualGross - annualTax;
  const monthlyTakeHome = monthlyIncome - monthlyTax;
  const effectiveTaxRate = annualGross > 0 ? (annualTax / annualGross) * 100 : 0;
  const slabIndex = findSlabIndex(annualGross, yearData.slabs);
  const slabBreakdown = buildSlabBreakdown(annualGross, yearData.slabs);

  return {
    monthlyIncome,
    annualGross,
    annualTax,
    monthlyTax,
    annualTakeHome,
    monthlyTakeHome,
    effectiveTaxRate,
    slabIndex,
    slabBreakdown,
  };
};

export { taxYears, CURRENT_TAX_YEAR };
export type { TaxYearData, TaxSlab };
