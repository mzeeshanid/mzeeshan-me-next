import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { useColorPalette } from "@/contexts/useColorPalette";
import { jsonValidatorFormatterGuideData } from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import type { JsonValidatorFormatterGuideStep } from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  HStack,
  Separator,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const GuideStep: React.FC<{
  step: number;
  item: JsonValidatorFormatterGuideStep;
  palette: string;
}> = ({ step, item, palette }) => (
  <HStack align="flex-start" gap={4} py={5}>
    <Flex
      minW="34px"
      h="34px"
      borderRadius="full"
      borderWidth="1px"
      borderColor={`${palette}.solid`}
      align="center"
      justify="center"
      fontWeight="semibold"
      color={`${palette}.solid`}
      fontSize="sm"
      flexShrink={0}
    >
      {step}
    </Flex>
    <VStack align="flex-start" gap={1}>
      <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>
        {item.title}
      </Text>
      <Text color="fg.muted" fontSize="sm">
        {item.description}
      </Text>
    </VStack>
  </HStack>
);

type Props = {
  data?: typeof jsonValidatorFormatterGuideData;
};

const JsonValidatorFormatterGuide: React.FC<Props> = ({ data }) => {
  const { palette } = useColorPalette();
  const guideData = data ?? jsonValidatorFormatterGuideData;

  return (
    <Box as="section">
      <VStack align="flex-start" gap={{ base: 6, md: 8 }}>
        <SectionHeader
          tagline={guideData.header.badge}
          headline={guideData.header.title}
        />

        <VStack align="stretch" gap={0} w="full">
          {guideData.steps.map((item, idx) => (
            <React.Fragment key={item.title}>
              <GuideStep step={idx + 1} item={item} palette={palette} />
              {idx < guideData.steps.length - 1 && <Separator w="full" />}
            </React.Fragment>
          ))}
        </VStack>

        <VStack align="flex-start" gap={4} w="full" pt={2}>
          <Tag.Root
            variant="surface"
            colorPalette={palette}
            size={{ base: "lg", md: "xl" }}
          >
            <Tag.Label>{guideData.video.badge}</Tag.Label>
          </Tag.Root>
          <Heading as="h3" fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
            {guideData.video.title}
          </Heading>
          <Text color="fg.muted">{guideData.video.description}</Text>
          <AspectRatio ratio={16 / 9} w="full">
            <iframe
              src={`https://www.youtube.com/embed/${guideData.video.youtubeId}?start=${guideData.video.youtubeStart}`}
              title={guideData.video.iframeTitle}
              allowFullScreen
            />
          </AspectRatio>
        </VStack>
      </VStack>
    </Box>
  );
};

export default JsonValidatorFormatterGuide;
