import { Box, Center, GridItem, SimpleGrid, VStack } from "@chakra-ui/react";
import React from "react";
import ArticleItem from "./ArticleItem";
import { ArticleModel } from "@/apis/articles/articles";
import EmptyData from "@/components/EmptyData/EmptyData";

type ArticlesListProps = {
  articles: ArticleModel[];
};

const ArticlesList: React.FC<ArticlesListProps> = (
  props: ArticlesListProps
) => {
  const { articles } = props;
  return (
    <>
      {articles.length === 0 && (
        <EmptyData
          title="No Articles Found"
          detail="There are no articles to display at the moment."
        />
      )}
      {articles.length > 0 && (
        <SimpleGrid columns={1} gap={{ base: 4, lg: 8 }}>
          {articles.map((article, idx) => (
            <ArticleItem key={idx} article={article} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default ArticlesList;
