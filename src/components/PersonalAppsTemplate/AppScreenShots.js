import {
  LightMode,
  VStack,
  Center,
  Box,
  Wrap,
  WrapItem,
  theme,
} from "@chakra-ui/react";
import React from "react";
import AppHeadingText from "../AppHeadingText";
import Image from "next/image";

export default function AppScreenShots({ screenshots }) {
  return (
    <LightMode>
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
                  <Box w={"230px"} h={"498px"} shadow="2xl" rounded="lg">
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
