import ArticleContent from "@/components/Blog/ArticleContent/ArticleContent";
import { CollapsibleStatus } from "@/components/Tools/DriveDirect/Faqs/DriveDirectFaqs";
import { useColorPalette } from "@/contexts/useColorPalette";
import {
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

const SampleFilesFaqs: React.FC<Props> = (props: Props) => {
  const faqsData = props.faqsData;
  const { palette } = useColorPalette();

  return (
    <Box as="section">
      <FAQJsonLd
        questions={faqsData.faqs.map((item) => ({
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
        </GridItem>
        <GridItem>
          <VStack align={"flex-start"} separator={<StackSeparator />}>
            {faqsData.faqs.map((faqItem, idx) => (
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
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default SampleFilesFaqs;
