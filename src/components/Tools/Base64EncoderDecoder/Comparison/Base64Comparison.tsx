import { useColorPalette } from "@/contexts/useColorPalette";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import {
  Box,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

type CellValue = true | false | string;

type ComparisonRow = {
  feature: string;
  ours: CellValue;
  base64decode: CellValue;
  base64guru: CellValue;
  base64encode: CellValue;
};

const ROWS: ComparisonRow[] = [
  {
    feature: "Text Encode & Decode",
    ours: true,
    base64decode: true,
    base64guru: true,
    base64encode: true,
  },
  {
    feature: "Image to Base64",
    ours: true,
    base64decode: false,
    base64guru: true,
    base64encode: false,
  },
  {
    feature: "File Encoding & Decoding",
    ours: true,
    base64decode: false,
    base64guru: true,
    base64encode: false,
  },
  {
    feature: "HTML / CSS / Markdown Snippets",
    ours: true,
    base64decode: false,
    base64guru: false,
    base64encode: false,
  },
  {
    feature: "Base64URL Mode (JWT / OAuth)",
    ours: true,
    base64decode: false,
    base64guru: true,
    base64encode: false,
  },
  {
    feature: "Code Examples",
    ours: "7 languages",
    base64decode: false,
    base64guru: false,
    base64encode: false,
  },
  {
    feature: "Troubleshooting Guide",
    ours: true,
    base64decode: false,
    base64guru: false,
    base64encode: false,
  },
  {
    feature: "Browser-Only (No Upload)",
    ours: true,
    base64decode: false,
    base64guru: "Partial",
    base64encode: false,
  },
  {
    feature: "Size Overhead Indicator",
    ours: true,
    base64decode: false,
    base64guru: false,
    base64encode: false,
  },
  {
    feature: "Dark Mode",
    ours: true,
    base64decode: false,
    base64guru: false,
    base64encode: false,
  },
  {
    feature: "Ad-Free",
    ours: true,
    base64decode: false,
    base64guru: false,
    base64encode: false,
  },
  {
    feature: "Mobile Optimized",
    ours: true,
    base64decode: "Partial",
    base64guru: "Partial",
    base64encode: "Partial",
  },
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
    return (
      <Text fontSize="sm" color="fg.subtle">
        —
      </Text>
    );
  }

  return (
    <Text
      fontSize="xs"
      color={isOurs ? `${palette}.fg` : "fg.muted"}
      fontWeight={isOurs ? "medium" : "normal"}
    >
      {value}
    </Text>
  );
}

const Base64Comparison: React.FC = () => {
  const { palette } = useColorPalette();

  return (
    <Box as="section">
      <VStack align="flex-start" gap={6}>
        <SectionHeader
          tagline="How We Compare"
          headline="vs. base64decode.org, base64.guru & base64encode.org"
          description="A straightforward side-by-side of what each tool offers, based on publicly available features."
        />

        <Table.ScrollArea borderWidth="1px" borderRadius="md" w="full">
          <Table.Root size="sm">
            <Table.Header>
              <Table.Row bg="bg.subtle">
                <Table.ColumnHeader
                  fontWeight="semibold"
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  minW="200px"
                >
                  Feature
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontWeight="bold"
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  color={`${palette}.fg`}
                  textAlign="center"
                  minW="120px"
                >
                  mzeeshan.me
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontWeight="semibold"
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  color="fg.muted"
                  textAlign="center"
                  minW="140px"
                >
                  base64decode.org
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontWeight="semibold"
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  color="fg.muted"
                  textAlign="center"
                  minW="120px"
                >
                  base64.guru
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontWeight="semibold"
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  color="fg.muted"
                  textAlign="center"
                  minW="140px"
                >
                  base64encode.org
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {ROWS.map((row) => (
                <Table.Row key={row.feature}>
                  <Table.Cell fontSize="sm" color="fg">
                    {row.feature}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <CellDisplay value={row.ours} isOurs />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <CellDisplay value={row.base64decode} />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <CellDisplay value={row.base64guru} />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <CellDisplay value={row.base64encode} />
                  </Table.Cell>
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

export default Base64Comparison;
