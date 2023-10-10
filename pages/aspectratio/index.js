import React, { useState } from "react";
import {
  Heading,
  LightMode,
  VStack,
  Center,
  Text,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Box,
  chakra,
  theme,
} from "@chakra-ui/react";
import AppNavBar from "../../src/components/AppNavBar";
import myNavItems from "../../src/data/myNavItems";
import AppFooter from "../../src/components/AppFooter";

import aspectRatioAppIcon from "../../public/assets/aspect_ratio_app_icon.png";
import AspectRatioForm from "../../src/components/AspectRatio/AspectRatioForm";
import { NextSeo } from "next-seo";
import Image from "next/image";

export default function index() {
  const [aspectWidth, setAspectWidth] = useState(200.0);
  const [aspectHeight, setAspectHeight] = useState(112.5);

  function gcd(u, v) {
    if (u === v) return u;
    if (u === 0) return v;
    if (v === 0) return u;

    if (~u & 1)
      if (v & 1) return gcd(u >> 1, v);
      else return gcd(u >> 1, v >> 1) << 1;

    if (~v & 1) return gcd(u, v >> 1);

    if (u > v) return gcd((u - v) >> 1, v);

    return gcd((v - u) >> 1, u);
  }

  function ratio(w, h) {
    var d = gcd(w, h);
    return [w / d, h / d];
  }

  const onAspectRatioChange = (w, h) => {
    const width = parseFloat(w);
    const height = parseFloat(h);

    if (height > width) {
      setAspectWidth((200.0 * width) / height);
      setAspectHeight(200.0);
    } else {
      setAspectHeight((height / width) * 200.0);
      setAspectWidth(200.0);
    }
  };

  const ratios = ratio(parseInt(aspectWidth), parseInt(aspectHeight));

  const aTitle = "Aspect Ratio Calculator - Muhammad Zeeshan";
  const aDesc =
    "A tool that allows to calculate aspect ratio by entering original size and desired width or height.";

  return (
    <LightMode>
      <NextSeo
        title={aTitle}
        description={aDesc}
        openGraph={{
          title: aTitle,
          description: aDesc,
          url: "https://www.mzeeshan.me/aspectratio",
          images: [
            {
              url: "https://mzeeshan.me/assets/aspect_ratio_app_icon.png",
              width: 400,
              height: 400,
              alt: "App Icon",
              type: "image/png",
            },
          ],
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <AppNavBar navItems={myNavItems()} />
      <Center bg={theme.colors.white}>
        <VStack maxW={"800px"} p={4}>
          <Image
            width={150}
            height={150}
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
      <AspectRatioForm onAspectRatioChange={onAspectRatioChange} />
      <Center bg={theme.colors.white}>
        <VStack w="full" maxW={"800px"} p={4}>
          <Center>
            <Text color={theme.colors.black}>
              <chakra.span
                fontSize={"xl"}
              >{`Your aspect ratio is `}</chakra.span>
              <chakra.span
                fontSize={"xl"}
                as="b"
              >{`${ratios[0]} : ${ratios[1]}`}</chakra.span>
            </Text>
            <VStack></VStack>
          </Center>
          <Box
            w={`${aspectWidth}px`}
            h={`${aspectHeight}px`}
            bg={theme.colors.gray[100]}
            borderWidth={1}
            borderColor={theme.colors.gray[500]}
            overflow={"hidden"}
          >
            <Center w="full" h="full">
              <Text align={"center"} color={theme.colors.black}>
                Example
              </Text>
            </Center>
          </Box>
          <Box p={2} />
          <Tabs
            isFitted
            variant="solid-rounded"
            colorScheme="teal"
            outlineColor={theme.colors.gray[300]}
          >
            <TabList mb="1em" bg={theme.colors.gray[200]} rounded="full">
              <Tab>For Width</Tab>
              <Tab>For Height</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Text align="center" color={theme.colors.black}>
                  New Width = (New Height x Original Width) / Original Height
                </Text>
              </TabPanel>
              <TabPanel>
                <Text align="center" color={theme.colors.black}>
                  New Height = (Original Height / Original Width) x New Width
                </Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Box>
            <Heading color={theme.colors.black} align="center">
              How Does It Works?
            </Heading>
            <Text color={theme.colors.black} align="center">
              Enter the original width and original height in the respective
              fields. Next enter the value for desired width or desired height,
              other value will be calculated automatically. Thats it!
            </Text>
          </Box>
        </VStack>
      </Center>
      <AppFooter />
    </LightMode>
  );
}
