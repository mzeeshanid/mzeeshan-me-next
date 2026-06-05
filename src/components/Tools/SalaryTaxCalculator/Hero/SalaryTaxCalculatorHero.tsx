import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useColorPalette } from "@/contexts/useColorPalette";
import { calculateResults, formatPKR, TaxCalculationResult } from "@/services/salaryTaxService";
import { taxYears, CURRENT_TAX_YEAR, UPCOMING_BUDGET_ANNOUNCEMENT } from "@/data/tools/salaryTaxCalculator";
import {
  Alert,
  Box,
  createListCollection,
  Heading,
  HStack,
  Input,
  Portal,
  Select,
  SimpleGrid,
  Spacer,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaMoneyBillWave, FaPercentage, FaWallet } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { IconType } from "react-icons";

interface ResultCardProps {
  icon: IconType;
  label: string;
  value: string;
  sub?: string;
  palette: string;
  accent?: boolean;
}

const ResultCard: React.FC<ResultCardProps> = ({ icon, label, value, sub, palette, accent }) => {
  return (
    <Box
      p={5}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={accent ? `${palette}.emphasized` : "border"}
      bg={accent ? `${palette}.subtle` : "bg.panel"}
    >
      <VStack align="start" gap={2}>
        <HStack>
          <Box
            p={2}
            borderRadius="md"
            bg={accent ? `${palette}.muted` : `${palette}.subtle`}
          >
            {React.createElement(icon as React.ElementType, {
              color: `var(--chakra-colors-${palette}-fg)`,
              size: 16,
            })}
          </Box>
          <Text fontSize="sm" color="fg.muted" fontWeight="medium">
            {label}
          </Text>
        </HStack>
        <Text fontWeight="bold" fontSize={{ base: "xl", md: "2xl" }}>
          {value}
        </Text>
        {sub && (
          <Text fontSize="xs" color="fg.muted">
            {sub}
          </Text>
        )}
      </VStack>
    </Box>
  );
};

interface SalaryTaxCalculatorHeroProps {
  onResultChange?: (result: TaxCalculationResult | null) => void;
  onYearChange?: (year: string) => void;
  initialYear?: string;
}

const SalaryTaxCalculatorHero: React.FC<SalaryTaxCalculatorHeroProps> = ({
  onResultChange,
  onYearChange,
  initialYear,
}) => {
  const { palette } = useColorPalette();
  const [monthlyIncome, setMonthlyIncome] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>(initialYear ?? CURRENT_TAX_YEAR);
  const [result, setResult] = useState<TaxCalculationResult | null>(null);

  const taxYearCollection = useMemo(
    () =>
      createListCollection({
        items: taxYears.map((y) => ({ value: y.year, label: y.label })),
      }),
    []
  );

  const compute = useCallback(
    (income: string, year: string) => {
      const parsed = parseFloat(income.replace(/,/g, ""));
      if (!isNaN(parsed) && parsed > 0) {
        const res = calculateResults(parsed, year);
        setResult(res);
        onResultChange?.(res);
      } else {
        setResult(null);
        onResultChange?.(null);
      }
    },
    [onResultChange]
  );

  useEffect(() => {
    compute(monthlyIncome, selectedYear);
  }, [monthlyIncome, selectedYear, compute]);

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
    onYearChange?.(value);
  };

  const selectedYearData = taxYears.find((y) => y.year === selectedYear);
  const isUpcomingYear = selectedYearData?.isUpcoming ?? false;

  return (
    <Box as="section">
      <VStack align="stretch" gap={6}>
        <VStack align="flex-start" gap={3}>
          <Tag.Root variant="surface" colorPalette={palette} size={{ base: "lg", md: "xl" }}>
            <Tag.Label>Pakistan FBR Salary Tax Calculator</Tag.Label>
          </Tag.Root>
          <Heading
            as="h1"
            fontWeight="bold"
            fontSize={{ base: "2xl", md: "4xl" }}
            lineHeight="normal"
          >
            Know Your Take-Home Pay in Pakistan
          </Heading>
          <Text color="fg.muted" maxW="2xl">
            Enter your monthly gross salary to instantly see your net take-home pay, monthly tax
            deduction, and effective tax rate — based on the latest FBR income tax slabs for
            salaried individuals.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} maxW="2xl">
          <Box>
            <Text fontWeight="semibold" mb={2} fontSize="sm">
              Monthly Gross Salary (PKR)
            </Text>
            <Input
              type="number"
              placeholder="e.g. 100000"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              size="lg"
              h="12"
              min={0}
              colorPalette={palette}
            />
            <Text fontSize="xs" color="fg.muted" mt={1}>
              Enter your monthly salary before any deductions
            </Text>
          </Box>

          <Box>
            <Text fontWeight="semibold" mb={2} fontSize="sm">
              Tax Year
            </Text>
            <Select.Root
              collection={taxYearCollection}
              value={[selectedYear]}
              onValueChange={(e) => handleYearChange(e.value[0])}
              size="lg"
              colorPalette={palette}
            >
              <Select.HiddenSelect />
              <Select.Control h="12">
                <Select.Trigger h="full">
                  <Select.ValueText />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {taxYearCollection.items.map((item) => (
                      <Select.Item key={item.value} item={item}>
                        {item.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
            {selectedYearData && (
              <Text fontSize="xs" color="fg.muted" mt={1}>
                {selectedYearData.effectiveFrom} – {selectedYearData.effectiveTo}
              </Text>
            )}
          </Box>
        </SimpleGrid>

        {isUpcomingYear && (
          <Alert.Root status="warning" borderRadius="xl" maxW="2xl">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Estimated Calculations — Budget Not Announced Yet</Alert.Title>
              <Alert.Description>
                The official FY 2026-27 tax slabs will be announced on{" "}
                <strong>{UPCOMING_BUDGET_ANNOUNCEMENT}</strong>. These calculations use FY 2025-26
                rates as a placeholder. Actual rates may change — check back after the budget
                announcement for updated calculations.
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
        )}

        {result ? (
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={4}>
            <ResultCard
              icon={FaWallet}
              label="Monthly Take-Home"
              value={formatPKR(result.monthlyTakeHome)}
              sub={`Annual: ${formatPKR(result.annualTakeHome)}`}
              palette={palette}
              accent
            />
            <ResultCard
              icon={FaMoneyBillWave}
              label="Monthly Tax Deducted"
              value={formatPKR(result.monthlyTax)}
              sub={`Annual: ${formatPKR(result.annualTax)}`}
              palette={palette}
            />
            <ResultCard
              icon={FaCalendarDays}
              label="Annual Gross Income"
              value={formatPKR(result.annualGross)}
              sub="Before tax deduction"
              palette={palette}
            />
            <ResultCard
              icon={FaPercentage}
              label="Effective Tax Rate"
              value={`${result.effectiveTaxRate.toFixed(2)}%`}
              sub="Of your annual income"
              palette={palette}
            />
          </SimpleGrid>
        ) : (
          <Box
            p={6}
            borderRadius="xl"
            borderWidth="1px"
            borderColor="border"
            bg="bg.panel"
            textAlign="center"
          >
            <Text color="fg.muted">
              Enter your monthly salary above to see your tax breakdown.
            </Text>
          </Box>
        )}

        <Spacer p={1} />
      </VStack>
    </Box>
  );
};

export default SalaryTaxCalculatorHero;
