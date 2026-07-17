import { useColorPalette } from "@/contexts/useColorPalette";
import { detectUnit, fromMs, toMs } from "@/utils/unixTimestamp";
import {
  Box,
  Button,
  Card,
  Clipboard,
  Heading,
  HStack,
  SegmentGroup,
  Table,
  Tag,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const MAX_LINES = 500;

type Mode = "toDate" | "toTimestamp";

type RowResult = {
  input: string;
  ok: boolean;
  utc?: string;
  local?: string;
  iso?: string;
  seconds?: string;
};

const parseLines = (raw: string): string[] =>
  raw
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);

const convertLine = (input: string, mode: Mode): RowResult => {
  if (mode === "toDate") {
    const unit = detectUnit(input);
    const n = Number(input);
    if (!unit || isNaN(n)) return { input, ok: false };
    const ms = toMs(n, unit);
    const d = new Date(ms);
    if (isNaN(d.getTime())) return { input, ok: false };
    return { input, ok: true, utc: d.toUTCString(), local: d.toLocaleString(), iso: d.toISOString() };
  }

  const d = new Date(input);
  if (isNaN(d.getTime())) return { input, ok: false };
  return {
    input,
    ok: true,
    seconds: String(fromMs(d.getTime(), "s")),
    iso: d.toISOString(),
    utc: d.toUTCString(),
  };
};

type Props = {};

const UnixTimestampBulkConvert: React.FC<Props> = () => {
  const { palette } = useColorPalette();
  const [mode, setMode] = React.useState<Mode>("toDate");
  const [raw, setRaw] = React.useState("");

  const allLines = React.useMemo(() => parseLines(raw), [raw]);
  const truncated = allLines.length > MAX_LINES;
  const lines = truncated ? allLines.slice(0, MAX_LINES) : allLines;

  const results = React.useMemo(() => lines.map((line) => convertLine(line, mode)), [lines, mode]);

  const csv = React.useMemo(() => {
    if (mode === "toDate") {
      const header = "input,utc,local,iso";
      const rows = results.map((r) => `${r.input},${r.ok ? r.utc : "invalid"},${r.ok ? r.local : ""},${r.ok ? r.iso : ""}`);
      return [header, ...rows].join("\n");
    }
    const header = "input,unix_seconds,iso,utc";
    const rows = results.map((r) => `${r.input},${r.ok ? r.seconds : "invalid"},${r.ok ? r.iso : ""},${r.ok ? r.utc : ""}`);
    return [header, ...rows].join("\n");
  }, [results, mode]);

  const json = React.useMemo(() => JSON.stringify(results, null, 2), [results]);

  return (
    <Box as="section">
      <VStack align="flex-start" gap={6}>
        <VStack align="flex-start" gap={3}>
          <Tag.Root variant="surface" colorPalette={palette} size={{ base: "lg", md: "xl" }}>
            <Tag.Label>Bulk Conversion</Tag.Label>
          </Tag.Root>
          <Heading as="h2" fontWeight="bold" fontSize={{ base: "2xl", md: "4xl" }} lineHeight="normal">
            Convert Multiple Unix Timestamps at Once
          </Heading>
          <Text color="fg.muted">
            Paste any number of timestamps or dates — one per line, or comma-separated — and convert them all in
            one pass.
          </Text>
        </VStack>

        <Card.Root w="full">
          <Card.Body>
            <VStack align="stretch" gap={4}>
              <SegmentGroup.Root
                colorPalette={palette}
                value={mode}
                onValueChange={(details) => setMode(details.value as Mode)}
                width="fit-content"
              >
                <SegmentGroup.Indicator />
                <SegmentGroup.Items
                  items={[
                    { label: "Timestamps → Dates", value: "toDate" },
                    { label: "Dates → Timestamps", value: "toTimestamp" },
                  ]}
                />
              </SegmentGroup.Root>

              <Textarea
                value={raw}
                onChange={(e) => setRaw(e.target.value)}
                placeholder={mode === "toDate" ? "1700000000\n1700000000000\n1700000001" : "2024-01-01T00:00:00Z\n2024-06-15T12:30:00Z"}
                fontFamily="mono"
                rows={6}
              />

              {truncated && (
                <Text fontSize="xs" color="orange.fg">
                  Only the first {MAX_LINES} of {allLines.length} lines are shown/converted.
                </Text>
              )}

              {results.length > 0 ? (
                <>
                  <Table.ScrollArea borderWidth="1px" borderRadius="md" maxH="360px" overflowY="auto">
                    <Table.Root size="sm">
                      <Table.Header>
                        <Table.Row bg="bg.subtle">
                          <Table.ColumnHeader fontSize="xs" textTransform="uppercase" letterSpacing="wider">Input</Table.ColumnHeader>
                          {mode === "toDate" ? (
                            <>
                              <Table.ColumnHeader fontSize="xs" textTransform="uppercase" letterSpacing="wider">UTC</Table.ColumnHeader>
                              <Table.ColumnHeader fontSize="xs" textTransform="uppercase" letterSpacing="wider">ISO 8601</Table.ColumnHeader>
                            </>
                          ) : (
                            <>
                              <Table.ColumnHeader fontSize="xs" textTransform="uppercase" letterSpacing="wider">Unix (seconds)</Table.ColumnHeader>
                              <Table.ColumnHeader fontSize="xs" textTransform="uppercase" letterSpacing="wider">ISO 8601</Table.ColumnHeader>
                            </>
                          )}
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {results.map((r, idx) => (
                          <Table.Row key={`${r.input}-${idx}`}>
                            <Table.Cell fontFamily="mono" fontSize="xs">{r.input}</Table.Cell>
                            {!r.ok ? (
                              <Table.Cell colSpan={2} fontSize="xs" color="red.fg">Invalid</Table.Cell>
                            ) : mode === "toDate" ? (
                              <>
                                <Table.Cell fontFamily="mono" fontSize="xs">{r.utc}</Table.Cell>
                                <Table.Cell fontFamily="mono" fontSize="xs">{r.iso}</Table.Cell>
                              </>
                            ) : (
                              <>
                                <Table.Cell fontFamily="mono" fontSize="xs" color={`${palette}.fg`}>{r.seconds}</Table.Cell>
                                <Table.Cell fontFamily="mono" fontSize="xs">{r.iso}</Table.Cell>
                              </>
                            )}
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Root>
                  </Table.ScrollArea>

                  <HStack gap={3}>
                    <Clipboard.Root value={csv}>
                      <Clipboard.Trigger asChild>
                        <Button size="sm" variant="outline">
                          <Clipboard.Indicator />
                          Copy all as CSV
                        </Button>
                      </Clipboard.Trigger>
                    </Clipboard.Root>
                    <Clipboard.Root value={json}>
                      <Clipboard.Trigger asChild>
                        <Button size="sm" variant="outline">
                          <Clipboard.Indicator />
                          Copy all as JSON
                        </Button>
                      </Clipboard.Trigger>
                    </Clipboard.Root>
                  </HStack>
                </>
              ) : (
                <Box borderWidth="1px" borderRadius="md" px={4} py={3}>
                  <Text color="fg.muted" fontSize="sm">Paste one or more values above to convert them in bulk</Text>
                </Box>
              )}
            </VStack>
          </Card.Body>
        </Card.Root>
      </VStack>
    </Box>
  );
};

export default UnixTimestampBulkConvert;
