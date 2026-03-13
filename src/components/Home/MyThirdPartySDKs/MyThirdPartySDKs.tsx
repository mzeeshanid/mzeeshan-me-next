import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { useColorPalette } from "@/contexts/useColorPalette";
import myThirdPartySDKsData from "@/data/home/myThirdPartySDKsData";
import {
  Center,
  GridItem,
  SimpleGrid,
  Tag,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import MyThirdPartySDKItem from "./MyThirdPartySDKItem";
import Image from "next/image";

type MyThirdPartySDKsProps = {};

const MyThirdPartySDKs: React.FC<MyThirdPartySDKsProps> = (
  props: MyThirdPartySDKsProps,
) => {
  const { tagline, title, detail, sdks, heroImage } = myThirdPartySDKsData();
  const { palette } = useColorPalette();
  return (
    <SimpleGrid gap={{ base: 4, md: 8 }} columns={{ base: 1, md: 2 }}>
      <GridItem flex={0.5}>
        <VStack align={"flex-start"} gap={4} h="full">
          <Tag.Root size="lg" colorPalette={palette} variant={"surface"}>
            <Tag.Label>{tagline}</Tag.Label>
          </Tag.Root>
          <SectionHeader headline={title} description={detail} />
          <Wrap>
            {sdks.map((sdk, idx) => (
              <WrapItem key={idx}>
                <MyThirdPartySDKItem title={sdk.title} link={sdk.link} />
              </WrapItem>
            ))}
          </Wrap>
        </VStack>
      </GridItem>
      <GridItem flex={0.5}>
        <Center
          w={"full"}
          h={"full"}
          bg={"bg.muted"}
          rounded={{ base: "xl", md: "2xl" }}
          p={4}
          minH={300}
        >
          <Image
            src={heroImage.src}
            blurDataURL={heroImage.src}
            placeholder={"blur"}
            width={heroImage.width}
            height={heroImage.height}
            alt={heroImage.alt}
          />
        </Center>
      </GridItem>
    </SimpleGrid>
  );
};

export default MyThirdPartySDKs;
