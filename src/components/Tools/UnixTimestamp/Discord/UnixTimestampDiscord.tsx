import { useColorPalette } from "@/contexts/useColorPalette";
import { unixTimestampDiscordData } from "@/data/tools/unixTimestamp/unixTimestampDiscordData";
import { relativeTime } from "@/utils/unixTimestamp";
import {
  Box,
  Button,
  Card,
  Clipboard,
  Field,
  HStack,
  Heading,
  Input,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const previewFor = (code: string, d: Date, ms: number): string => {
  switch (code) {
    case "t":
      return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
    case "T":
      return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit", second: "2-digit" });
    case "d":
      return d.toLocaleDateString(undefined, { day: "2-digit", month: "2-digit", year: "numeric" });
    case "D":
      return d.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });
    case "f":
      return `${d.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })} ${d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}`;
    case "F":
      return `${d.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" })} ${d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}`;
    case "R":
      return relativeTime(ms);
    default:
      return "";
  }
};

type Props = {};

const UnixTimestampDiscord: React.FC<Props> = () => {
  const { palette } = useColorPalette();
  const data = unixTimestampDiscordData;

  const [now, setNow] = React.useState<number>(0);
  const [dateInput, setDateInput] = React.useState("");

  React.useEffect(() => {
    setNow(Date.now());
  }, []);

  const useCurrentTime = () => {
    if (!now) return;
    const d = new Date(now);
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    setDateInput(local.toISOString().slice(0, 19));
  };

  const selectedMs = dateInput ? new Date(dateInput).getTime() : now;
  const valid = !isNaN(selectedMs) && selectedMs > 0;
  const secs = valid ? Math.floor(selectedMs / 1000) : 0;
  const d = valid ? new Date(selectedMs) : null;

  return (
    <Box as="section">
      <VStack align="flex-start" gap={6}>
        <VStack align="flex-start" gap={3}>
          <Tag.Root variant="surface" colorPalette={palette} size={{ base: "lg", md: "xl" }}>
            <Tag.Label>{data.header.badge}</Tag.Label>
          </Tag.Root>
          <Heading as="h2" fontWeight="bold" fontSize={{ base: "2xl", md: "4xl" }} lineHeight="normal">
            {data.header.title}
          </Heading>
          <Text color="fg.muted" lineHeight="tall">{data.header.desc}</Text>
        </VStack>

        <Card.Root w="full">
          <Card.Body>
            <VStack align="stretch" gap={4}>
              <Field.Root>
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
                <Button size="xs" variant="ghost" colorPalette={palette} mt={1} onClick={useCurrentTime} alignSelf="flex-start">
                  Use current time
                </Button>
              </Field.Root>

              {d && valid ? (
                <Box borderWidth="1px" borderRadius="md" overflow="hidden">
                  <HStack px={4} py={2} bg="bg.subtle" justify="space-between">
                    <Text fontWeight="semibold" fontSize="sm">Format</Text>
                    <Text fontWeight="semibold" fontSize="sm">Discord Code / Preview</Text>
                  </HStack>
                  <VStack align="stretch" px={4} divideY="1px">
                    {data.formats.map((fmt) => {
                      const code = `<t:${secs}:${fmt.code}>`;
                      return (
                        <HStack key={fmt.code} justify="space-between" py={3} gap={4} wrap="wrap">
                          <VStack align="flex-start" gap={0} minW="120px">
                            <Text fontSize="sm">{fmt.label}</Text>
                            <Text fontSize="xs" color="fg.subtle">{previewFor(fmt.code, d, selectedMs)}</Text>
                          </VStack>
                          <HStack gap={2}>
                            <Text fontFamily="mono" fontSize="sm" color={`${palette}.fg`}>{code}</Text>
                            <Clipboard.Root value={code}>
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
                  </VStack>
                </Box>
              ) : (
                <Box borderWidth="1px" borderRadius="md" px={4} py={3}>
                  <Text color="fg.muted" fontSize="sm">Pick a date above to generate Discord timestamp codes</Text>
                </Box>
              )}

              <Text fontSize="xs" color="fg.subtle">
                Previews use your browser&apos;s locale — Discord renders the same code in each viewer&apos;s own timezone and locale.
              </Text>
            </VStack>
          </Card.Body>
        </Card.Root>
      </VStack>
    </Box>
  );
};

export default UnixTimestampDiscord;
