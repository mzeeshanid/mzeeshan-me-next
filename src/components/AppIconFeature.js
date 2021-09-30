import {
  Box,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from "@chakra-ui/layout";
import React from "react";
import useHeadingBPValue from "../hooks/useHeadingBPValue";
import useTextBPValue from "../hooks/useTextBPValue";

function AppIconFeature({ item }) {
  const headingBPValue = useHeadingBPValue();
  const textBPValue = useTextBPValue();
  return (
    <LinkBox>
      <LinkOverlay href={item.path}>
        <Box>
          <VStack p={2} maxW="310px">
            {item.icon}
            <Heading size={headingBPValue}>{item.name}</Heading>
            <Text fontSize={textBPValue} textAlign="center">
              {item.detail}
            </Text>
          </VStack>
        </Box>
      </LinkOverlay>
    </LinkBox>
  );
}

export default AppIconFeature;
