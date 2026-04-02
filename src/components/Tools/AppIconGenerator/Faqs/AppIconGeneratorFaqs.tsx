import { appIconGeneratorFaqsData } from "@/data/tools/appIconGenerator/appIconGeneratorData";
import {
  Box,
  Collapsible,
  GridItem,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
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

const AppIconGeneratorFaqs: React.FC = () => {
  const data = appIconGeneratorFaqsData;

  return (
    <Box as="section">
      <FAQJsonLd
        questions={data.faqs.map((item) => ({
          question: item.question,
          answer: item.answer,
        }))}
      />
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
        <GridItem>
          <VStack align="flex-start" gap={4}>
            <Tag.Root variant="surface" size={{ base: "lg", md: "xl" }}>
              <Tag.Label>{data.header.badge}</Tag.Label>
            </Tag.Root>
            <Heading as="h3" fontWeight="bold" fontSize={{ base: "2xl", md: "4xl" }}>
              {data.header.title}
            </Heading>
            <Text color="fg.muted">{data.header.desc}</Text>
          </VStack>
        </GridItem>
        <GridItem>
          <VStack align="stretch" separator={<StackSeparator />}>
            {data.faqs.map((faqItem) => (
              <Collapsible.Root key={faqItem.question} unmountOnExit>
                <Collapsible.Trigger paddingY={2}>
                  <HStack justify="space-between" w="full">
                    <Text textAlign="start">{faqItem.question}</Text>
                    <CollapsibleStatus />
                  </HStack>
                </Collapsible.Trigger>
                <Collapsible.Content>
                  <Box pb={3}>
                    <Text color="fg.muted">{faqItem.answer}</Text>
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

export default AppIconGeneratorFaqs;
