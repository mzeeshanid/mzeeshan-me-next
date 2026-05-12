import { useColorPalette } from "@/contexts/useColorPalette";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { Box, Table, Text, VStack } from "@chakra-ui/react";
import React from "react";

type CellValue = true | false | string;

type ComparisonRow = {
  feature: string;
  ours: CellValue;
  colorhexa: CellValue;
  htmlcolorcodes: CellValue;
  rapidtables: CellValue;
};

const ROWS: ComparisonRow[] = [
  { feature: "HEX, RGB, HSL support",      ours: true,           colorhexa: true,      htmlcolorcodes: true,      rapidtables: true },
  { feature: "HSV / HSB support",           ours: true,           colorhexa: true,      htmlcolorcodes: false,     rapidtables: true },
  { feature: "Live color preview swatch",   ours: true,           colorhexa: "Partial", htmlcolorcodes: "Partial", rapidtables: false },
  { feature: "WCAG contrast checker",       ours: true,           colorhexa: "Partial", htmlcolorcodes: false,     rapidtables: false },
  { feature: "Color harmony swatches",      ours: true,           colorhexa: true,      htmlcolorcodes: false,     rapidtables: false },
  { feature: "CSS named color match",       ours: true,           colorhexa: true,      htmlcolorcodes: false,     rapidtables: false },
  { feature: "Code examples",               ours: "6 languages",  colorhexa: false,     htmlcolorcodes: false,     rapidtables: false },
  { feature: "How It Works (formulas)",     ours: true,           colorhexa: false,     htmlcolorcodes: false,     rapidtables: false },
  { feature: "Dark mode",                   ours: true,           colorhexa: false,     htmlcolorcodes: false,     rapidtables: false },
  { feature: "Mobile optimized",            ours: true,           colorhexa: "Partial", htmlcolorcodes: "Partial", rapidtables: "Partial" },
  { feature: "Browser-only (no upload)",    ours: true,           colorhexa: true,      htmlcolorcodes: true,      rapidtables: true },
];

function CellDisplay({ value, isOurs }: { value: CellValue; isOurs?: boolean }) {
  const { palette } = useColorPalette();

  if (value === true) {
    return (
      <Text fontSize="sm" fontWeight="semibold" color={isOurs ? `${palette}.fg` : "green.fg"}>
        ✓
      </Text>
    );
  }
  if (value === false) {
    return <Text fontSize="sm" color="fg.subtle">—</Text>;
  }
  return (
    <Text fontSize="xs" color={isOurs ? `${palette}.fg` : "fg.muted"} fontWeight={isOurs ? "medium" : "normal"}>
      {value}
    </Text>
  );
}

const ColorConverterComparison: React.FC = () => {
  const { palette } = useColorPalette();

  return (
    <Box as="section">
      <VStack align="flex-start" gap={6}>
        <SectionHeader
          tagline="How We Compare"
          headline="vs. colorhexa.com, htmlcolorcodes.com & rapidtables.com"
          description="A side-by-side look at features across the most popular online color conversion tools, based on publicly available capabilities."
        />

        <Table.ScrollArea borderWidth="1px" borderRadius="md" w="full">
          <Table.Root size="sm">
            <Table.Header>
              <Table.Row bg="bg.subtle">
                <Table.ColumnHeader fontWeight="semibold" fontSize="xs" textTransform="uppercase" letterSpacing="wider" minW="220px">
                  Feature
                </Table.ColumnHeader>
                <Table.ColumnHeader fontWeight="bold" fontSize="xs" textTransform="uppercase" letterSpacing="wider" color={`${palette}.fg`} textAlign="center" minW="130px">
                  mzeeshan.me
                </Table.ColumnHeader>
                <Table.ColumnHeader fontWeight="semibold" fontSize="xs" textTransform="uppercase" letterSpacing="wider" color="fg.muted" textAlign="center" minW="130px">
                  colorhexa.com
                </Table.ColumnHeader>
                <Table.ColumnHeader fontWeight="semibold" fontSize="xs" textTransform="uppercase" letterSpacing="wider" color="fg.muted" textAlign="center" minW="160px">
                  htmlcolorcodes.com
                </Table.ColumnHeader>
                <Table.ColumnHeader fontWeight="semibold" fontSize="xs" textTransform="uppercase" letterSpacing="wider" color="fg.muted" textAlign="center" minW="130px">
                  rapidtables.com
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {ROWS.map((row) => (
                <Table.Row key={row.feature}>
                  <Table.Cell fontSize="sm" color="fg">{row.feature}</Table.Cell>
                  <Table.Cell textAlign="center"><CellDisplay value={row.ours} isOurs /></Table.Cell>
                  <Table.Cell textAlign="center"><CellDisplay value={row.colorhexa} /></Table.Cell>
                  <Table.Cell textAlign="center"><CellDisplay value={row.htmlcolorcodes} /></Table.Cell>
                  <Table.Cell textAlign="center"><CellDisplay value={row.rapidtables} /></Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>

        <Text fontSize="xs" color="fg.subtle">
          Comparison based on publicly available features as of 2025. Feature availability may change over time.
        </Text>
      </VStack>
    </Box>
  );
};

export default ColorConverterComparison;
