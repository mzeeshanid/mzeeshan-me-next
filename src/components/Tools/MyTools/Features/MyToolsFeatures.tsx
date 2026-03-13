import { useColorPalette } from "@/contexts/useColorPalette";
import { myToolsFeaturesData } from "@/data/tools/myTools/myToolsFeatures";
import {
  Box,
  GridItem,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import MyToolFeatureItem from "./MyToolFeatureItem";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";

type Props = {};

const MyToolsFeatures: React.FC<Props> = (props: Props) => {
  const data = myToolsFeaturesData;

  return (
    <Box as="section" py={12}>
      <VStack gap={8}>
        <SectionHeader
          tagline={data.badge}
          headline={data.title}
          description={data.subtitle}
          textAlign="center"
        />

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="full">
          {data.features.map((feature, index) => (
            <GridItem key={index} w="full" h="full">
              <MyToolFeatureItem feature={feature} />
            </GridItem>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default MyToolsFeatures;
