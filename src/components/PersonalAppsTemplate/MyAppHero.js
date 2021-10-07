import React from "react";
import { chakra, Box, Stack, Text, LightMode, theme } from "@chakra-ui/react";
import MobileStoreButton from "react-mobile-store-button";
import Image from "next/image";

const MyAppHero = ({ heroData }) => {
  return (
    <LightMode>
      <Box p={12} bg={theme.colors.gray[50]} />
      <Box px={8} py={0} mx="auto" bg={theme.colors.gray[50]}>
        <Box
          w={{ base: "full", md: 11 / 12, xl: 9 / 12 }}
          mx="auto"
          textAlign={{ base: "left", md: "center" }}
        >
          <chakra.h1
            mb={6}
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="bold"
            lineHeight="none"
            letterSpacing={{ base: "normal", md: "tight" }}
            color={theme.colors.gray[900]}
          >
            {heroData.heroPrefix}
            <Text
              display={{ base: "block", lg: "inline" }}
              w="full"
              bgClip="text"
              bgGradient="linear(to-r, green.400,purple.500)"
              fontWeight="extrabold"
            >
              {heroData.heroTagLine}
            </Text>
            {heroData.heroSuffix}
          </chakra.h1>
          <chakra.p
            px={{ base: 0, lg: 24 }}
            mb={6}
            fontSize={{ base: "lg", md: "xl" }}
            color={theme.colors.gray[600]}
          >
            {heroData.shortDesc}
          </chakra.p>
          <Stack
            direction={{ base: "column", sm: "row" }}
            spacing={2}
            justifyContent={{ sm: "left", md: "center" }}
          >
            <MobileStoreButton
              store="ios"
              url={heroData.appUrl}
              linkProps={{ title: "iOS Store Button" }}
            />
          </Stack>
        </Box>
      </Box>
    </LightMode>
  );
};

export default MyAppHero;
