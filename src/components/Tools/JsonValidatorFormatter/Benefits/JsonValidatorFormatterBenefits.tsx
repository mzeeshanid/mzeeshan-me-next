import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { jsonValidatorFormatterBenefitsData } from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import { Box, GridItem, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React from "react";

const JsonValidatorFormatterBenefits: React.FC = () => {
  const benefitsData = jsonValidatorFormatterBenefitsData;

  return (
    <Box as="section">
      <SectionHeader
        tagline={benefitsData.header.badge}
        headline={benefitsData.header.title}
        description={benefitsData.header.description}
      />
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mt={6}>
        {benefitsData.cards.map((card) => (
          <GridItem key={card.title}>
            <Box borderWidth="1px" borderRadius="xl" p={5} h="full">
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

export default JsonValidatorFormatterBenefits;
