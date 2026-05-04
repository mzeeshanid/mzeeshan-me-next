import { SampleFilesStatsModel } from "@/apis/sampleFiles/sampleFilesExtension";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import {
  Box,
  Card,
  Container,
  GridItem,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import React from "react";

import {
  formatStatsValue,
  sampleFilesStatsData,
} from "@/data/tools/sampleFiles/sampleFilesStatsData";
import SampleFilesStatItem from "./SampleFilesStatItem";

type Props = {
  dynamicStats?: SampleFilesStatsModel;
};

const SampleFilesStats: React.FC<Props> = ({ dynamicStats }) => {
  const resolvedItems = sampleFilesStatsData.stats.map((item) => {
    if (!dynamicStats) return item;
    const raw = dynamicStats[item.key];
    if (raw == null) return item;
    const { value, unit } = formatStatsValue(raw);
    return { ...item, value, unit };
  });

  return (
    <Box as="section">
      <Card.Root>
        <Card.Body>
          <Container py={2}>
            <VStack gap={8}>
              <SectionHeader textAlign="center" headline={"Stats"} />
              <SimpleGrid w="full" minChildWidth={200} gap={4}>
                {resolvedItems.map((item, idx) => (
                  <GridItem key={idx}>
                    <SampleFilesStatItem idx={idx} item={item} />
                  </GridItem>
                ))}
              </SimpleGrid>
            </VStack>
          </Container>
        </Card.Body>
      </Card.Root>
    </Box>
  );
};

export default SampleFilesStats;
