import { useColorPalette } from "@/contexts/useColorPalette";
import {
  Box,
  Heading,
  HStack,
  SimpleGrid,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const TARGET = new Date("2038-01-19T03:14:07Z").getTime();

const SYSTEMS_AT_RISK = [
  "32-bit Linux kernels",
  "Legacy C programs using time_t",
  "Old MySQL versions",
  "Embedded systems (IoT)",
  "POSIX-compliant systems on 32-bit",
];

type CountdownUnit = { n: number; l: string };

type Props = {};

const UnixTimestampY2038: React.FC<Props> = () => {
  const { palette } = useColorPalette();
  const [remaining, setRemaining] = React.useState<number>(0);

  React.useEffect(() => {
    setRemaining(TARGET - Date.now());
    const id = setInterval(() => setRemaining(TARGET - Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const totalSec = Math.max(0, Math.floor(remaining / 1000));
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;

  const units: CountdownUnit[] = [
    { n: d, l: "Days" },
    { n: h, l: "Hours" },
    { n: m, l: "Minutes" },
    { n: s, l: "Seconds" },
  ];

  return (
    <Box as="section">
      <VStack align="flex-start" gap={6}>
        <VStack align="flex-start" gap={3}>
          <Tag.Root variant="surface" colorPalette={palette} size={{ base: "lg", md: "xl" }}>
            <Tag.Label>The Y2K38 Problem</Tag.Label>
          </Tag.Root>
          <Heading as="h2" fontWeight="bold" fontSize={{ base: "2xl", md: "4xl" }} lineHeight="normal">
            What Happens on January 19, 2038?
          </Heading>
          <Text color="fg.muted" lineHeight="tall">
            On{" "}
            <Text as="strong" color="fg">January 19, 2038 at 03:14:07 UTC</Text>, 32-bit signed integer
            systems storing Unix timestamps will overflow. The maximum value of a 32-bit signed integer is{" "}
            <Text as="span" fontFamily="mono" color="red.fg">2,147,483,647</Text> — exactly that moment in time.
            One second later, the counter wraps to{" "}
            <Text as="span" fontFamily="mono" color="red.fg">−2,147,483,648</Text>, representing December 13, 1901.
          </Text>
          <Text color="fg.muted" lineHeight="tall">
            Modern 64-bit systems are immune — they won&apos;t overflow until the year{" "}
            <Text as="strong" color="fg">292,277,026,596</Text>. However, legacy embedded systems, older databases,
            and software still using 32-bit integers may be at risk.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 2, sm: 4 }} gap={3} w="full">
          {units.map((unit) => (
            <Box
              key={unit.l}
              borderWidth="1px"
              borderRadius="xl"
              py={4}
              px={3}
              textAlign="center"
              bg="bg.subtle"
            >
              <Text
                fontFamily="mono"
                fontSize={{ base: "2xl", md: "4xl" }}
                fontWeight="medium"
                color="red.fg"
                lineHeight={1}
              >
                {String(unit.n).padStart(2, "0")}
              </Text>
              <Text fontSize="xs" color="fg.subtle" mt={1} textTransform="uppercase" letterSpacing="wider">
                {unit.l}
              </Text>
            </Box>
          ))}
        </SimpleGrid>

        <Text fontSize="xs" color="fg.subtle" fontFamily="mono">
          Time until Unix 32-bit overflow: 2,147,483,647
        </Text>

        <Box borderWidth="1px" borderRadius="md" p={5} w="full">
          <Heading as="h3" fontSize="md" fontWeight="semibold" mb={4}>
            Systems at Risk
          </Heading>
          <VStack align="flex-start" gap={2}>
            {SYSTEMS_AT_RISK.map((sys) => (
              <HStack key={sys} gap={3}>
                <Box w={2} h={2} borderRadius="full" bg="red.fg" flexShrink={0} />
                <Text fontSize="sm" color="fg.muted">{sys}</Text>
              </HStack>
            ))}
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default UnixTimestampY2038;
