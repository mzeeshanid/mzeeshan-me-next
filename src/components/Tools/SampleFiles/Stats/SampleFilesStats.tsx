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

import { sampleFilesStatsData } from "@/data/tools/sampleFiles/sampleFilesStatsData";
import SampleFilesStatItem from "./SampleFilesStatItem";

type Props = {};

const SampleFilesStats: React.FC<Props> = (props: Props) => {
  const statsData = sampleFilesStatsData;
  return (
    <Box as="section">
      <Card.Root>
        <Card.Body>
          <Container py={2}>
            <VStack gap={8}>
              <SectionHeader textAlign="center" headline={"Stats"} />
              <SimpleGrid w="full" minChildWidth={200} gap={4}>
                {statsData.stats.map((item, idx) => (
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
