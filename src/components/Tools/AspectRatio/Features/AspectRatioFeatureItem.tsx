import { useColorPalette } from "@/contexts/useColorPalette";
import { AspectRatioFeatureDataItem } from "@/data/tools/aspectRatio/aspectRatioFeaturesData";

import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import React from "react";

type Props = {
  feature: AspectRatioFeatureDataItem;
};

const AspectRatioFeatureItem: React.FC<Props> = (props: Props) => {
  const { icon, title, desc } = props.feature;
  const { palette } = useColorPalette();
  return (
    <Box>
      <HStack align={"flex-start"} gap={4}>
        <Box bg={`${palette}.subtle`} borderRadius="md">
          <Icon
            m={2}
            as={icon}
            size={"sm"}
            color={`${palette}.focusRing`}
          ></Icon>
        </Box>
        <VStack align="start" gap={2}>
          <Text fontWeight="bold">{title}</Text>
          <Text color={"fg.muted"}>{desc}</Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default AspectRatioFeatureItem;
