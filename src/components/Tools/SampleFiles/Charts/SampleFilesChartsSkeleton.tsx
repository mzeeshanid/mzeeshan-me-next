import React from "react";
import { Box, GridItem, SimpleGrid, Skeleton, VStack } from "@chakra-ui/react";

const SampleFilesChartsSkeleton: React.FC = () => {
  return (
    <Box as="section">
      <VStack align="stretch" gap={6}>
        <VStack align="flex-start" gap={2}>
          <Skeleton h="20px" w="120px" borderRadius="full" />
          <Skeleton h="28px" w="52%" borderRadius="md" />
          <Skeleton h="16px" w="70%" borderRadius="md" />
        </VStack>
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8}>
          <GridItem>
            <VStack align="stretch" gap={4}>
              <Skeleton h="24px" w="60%" borderRadius="md" />
              <Skeleton h="16px" w="80%" borderRadius="md" />
              <Skeleton h="280px" borderRadius="xl" />
            </VStack>
          </GridItem>
          <GridItem>
            <VStack align="stretch" gap={4}>
              <Skeleton h="24px" w="60%" borderRadius="md" />
              <Skeleton h="16px" w="80%" borderRadius="md" />
              <Skeleton h="280px" borderRadius="xl" />
            </VStack>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default SampleFilesChartsSkeleton;
