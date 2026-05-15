import { Box, GridItem, SimpleGrid, VStack } from "@chakra-ui/react";
import React from "react";
import MyStatItem from "./MyStatItem";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import myStatsData from "@/data/home/myStatsData";

type MyStatsProps = {};

const MyStats: React.FC<MyStatsProps> = (props: MyStatsProps) => {
  const { tagline, title, detail, stats } = myStatsData();
  return (
    <Box as="section">
      <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} gap={8}>
        <GridItem>
          <VStack align={"flex-start"}>
            <SectionHeader
              tagline={tagline}
              headline={title}
              description={detail}
            />
          </VStack>
        </GridItem>
        <Box>
          <SimpleGrid columns={2} gap={8}>
            {stats.map((stat, index) => (
              <GridItem key={index}>
                <MyStatItem title={stat.title} value={stat.value} />
              </GridItem>
            ))}
          </SimpleGrid>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default MyStats;
