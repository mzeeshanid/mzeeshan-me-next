import {
  Box,
  Heading,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Image from "next/image";

import heroImage from "../../public/assets/mzeeshan_me_hero.jpeg";

function AppHero() {
  const headingBPValue = useBreakpointValue({
    base: "2xl",
    lg: "4xl",
  });

  const textBPValue = useBreakpointValue({
    base: "lg",
    md: "xl",
    lg: "2xl",
  });

  return (
    <Box w="100%" h={"calc(100vh - 80px)"} pos="relative">
      <Image
        top={0}
        layout={"fill"}
        objectFit="cover"
        objectPosition="bottom"
        src={heroImage}
        alt="Hero Image"
        placeholder={"blur"}
      />
      <VStack
        bg="blackAlpha.700"
        pos="absolute"
        w="100%"
        h="100%"
        p={4}
        top={0}
        spacing={0}
        justify="center"
      >
        <Heading textColor="white" size={headingBPValue} textAlign="center">
          Muhammad Zeeshan
        </Heading>
        <Text fontSize={textBPValue} textColor="white" textAlign="center">
          Senior iOS Developer, Swift Enthusiast
        </Text>
      </VStack>
    </Box>
  );
}

export default AppHero;
