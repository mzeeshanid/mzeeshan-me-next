import { useColorPalette } from "@/contexts/useColorPalette";
import { unixTimestampFaqsData } from "@/data/tools/unixTimestamp/unixTimestampFaqsData";
import { CollapsibleStatus } from "@/components/Tools/DriveDirect/Faqs/DriveDirectFaqs";
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

type Props = {};

const UnixTimestampFaqs: React.FC<Props> = () => {
  const { palette } = useColorPalette();
  const faq = unixTimestampFaqsData;

  return (
    <Box as="section">
      <FAQJsonLd
        questions={faq.faqs.map((item) => ({
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
              <Tag.Label>{faq.header.badge}</Tag.Label>
            </Tag.Root>
            <Heading
              as="h2"
              fontWeight="bold"
              fontSize={{ base: "2xl", md: "4xl" }}
              lineHeight="normal"
            >
              {faq.header.title}
            </Heading>
            <Text color="fg.muted">{faq.header.desc}</Text>
          </VStack>
        </GridItem>
        <GridItem>
          <VStack align="flex-start" separator={<StackSeparator />}>
            {faq.faqs.map((faqItem, idx) => (
              <Collapsible.Root key={idx} unmountOnExit w="full">
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

export default UnixTimestampFaqs;
