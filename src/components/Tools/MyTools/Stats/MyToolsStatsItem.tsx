import { useColorPalette } from "@/contexts/useColorPalette";
import { ToolStatistic } from "@/data/tools/myTools/myToolsStatistics";
import { Text, VStack } from "@chakra-ui/react";
import React from "react";

type Props = {
  statistic: ToolStatistic;
};

const MyToolStatisticItem: React.FC<Props> = (props: Props) => {
  const { palette } = useColorPalette();
  const { statistic } = props;

  return (
    <VStack textAlign="center" gap={2}>
      <Text
        fontSize={{ base: "2xl", md: "3xl" }}
        fontWeight="bold"
        color={`${palette}.fg`}
      >
        {statistic.value}
      </Text>
      <Text fontWeight="semibold">{statistic.label}</Text>
      <Text fontSize="xs" color="fg.muted">
        {statistic.description}
      </Text>
    </VStack>
  );
};

export default MyToolStatisticItem;
