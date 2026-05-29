import React from "react";
import { BarList, BarSegment, type BarListData, useChart } from "@chakra-ui/charts";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { Box, GridItem, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";

export type SampleFilesChartsData = {
  topExtensions: { name: string; downloads: number }[];
  byCategory: { name: string; value: number }[];
};

const CHAKRA_COLORS = [
  "purple.solid",
  "green.solid",
  "orange.solid",
  "pink.solid",
  "yellow.solid",
  "cyan.solid",
];

const formatDownloads = (n: number): string => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
};

type Props = { chartsData: SampleFilesChartsData };

const SampleFilesCharts: React.FC<Props> = ({ chartsData }) => {
  const segmentChart = useChart({
    data: chartsData.byCategory.map((item, index) => ({
      ...item,
      color: CHAKRA_COLORS[index % CHAKRA_COLORS.length],
    })),
  });

  const listChart = useChart<BarListData>({
    sort: { by: "value", direction: "desc" },
    data: chartsData.topExtensions.map((ext) => ({
      name: `.${ext.name}`,
      value: ext.downloads,
    })),
    series: [{ name: "name", color: "purple.subtle" }],
  });

  return (
    <Box as="section">
      <VStack align="stretch" gap={6}>
        <SectionHeader
          tagline="Insights"
          headline="Download Analytics"
          description="Visual breakdown of downloads across file categories and top formats."
        />
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8}>
          <GridItem minW={0}>
            <VStack align="stretch" gap={4}>
              <VStack align="flex-start" gap={1}>
                <Heading as="h3" fontSize="lg" fontWeight="semibold">Extensions by Category</Heading>
                <Text color="fg.muted" fontSize="sm">Distribution of file formats across categories</Text>
              </VStack>
              <BarSegment.Root chart={segmentChart} barSize="6">
                <BarSegment.Content>
                  <BarSegment.Bar tooltip />
                </BarSegment.Content>
                <BarSegment.Legend showPercent />
              </BarSegment.Root>
            </VStack>
          </GridItem>

          <GridItem minW={0}>
            <VStack align="stretch" gap={4}>
              <VStack align="flex-start" gap={1}>
                <Heading as="h3" fontSize="lg" fontWeight="semibold">Top Extensions by Downloads</Heading>
                <Text color="fg.muted" fontSize="sm">Most downloaded individual file formats</Text>
              </VStack>
              <BarList.Root chart={listChart}>
                <BarList.Content>
                  <BarList.Label title="Extension" flex="1">
                    <BarList.Bar />
                  </BarList.Label>
                  <BarList.Label title="Downloads" titleAlignment="end">
                    <BarList.Value valueFormatter={(v: number) => formatDownloads(v)} />
                  </BarList.Label>
                </BarList.Content>
              </BarList.Root>
            </VStack>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default SampleFilesCharts;
