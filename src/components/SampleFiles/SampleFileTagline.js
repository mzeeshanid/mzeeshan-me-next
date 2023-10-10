import { VStack } from "@chakra-ui/layout";
import { theme } from "@chakra-ui/react";
import React from "react";
import AppHeadingText from "../AppHeadingText";

export default function SampleFileTagline() {
  return (
    <VStack p={4} bg={theme.colors.white}>
      <AppHeadingText
        headingColor={theme.colors.black}
        heading={"Trusted by developers from all over the world"}
        text={
          "Free, safe and easy way to download sample files for testing and other purposes."
        }
        bg={"white"}
      />
    </VStack>
  );
}
