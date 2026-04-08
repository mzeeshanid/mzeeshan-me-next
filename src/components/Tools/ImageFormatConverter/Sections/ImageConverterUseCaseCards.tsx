import {
  Box,
  GridItem,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { useColorPalette } from "@/contexts/useColorPalette";
import type {
  IconCardItem,
  SectionHeaderData,
} from "@/data/tools/imageFormatConverter/types";

type Props = {
  header: SectionHeaderData;
  items: IconCardItem[];
};

const ImageConverterUseCaseCards: React.FC<Props> = ({ header, items }) => {
  const { palette } = useColorPalette();

  return (
    <Box as="section">
      <SectionHeader
        tagline={header.badge}
        headline={header.title}
        description={header.description}
      />
      <SimpleGrid mt={8} minChildWidth="xs" gap={4}>
        {items.map((item) => (
          <GridItem key={item.title}>
            <Box
              p={5}
              h="100%"
              borderRadius="2xl"
              border="1px solid"
              borderColor="border"
              bg="bg.subtle"
            >
              <VStack align="start" gap={4}>
                <HStack
                  justify="center"
                  align="center"
                  w="3.5rem"
                  h="3.5rem"
                  borderRadius="xl"
                  bg={`${palette}.subtle`}
                  color={`${palette}.focusRing`}
                >
                  <Icon as={item.icon} boxSize={7} />
                </HStack>
                <VStack align="start" gap={2}>
                  <Text fontWeight="bold">{item.title}</Text>
                  <Text color="fg.muted">{item.description}</Text>
                </VStack>
              </VStack>
            </Box>
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ImageConverterUseCaseCards;
