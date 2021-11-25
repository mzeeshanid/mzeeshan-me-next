import {
  Box,
  Center,
  Circle,
  LightMode,
  Wrap,
  WrapItem,
  VStack,
  Text,
  Heading,
  Link,
} from "@chakra-ui/react";
import theme from "@chakra-ui/theme";
import React from "react";
import mySocialConnect from "../data/mySocialConnect";
import isExternalLink from "../hooks/isExternalLink";
import AppHeadingText from "./AppHeadingText";

export default function AppContact() {
  const soicalConnects = mySocialConnect();
  return (
    <LightMode>
      <Box bg={theme.colors.white} p={4} />
      <AppHeadingText
        heading={"Want To Connect"}
        headingColor={theme.colors.black}
        bg={theme.colors.white}
        as={"h1"}
      />
      <Center bg={theme.colors.white}>
        <Wrap justify="center" p={4} spacing={8} maxW={"1024px"}>
          {soicalConnects.map((item, idx) => {
            return (
              <WrapItem key={idx}>
                <Link
                  key={idx}
                  href={item.url}
                  isExternal={isExternalLink(item.url)}
                >
                  <Box
                    bg={theme.colors.white}
                    p={6}
                    shadow={"2xl"}
                    rounded={"lg"}
                    maxW="300px"
                  >
                    <VStack>
                      <Circle
                        w={"100px"}
                        h={"100px"}
                        bg={theme.colors.blackAlpha[100]}
                      >
                        {item.icon}
                      </Circle>
                      <Heading color={theme.colors.black}>{item.title}</Heading>
                      <Text color={theme.colors.black}>{item.desc}</Text>
                    </VStack>
                  </Box>
                </Link>
              </WrapItem>
            );
          })}
        </Wrap>
      </Center>
    </LightMode>
  );
}
