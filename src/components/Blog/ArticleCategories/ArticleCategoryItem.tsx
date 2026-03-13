import { ArticleCategoryModel } from "@/apis/articles/articleCategories";
import { useColorPalette } from "@/contexts/useColorPalette";
import { Link, Tag } from "@chakra-ui/react";
import React from "react";

type ArticleCategoryItemProps = {
  category: ArticleCategoryModel;
};

const ArticleCategoryItem: React.FC<ArticleCategoryItemProps> = (
  props: ArticleCategoryItemProps
) => {
  const { category } = props;
  const { palette } = useColorPalette();
  return (
    <Tag.Root size={"lg"} variant={"surface"} colorPalette={palette}>
      <Tag.Label>
        <Link href={`/blog/category/${category.slug}`}>{category.name}</Link>
      </Tag.Label>
    </Tag.Root>
  );
};

export default ArticleCategoryItem;
