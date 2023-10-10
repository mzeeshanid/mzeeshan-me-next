import { Heading, Text, VStack } from "@chakra-ui/layout";
import { theme } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import useTextBPValue from "../hooks/useTextBPValue";

function AppIconBox({ title, detail, image, alt, maxW = "320px", p = 0 }) {
  const textBPValue = useTextBPValue();
  return (
    <VStack maxW={maxW} p={p}>
      <Image
        loading="lazy"
        src={image}
        width={150}
        height={150}
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
