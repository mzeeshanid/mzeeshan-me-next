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
  VStack,
  useCollapsibleContext,
} from "@chakra-ui/react";
import { FAQJsonLd } from "next-seo";
import React from "react";
import type { IconType } from "react-icons";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

import { useColorPalette } from "@/contexts/useColorPalette";
import type { FaqItem, SectionHeaderData } from "@/data/tools/imageFormatConverter/types";

type Props = {
  header: SectionHeaderData;
  items: FaqItem[];
};

const ImageConverterFaqs: React.FC<Props> = ({ header, items }) => {
  const { palette } = useColorPalette();

  return (
    <Box as="section">
      <FAQJsonLd
        questions={items.map((item) => ({
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
              <Tag.Label>{header.badge}</Tag.Label>
            </Tag.Root>
            <Heading
              as="h3"
              fontWeight="bold"
              fontSize={{ base: "2xl", md: "4xl" }}
              lineHeight="normal"
            >
              {header.title}
            </Heading>
            <Text color="fg.muted">{header.description}</Text>
          </VStack>
        </GridItem>

        <GridItem>
          <VStack align="flex-start" separator={<StackSeparator />}>
            {items.map((item, index) => (
              <Collapsible.Root key={index} unmountOnExit w="full">
                <Collapsible.Trigger paddingY={2} w="full">
                  <HStack justify="space-between" w="full">
                    <Text textAlign="start">{item.question}</Text>
                    <CollapsibleStatus />
                  </HStack>
                </Collapsible.Trigger>
                <Collapsible.Content>
                  <Box>
                    <Spacer p={1} />
                    <Text color="fg.muted">{item.answer}</Text>
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

const CollapsibleStatus: React.FC = () => {
  const collapsible = useCollapsibleContext();
  const icon: IconType = collapsible.open ? FaChevronUp : FaChevronDown;
  return <Icon as={icon} />;
};

export default ImageConverterFaqs;
