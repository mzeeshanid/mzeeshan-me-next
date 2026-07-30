import { SampleFilesStatItemDataModel } from "@/data/tools/sampleFiles/sampleFilesStatsData";
import { useColorPalette } from "@/contexts/useColorPalette";
import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import React from "react";

type Props = {
  idx: number;
  item: SampleFilesStatItemDataModel;
};

const SampleFilesStatItem: React.FC<Props> = ({ item }) => {
  const { palette } = useColorPalette();

  return (
    <HStack
      gap={3}
      p={4}
      borderWidth="1px"
      borderColor="border.subtle"
      borderRadius="xl"
      bg="bg"
      _dark={{ bg: "whiteAlpha.50" }}
      align="center"
    >
      <Box
        w={10}
        h={10}
        borderRadius="lg"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg={`${palette}.subtle`}
        color={`${palette}.fg`}
        flexShrink={0}
      >
        {item.icon && <Icon as={item.icon} boxSize={5} />}
      </Box>
      <VStack align="start" gap={0}>
        <Text fontSize="xl" fontWeight="bold" lineHeight="1.2">
          {item.value}
          {item.unit}
        </Text>
        <Text fontSize="sm" color="fg.muted">
          {item.label}
        </Text>
      </VStack>
    </HStack>
  );
};

export default SampleFilesStatItem;
