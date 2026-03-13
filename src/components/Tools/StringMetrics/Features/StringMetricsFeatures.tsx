import { useColorPalette } from "@/contexts/useColorPalette";
import { stringMetricsFeaturesData } from "@/data/tools/stringMetrics";
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

type Props = {};

interface FeatureProps {
  feature: {
    icon: IconType;
    title: string;
    description: string;
  };
}

const FeatureCard: React.FC<FeatureProps> = ({ feature }) => {
  const { palette } = useColorPalette();
  return (
    <Box>
      <HStack align={"flex-start"} gap={4}>
        <Box bg={`${palette}.subtle`} borderRadius="md">
          <Icon
            m={2}
            as={feature.icon}
            size={"sm"}
            color={`${palette}.focusRing`}
          ></Icon>
        </Box>
        <VStack align="start" gap={2}>
          <Text fontWeight="bold">{feature.title}</Text>
          <Text color={"fg.muted"}>{feature.description}</Text>
        </VStack>
      </HStack>
    </Box>
  );
};

const StringMetricsFeatures: React.FC<Props> = (props: Props) => {
  const { palette } = useColorPalette();
  const featuresData = stringMetricsFeaturesData;

  return (
    <Box as="section">
      <SimpleGrid gap={8} minChildWidth={"xs"} alignItems={"center"}>
        <GridItem colSpan={{ base: 2, lg: 1 }}>
          <VStack align={"flex-start"} gap={4}>
            <Tag.Root
              variant={"surface"}
              colorPalette={palette}
              size={{ base: "lg", md: "xl" }}
            >
              <Tag.Label>{featuresData.header.badge}</Tag.Label>
            </Tag.Root>
            <Heading
              as="h3"
              fontWeight={"bold"}
              fontSize={{ base: "2xl", md: "4xl" }}
              lineHeight={"normal"}
            >
              {featuresData.header.title}
            </Heading>
            <Text color={"fg.muted"}>{featuresData.header.description}</Text>
          </VStack>
        </GridItem>
        <GridItem colSpan={2}>
          <SimpleGrid minChildWidth={"xs"} gap={{ base: 4, md: 8 }}>
            {featuresData.features.map((feature, idx) => (
              <GridItem key={idx}>
                <FeatureCard key={idx} feature={feature} />
              </GridItem>
            ))}
          </SimpleGrid>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default StringMetricsFeatures;
