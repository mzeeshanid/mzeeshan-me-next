import { useColorPalette } from "@/contexts/useColorPalette";
import { aspectRatioFaqsData } from "@/data/tools/aspectRatio/aspectRatioFaqsData";
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
import { CollapsibleStatus } from "../../DriveDirect/Faqs/DriveDirectFaqs";

type Props = {};

const AspectRatioFaqs: React.FC<Props> = (props: Props) => {
  const faq = aspectRatioFaqsData;
  const { palette } = useColorPalette();

  return (
    <Box as="section">
      <FAQJsonLd
        questions={faq.faqs.map((item) => ({
          question: item.question,
          answer: item.answer,
        }))}
      />
      <SimpleGrid minChildWidth={"md"} gap={4}>
        <GridItem>
          <VStack align={"flex-start"} gap={4}>
            <Tag.Root
              variant={"surface"}
              colorPalette={palette}
              size={{ base: "lg", md: "xl" }}
            >
              <Tag.Label>{faq.header.badge}</Tag.Label>
            </Tag.Root>
            <Heading
              as="h3"
              fontWeight={"bold"}
              fontSize={{ base: "2xl", md: "4xl" }}
              lineHeight={"normal"}
            >
              {faq.header.title}
            </Heading>
            <Text color={"fg.muted"}>{faq.header.desc}</Text>
          </VStack>
        </GridItem>
        <GridItem>
          <VStack align={"flex-start"} separator={<StackSeparator />}>
            {faq.faqs.map((faqItem, idx) => (
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

export default AspectRatioFaqs;
