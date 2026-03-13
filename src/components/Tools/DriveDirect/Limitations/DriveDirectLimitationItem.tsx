import { useColorPalette } from "@/contexts/useColorPalette";
import { DriveDirectLimitationItemModel } from "@/data/tools/driveDirect/driveDirectLimitationData";
import { Box, Icon, Text, VStack } from "@chakra-ui/react";
import React from "react";

type Props = {
  item: DriveDirectLimitationItemModel;
};

const DriveDirectLimitationItem: React.FC<Props> = (props: Props) => {
  const { palette } = useColorPalette();
  return (
    <Box>
      <VStack align={"flex-start"}>
        <Box p={{ base: 2, md: 4 }} bg={"bg.muted"} borderRadius="full">
          <Icon
            color={`${palette}.focusRing`}
            as={props.item.icon}
            size={{ base: "xl", md: "2xl" }}
          />
        </Box>
        <Text fontWeight="bold" fontSize={{ base: "xl", md: "2xl" }}>
          {props.item.title}
        </Text>
        <Text color="fg.muted">{props.item.desc}</Text>
      </VStack>
    </Box>
  );
};

export default DriveDirectLimitationItem;
