import React from "react";
import { useColorPalette } from "@/contexts/useColorPalette";
import { salaryTaxFaqsData } from "@/data/tools/salaryTaxCalculator";
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
import { IconType } from "react-icons";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const CollapsibleStatus: React.FC = () => {
  const collapsible = useCollapsibleContext();
  const icon: IconType = collapsible.open ? FaChevronUp : FaChevronDown;
  return <Icon as={icon} />;
};

const SalaryTaxFaqs: React.FC = () => {
  const { palette } = useColorPalette();
  const data = salaryTaxFaqsData;

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
            <Tag.Root variant="surface" colorPalette={palette} size={{ base: "lg", md: "xl" }}>
              <Tag.Label>{data.header.badge}</Tag.Label>
            </Tag.Root>
            <Heading
              as="h2"
              fontWeight="bold"
              fontSize={{ base: "2xl", md: "4xl" }}
              lineHeight="normal"
            >
              {data.header.title}
            </Heading>
            <Text color="fg.muted">{data.header.desc}</Text>
          </VStack>
        </GridItem>
        <GridItem>
          <VStack align="flex-start" separator={<StackSeparator />}>
            {data.faqs.map((faqItem, idx) => (
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

export default SalaryTaxFaqs;
