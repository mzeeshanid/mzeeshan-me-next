import { ExtensionUseCasesData as UseCasesSectionType } from "@/data/tools/sampleFiles/sampleFilesExtensionDetails";
import { Box, GridItem, SimpleGrid, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { cardStyle } from "@/components/Tools/SampleFiles/Shared/ExtensionCard";
import { useColorPalette } from "@/contexts/useColorPalette";

interface Props {
  data: UseCasesSectionType;
}

const ExtensionUseCases: React.FC<Props> = ({ data }) => {
  const { palette } = useColorPalette();

  return (
    <Box as="section">
      <SectionHeader
        tagline={"Use Cases"}
        headline={data.title}
        description={"Here are the use cases for this file extension"}
      />
      <Spacer p={4} />
      <SimpleGrid minChildWidth={{ base: "100%", md: "300px" }} gap={4}>
        {data.cards.map((card, idx) => (
          <GridItem key={idx} h={"full"}>
            <Box
              {...cardStyle}
              h={"full"}
              p={4}
              transition="all 0.15s ease"
              _hover={{
                borderColor: `${palette}.400`,
                transform: "translateY(-2px)",
              }}
            >
              <Text fontWeight="semibold" fontSize="md" mb={1.5}>
                {card.title}
              </Text>
              <Text fontSize="sm" color="fg.muted">
                {card.description}
              </Text>
            </Box>
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ExtensionUseCases;
