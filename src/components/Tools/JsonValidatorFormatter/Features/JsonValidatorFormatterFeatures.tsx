import { useColorPalette } from "@/contexts/useColorPalette";
import { jsonValidatorFormatterFeaturesData } from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import {
  Box,
  GridItem,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  data?: typeof jsonValidatorFormatterFeaturesData;
};

const JsonValidatorFormatterFeatures: React.FC<Props> = ({ data }) => {
  const { palette } = useColorPalette();
  const featuresData = data ?? jsonValidatorFormatterFeaturesData;

  return (
    <Box as="section">
      <SimpleGrid gap={8} minChildWidth="xs" alignItems="start">
        <GridItem colSpan={{ base: 2, lg: 1 }}>
          <VStack align="flex-start" gap={4}>
            <Tag.Root
              variant="surface"
              colorPalette={palette}
              size={{ base: "lg", md: "xl" }}
            >
              <Tag.Label>{featuresData.header.badge}</Tag.Label>
            </Tag.Root>
            <Heading
              as="h3"
              fontWeight="bold"
              fontSize={{ base: "2xl", md: "4xl" }}
              lineHeight="normal"
            >
              {featuresData.header.title}
            </Heading>
            <Text color="fg.muted">{featuresData.header.description}</Text>
          </VStack>
        </GridItem>
        <GridItem colSpan={2}>
          <SimpleGrid minChildWidth="xs" gap={{ base: 4, md: 8 }}>
            {featuresData.features.map((feature) => (
              <Box key={feature.title}>
                <HStack align="flex-start" gap={4}>
                  <Box bg={`${palette}.subtle`} borderRadius="md">
                    <Icon
                      m={2}
                      as={feature.icon}
                      size="sm"
                      color={`${palette}.focusRing`}
                    />
                  </Box>
                  <VStack align="start" gap={2}>
                    <Text fontWeight="bold">{feature.title}</Text>
                    <Text color="fg.muted">{feature.description}</Text>
                  </VStack>
                </HStack>
              </Box>
            ))}
          </SimpleGrid>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default JsonValidatorFormatterFeatures;
