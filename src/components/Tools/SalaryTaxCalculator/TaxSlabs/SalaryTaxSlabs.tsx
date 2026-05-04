import React from "react";
import { useColorPalette } from "@/contexts/useColorPalette";
import { taxYears } from "@/data/tools/salaryTaxCalculator";
import { formatPKR } from "@/services/salaryTaxService";
import {
  Badge,
  Box,
  Heading,
  Table,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";

interface SalaryTaxSlabsProps {
  selectedYear: string;
  activeSlabIndex: number | null;
}

const SalaryTaxSlabs: React.FC<SalaryTaxSlabsProps> = ({ selectedYear, activeSlabIndex }) => {
  const { palette } = useColorPalette();
  const yearData = taxYears.find((y) => y.year === selectedYear) ?? taxYears[0];

  const rateLabel = (rate: number, fixedTax: number, excessOver: number, index: number) => {
    if (rate === 0) return "Nil";
    const parts: string[] = [];
    if (fixedTax > 0) parts.push(`${formatPKR(fixedTax)} (fixed)`);
    parts.push(`${(rate * 100).toFixed(1)}% on amount exceeding ${formatPKR(excessOver)}`);
    return parts.join(" + ");
  };

  return (
    <Box as="section">
      <VStack align="stretch" gap={6}>
        <VStack align="flex-start" gap={3}>
          <Tag.Root variant="surface" colorPalette={palette} size={{ base: "lg", md: "xl" }}>
            <Tag.Label>Tax Slabs</Tag.Label>
          </Tag.Root>
          <Heading
            as="h2"
            fontWeight="bold"
            fontSize={{ base: "2xl", md: "4xl" }}
            lineHeight="normal"
          >
            FBR Income Tax Slabs — {yearData.label}
          </Heading>
          <Text color="fg.muted">
            Pakistan uses a progressive slab system. Tax is applied incrementally — only the income
            within each bracket is taxed at that bracket&apos;s rate. Enter your salary above to
            see your applicable slab highlighted below.
          </Text>
        </VStack>

        <Box overflowX="auto" borderRadius="xl" borderWidth="1px" borderColor="border">
          <Table.Root size="md">
            <Table.Header>
              <Table.Row bg="bg.muted">
                <Table.ColumnHeader>Slab</Table.ColumnHeader>
                <Table.ColumnHeader>Annual Income Range</Table.ColumnHeader>
                <Table.ColumnHeader>Tax Rate</Table.ColumnHeader>
                <Table.ColumnHeader>Status</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {yearData.slabs.map((slab, index) => {
                const isActive = activeSlabIndex === index;
                const rangeLabel =
                  slab.max === null
                    ? `Above ${formatPKR(slab.min)}`
                    : `${formatPKR(slab.min === 0 ? 0 : slab.min + 1)} – ${formatPKR(slab.max)}`;

                return (
                  <Table.Row
                    key={index}
                    bg={isActive ? `${palette}.subtle` : undefined}
                    fontWeight={isActive ? "semibold" : undefined}
                  >
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{rangeLabel}</Table.Cell>
                    <Table.Cell>
                      {rateLabel(slab.rate, slab.fixedTax, slab.excessOver, index)}
                    </Table.Cell>
                    <Table.Cell>
                      {isActive ? (
                        <Badge colorPalette={palette} variant="solid" size="sm">
                          You are here
                        </Badge>
                      ) : (
                        <Text color="fg.muted" fontSize="sm">
                          —
                        </Text>
                      )}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Root>
        </Box>

        <Text fontSize="sm" color="fg.muted">
          Source: Federal Board of Revenue (FBR) — Finance Act {yearData.year}. Effective{" "}
          {yearData.effectiveFrom} to {yearData.effectiveTo}.
        </Text>
      </VStack>
    </Box>
  );
};

export default SalaryTaxSlabs;
