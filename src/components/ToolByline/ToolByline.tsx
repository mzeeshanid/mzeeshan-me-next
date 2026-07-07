import { useColorPalette } from "@/contexts/useColorPalette";
import { Box, HStack, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import profilePic from "public/assets/profile_pic.jpeg";
import React from "react";

type Props = {};

const ToolByline: React.FC<Props> = (props: Props) => {
  const { palette } = useColorPalette();

  return (
    <Link href="/about" _hover={{ textDecoration: "none" }} display="inline-block">
      <HStack gap={2} color="fg.muted" _hover={{ color: `${palette}.solid` }}>
        <Box w="28px" h="28px" flexShrink={0} borderRadius="full" overflow="hidden">
          <Image
            src={profilePic}
            alt="Muhammad Zeeshan"
            width={28}
            height={28}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            sizes="28px"
          />
        </Box>
        <Text textStyle="sm">
          {"Built by "}
          <Text as="span" fontWeight="semibold">
            {"Muhammad Zeeshan"}
          </Text>
        </Text>
      </HStack>
    </Link>
  );
};

export default ToolByline;
