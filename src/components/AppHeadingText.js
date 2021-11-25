import { Heading, Text, theme, VStack } from "@chakra-ui/react";
import React from "react";
import useHeadingBPValue from "../hooks/useHeadingBPValue";
import useTextBPValue from "../hooks/useTextBPValue";

function AppHeadingText({
  heading,
  text,
  headingColor,
  children,
  bg = "gray.100",
  as = "h2",
}) {
  const headingBPValue = useHeadingBPValue();

  const textBPValue = useTextBPValue();

  return (
    <VStack pl={8} pr={8} bg={bg}>
      {heading && (
        <Heading
          as={as}
          size={headingBPValue}
          textAlign="center"
          color={headingColor}
        >
          {heading}
        </Heading>
      )}
      {text && (
        <Text
          fontSize={textBPValue}
          textAlign="center"
          color={theme.colors.black}
        >
          {text}
        </Text>
      )}
      {children && children}
    </VStack>
  );
}

export default AppHeadingText;
