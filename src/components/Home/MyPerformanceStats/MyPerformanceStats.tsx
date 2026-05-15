import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import myPerformanceData from "@/data/home/myPerformanceData";
import { Box, Center, GridItem, SimpleGrid, Spacer } from "@chakra-ui/react";
import React from "react";
import MyPerformanceStatItem from "./MyPerformanceStatItem";

type MyPerformanceStatsProps = {};

const MyPerformanceStats: React.FC<MyPerformanceStatsProps> = (props) => {
  const myPerformanceStats = myPerformanceData();
  return (
    <Box as={"section"}>
      <Center>
        <SectionHeader
          textAlign={"center"}
          tagline={myPerformanceStats.tagline}
          headline={myPerformanceStats.title}
          description={myPerformanceStats.detail}
        />
      </Center>
      <Spacer p={4} />
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
        {myPerformanceStats.stats.map((stat, index) => (
          <GridItem key={index}>
            <MyPerformanceStatItem
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default MyPerformanceStats;
