import { useColorPalette } from "@/contexts/useColorPalette";
import {
  Box,
  GridItem,
  Heading,
  SimpleGrid,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const USE_CASES = [
  {
    title: "REST APIs",
    desc: "APIs use Unix timestamps to communicate time data unambiguously, avoiding timezone confusion. Every major platform — GitHub, Stripe, Twilio — uses epoch time in responses.",
  },
  {
    title: "Database Storage",
    desc: "Storing timestamps as integers is cheaper and faster than datetime strings. Sorting, indexing, and range queries are more efficient on numeric columns.",
  },
  {
    title: "Logging & Monitoring",
    desc: "Log files across distributed systems use Unix time to correlate events precisely, even when servers span multiple timezones.",
  },
  {
    title: "Caching & Expiry",
    desc: "CDNs, session stores, and caches use Unix timestamps for TTL calculations. Redis, Memcached, and HTTP headers all rely on epoch time.",
  },
  {
    title: "Scheduling",
    desc: "Cron jobs, task queues, and calendar systems schedule events using Unix time for precision and portability across timezones.",
  },
  {
    title: "Cryptography",
    desc: "JWT tokens, OAuth tokens, and SSL certificates encode expiry as Unix timestamps. It's the universal standard for token lifetimes.",
  },
];

type Props = {};

const UnixTimestampUseCases: React.FC<Props> = () => {
  const { palette } = useColorPalette();
  return (
    <Box as="section">
      <VStack align="flex-start" gap={6}>
        <VStack align="flex-start" gap={3}>
          <Tag.Root variant="surface" colorPalette={palette} size={{ base: "lg", md: "xl" }}>
            <Tag.Label>Why Unix Time</Tag.Label>
          </Tag.Root>
          <Heading as="h2" fontWeight="bold" fontSize={{ base: "2xl", md: "4xl" }} lineHeight="normal">
            Common Use Cases for Unix Timestamps
          </Heading>
          <Text color="fg.muted">
            Unix timestamps are the backbone of modern software. Here&apos;s where you&apos;ll encounter them daily.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} w="full">
          {USE_CASES.map((item) => (
            <Box key={item.title} borderWidth="1px" borderRadius="md" p={5}>
              <Heading as="h3" fontSize="md" fontWeight="semibold" color={`${palette}.fg`} mb={2}>
                {item.title}
              </Heading>
              <Text fontSize="sm" color="fg.muted" lineHeight="tall">
                {item.desc}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default UnixTimestampUseCases;
