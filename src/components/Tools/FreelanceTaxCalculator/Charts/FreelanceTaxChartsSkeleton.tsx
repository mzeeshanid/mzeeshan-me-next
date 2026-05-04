import React from "react";
import { Box, GridItem, SimpleGrid, Skeleton, VStack } from "@chakra-ui/react";

const FreelanceTaxChartsSkeleton: React.FC = () => {
  return (
    <Box as="section">
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
    </Box>
  );
};

export default FreelanceTaxChartsSkeleton;
