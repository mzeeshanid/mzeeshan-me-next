import { useColorPalette } from "@/contexts/useColorPalette";
import {
  Box,
  Heading,
  Table,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

type CellValue = true | false | string;

type ComparisonRow = {
  feature: string;
  ours: CellValue;
  unixtimestamp: CellValue;
  epochconverter: CellValue;
};

const ROWS: ComparisonRow[] = [
  {
    feature: "Live Epoch Clock",
    ours: true,
    unixtimestamp: false,
    epochconverter: true,
  },
  {
    feature: "Timestamp → Date",
    ours: true,
    unixtimestamp: true,
    epochconverter: true,
  },
  {
    feature: "Date → Timestamp",
    ours: true,
    unixtimestamp: true,
    epochconverter: true,
  },
  {
    feature: "Seconds & Milliseconds",
    ours: true,
    unixtimestamp: true,
    epochconverter: true,
  },
  {
    feature: "Microseconds / Nanoseconds",
    ours: false,
    unixtimestamp: true,
    epochconverter: true,
  },
  {
    feature: "Multi-Timezone Display",
    ours: "12 zones",
    unixtimestamp: false,
    epochconverter: true,
  },
  {
    feature: "Y2038 Countdown",
    ours: true,
    unixtimestamp: "Info only",
    epochconverter: "Info only",
  },
  {
    feature: "Code Snippets",
    ours: "14 languages",
    unixtimestamp: false,
    epochconverter: "20+ languages",
  },
  {
    feature: "Batch Converter",
    ours: false,
    unixtimestamp: false,
    epochconverter: true,
  },
  {
    feature: "ISO 8601 Output",
    ours: true,
    unixtimestamp: true,
    epochconverter: true,
  },
  {
    feature: "Dark Mode",
    ours: true,
    unixtimestamp: false,
    epochconverter: false,
  },
  {
    feature: "Mobile Optimized",
    ours: true,
    unixtimestamp: "Partial",
    epochconverter: "Partial",
  },
];

function CellDisplay({ value, isOurs }: { value: CellValue; isOurs?: boolean }) {
  const { palette } = useColorPalette();

  if (value === true) {
    return (
      <Text
        fontSize="sm"
        fontWeight="semibold"
        color={isOurs ? `${palette}.fg` : "green.fg"}
      >
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

type Props = {};

const UnixTimestampComparison: React.FC<Props> = () => {
  const { palette } = useColorPalette();

  return (
    <Box as="section">
      <VStack align="flex-start" gap={6}>
        <VStack align="flex-start" gap={3}>
          <Tag.Root variant="surface" colorPalette={palette} size={{ base: "lg", md: "xl" }}>
            <Tag.Label>How We Compare</Tag.Label>
          </Tag.Root>
          <Heading as="h2" fontWeight="bold" fontSize={{ base: "2xl", md: "4xl" }} lineHeight="normal">
            vs. unixtimestamp.com & epochconverter.com
          </Heading>
          <Text color="fg.muted">
            A straightforward side-by-side of what each tool offers, based on publicly available features.
          </Text>
        </VStack>

        <Box borderWidth="1px" borderRadius="md" overflow="hidden" w="full">
          <Table.Root size="sm">
            <Table.Header>
              <Table.Row bg="bg.subtle">
                <Table.ColumnHeader
                  fontWeight="semibold"
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  minW="180px"
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
                >
                  unixtimestamp.com
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontWeight="semibold"
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  color="fg.muted"
                  textAlign="center"
                >
                  epochconverter.com
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
                    <CellDisplay value={row.unixtimestamp} />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <CellDisplay value={row.epochconverter} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>

        <Text fontSize="xs" color="fg.subtle">
          Comparison based on publicly available features as of 2025. Feature availability may change over time.
        </Text>
      </VStack>
    </Box>
  );
};

export default UnixTimestampComparison;
