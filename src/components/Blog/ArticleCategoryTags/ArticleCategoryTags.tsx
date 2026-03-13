import { ArticleCategoryModel } from "@/apis/articles/articleCategories";
import { useColorPalette } from "@/contexts/useColorPalette";
import { Badge, HStack, Link } from "@chakra-ui/react";
import React from "react";

type ArticleCategoryTagsProps = {
  categories: ArticleCategoryModel[];
};

const ArticleCategoryTags: React.FC<ArticleCategoryTagsProps> = (
  props: ArticleCategoryTagsProps
) => {
  const { categories } = props;
  const { palette } = useColorPalette();
  return (
    <HStack>
      {categories.map((category, idx) => (
        <Link key={idx} href={`/blog/category/${category.slug}`}>
          <Badge colorPalette={palette}>{category.name}</Badge>
        </Link>
      ))}
    </HStack>
  );
};

export default ArticleCategoryTags;
