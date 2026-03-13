import { myToolsStatisticsData } from "@/data/tools/myTools/myToolsStatistics";
import {
  Box,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import MyToolStatisticItem from "./MyToolsStatsItem";

type Props = {};

const MyToolsStatistics: React.FC<Props> = (props: Props) => {
  const data = myToolsStatisticsData;

  return (
    <Box as="section" py={12} bg={`bg.subtle`} borderRadius="lg">
      <VStack gap={8} alignItems="center">
        <VStack gap={2} textAlign="center" maxW="2xl">
          <Heading as="h2" size="2xl">
            {data.title}
          </Heading>
          <Text color="fg.muted">{data.subtitle}</Text>
        </VStack>

        <SimpleGrid columns={{ base: 2, md: 4 }} gap={6} w="full">
          {data.statistics.map((stat, index) => (
            <GridItem key={index} w="full" h="full">
              <MyToolStatisticItem statistic={stat} />
            </GridItem>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default MyToolsStatistics;
