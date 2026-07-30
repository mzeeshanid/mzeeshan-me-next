import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import ToolByline from "@/components/ToolByline/ToolByline";
import { jsonValidatorCardStyle } from "@/components/Tools/JsonValidatorFormatter/Shared/jsonValidatorCardStyle";
import { jsonValidatorFormatterIntroData } from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import { Box, GridItem, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React from "react";

type Props = {
  data?: typeof jsonValidatorFormatterIntroData;
};

const JsonValidatorFormatterIntro: React.FC<Props> = ({ data }) => {
  const introData = data ?? jsonValidatorFormatterIntroData;

  return (
    <Box as="section">
      <SectionHeader
        tagline={introData.header.badge}
        headline={introData.header.title}
        description={introData.header.description}
      >
        <ToolByline />
      </SectionHeader>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mt={6}>
        {introData.cards.map((card) => (
          <GridItem key={card.title}>
            <Box {...jsonValidatorCardStyle} p={4} h="full">
              <VStack align="start" gap={3}>
                <Text fontWeight="bold">{card.title}</Text>
                <Text color="fg.muted">{card.description}</Text>
              </VStack>
            </Box>
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default JsonValidatorFormatterIntro;
