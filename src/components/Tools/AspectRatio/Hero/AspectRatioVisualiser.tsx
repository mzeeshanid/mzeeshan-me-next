import { Box, Center, Text, VStack } from "@chakra-ui/react";
import React from "react";

type Props = {
  width: number;
  height: number;
};

const AspectRatioVisualiser: React.FC<Props> = (props: Props) => {
  const { width, height } = props;
  const [ratioWidth, ratioHeight] = ratio(width, height);

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

// Greatest Common Divisor (binary GCD / Stein's algorithm)
const gcd = (u: number, v: number): number => {
  if (u === v) return u;
  if (u === 0) return v;
  if (v === 0) return u;

  // u is even
  if ((~u & 1) === 1) {
    // v is odd
    if ((v & 1) === 1) return gcd(u >> 1, v);
    // both even
    return gcd(u >> 1, v >> 1) << 1;
  }

  // v is even
  if ((~v & 1) === 1) return gcd(u, v >> 1);

  // both odd
  if (u > v) return gcd((u - v) >> 1, v);

  return gcd((v - u) >> 1, u);
};

// Reduce width/height to simplest ratio
const ratio = (w: number, h: number): [number, number] => {
  const d = gcd(w, h);
  return [w / d, h / d];
};

const formatSmart = (num: number, decimals = 2): string => {
  return num
    .toFixed(decimals) // "1.00", "1.20", "1.23"
    .replace(/\.?0+$/, ""); // -> "1", "1.2", "1.23"
};

export default AspectRatioVisualiser;
