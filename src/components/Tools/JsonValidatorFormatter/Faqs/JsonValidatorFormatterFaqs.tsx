import ArticleContent from "@/components/Blog/ArticleContent/ArticleContent";
import DeferredIcon from "@/components/DeferredIcon/DeferredIcon";
import { useColorPalette } from "@/contexts/useColorPalette";
import {
  jsonValidatorFormatterFaqsData,
  type JsonValidatorFormatterFaq,
} from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
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
  useCollapsibleContext,
  VStack,
} from "@chakra-ui/react";
import { FAQJsonLd } from "next-seo";
import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const CollapsibleStatus: React.FC = () => {
  const collapsible = useCollapsibleContext();

  return <DeferredIcon icon={collapsible.open ? FaChevronUp : FaChevronDown} />;
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

const FaqList: React.FC<{ faqs: JsonValidatorFormatterFaq[] }> = ({ faqs }) => (
  <VStack align="flex-start" separator={<StackSeparator />} w="full">
    {faqs.map((faqItem) => (
      <Collapsible.Root key={faqItem.question} unmountOnExit w="full">
        <Collapsible.Trigger paddingY={2} w="full">
          <HStack justify="space-between" w="full">
            <Text textAlign="start">{faqItem.question}</Text>
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

type Props = {
  data?: typeof jsonValidatorFormatterFaqsData;
};

const JsonValidatorFormatterFaqs: React.FC<Props> = ({ data }) => {
  const { palette } = useColorPalette();
  const faqData = data ?? jsonValidatorFormatterFaqsData;

  const header = (
    <VStack align="flex-start" gap={4}>
      <Tag.Root
        variant="surface"
        colorPalette={palette}
        size={{ base: "lg", md: "xl" }}
      >
        <Tag.Label>{faqData.header.badge}</Tag.Label>
      </Tag.Root>
      <Heading
        as="h2"
        fontWeight="bold"
        fontSize={{ base: "2xl", md: "4xl" }}
        lineHeight="normal"
      >
        {faqData.header.title}
      </Heading>
      <Text color="fg.muted">{faqData.header.desc}</Text>
    </VStack>
  );

  return (
    <Box as="section">
      <FAQJsonLd
        questions={faqData.faqs.map((item) => ({
          question: item.question,
          answer: stripMarkdown(item.answer),
        }))}
      />
      {faqData.groups ? (
        <VStack align="stretch" gap={10} w="full">
          {header}
          <VStack align="stretch" gap={8} w="full">
            {faqData.groups.map((group) => (
              <Box key={group.title}>
                <Heading
                  as="h3"
                  fontSize="sm"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="wider"
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
            <FaqList faqs={faqData.faqs} />
          </GridItem>
        </SimpleGrid>
      )}
    </Box>
  );
};

export default JsonValidatorFormatterFaqs;
