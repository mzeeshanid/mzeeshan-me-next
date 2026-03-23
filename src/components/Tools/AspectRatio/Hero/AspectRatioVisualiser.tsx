import { Box, Center, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { formatSmart, simplifyRatio } from "@/utils/aspectRatio";

type Props = {
  width: number;
  height: number;
};

const AspectRatioVisualiser: React.FC<Props> = (props: Props) => {
  const { width, height } = props;
  const [ratioWidth, ratioHeight] = simplifyRatio(width, height);

  let normalizedWidth: number = width;
  let normalizedHeight: number = height;
  if (height > width) {
    normalizedWidth = (200.0 * width) / height;
    normalizedHeight = 200.0;
  } else {
    normalizedHeight = (height / width) * 200.0;
    normalizedWidth = 200.0;
  }

  return (
    <VStack>
      <Text fontSize={"xl"} fontWeight={"bold"} color={"fg.muted"}>
        {"Visualiser"}
      </Text>
      <Text fontSize={"sm"} color={"fg.subtle"}>
        <Text as="span">{"Aspect Ratio is "}</Text>
        <Text
          as="span"
          fontWeight={"bold"}
        >{`${formatSmart(ratioWidth)} : ${formatSmart(ratioHeight)}`}</Text>
      </Text>
      <Box
        w={`${normalizedWidth}px`}
        h={`${normalizedHeight}px`}
        bg={"bg.muted"}
        borderWidth={1}
        borderColor={"border.emphasized"}
        overflow={"hidden"}
      >
        <Center w="full" h="full">
          <Text fontSize={"xs"} textAlign={"center"}>
            {"Example"}
          </Text>
        </Center>
      </Box>
    </VStack>
  );
};

export default AspectRatioVisualiser;
