import { useColorPalette } from "@/contexts/useColorPalette";
import { UnixTimestampFeatureItem } from "@/data/tools/unixTimestamp/unixTimestampFeaturesData";
import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import React from "react";

type Props = {
  feature: UnixTimestampFeatureItem;
};

const UnixTimestampFeatureItemCard: React.FC<Props> = ({ feature }) => {
  const { icon, title, desc } = feature;
  const { palette } = useColorPalette();
  return (
    <Box>
      <HStack align="flex-start" gap={4}>
        <Box bg={`${palette}.subtle`} borderRadius="md">
          <Icon m={2} as={icon} size="sm" color={`${palette}.focusRing`} />
        </Box>
        <VStack align="start" gap={2}>
          <Text fontWeight="bold">{title}</Text>
          <Text color="fg.muted">{desc}</Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default UnixTimestampFeatureItemCard;
