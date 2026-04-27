import { useColorPalette } from "@/contexts/useColorPalette";
import { unixTimestampMetaData } from "@/data/tools/unixTimestamp/unixTimestampMetaData";
import {
  Badge,
  Box,
  Button,
  Card,
  Clipboard,
  Field,
  Heading,
  HStack,
  Input,
  SegmentGroup,
  Stack,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const relativeTime = (ms: number): string => {
  const diffSec = Math.floor((Date.now() - ms) / 1000);
  const abs = Math.abs(diffSec);
  const future = diffSec < 0;
  if (abs < 5) return "just now";
  if (abs < 60) return `${abs}s ${future ? "from now" : "ago"}`;
  if (abs < 3600) return `${Math.floor(abs / 60)}m ${future ? "from now" : "ago"}`;
  if (abs < 86400) return `${Math.floor(abs / 3600)}h ${future ? "from now" : "ago"}`;
  return `${Math.floor(abs / 86400)}d ${future ? "from now" : "ago"}`;
};

type ResultRowProps = {
  label: string;
  value: string;
  accent?: boolean;
};

const ResultRow: React.FC<ResultRowProps> = ({ label, value, accent }) => {
  const { palette } = useColorPalette();
  return (
    <HStack justify="space-between" py={2} gap={4} wrap="wrap">
      <Text color="fg.muted" fontSize="xs" fontWeight="medium" textTransform="uppercase" letterSpacing="wider" minW="140px">
        {label}
      </Text>
      <HStack flex={1} justify="flex-end" gap={2} wrap="wrap">
        <Text fontFamily="mono" fontSize="sm" color={accent ? `${palette}.fg` : "fg"} wordBreak="break-all" textAlign="right">
          {value}
        </Text>
        <Clipboard.Root value={value}>
          <Clipboard.Trigger asChild>
            <Button size="2xs" variant="outline">
              <Clipboard.Indicator />
            </Button>
          </Clipboard.Trigger>
        </Clipboard.Root>
      </HStack>
    </HStack>
  );
};

const UnixTimestampHero: React.FC = () => {
  const { palette } = useColorPalette();
  const meta = unixTimestampMetaData;

  const [now, setNow] = React.useState<number>(0);

  const [tsInput, setTsInput] = React.useState("");
  const [tsUnit, setTsUnit] = React.useState<"s" | "ms">("s");
  const [tsError, setTsError] = React.useState("");
  const [tsResult, setTsResult] = React.useState<{ ms: number; d: Date } | null>(null);

  const [dateInput, setDateInput] = React.useState("");
  const [dateError, setDateError] = React.useState("");
  const [dateResult, setDateResult] = React.useState<{ ms: number; s: number; d: Date } | null>(null);

  React.useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  React.useEffect(() => {
    if (!tsInput.trim()) { setTsResult(null); setTsError(""); return; }
    const n = Number(tsInput.trim());
    if (isNaN(n)) { setTsError("Invalid timestamp"); setTsResult(null); return; }
    setTsError("");
    const ms = tsUnit === "ms" ? n : n * 1000;
    const d = new Date(ms);
    if (isNaN(d.getTime())) { setTsError("Out of range"); setTsResult(null); return; }
    setTsResult({ ms, d });
  }, [tsInput, tsUnit]);

  React.useEffect(() => {
    if (!dateInput) { setDateResult(null); setDateError(""); return; }
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) { setDateError("Invalid date"); setDateResult(null); return; }
    setDateError("");
    setDateResult({ ms: d.getTime(), s: Math.floor(d.getTime() / 1000), d });
  }, [dateInput]);

  const nowS = now > 0 ? Math.floor(now / 1000) : 0;
  const nowDisplay = now > 0 ? nowS.toLocaleString() : "—";
  const nowMsDisplay = now > 0 ? now.toLocaleString() : "—";
  const nowUtc = now > 0 ? new Date(now).toUTCString() : "—";

  const useCurrentTs = () => setTsInput(String(nowS));

  const useCurrentDate = () => {
    if (!now) return;
    const d = new Date(now);
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    setDateInput(local.toISOString().slice(0, 19));
  };

  return (
    <Box as="section">
      <Card.Root mb={6}>
        <Card.Header>
          <VStack align="start" gap={1}>
            <Heading size="3xl" as="h1">{meta.title}</Heading>
            <Text color="fg.muted">{meta.desc}</Text>
          </VStack>
        </Card.Header>
        <Card.Body>
          <HStack justify="space-between" mb={3} wrap="wrap" gap={2}>
            <HStack gap={2}>
              <Badge colorPalette="green" size="sm">Live</Badge>
              <Text fontSize="sm" color="fg.muted">Current Unix Timestamp</Text>
            </HStack>
            <Clipboard.Root value={String(nowS)}>
              <Clipboard.Trigger asChild>
                <Button size="xs" variant="outline">
                  <Clipboard.Indicator />
                </Button>
              </Clipboard.Trigger>
            </Clipboard.Root>
          </HStack>

          <Text fontFamily="mono" fontSize={{ base: "3xl", md: "5xl" }} fontWeight="medium" letterSpacing="tight" color={`${palette}.fg`} lineHeight={1}>
            {nowDisplay}
          </Text>

          <Text fontFamily="mono" fontSize="xs" color="fg.subtle" mt={2}>
            {nowMsDisplay} ms · {nowUtc}
          </Text>
        </Card.Body>
      </Card.Root>

      <Tabs.Root defaultValue="toDate">
        <Tabs.List>
          <Tabs.Trigger value="toDate">Timestamp → Date</Tabs.Trigger>
          <Tabs.Trigger value="toTimestamp">Date → Timestamp</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="toDate">
          <Card.Root>
            <Card.Body>
              <Stack gap={4}>
                <Field.Root invalid={!!tsError}>
                  <Field.Label textTransform="uppercase" fontSize="xs" letterSpacing="wider">Unix Timestamp</Field.Label>
                  <Input
                    placeholder={tsUnit === "s"
                      ? (now > 0 ? String(nowS) : "e.g. 1700000000")
                      : (now > 0 ? String(now) : "e.g. 1700000000000")}
                    value={tsInput}
                    onChange={(e) => setTsInput(e.target.value)}
                    fontFamily="mono"
                    size="lg"
                  />
                  {tsError && <Field.ErrorText>{tsError}</Field.ErrorText>}
                </Field.Root>

                <SegmentGroup.Root
                  colorPalette={palette}
                  value={tsUnit}
                  onValueChange={(details) => setTsUnit(details.value as "s" | "ms")}
                  width="fit-content"
                >
                  <SegmentGroup.Indicator />
                  <SegmentGroup.Items
                    items={[
                      { label: "Seconds", value: "s" },
                      { label: "Milliseconds", value: "ms" },
                    ]}
                  />
                </SegmentGroup.Root>

                {tsResult ? (
                  <Box borderWidth="1px" borderRadius="md" overflow="hidden">
                    <Box px={4} py={2} bg="bg.subtle">
                      <Text fontWeight="semibold" fontSize="sm">Results</Text>
                    </Box>
                    <VStack align="stretch" px={4} divideY="1px">
                      <ResultRow label="UTC" value={tsResult.d.toUTCString()} accent />
                      <ResultRow label="Local Time" value={tsResult.d.toLocaleString()} />
                      <ResultRow label="ISO 8601" value={tsResult.d.toISOString()} accent />
                      <ResultRow label="Relative" value={relativeTime(tsResult.ms)} />
                    </VStack>
                  </Box>
                ) : (
                  <Box borderWidth="1px" borderRadius="md" px={4} py={3}>
                    <Text color="fg.muted" fontSize="sm">Enter a timestamp above to convert</Text>
                  </Box>
                )}

                <Button size="sm" variant="subtle" colorPalette={palette} onClick={useCurrentTs} alignSelf="flex-start">
                  Use current time
                </Button>
              </Stack>
            </Card.Body>
          </Card.Root>
        </Tabs.Content>

        <Tabs.Content value="toTimestamp">
          <Card.Root>
            <Card.Body>
              <Stack gap={4}>
                <Field.Root invalid={!!dateError}>
                  <Field.Label textTransform="uppercase" fontSize="xs" letterSpacing="wider">Date &amp; Time</Field.Label>
                  <Input
                    type="datetime-local"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    step="1"
                    size="lg"
                    fontFamily="mono"
                    colorPalette={palette}
                  />
                  {dateError && <Field.ErrorText>{dateError}</Field.ErrorText>}
                </Field.Root>

                {dateResult ? (
                  <Box borderWidth="1px" borderRadius="md" overflow="hidden">
                    <Box px={4} py={2} bg="bg.subtle">
                      <Text fontWeight="semibold" fontSize="sm">Results</Text>
                    </Box>
                    <VStack align="stretch" px={4} divideY="1px">
                      <ResultRow label="Unix (seconds)" value={String(dateResult.s)} accent />
                      <ResultRow label="Unix (milliseconds)" value={String(dateResult.ms)} accent />
                      <ResultRow label="ISO 8601" value={dateResult.d.toISOString()} />
                      <ResultRow label="Relative" value={relativeTime(dateResult.ms)} />
                    </VStack>
                  </Box>
                ) : (
                  <Box borderWidth="1px" borderRadius="md" px={4} py={3}>
                    <Text color="fg.muted" fontSize="sm">Select a date above to convert</Text>
                  </Box>
                )}

                <Button size="sm" variant="ghost" colorPalette={palette} onClick={useCurrentDate} alignSelf="flex-start">
                  Use current time
                </Button>
              </Stack>
            </Card.Body>
          </Card.Root>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export default UnixTimestampHero;
