import { Box, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";

import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import type { SectionHeaderData, TextCardItem } from "@/data/tools/imageFormatConverter/types";

type Props = {
  header: SectionHeaderData;
  cards: TextCardItem[];
};

const ImageConverterTextCards: React.FC<Props> = ({ header, cards }) => {
  return (
    <Box as="section">
      <SectionHeader
        tagline={header.badge}
        headline={header.title}
        description={header.description}
      />
      <SimpleGrid mt={8} minChildWidth="xs" gap={4}>
        {cards.map((card) => (
          <GridItem key={card.title}>
            <Box
              p={5}
              h="100%"
              borderRadius="2xl"
              border="1px solid"
              borderColor="border"
              bg="bg.subtle"
            >
              <Text fontWeight="semibold" mb={2}>
                {card.title}
              </Text>
              <Text color="fg.muted">{card.description}</Text>
            </Box>
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ImageConverterTextCards;
