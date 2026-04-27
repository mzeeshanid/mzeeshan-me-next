import { useColorPalette } from "@/contexts/useColorPalette";
import {
  Box,
  Button,
  Card,
  Clipboard,
  Field,
  Heading,
  HStack,
  Input,
  SegmentGroup,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const TIMEZONES = [
  { label: "UTC", tz: "UTC", offset: "+00:00" },
  { label: "New York", tz: "America/New_York", offset: "ET" },
  { label: "Chicago", tz: "America/Chicago", offset: "CT" },
  { label: "Denver", tz: "America/Denver", offset: "MT" },
  { label: "Los Angeles", tz: "America/Los_Angeles", offset: "PT" },
  { label: "London", tz: "Europe/London", offset: "GMT/BST" },
  { label: "Paris", tz: "Europe/Paris", offset: "CET" },
  { label: "Dubai", tz: "Asia/Dubai", offset: "+04:00" },
  { label: "Kolkata", tz: "Asia/Kolkata", offset: "+05:30" },
  { label: "Singapore", tz: "Asia/Singapore", offset: "+08:00" },
  { label: "Tokyo", tz: "Asia/Tokyo", offset: "+09:00" },
  { label: "Sydney", tz: "Australia/Sydney", offset: "AEST" },
];

function formatInTz(ms: number, tz: string): string {
  try {
    return new Date(ms).toLocaleString("en-US", {
      timeZone: tz,
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  } catch {
    return "—";
  }
}

type Props = {};

const UnixTimestampTimezone: React.FC<Props> = () => {
  const { palette } = useColorPalette();
  const [ts, setTs] = React.useState("");
  const [unit, setUnit] = React.useState<"s" | "ms">("s");
  const [useLive, setUseLive] = React.useState(false);

  React.useEffect(() => {
    if (!useLive) return;
    setTs(String(Math.floor(Date.now() / 1000)));
    const id = setInterval(() => setTs(String(Math.floor(Date.now() / 1000))), 1000);
    return () => clearInterval(id);
  }, [useLive]);

  const n = Number(ts);
  const ms = ts && !isNaN(n) ? (unit === "ms" ? n : n * 1000) : null;

  return (
    <Box as="section">
      <VStack align="flex-start" gap={6}>
        <VStack align="flex-start" gap={3}>
          <Tag.Root variant="surface" colorPalette={palette} size={{ base: "lg", md: "xl" }}>
            <Tag.Label>Timezone Converter</Tag.Label>
          </Tag.Root>
          <Heading as="h2" fontWeight="bold" fontSize={{ base: "2xl", md: "4xl" }} lineHeight="normal">
            Convert Unix Time Across Timezones
          </Heading>
          <Text color="fg.muted">
            Enter any Unix timestamp to see it expressed simultaneously across major timezones worldwide.
          </Text>
        </VStack>

        <Card.Root w="full">
          <Card.Body>
            <VStack align="stretch" gap={4}>
              <Field.Root>
                <Field.Label textTransform="uppercase" fontSize="xs" letterSpacing="wider">Unix Timestamp</Field.Label>
                <Input
                  value={ts}
                  onChange={(e) => { setTs(e.target.value); setUseLive(false); }}
                  fontFamily="mono"
                  placeholder={unit === "s" ? "e.g. 1700000000" : "e.g. 1700000000000"}
                  size="lg"
                />
              </Field.Root>

              <SegmentGroup.Root
                colorPalette={palette}
                value={unit}
                onValueChange={(details) => setUnit(details.value as "s" | "ms")}
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

              <Button
                size="sm"
                variant="surface"
                colorPalette={palette}
                alignSelf="flex-start"
                onClick={() => {
                  setUseLive((v) => !v);
                  if (!useLive) setTs(String(Math.floor(Date.now() / 1000)));
                }}
              >
                {useLive ? "● Live" : "▶ Go Live"}
              </Button>

              {ms !== null && (
                <Box borderWidth="1px" borderRadius="md" overflow="hidden">
                  {TIMEZONES.map((tz, idx) => {
                    const formatted = formatInTz(ms, tz.tz);
                    return (
                      <HStack
                        key={tz.tz}
                        px={4}
                        py={3}
                        justify="space-between"
                        borderBottomWidth={idx < TIMEZONES.length - 1 ? "1px" : "0"}
                        gap={4}
                        wrap="wrap"
                      >
                        <HStack gap={2} minW="140px">
                          <Text fontSize="sm" color="fg.muted">{tz.label}</Text>
                          <Text fontFamily="mono" fontSize="xs" color="fg.subtle">{tz.offset}</Text>
                        </HStack>
                        <HStack flex={1} justify="flex-end" gap={2}>
                          <Text fontFamily="mono" fontSize="sm">{formatted}</Text>
                          <Clipboard.Root value={formatted}>
                            <Clipboard.Trigger asChild>
                              <Button size="2xs" variant="outline">
                                <Clipboard.Indicator />
                              </Button>
                            </Clipboard.Trigger>
                          </Clipboard.Root>
                        </HStack>
                      </HStack>
                    );
                  })}
                </Box>
              )}
            </VStack>
          </Card.Body>
        </Card.Root>
      </VStack>
    </Box>
  );
};

export default UnixTimestampTimezone;
