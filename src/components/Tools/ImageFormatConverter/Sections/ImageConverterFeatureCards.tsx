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

const ImageConverterFeatureCards: React.FC<Props> = ({ header, items }) => {
  const { palette } = useColorPalette();

  return (
    <Box as="section">
      <SimpleGrid gap={8} minChildWidth={"xs"} alignItems={"center"}>
        <GridItem colSpan={{ base: 2, lg: 1 }}>
          <SectionHeader
            tagline={header.badge}
            headline={header.title}
            description={header.description}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <SimpleGrid mt={8} minChildWidth={"xs"} gap={{ base: 4, md: 8 }}>
            {items.map((item) => (
              <GridItem key={item.title}>
                <Box>
                  <HStack align={"flex-start"} gap={4}>
                    <Box bg={`${palette}.subtle`} borderRadius="md">
                      <Icon
                        m={2}
                        as={item.icon}
                        size={"sm"}
                        color={`${palette}.focusRing`}
                      />
                    </Box>
                    <VStack align="start" gap={2}>
                      <Text fontWeight="bold">{item.title}</Text>
                      <Text color={"fg.muted"}>{item.description}</Text>
                    </VStack>
                  </HStack>
                </Box>
              </GridItem>
            ))}
          </SimpleGrid>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default ImageConverterFeatureCards;
