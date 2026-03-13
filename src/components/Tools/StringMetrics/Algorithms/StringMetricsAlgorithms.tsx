import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { useColorPalette } from "@/contexts/useColorPalette";
import { stringMetricsAlgorithmsData } from "@/data/tools/stringMetrics";
import {
  Box,
  Center,
  Circle,
  GridItem,
  Icon,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

type Props = {};

interface AlgorithmCardProps {
  algorithm: {
    id: string;
    name: string;
    description: string;
    icon: IconType;
    timeComplexity: string;
    spaceComplexity: string;
    useCases: string[];
    bestFor: string;
  };
  palette: string;
}

const AlgorithmCard: React.FC<AlgorithmCardProps> = ({
  algorithm,
  palette,
}) => {
  return (
    <VStack gap={4}>
      <Circle p={4} bg={"bg.muted"}>
        <Icon as={algorithm.icon} boxSize={6} color={`${palette}.focusRing`} />
      </Circle>
      <Text
        fontSize={{ base: "lg", md: "xl" }}
        textAlign={"center"}
        fontWeight={"bold"}
      >
        {algorithm.name}
      </Text>
      <Text textAlign={"center"} color="fg.muted">
        {algorithm.description}
      </Text>
    </VStack>
  );
};

const StringMetricsAlgorithms: React.FC<Props> = (props: Props) => {
  const { palette } = useColorPalette();
  const algorithmsData = stringMetricsAlgorithmsData;

  return (
    <Box as="section">
      <Center>
        <SectionHeader
          tagline={"Algorithms"}
          headline={"Supported String Metrics"}
          description={
            "We support seven industry-standard algorithms for string comparison. Each algorithm has unique characteristics suited for different use cases."
          }
          textAlign={"center"}
        />
      </Center>
      <Spacer p={4} />
      <SimpleGrid w="full" minChildWidth={"xs"} gap={8}>
        {algorithmsData.algorithms.map((algorithm, idx) => (
          <GridItem key={idx}>
            <AlgorithmCard key={idx} algorithm={algorithm} palette={palette} />
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default StringMetricsAlgorithms;
