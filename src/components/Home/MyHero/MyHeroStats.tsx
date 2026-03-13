import { useColorPalette } from "@/contexts/useColorPalette";
import myStatsData from "@/data/home/myStatsData";
import { GridItem, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React from "react";

type MyHeroStatsProps = {};

const MyHeroStats: React.FC<MyHeroStatsProps> = (props: MyHeroStatsProps) => {
  const { stats } = myStatsData();
  const { palette } = useColorPalette();
  return (
    <SimpleGrid columns={{ base: 2, lg: 4 }} gap={{ base: 4, md: 8 }}>
      {stats.slice(0, 4).map((stat, idx) => (
        <GridItem key={idx}>
          <VStack align={"flex-start"} gap={0}>
            <Text
              fontWeight={"bold"}
              color={`${palette}.fg`}
              fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
            >
              {stat.value}
            </Text>
            <Text color={"fg.muted"}>{stat.title}</Text>
          </VStack>
        </GridItem>
      ))}
    </SimpleGrid>
  );
};

export default MyHeroStats;
