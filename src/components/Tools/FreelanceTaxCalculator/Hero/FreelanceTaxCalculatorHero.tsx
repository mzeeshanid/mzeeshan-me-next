import React, { useCallback, useEffect, useState } from "react";
import { useColorPalette } from "@/contexts/useColorPalette";
import {
  calculateFreelanceTax,
  formatPKR,
  FreelanceTaxResult,
} from "@/services/freelanceTaxService";
import { freelanceTaxYears, CURRENT_FREELANCE_TAX_YEAR } from "@/data/tools/freelanceTaxCalculator";
import {
  Box,
  GridItem,
  Heading,
  HStack,
  Input,
  NativeSelect,
  SegmentGroup,
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

const ResultCard: React.FC<ResultCardProps> = ({ icon, label, value, sub, palette, accent }) => (
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

interface FreelanceTaxCalculatorHeroProps {
  onResultChange?: (result: FreelanceTaxResult | null) => void;
  onYearChange?: (year: string) => void;
  onPSEBChange?: (isPSEB: boolean) => void;
}

const FreelanceTaxCalculatorHero: React.FC<FreelanceTaxCalculatorHeroProps> = ({
  onResultChange,
  onYearChange,
  onPSEBChange,
}) => {
  const { palette } = useColorPalette();
  const [monthlyIncome, setMonthlyIncome] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>(CURRENT_FREELANCE_TAX_YEAR);
  const [isPSEB, setIsPSEB] = useState<boolean>(false);
  const [result, setResult] = useState<FreelanceTaxResult | null>(null);

  const compute = useCallback(
    (income: string, year: string, pseb: boolean) => {
      const parsed = parseFloat(income.replace(/,/g, ""));
      if (!isNaN(parsed) && parsed > 0) {
        const res = calculateFreelanceTax(parsed, year, pseb);
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
    compute(monthlyIncome, selectedYear, isPSEB);
  }, [monthlyIncome, selectedYear, isPSEB, compute]);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
    onYearChange?.(e.target.value);
  };

  const handlePSEBChange = (val: string) => {
    const pseb = val === "pseb";
    setIsPSEB(pseb);
    onPSEBChange?.(pseb);
  };

  const selectedYearData = freelanceTaxYears.find((y) => y.year === selectedYear);

  return (
    <Box as="section">
      <VStack align="stretch" gap={6}>
        <VStack align="flex-start" gap={3}>
          <Tag.Root variant="surface" colorPalette={palette} size={{ base: "lg", md: "xl" }}>
            <Tag.Label>Pakistan Freelance Tax Calculator</Tag.Label>
          </Tag.Root>
          <Heading
            as="h1"
            fontWeight="bold"
            fontSize={{ base: "2xl", md: "4xl" }}
            lineHeight="normal"
          >
            Know Your Freelance Take-Home Pay
          </Heading>
          <Text color="fg.muted" maxW="2xl">
            Enter your monthly gross income in PKR to instantly see your net take-home, monthly tax
            deduction, and effective tax rate — under FBR Section 154A for IT service exporters.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} maxW="3xl">
          <Box>
            <Text fontWeight="semibold" mb={2} fontSize="sm">
              Monthly Gross Income (PKR)
            </Text>
            <Input
              type="number"
              placeholder="e.g. 100000"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              size="lg"
              min={0}
            />
            <Text fontSize="xs" color="fg.muted" mt={1}>
              Enter your monthly income before any deductions
            </Text>
          </Box>

          <Box>
            <Text fontWeight="semibold" mb={2} fontSize="sm">
              Tax Year
            </Text>
            <NativeSelect.Root size="lg">
              <NativeSelect.Field value={selectedYear} onChange={handleYearChange}>
                {freelanceTaxYears.map((y) => (
                  <option key={y.year} value={y.year}>
                    {y.label}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            {selectedYearData && (
              <Text fontSize="xs" color="fg.muted" mt={1}>
                {selectedYearData.effectiveFrom} – {selectedYearData.effectiveTo}
              </Text>
            )}
          </Box>

          <Box>
            <Text fontWeight="semibold" mb={2} fontSize="sm">
              PSEB Registration Status
            </Text>
            <SegmentGroup.Root
              value={isPSEB ? "pseb" : "non-pseb"}
              onValueChange={(e) => e.value && handlePSEBChange(e.value)}
              size="lg"
            >
              <SegmentGroup.Indicator />
              <SegmentGroup.Item value="non-pseb">
                <SegmentGroup.ItemText>Not Registered (1%)</SegmentGroup.ItemText>
                <SegmentGroup.ItemHiddenInput />
              </SegmentGroup.Item>
              <SegmentGroup.Item value="pseb">
                <SegmentGroup.ItemText>PSEB Registered (0.25%)</SegmentGroup.ItemText>
                <SegmentGroup.ItemHiddenInput />
              </SegmentGroup.Item>
            </SegmentGroup.Root>
            <Text fontSize="xs" color="fg.muted" mt={1}>
              PSEB reduces your rate from 1% to 0.25%
            </Text>
          </Box>
        </SimpleGrid>

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
              sub={result.isPSEB ? "PSEB registered rate" : "Standard rate"}
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
              Enter your monthly income above to see your tax breakdown.
            </Text>
          </Box>
        )}

        <Spacer p={1} />
      </VStack>
    </Box>
  );
};

export default FreelanceTaxCalculatorHero;
