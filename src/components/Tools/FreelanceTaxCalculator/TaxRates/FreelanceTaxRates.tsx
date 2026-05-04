import React from "react";
import { useColorPalette } from "@/contexts/useColorPalette";
import { freelanceTaxYears } from "@/data/tools/freelanceTaxCalculator";
import {
  Badge,
  Box,
  Heading,
  Table,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";

interface FreelanceTaxRatesProps {
  selectedYear: string;
  isPSEB: boolean;
}

const FreelanceTaxRates: React.FC<FreelanceTaxRatesProps> = ({ selectedYear, isPSEB }) => {
  const { palette } = useColorPalette();
  const yearData = freelanceTaxYears.find((y) => y.year === selectedYear) ?? freelanceTaxYears[0];

  const rows = [
    {
      status: "PSEB Registered",
      rate: yearData.psebRate,
      description: "IT exporters registered with Pakistan Software Export Board",
      isActive: isPSEB,
    },
    {
      status: "Not PSEB Registered",
      rate: yearData.nonPsebRate,
      description: "Freelancers exporting services without PSEB registration",
      isActive: !isPSEB,
    },
  ];

  return (
    <Box as="section">
      <VStack align="stretch" gap={6}>
        <VStack align="flex-start" gap={3}>
          <Tag.Root variant="surface" colorPalette={palette} size={{ base: "lg", md: "xl" }}>
            <Tag.Label>Tax Rates</Tag.Label>
          </Tag.Root>
          <Heading
            as="h2"
            fontWeight="bold"
            fontSize={{ base: "2xl", md: "4xl" }}
            lineHeight="normal"
          >
            Section 154A Withholding Tax Rates — {yearData.label}
          </Heading>
          <Text color="fg.muted">
            Pakistan freelancers exporting IT services to foreign clients pay a flat withholding tax
            on their gross foreign income under Section 154A of the Income Tax Ordinance. The rate
            depends solely on PSEB registration status — there are no progressive slabs.
          </Text>
        </VStack>

        <Box overflowX="auto" borderRadius="xl" borderWidth="1px" borderColor="border">
          <Table.Root size="md">
            <Table.Header>
              <Table.Row bg="bg.muted">
                <Table.ColumnHeader>Registration Status</Table.ColumnHeader>
                <Table.ColumnHeader>Tax Rate</Table.ColumnHeader>
                <Table.ColumnHeader>Tax Type</Table.ColumnHeader>
                <Table.ColumnHeader>Description</Table.ColumnHeader>
                <Table.ColumnHeader>Your Status</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {rows.map((row, index) => (
                <Table.Row
                  key={index}
                  bg={row.isActive ? `${palette}.subtle` : undefined}
                  fontWeight={row.isActive ? "semibold" : undefined}
                >
                  <Table.Cell>{row.status}</Table.Cell>
                  <Table.Cell>{(row.rate * 100).toFixed(2)}%</Table.Cell>
                  <Table.Cell>Final Withholding Tax</Table.Cell>
                  <Table.Cell color="fg.muted" fontSize="sm">
                    {row.description}
                  </Table.Cell>
                  <Table.Cell>
                    {row.isActive ? (
                      <Badge colorPalette={palette} variant="solid" size="sm">
                        Your rate
                      </Badge>
                    ) : (
                      <Text color="fg.muted" fontSize="sm">
                        —
                      </Text>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>

        <Text fontSize="sm" color="fg.muted">
          Source: Federal Board of Revenue (FBR) — Finance Act {yearData.year}, Section 154A.
          Effective {yearData.effectiveFrom} to {yearData.effectiveTo}.
        </Text>
      </VStack>
    </Box>
  );
};

export default FreelanceTaxRates;
