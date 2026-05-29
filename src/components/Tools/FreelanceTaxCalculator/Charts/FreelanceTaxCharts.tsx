import React from "react";
import { BarList, BarSegment, type BarListData, useChart } from "@chakra-ui/charts";
import { FreelanceTaxResult, formatPKR } from "@/services/freelanceTaxService";
import { Box, GridItem, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";

interface FreelanceTaxChartsProps {
  result: FreelanceTaxResult;
}

const FreelanceTaxCharts: React.FC<FreelanceTaxChartsProps> = ({ result }) => {
  const segmentChart = useChart({
    data: [
      { name: "Take-Home", value: Math.round(result.monthlyTakeHome), color: "green.solid" },
      { name: "Tax", value: Math.round(result.monthlyTax), color: "orange.solid" },
    ],
  });

  const listChart = useChart<BarListData>({
    sort: { by: "value", direction: "desc" },
    data: [
      { name: "Take-Home", value: Math.round(result.monthlyTakeHome) },
      { name: "Tax", value: Math.round(result.monthlyTax) },
    ],
    series: [{ name: "name", color: "green.subtle" }],
  });

  return (
    <Box as="section">
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8}>
        <GridItem>
          <VStack align="stretch" gap={4}>
            <VStack align="flex-start" gap={1}>
              <Heading as="h3" fontSize="lg" fontWeight="semibold">
                Monthly Income Distribution
              </Heading>
              <Text color="fg.muted" fontSize="sm">
                Take-home vs tax on your monthly income of {formatPKR(result.monthlyIncome)}
              </Text>
            </VStack>
            <BarSegment.Root chart={segmentChart} barSize="6">
              <BarSegment.Content>
                <BarSegment.Bar tooltip />
              </BarSegment.Content>
              <BarSegment.Legend showPercent />
            </BarSegment.Root>
          </VStack>
        </GridItem>

        <GridItem>
          <VStack align="stretch" gap={4}>
            <VStack align="flex-start" gap={1}>
              <Heading as="h3" fontSize="lg" fontWeight="semibold">
                Monthly Income Breakdown
              </Heading>
              <Text color="fg.muted" fontSize="sm">
                Take-home vs tax — monthly amounts
              </Text>
            </VStack>
            <BarList.Root chart={listChart}>
              <BarList.Content>
                <BarList.Label title="Category" flex="1">
                  <BarList.Bar />
                </BarList.Label>
                <BarList.Label title="Monthly Amount" titleAlignment="end">
                  <BarList.Value valueFormatter={(v: number) => formatPKR(v)} />
                </BarList.Label>
              </BarList.Content>
            </BarList.Root>
          </VStack>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default FreelanceTaxCharts;
