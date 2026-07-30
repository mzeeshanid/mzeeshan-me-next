import { SampleFilesStatsModel } from "@/apis/sampleFiles/sampleFilesExtension";
import { Box, SimpleGrid } from "@chakra-ui/react";
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
      <SimpleGrid columns={{ base: 2, sm: 3, lg: 5 }} gap={4}>
        {resolvedItems.map((item, idx) => (
          <SampleFilesStatItem key={idx} idx={idx} item={item} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default SampleFilesStats;
