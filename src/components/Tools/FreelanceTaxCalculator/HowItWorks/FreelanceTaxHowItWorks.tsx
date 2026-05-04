import React from "react";
import { useColorPalette } from "@/contexts/useColorPalette";
import { FreelanceTaxResult, formatPKR } from "@/services/freelanceTaxService";
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

interface FreelanceTaxHowItWorksProps {
  result: FreelanceTaxResult | null;
}

const FreelanceTaxHowItWorks: React.FC<FreelanceTaxHowItWorksProps> = ({ result }) => {
  const { palette } = useColorPalette();

  const steps = result
    ? [
        {
          title: "Annualise Your Monthly Income",
          description: "Multiply your monthly gross income by 12 to get your total annual gross income.",
          formula: `${formatPKR(result.monthlyIncome)} × 12 = ${formatPKR(result.annualGross)} per year`,
        },
        {
          title: "Determine Your Tax Rate",
          description: result.isPSEB
            ? "You are PSEB registered, so your Section 154A withholding tax rate is 0.25% of gross income."
            : "You are not PSEB registered, so your Section 154A withholding tax rate is 1% of gross income.",
          formula: `Rate = ${(result.yearData.psebRate * 100).toFixed(2)}% (PSEB) vs ${(result.yearData.nonPsebRate * 100).toFixed(0)}% (Non-PSEB) → Applying: ${result.effectiveTaxRate.toFixed(2)}%`,
        },
        {
          title: "Calculate Annual Tax",
          description: `Apply your flat ${result.effectiveTaxRate.toFixed(2)}% rate to your full annual gross income. There are no deductions or brackets.`,
          formula: `${formatPKR(result.annualGross)} × ${result.effectiveTaxRate.toFixed(2)}% = ${formatPKR(result.annualTax)}`,
        },
        {
          title: "Monthly Tax Deduction",
          description:
            "Your bank deducts the withholding tax at source each month when a foreign remittance is credited. This is the monthly equivalent.",
          formula: `${formatPKR(result.annualTax)} ÷ 12 = ${formatPKR(result.monthlyTax)} per month`,
        },
        {
          title: "Monthly Take-Home Pay",
          description:
            "Subtract the monthly tax deduction from your gross income to get your net take-home pay each month.",
          formula: `${formatPKR(result.monthlyIncome)} − ${formatPKR(result.monthlyTax)} = ${formatPKR(result.monthlyTakeHome)} per month`,
        },
      ]
    : [
        {
          title: "Annualise Your Monthly Income",
          description: "Multiply your monthly gross income by 12 to get your total annual gross income.",
          formula: "Monthly Income × 12 = Annual Gross Income",
        },
        {
          title: "Determine Your Tax Rate",
          description:
            "PSEB-registered freelancers pay 0.25%. Non-registered freelancers pay 1%. Toggle your status in the calculator above.",
          formula: "PSEB: 0.25% | Non-PSEB: 1%",
        },
        {
          title: "Calculate Annual Tax",
          description:
            "Apply the flat rate to your full annual gross income. Unlike salaried tax, there are no progressive slabs or expense deductions.",
          formula: "Annual Tax = Annual Gross × Rate",
        },
        {
          title: "Monthly Tax Deduction",
          description:
            "Your bank deducts the withholding tax at source each month when the foreign remittance arrives.",
          formula: "Monthly Tax = Annual Tax ÷ 12",
        },
        {
          title: "Monthly Take-Home Pay",
          description:
            "Subtract the monthly tax from your gross income to arrive at your net take-home amount.",
          formula: "Monthly Take-Home = Monthly Income − Monthly Tax",
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
              ? `Here is exactly how your freelance income tax is calculated using your income of ${formatPKR(result.monthlyIncome)}/month at the ${result.effectiveTaxRate.toFixed(2)}% rate (${result.isPSEB ? "PSEB registered" : "not PSEB registered"}).`
              : "Enter your monthly income above and these steps will update with your actual numbers."}
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

export default FreelanceTaxHowItWorks;
