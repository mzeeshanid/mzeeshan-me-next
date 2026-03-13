import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { sampleFilesCategoriesData } from "@/data/tools/sampleFiles/sampleFilesCategoriesData";
import { Box, Center, GridItem, SimpleGrid, Spacer } from "@chakra-ui/react";
import React from "react";
import SampleFilesCategoryItem from "./SampleFilesCategoryItem";

type Props = {};

const SampleFilesCategories: React.FC<Props> = (props: Props) => {
  const categoriesData = sampleFilesCategoriesData;
  return (
    <Box as="section">
      <Center>
        <SectionHeader
          tagline={categoriesData.header.badge}
          headline={categoriesData.header.title}
          description={categoriesData.header.subtitle}
          textAlign="center"
        />
      </Center>
      <Spacer p={4} />
      <SimpleGrid minChildWidth={"xs"} gap={6}>
        {categoriesData.categories.map((category, idx) => (
          <GridItem key={idx}>
            <SampleFilesCategoryItem category={category} />
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default SampleFilesCategories;
