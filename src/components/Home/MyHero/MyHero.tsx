import { useColorPalette } from "@/contexts/useColorPalette";
import myHeroData from "@/data/home/myHeroData";
import {
  Box,
  GridItem,
  SimpleGrid,
  Spacer,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import MyHeroActions from "./MyHeroActions";
import MyHeroSkills from "./MyHeroSkills";
import MyHeroStats from "./MyHeroStats";

type MyHeroProps = {};

const MyHero: React.FC<MyHeroProps> = (props: MyHeroProps) => {
  const { palette } = useColorPalette();
  const { tagline, title, details, heroImage } = myHeroData();

  return (
    <Box as={"section"}>
      <Box>
        <SimpleGrid
          columns={{ base: 1, md: 1, lg: 2 }}
          gap={{ base: 4, md: 8 }}
        >
          <GridItem>
            <VStack align={"flex-start"} gap={4}>
              <Tag.Root size="lg" colorPalette={palette} variant={"surface"}>
                <Tag.Label>{tagline}</Tag.Label>
              </Tag.Root>
              <Text
                fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                fontWeight={"extrabold"}
                lineHeight={1}
                color={`${palette}.fg`}
              >
                {title}
              </Text>
              <Text color={"fg.muted"} fontSize={{ base: "md", md: "lg" }}>
                {details}
              </Text>
              <MyHeroActions />
            </VStack>
          </GridItem>
          <GridItem>
            <VStack w="full" h="full" gap={8}>
              <Box
                bg={"bg.subtle"}
                rounded={"2xl"}
                overflow={"hidden"}
                transition="transform 0.3s ease"
                _hover={{ transform: `scale(1.02)` }}
              >
                <Image
                  src={heroImage.src}
                  blurDataURL={heroImage.src}
                  placeholder="blur"
                  alt={heroImage.alt}
                  width={heroImage.width}
                  height={heroImage.height}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                  fetchPriority="high"
                />
              </Box>
              <Box w="full">
                <MyHeroSkills />
              </Box>
            </VStack>
          </GridItem>
        </SimpleGrid>
      </Box>
      <Box>
        <Spacer p={{ base: 4, md: 8 }} />
      </Box>
      <Box w="full">
        <MyHeroStats />
      </Box>
    </Box>
  );
};

export default MyHero;
