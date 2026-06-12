import React, { useMemo } from "react";
import { useColorPalette } from "@/contexts/useColorPalette";
import { calculateResults, formatPKR, TaxCalculationResult } from "@/services/salaryTaxService";
import { TaxSlab, TaxYearData } from "@/data/tools/salaryTaxCalculator";
import { Box, Table, Text } from "@chakra-ui/react";

interface SalaryTaxComparisonProps {
  currentResult: TaxCalculationResult;
  currentYearData: TaxYearData;
  previousYearData: TaxYearData;
}

const slabDesc = (slab: TaxSlab, year: string): React.ReactNode => {
  if (slab.rate === 0) {
    return (
      <>
        <Text as="span" fontWeight="bold">FY {year}:</Text>{" "}
        your income falls in the <Text as="span" fontWeight="bold">0% tax bracket</Text> — no tax deducted.
      </>
    );
  }
  return (
    <>
      <Text as="span" fontWeight="bold">FY {year}:</Text>{" "}
      your top slab is <Text as="span" fontWeight="bold">{(slab.rate * 100).toFixed(0)}%</Text> on income
      above {formatPKR(slab.excessOver)} a year
      {slab.fixedTax > 0 ? <>, plus a fixed <Text as="span" fontWeight="bold">{formatPKR(slab.fixedTax)}</Text></> : null}.
    </>
  );
};

const diffText = (value: number): string => {
  const prefix = value > 0 ? "+" : value < 0 ? "−" : "";
  return `${prefix}${formatPKR(Math.abs(value))}`;
};

const SalaryTaxComparison: React.FC<SalaryTaxComparisonProps> = ({
  currentResult,
  currentYearData,
  previousYearData,
}) => {
  const { palette } = useColorPalette();

  const prevResult = useMemo(
    () => calculateResults(currentResult.monthlyIncome, previousYearData.year),
    [currentResult.monthlyIncome, previousYearData.year]
  );

  const monthlyTaxDiff = currentResult.monthlyTax - prevResult.monthlyTax;
  const monthlyTakeHomeDiff = currentResult.monthlyTakeHome - prevResult.monthlyTakeHome;
  const annualTaxDiff = currentResult.annualTax - prevResult.annualTax;
  const annualTakeHomeDiff = currentResult.annualTakeHome - prevResult.annualTakeHome;

  // Tax going down = green; take-home going up = green
  const taxDiffColor = monthlyTaxDiff <= 0 ? "green.fg" : "red.fg";
  const takeHomeDiffColor = monthlyTakeHomeDiff >= 0 ? "green.fg" : "red.fg";

  const prevSlab = previousYearData.slabs[prevResult.slabIndex];
  const currSlab = currentYearData.slabs[currentResult.slabIndex];

  return (
    <Box borderRadius="xl" borderWidth="1px" borderColor="border" overflow="hidden" maxW="2xl">
      <Table.Root size="md">
        <Table.Header>
          <Table.Row bg="bg.muted">
            <Table.ColumnHeader w="40%" />
            <Table.ColumnHeader textAlign="right" py={3}>
              <Text color="blue.fg" fontWeight="bold" fontSize="sm" lineHeight="1.2">
                FY {previousYearData.year}
              </Text>
              <Text color="blue.fg" fontSize="xs" fontWeight="normal">
                OUTGOING
              </Text>
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign="right" py={3}>
              <Text color="red.600" fontWeight="bold" fontSize="sm" lineHeight="1.2">
                FY {currentYearData.year}
              </Text>
              <Text color="red.600" fontSize="xs" fontWeight="normal">
                NEW
              </Text>
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign="right" py={3}>
              <Text fontSize="sm" fontWeight="bold">
                DIFFERENCE
              </Text>
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row bg={`${palette}.subtle`}>
            <Table.Cell colSpan={4} fontWeight="bold" color={`${palette}.fg`} py={2} fontSize="sm">
              Per month
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell color="fg.muted" fontSize="sm">
              Income tax
            </Table.Cell>
            <Table.Cell textAlign="right" fontSize="sm">
              {formatPKR(prevResult.monthlyTax)}
            </Table.Cell>
            <Table.Cell textAlign="right" fontSize="sm">
              {formatPKR(currentResult.monthlyTax)}
            </Table.Cell>
            <Table.Cell textAlign="right">
              <Text color={taxDiffColor} fontWeight="bold" fontSize="sm">
                {diffText(monthlyTaxDiff)}
              </Text>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell color="fg.muted" fontWeight="semibold" fontSize="sm">
              Take-home salary
            </Table.Cell>
            <Table.Cell textAlign="right" fontWeight="semibold" fontSize="sm">
              {formatPKR(prevResult.monthlyTakeHome)}
            </Table.Cell>
            <Table.Cell textAlign="right" fontWeight="semibold" fontSize="sm">
              {formatPKR(currentResult.monthlyTakeHome)}
            </Table.Cell>
            <Table.Cell textAlign="right">
              <Text color={takeHomeDiffColor} fontWeight="bold" fontSize="sm">
                {diffText(monthlyTakeHomeDiff)}
              </Text>
            </Table.Cell>
          </Table.Row>

          <Table.Row bg={`${palette}.subtle`}>
            <Table.Cell colSpan={4} fontWeight="bold" color={`${palette}.fg`} py={2} fontSize="sm">
              Per year
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell color="fg.muted" fontSize="sm">
              Income tax
            </Table.Cell>
            <Table.Cell textAlign="right" fontSize="sm">
              {formatPKR(prevResult.annualTax)}
            </Table.Cell>
            <Table.Cell textAlign="right" fontSize="sm">
              {formatPKR(currentResult.annualTax)}
            </Table.Cell>
            <Table.Cell textAlign="right">
              <Text color={taxDiffColor} fontWeight="bold" fontSize="sm">
                {diffText(annualTaxDiff)}
              </Text>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell color="fg.muted" fontWeight="semibold" fontSize="sm">
              Take-home salary
            </Table.Cell>
            <Table.Cell textAlign="right" fontWeight="semibold" fontSize="sm">
              {formatPKR(prevResult.annualTakeHome)}
            </Table.Cell>
            <Table.Cell textAlign="right" fontWeight="semibold" fontSize="sm">
              {formatPKR(currentResult.annualTakeHome)}
            </Table.Cell>
            <Table.Cell textAlign="right">
              <Text color={takeHomeDiffColor} fontWeight="bold" fontSize="sm">
                {diffText(annualTakeHomeDiff)}
              </Text>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>

      <Box px={4} py={3} borderTopWidth="1px" borderColor="border" bg="bg.subtle">
        <Text fontSize="sm" color="fg.muted" mb={1}>
          {slabDesc(prevSlab, previousYearData.year)}
        </Text>
        <Text fontSize="sm" color="fg.muted">
          {slabDesc(currSlab, currentYearData.year)}
        </Text>
      </Box>
    </Box>
  );
};

export default SalaryTaxComparison;
