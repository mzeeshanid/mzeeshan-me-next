import { useColorPalette } from "@/contexts/useColorPalette";
import { jsonValidatorFormatterFaqsData } from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import {
  Box,
  Collapsible,
  GridItem,
  Heading,
  HStack,
  Icon,
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

  return <Icon as={collapsible.open ? FaChevronUp : FaChevronDown} />;
};

const JsonValidatorFormatterFaqs: React.FC = () => {
  const { palette } = useColorPalette();
  const faqData = jsonValidatorFormatterFaqsData;

  return (
    <Box as="section">
      <FAQJsonLd
        questions={faqData.faqs.map((item) => ({
          question: item.question,
          answer: item.answer,
        }))}
      />
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
        <GridItem>
          <VStack align="flex-start" gap={4}>
            <Tag.Root
              variant="surface"
              colorPalette={palette}
              size={{ base: "lg", md: "xl" }}
            >
              <Tag.Label>{faqData.header.badge}</Tag.Label>
            </Tag.Root>
            <Heading
              as="h3"
              fontWeight="bold"
              fontSize={{ base: "2xl", md: "4xl" }}
              lineHeight="normal"
            >
              {faqData.header.title}
            </Heading>
            <Text color="fg.muted">{faqData.header.desc}</Text>
          </VStack>
        </GridItem>
        <GridItem>
          <VStack align="flex-start" separator={<StackSeparator />}>
            {faqData.faqs.map((faqItem) => (
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
                    <Text color="fg.muted">{faqItem.answer}</Text>
                    <Spacer p={1} />
                  </Box>
                </Collapsible.Content>
              </Collapsible.Root>
            ))}
          </VStack>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default JsonValidatorFormatterFaqs;
