import {
  LightMode,
  Center,
  Box,
  Wrap,
  WrapItem,
  theme,
  HStack,
  VStack,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";
import React from "react";
import AppHeadingText from "../AppHeadingText";
import Image from "next/image";

export default function AppScreenShots({ screenshots, appLink, hero }) {
  return (
    <LightMode>
      <Link href={appLink} isExternal={true}>
        <Box p={4} bg={theme.colors.white} />
        <Center p={4} bg={theme.colors.white}>
          <HStack>
            <Image
              width="100px"
              height="100px"
              placeholder={"blur"}
              src={hero.appIcon}
            />
            <VStack align="flex-start" p={2} spacing={0}>
              <Heading as="h1" color={theme.colors.black}>
                {hero.appName}
              </Heading>
              <Text color={theme.colors.gray[500]}>{hero.subTitle}</Text>
              <Text color={theme.colors.teal[700]}> {hero.author}</Text>
            </VStack>
          </HStack>
        </Center>
      </Link>
      <VStack bg={theme.colors.white}>
        <Box p={4} />
        <AppHeadingText
          heading={"Screenshots"}
          headingColor={theme.colors.black}
          bg={theme.colors.white}
        />
        <Center>
          <Wrap
            maxW={"1400px"}
            spacing={8}
            columns={{ base: 4, sm: 1, md: 2, lg: 3 }}
            p={8}
            justify={"center"}
          >
            {screenshots.map((image, idx) => {
              return (
                <WrapItem key={idx}>
                  <Box w={"230px"} h={"409px"} shadow="2xl" rounded="lg">
                    <Image
                      src={image}
                      alt={`MZFileManager App Screenshot ${idx}`}
                      placeholder={"blur"}
                    />
                  </Box>
                </WrapItem>
              );
            })}
          </Wrap>
        </Center>
      </VStack>
    </LightMode>
  );
}
