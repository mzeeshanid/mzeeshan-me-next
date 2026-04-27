import { useColorPalette } from "@/contexts/useColorPalette";
import { unixTimestampFeaturesData } from "@/data/tools/unixTimestamp/unixTimestampFeaturesData";
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
import UnixTimestampFeatureItemCard from "./UnixTimestampFeatureItem";

type Props = {};

const UnixTimestampFeatures: React.FC<Props> = () => {
  const { palette } = useColorPalette();
  const data = unixTimestampFeaturesData;
  return (
    <Box as="section">
      <SimpleGrid gap={8} minChildWidth="xs" alignItems="center">
        <GridItem colSpan={{ base: 2, lg: 1 }}>
          <VStack align="flex-start" gap={4}>
            <Tag.Root
              variant="surface"
              colorPalette={palette}
              size={{ base: "lg", md: "xl" }}
            >
              <Tag.Label>{data.header.badge}</Tag.Label>
            </Tag.Root>
            <Heading
              as="h3"
              fontWeight="bold"
              fontSize={{ base: "2xl", md: "4xl" }}
              lineHeight="normal"
            >
              {data.header.title}
            </Heading>
            <Text color="fg.muted">{data.header.desc}</Text>
          </VStack>
        </GridItem>
        <GridItem colSpan={2}>
          <SimpleGrid minChildWidth="xs" gap={{ base: 4, md: 8 }}>
            {data.features.map((feature, idx) => (
              <GridItem key={idx}>
                <UnixTimestampFeatureItemCard feature={feature} />
              </GridItem>
            ))}
          </SimpleGrid>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default UnixTimestampFeatures;
