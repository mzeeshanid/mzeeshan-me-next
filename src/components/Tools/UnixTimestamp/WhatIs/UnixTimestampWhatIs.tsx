import { useColorPalette } from "@/contexts/useColorPalette";
import {
  Box,
  Heading,
  HStack,
  Table,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const NOTABLE_TIMESTAMPS = [
  { ts: "0", date: "Thu, 01 Jan 1970 00:00:00 UTC", note: "Unix epoch origin" },
  { ts: "1000000000", date: "Sat, 09 Sep 2001 01:46:40 UTC", note: "One billion seconds" },
  { ts: "1700000000", date: "Wed, 15 Nov 2023 00:13:20 UTC", note: "Recent past" },
  { ts: "2000000000", date: "Wed, 18 May 2033 03:33:20 UTC", note: "Near future" },
  { ts: "2147483647", date: "Tue, 19 Jan 2038 03:14:07 UTC", note: "32-bit max (Y2K38)" },
];

type Props = {};

const UnixTimestampWhatIs: React.FC<Props> = () => {
  const { palette } = useColorPalette();
  return (
    <Box as="section">
      <VStack align="flex-start" gap={6}>
        <VStack align="flex-start" gap={3}>
          <Tag.Root variant="surface" colorPalette={palette} size={{ base: "lg", md: "xl" }}>
            <Tag.Label>Reference</Tag.Label>
          </Tag.Root>
          <Heading as="h2" fontWeight="bold" fontSize={{ base: "2xl", md: "4xl" }} lineHeight="normal">
            What is a Unix Timestamp?
          </Heading>
          <Text color="fg.muted" lineHeight="tall">
            A Unix timestamp (also called Unix time, POSIX time, or epoch time) is a system for tracking time as a
            running total of seconds since{" "}
            <Text as="strong" color="fg">January 1, 1970, 00:00:00 UTC</Text> — known as the Unix Epoch. It does
            not account for leap seconds.
          </Text>
          <Text color="fg.muted" lineHeight="tall">
            Unix time is timezone-agnostic and universally consistent across all computing systems, making it the
            lingua franca for timestamps in APIs, databases, logs, and distributed systems.
          </Text>
        </VStack>

        <Box w="full">
          <Heading as="h3" fontSize="lg" fontWeight="semibold" mb={4}>
            Notable Timestamps
          </Heading>
          <Box borderWidth="1px" borderRadius="md" overflow="hidden">
            <Table.Root size="sm">
              <Table.Header>
                <Table.Row bg="bg.subtle">
                  <Table.ColumnHeader fontWeight="semibold" fontSize="xs" textTransform="uppercase" letterSpacing="wider">
                    Timestamp
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="semibold" fontSize="xs" textTransform="uppercase" letterSpacing="wider">
                    Date (UTC)
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="semibold" fontSize="xs" textTransform="uppercase" letterSpacing="wider">
                    Note
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {NOTABLE_TIMESTAMPS.map((row) => (
                  <Table.Row key={row.ts}>
                    <Table.Cell fontFamily="mono" fontSize="sm" color={`${palette}.fg`}>
                      {row.ts}
                    </Table.Cell>
                    <Table.Cell fontFamily="mono" fontSize="sm">
                      {row.date}
                    </Table.Cell>
                    <Table.Cell fontSize="xs" color="fg.muted">
                      {row.note}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default UnixTimestampWhatIs;
