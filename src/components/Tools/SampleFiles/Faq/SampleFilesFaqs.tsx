import ArticleContent from "@/components/Blog/ArticleContent/ArticleContent";
import { CollapsibleStatus } from "@/components/Tools/DriveDirect/Faqs/DriveDirectFaqs";
import { useColorPalette } from "@/contexts/useColorPalette";
import {
  SampleFilesFAQItem,
  SampleFilesFaqsData,
} from "@/data/tools/sampleFiles/sampleFilesFaqsData";
import {
  Box,
  Collapsible,
  GridItem,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
  StackSeparator,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FAQJsonLd } from "next-seo";
import React from "react";

type Props = {
  faqsData: SampleFilesFaqsData;
};

// FAQPage structured data expects plain, human-readable answer text — not
// raw markdown syntax — so strip formatting before handing it to FAQJsonLd.
const stripMarkdown = (markdown: string): string =>
  markdown
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/```\w*\n?/g, " ").trim())
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "$1")
    .replace(/^[-*]\s+/gm, "")
    .replace(/\s*\n+\s*/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

const FaqList: React.FC<{ faqs: SampleFilesFAQItem[] }> = ({ faqs }) => (
  <VStack align={"flex-start"} separator={<StackSeparator />} w="full">
    {faqs.map((faqItem, idx) => (
      <Collapsible.Root key={idx} unmountOnExit w="full">
        <Collapsible.Trigger paddingY={2} w="full">
          <HStack justify={"space-between"} w="full">
            <Text textAlign={"start"}>{faqItem.question}</Text>
            <CollapsibleStatus />
          </HStack>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Box>
            <Spacer p={1} />
            <ArticleContent content={faqItem.answer} />
            <Spacer p={1} />
          </Box>
        </Collapsible.Content>
      </Collapsible.Root>
    ))}
  </VStack>
);

const SampleFilesFaqs: React.FC<Props> = (props: Props) => {
  const faqsData = props.faqsData;
  const { palette } = useColorPalette();

  const header = (
    <VStack align={"flex-start"} gap={4}>
      <Tag.Root
        variant={"surface"}
        colorPalette={palette}
        size={{ base: "lg", md: "xl" }}
      >
        <Tag.Label>{faqsData.badge}</Tag.Label>
      </Tag.Root>
      <Heading
        as="h3"
        fontWeight={"bold"}
        fontSize={{ base: "2xl", md: "4xl" }}
        lineHeight={"normal"}
      >
        {faqsData.title}
      </Heading>
      <Text color={"fg.muted"}>{faqsData.subtitle}</Text>
    </VStack>
  );

  return (
    <Box as="section">
      <FAQJsonLd
        questions={faqsData.faqs.map((item) => ({
          question: item.question,
          answer: stripMarkdown(item.answer),
        }))}
      />
      {faqsData.groups ? (
        <VStack align={"stretch"} gap={10} w="full">
          {header}
          <VStack align={"stretch"} gap={8} w="full">
            {faqsData.groups.map((group) => (
              <Box key={group.title}>
                <Heading
                  as="h4"
                  fontSize={"sm"}
                  fontWeight={"bold"}
                  textTransform={"uppercase"}
                  letterSpacing={"wider"}
                  color={`${palette}.fg`}
                  mb={2}
                >
                  {group.title}
                </Heading>
                <FaqList faqs={group.faqs} />
              </Box>
            ))}
          </VStack>
        </VStack>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
          <GridItem>{header}</GridItem>
          <GridItem>
            <FaqList faqs={faqsData.faqs} />
          </GridItem>
        </SimpleGrid>
      )}
    </Box>
  );
};

export default SampleFilesFaqs;
