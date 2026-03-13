import { useColorPalette } from "@/contexts/useColorPalette";
import { AspectRatioItemModel } from "@/data/tools/aspectRatio/aspectRatioCommon";
import {
  Box,
  HStack,
  Icon,
  Spacer,
  Tag,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import { FaTv } from "react-icons/fa6";

type Props = {
  item: AspectRatioItemModel;
};

const AspectRatioCommonItem: React.FC<Props> = (props: Props) => {
  const { palette } = useColorPalette();
  const { item } = props;
  return (
    <Box
      bg={"bg.subtle"}
      p={4}
      rounded={"lg"}
      borderWidth={1}
      borderColor={"border"}
      h={"full"}
    >
      <VStack align={"flex-start"}>
        <Text fontWeight={"bold"} fontSize={"2xl"}>
          {item.ratio}
        </Text>
        <Spacer p={1} />
        <Text fontSize={"lg"} fontWeight={"bold"} color="fg.muted">
          {item.label}
        </Text>
        <Text color={"fg.subtle"}>{item.description}</Text>
        <Wrap>
          {item.resolutions.map((resolution, idx) => (
            <WrapItem key={idx}>
              <Tag.Root variant={"outline"} colorPalette={palette}>
                <Tag.Label>
                  <Text as={"span"} fontWeight={"bold"}>
                    {resolution.label}
                  </Text>
                  <Text as={"span"}>
                    {" " + resolution.width + " x " + resolution.height}
                  </Text>
                </Tag.Label>
              </Tag.Root>
            </WrapItem>
          ))}
        </Wrap>
      </VStack>
    </Box>
  );
};

export default AspectRatioCommonItem;
