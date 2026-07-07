import ToolByline from "@/components/ToolByline/ToolByline";
import { useColorPalette } from "@/contexts/useColorPalette";
import { colorConverterFeaturesData } from "@/data/tools/colorFormatConverter";
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
import { IconType } from "react-icons";

interface FeatureCardProps {
  feature: { icon: IconType; title: string; description: string };
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  const { palette } = useColorPalette();
  return (
    <Box>
      <HStack align="flex-start" gap={4}>
        <Box bg={`${palette}.subtle`} borderRadius="md" flexShrink={0}>
          <Icon m={2} as={feature.icon} size="sm" color={`${palette}.focusRing`} />
        </Box>
        <VStack align="start" gap={2}>
          <Text fontWeight="bold">{feature.title}</Text>
          <Text color="fg.muted">{feature.description}</Text>
        </VStack>
      </HStack>
    </Box>
  );
};

const ColorConverterFeatures: React.FC = () => {
  const { palette } = useColorPalette();
  const data = colorConverterFeaturesData;

  return (
    <Box as="section">
      <SimpleGrid gap={8} minChildWidth="xs" alignItems="center">
        <GridItem colSpan={{ base: 2, lg: 1 }}>
          <VStack align="flex-start" gap={4}>
            <Tag.Root variant="surface" colorPalette={palette} size={{ base: "lg", md: "xl" }}>
              <Tag.Label>{data.header.badge}</Tag.Label>
            </Tag.Root>
            <Heading as="h2" fontWeight="bold" fontSize={{ base: "2xl", md: "4xl" }} lineHeight="normal">
              {data.header.title}
            </Heading>
            <Text color="fg.muted">{data.header.description}</Text>
            <ToolByline />
          </VStack>
        </GridItem>
        <GridItem colSpan={2}>
          <SimpleGrid minChildWidth="xs" gap={{ base: 4, md: 8 }}>
            {data.features.map((feature, idx) => (
              <GridItem key={idx}>
                <FeatureCard feature={feature} />
              </GridItem>
            ))}
          </SimpleGrid>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default ColorConverterFeatures;
