import { TypewriterHighlight } from "@/components/TypewriterHighlight/TypewriterHighlight";
import { useColorPalette } from "@/contexts/useColorPalette";
import { MyAppMetaDataModel } from "@/data/myApps/myAppMetaData";
import {
  Box,
  Center,
  Container,
  Stack,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { FaApple, FaGooglePlay } from "react-icons/fa6";
import MyAppStoreButton from "./MyAppStoreButton";

type Props = {
  meta: MyAppMetaDataModel;
};

const MyAppHero: React.FC<Props> = (props: Props) => {
  const { palette } = useColorPalette();
  const { meta } = props;
  return (
    <Box as="section">
      <VStack w="full" gap={8}>
        <Tag.Root colorPalette={palette}>
          <Tag.Label>{meta.badge}</Tag.Label>
        </Tag.Root>
        <Container
          fontWeight={"medium"}
          fontSize={{ base: "2xl", md: "3xl", lg: "5xl" }}
          textAlign={"center"}
          lineHeight={"shorter"}
        >
          {meta.typeWriterPre}
          <TypewriterHighlight
            words={meta.typeWriterWords}
            highlightStyles={{
              px: "0.5",
              bg: `${palette}.subtle`,
              color: `${palette}.fg`,
              fontWeight: "bold",
              fontSize: { base: "2xl", md: "3xl", lg: "5xl" },
            }}
          />
          {meta.typeWriterPost}
        </Container>
        <Container maxW={"3xl"} textAlign={"center"} lineHeight={"shorter"}>
          <Text
            fontSize={{ base: "md", md: "lg", lg: "xl" }}
            color={"fg.muted"}
          >
            {meta.description}
          </Text>
        </Container>
        <Stack direction={{ base: "column", md: "row" }} gap={4}>
          {meta.appStoreLink && (
            <MyAppStoreButton
              storeName="App Store"
              icon={FaApple}
              link={meta.appStoreLink}
            />
          )}
          {meta.playStoreLink && (
            <MyAppStoreButton
              storeName="Play Store"
              icon={FaGooglePlay}
              link={meta.playStoreLink}
            />
          )}
        </Stack>
        <Center>
          <Box
            bg={"bg.subtle"}
            rounded={"2xl"}
            overflow={"hidden"}
            transition="transform 0.3s ease"
            _hover={{ transform: `scale(1.02)` }}
            w={{ base: "full", md: undefined }}
          >
            <Image
              src={meta.heroImage.src}
              blurDataURL={meta.heroImage.src}
              placeholder="blur"
              alt={meta.heroImage.alt}
              width={meta.heroImage.width}
              height={meta.heroImage.height}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
              loading="lazy"
            />
          </Box>
        </Center>
      </VStack>
    </Box>
  );
};

export default MyAppHero;
