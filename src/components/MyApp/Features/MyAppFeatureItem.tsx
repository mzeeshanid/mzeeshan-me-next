import { useColorPalette } from "@/contexts/useColorPalette";
import { MyAppFeatureItemDataModel } from "@/data/myApps/myAppFeaturesData";
import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

type Props = {
  featureItem: MyAppFeatureItemDataModel;
};

const MyAppFeatureItem: React.FC<Props> = (props: Props) => {
  const { featureItem } = props;
  const { palette } = useColorPalette();

  return (
    <Box>
      <HStack align={"flex-start"} gap={4}>
        <Box bg={`${palette}.subtle`} borderRadius="md">
          <Icon
            m={2}
            as={featureItem.icon}
            size={"sm"}
            color={`${palette}.focusRing`}
          ></Icon>
        </Box>
        <VStack align="start" gap={2}>
          <Text fontWeight="bold">{featureItem.title}</Text>
          {featureItem.bullets.map((bullet, idx) => (
            <HStack key={idx} gap={2} align={"center"}>
              <Icon
                as={FaCheckCircle}
                size={"xs"}
                color={`${palette}.focusRing`}
              />
              <Text color={"fg.muted"}>{bullet}</Text>
            </HStack>
          ))}
        </VStack>
      </HStack>
    </Box>
  );
};

export default MyAppFeatureItem;
