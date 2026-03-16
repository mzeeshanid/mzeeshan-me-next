import ArticleContent from "@/components/Blog/ArticleContent/ArticleContent";
import { useColorPalette } from "@/contexts/useColorPalette";
import appleOfferSignatureHeroData from "@/data/tools/appleOfferSignature/appleOfferSignatureHeroData";
import { Box, GridItem, SimpleGrid, Tag, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { getMarkdownTheme } from "../../../../../styles/markdownTheme";

type Props = {};

const AppleOfferSignatureHero: React.FC<Props> = (props: Props) => {
  const { palette } = useColorPalette();
  const { tagline, title, details, heroImage } = appleOfferSignatureHeroData();
  const markdownTheme = getMarkdownTheme();
  return (
    <Box as="section">
      <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} gap={{ base: 4, md: 8 }}>
        <GridItem>
          <VStack align={"flex-start"} gap={4}>
            <Tag.Root size="lg" colorPalette={palette} variant={"surface"}>
              <Tag.Label>{tagline}</Tag.Label>
            </Tag.Root>
            <Text
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight={"bold"}
              lineHeight={1}
              color={`${palette}.fg`}
            >
              {title}
            </Text>
            <ArticleContent content={details} />
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
                loading="lazy"
              />
            </Box>
          </VStack>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default AppleOfferSignatureHero;
