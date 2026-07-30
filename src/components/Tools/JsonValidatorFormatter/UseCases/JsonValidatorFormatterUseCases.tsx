import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { jsonValidatorCardStyle } from "@/components/Tools/JsonValidatorFormatter/Shared/jsonValidatorCardStyle";
import { jsonValidatorFormatterUseCasesData } from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import { Box, Code, GridItem, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React from "react";

const renderWithInlineCode = (text: string) =>
  text.split(/(`[^`]+`)/g).map((part, idx) =>
    part.startsWith("`") && part.endsWith("`") ? (
      <Code key={idx} fontSize="sm">
        {part.slice(1, -1)}
      </Code>
    ) : (
      <React.Fragment key={idx}>{part}</React.Fragment>
    ),
  );

type Props = {
  data?: typeof jsonValidatorFormatterUseCasesData;
};

const JsonValidatorFormatterUseCases: React.FC<Props> = ({ data }) => {
  const useCasesData = data ?? jsonValidatorFormatterUseCasesData;

  return (
    <Box as="section">
      <SectionHeader
        tagline={useCasesData.header.badge}
        headline={useCasesData.header.title}
      />
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mt={6}>
        {useCasesData.cases.map((item) => (
          <GridItem key={item.title}>
            <Box {...jsonValidatorCardStyle} p={4} h="full">
              <VStack align="start" gap={3}>
                <Text fontWeight="bold">{item.title}</Text>
                <Text color="fg.muted">
                  {renderWithInlineCode(item.description)}
                </Text>
              </VStack>
            </Box>
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default JsonValidatorFormatterUseCases;
