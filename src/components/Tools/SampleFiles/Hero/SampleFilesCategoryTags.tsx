import { useColorPalette } from "@/contexts/useColorPalette";
import { sampleFilesCategoriesData } from "@/data/tools/sampleFiles/sampleFilesCategoriesData";
import { Link, Tag, Wrap } from "@chakra-ui/react";
import React from "react";

type Props = {};

const SampleFilesCategoryTags: React.FC<Props> = () => {
  const { palette } = useColorPalette();
  const categoriesData = sampleFilesCategoriesData;
  return (
    <Wrap justify="center" gap={2}>
      {categoriesData.categories.map((category, index) => (
        <Tag.Root key={index} size="md" variant="subtle" colorPalette={palette}>
          <Link href={category.path}>
            <Tag.Label>{category.name}</Tag.Label>
          </Link>
        </Tag.Root>
      ))}
    </Wrap>
  );
};

export default SampleFilesCategoryTags;
