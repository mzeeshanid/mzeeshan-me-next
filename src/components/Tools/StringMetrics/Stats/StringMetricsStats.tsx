import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { useColorPalette } from "@/contexts/useColorPalette";
import { stringMetricsStatsData } from "@/data/tools/stringMetrics/stringMetricsStats";
import {
  Box,
  Card,
  HStack,
  Icon,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

type Props = {};

const StatCard: React.FC<{
  stat: {
    label: string;
    value: string;
    description: string;
    icon: IconType;
  };
  palette: string;
}> = ({ stat, palette }) => {
  return (
    <Card.Root bg="bg.subtle" borderWidth={0}>
      <Card.Header>
        <Text
          fontSize={{ base: "2xl", md: "4xl" }}
          color={`${palette}.fg`}
          fontWeight={{ base: "bold", md: "extrabold" }}
        >
          {stat.value}
        </Text>
      </Card.Header>
      <Card.Body>
        <HStack justify={"space-between"}>
          <Text>{stat.label}</Text>
          <Icon
            as={stat.icon}
            color={`${palette}.fg`}
            boxSize={{ base: 10, md: 12 }}
          />
        </HStack>
      </Card.Body>
    </Card.Root>
  );
};

const StringMetricsStats: React.FC<Props> = (props: Props) => {
  const { palette } = useColorPalette();
  const statsData = stringMetricsStatsData;

  return (
    <Box as="section">
      <SectionHeader
        tagline={statsData.badge}
        headline={statsData.title}
        description={statsData.description}
      />
      <Spacer p={2} />
      <VStack gap={4} align="flex-start">
        <SimpleGrid minChildWidth={"xs"} gap={4} w="full">
          {statsData.stats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} palette={palette} />
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default StringMetricsStats;
