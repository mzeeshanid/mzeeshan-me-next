import React from "react";
import {
  Heading,
  LightMode,
  VStack,
  Center,
  Text,
  theme,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import AppNavBar from "../../src/components/AppNavBar";
import myNavItems from "../../src/data/myNavItems";
import AppFooter from "../../src/components/AppFooter";
import Image from "next/dist/client/image";

import aspectRatioAppIcon from "../../public/assets/aspect_ratio_app_icon.png";
import AspectRatioForm from "../../src/components/AspectRatio/AspectRatioForm";

export default function index() {
  return (
    <LightMode>
      <AppNavBar navItems={myNavItems()} />
      <Center>
        <VStack maxW={"800px"} p={4}>
          <Image
            width={"150px"}
            height={"150px"}
            src={aspectRatioAppIcon}
            placeholder="blur"
            alt="Aspect Ratio Calculator App Icon"
          ></Image>
          <Heading color={theme.colors.black} as="h1">
            Aspect Ratio Calculator
          </Heading>
          <Text color={theme.colors.black}>
            A tool that allows to calculate aspect ratio by entering original
            size and desired width or height.
          </Text>
        </VStack>
      </Center>
      <AspectRatioForm />
      {/* <UnorderedList>
          <ListItem>
            Enter the orginal width and height respectively in the fields below.
          </ListItem>
          <ListItem>
            Enter your desired width or height to get the other value.
          </ListItem>
        </UnorderedList> */}

      <AppFooter />
    </LightMode>
  );
}
