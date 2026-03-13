import { ArticleCategoryModel } from "@/apis/articles/articleCategories";
import { Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import ArticleCategoryItem from "./ArticleCategoryItem";

type ArticleCategoriesListProps = {
  categories: ArticleCategoryModel[];
};

const ArticleCategoriesList: React.FC<ArticleCategoriesListProps> = (
  props: ArticleCategoriesListProps
) => {
  const { categories } = props;
  return (
    <Wrap justify={{ base: "center" }}>
      {categories.map((category, idx) => (
        <WrapItem key={idx}>
          <ArticleCategoryItem category={category} />
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default ArticleCategoriesList;
