import React from "react";
import { useColorPalette } from "@/contexts/useColorPalette";
import { TaxCalculationResult, formatPKR } from "@/services/salaryTaxService";
import { taxYears } from "@/data/tools/salaryTaxCalculator";
import {
  Box,
  Heading,
  HStack,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";

interface StepProps {
  step: number;
  title: string;
  description: string;
  formula?: string;
  palette: string;
}

const Step: React.FC<StepProps> = ({ step, title, description, formula, palette }) => (
  <HStack align="flex-start" gap={4}>
    <Box
      minW="36px"
      h="36px"
      borderRadius="full"
      bg={`${palette}.subtle`}
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontWeight="bold"
      color={`${palette}.fg`}
      fontSize="sm"
      flexShrink={0}
    >
      {step}
    </Box>
    <VStack align="flex-start" gap={1}>
      <Text fontWeight="semibold">{title}</Text>
      <Text color="fg.muted" fontSize="sm">
        {description}
      </Text>
      {formula && (
        <Box
          px={3}
          py={2}
          mt={1}
          borderRadius="md"
          bg="bg.panel"
          borderWidth="1px"
          borderColor="border"
          fontFamily="mono"
          fontSize="sm"
        >
          {formula}
        </Box>
      )}
    </VStack>
  </HStack>
);

interface SalaryTaxHowItWorksProps {
  result: TaxCalculationResult | null;
  selectedYear: string;
}

const SalaryTaxHowItWorks: React.FC<SalaryTaxHowItWorksProps> = ({ result, selectedYear }) => {
  const { palette } = useColorPalette();
  const yearData = taxYears.find((y) => y.year === selectedYear) ?? taxYears[0];
  const slab = result ? yearData.slabs[result.slabIndex] : null;

  const steps = result && slab
    ? [
        {
          title: "Annualise Your Monthly Salary",
          description: `Multiply your monthly gross salary by 12 to get your annual taxable income.`,
          formula: `${formatPKR(result.monthlyIncome)} × 12 = ${formatPKR(result.annualGross)} per year`,
        },
        {
          title: "Identify Your Tax Slab",
          description: `FBR uses 6 progressive slabs. Your annual income of ${formatPKR(result.annualGross)} falls in Slab ${result.slabIndex + 1}.`,
          formula: `Annual income ${formatPKR(result.annualGross)} → Slab ${result.slabIndex + 1} (${formatPKR(slab.min === 0 ? 0 : slab.min + 1)} – ${slab.max ? formatPKR(slab.max) : "above"})`,
        },
        {
          title: "Calculate Fixed Tax",
          description:
            slab.fixedTax > 0
              ? `Your slab has a fixed tax of ${formatPKR(slab.fixedTax)} that applies at this income level.`
              : `Your slab has no fixed tax component — only a marginal rate applies.`,
          formula: `Fixed tax = ${formatPKR(slab.fixedTax)}`,
        },
        {
          title: "Calculate Marginal Tax",
          description: `Apply the ${(slab.rate * 100).toFixed(1)}% rate on the amount exceeding ${formatPKR(slab.excessOver)}.`,
          formula: `(${formatPKR(result.annualGross)} − ${formatPKR(slab.excessOver)}) × ${(slab.rate * 100).toFixed(1)}% = ${formatPKR((result.annualGross - slab.excessOver) * slab.rate)}`,
        },
        {
          title: "Total Annual Tax",
          description: "Add the fixed and marginal tax to get your annual tax liability.",
          formula: `${formatPKR(slab.fixedTax)} + ${formatPKR((result.annualGross - slab.excessOver) * slab.rate)} = ${formatPKR(result.annualTax)}`,
        },
        {
          title: "Monthly Deduction & Take-Home",
          description:
            "Divide annual tax by 12 for the monthly withholding. Subtract from your gross salary to get take-home pay.",
          formula: `${formatPKR(result.annualTax)} ÷ 12 = ${formatPKR(result.monthlyTax)}/month → Take-home: ${formatPKR(result.monthlyTakeHome)}/month`,
        },
      ]
    : [
        {
          title: "Annualise Your Monthly Salary",
          description: "Multiply your monthly gross salary by 12 to get your annual taxable income.",
          formula: "Monthly Salary × 12 = Annual Income",
        },
        {
          title: "Identify Your Tax Slab",
          description: "FBR uses 6 progressive slabs for salaried individuals. Find which range your annual income falls into.",
          formula: "Annual Income → Applicable Slab",
        },
        {
          title: "Calculate Fixed Tax",
          description: "Most slabs include a fixed PKR amount at the entry point of the bracket.",
          formula: "Fixed Tax = PKR amount defined in slab",
        },
        {
          title: "Calculate Marginal Tax",
          description: "Apply the slab's percentage rate to income exceeding the slab's lower boundary.",
          formula: "(Annual Income − Slab Floor) × Marginal Rate",
        },
        {
          title: "Total Annual Tax",
          description: "Add fixed and marginal tax amounts.",
          formula: "Annual Tax = Fixed Tax + Marginal Tax",
        },
        {
          title: "Monthly Deduction & Take-Home",
          description: "Divide annual tax by 12. Subtract from monthly gross to get take-home pay.",
          formula: "Monthly Tax = Annual Tax ÷ 12",
        },
      ];

  return (
    <Box as="section">
      <VStack align="stretch" gap={6}>
        <VStack align="flex-start" gap={3}>
          <Tag.Root variant="surface" colorPalette={palette} size={{ base: "lg", md: "xl" }}>
            <Tag.Label>How It&apos;s Calculated</Tag.Label>
          </Tag.Root>
          <Heading
            as="h2"
            fontWeight="bold"
            fontSize={{ base: "2xl", md: "4xl" }}
            lineHeight="normal"
          >
            Step-by-Step Tax Calculation
          </Heading>
          <Text color="fg.muted">
            {result
              ? `Here is exactly how your income tax is calculated using your salary of ${formatPKR(result.monthlyIncome)}/month under ${yearData.label} FBR slabs.`
              : "Enter your monthly salary above and these steps will update with your actual numbers."}
          </Text>
        </VStack>

        <VStack align="stretch" gap={5} pl={2}>
          {steps.map((step, idx) => (
            <Step
              key={idx}
              step={idx + 1}
              title={step.title}
              description={step.description}
              formula={step.formula}
              palette={palette}
            />
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default SalaryTaxHowItWorks;
