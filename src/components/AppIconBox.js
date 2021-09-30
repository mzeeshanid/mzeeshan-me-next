import Image from "next/image";
import { Heading, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import useTextBPValue from "../hooks/useTextBPValue";
import theme from "@chakra-ui/theme";

function AppIconBox({ title, detail, image, alt, maxW = "320px", p = 0 }) {
  const textBPValue = useTextBPValue();
  return (
    <VStack maxW={maxW} p={p}>
      <Image
        src={image}
        width="150px"
        height="150px"
        placeholder={"blur"}
        alt={alt}
      />
      <Heading align="center" color={theme.colors.black}>
        {title}
      </Heading>
      <Text align="center" fontSize={textBPValue} color={theme.colors.black}>
        {detail}
      </Text>
    </VStack>
  );
}

export default AppIconBox;
