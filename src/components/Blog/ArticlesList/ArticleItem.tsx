import { ArticleModel } from "@/apis/articles/articles";
import { Card, Link, VStack } from "@chakra-ui/react";
import React from "react";
import ArticleAuthor from "../ArticleAuthor/ArticleAuthor";
import ArticleCategoryTags from "../ArticleCategoryTags/ArticleCategoryTags";
import ArticleCoverImage from "../ArticleCoverImage/ArticleCoverImage";
import ArticleMeta from "../ArticleMeta/ArticleMeta";
import ArticleTitleDetail from "../ArticleTitleDetail/ArticleTitleDetail";

type ArticlesItemProps = {
  article: ArticleModel;
};

const ArticleItem: React.FC<ArticlesItemProps> = (props: ArticlesItemProps) => {
  const { article } = props;

  return (
    <Card.Root
      bg="bg.subtle"
      flexDir={{ base: "column", md: "row" }}
      overflow="hidden"
      alignItems={{ base: "flex-start", md: "center" }}
      gap={{ base: 4, md: 6, lg: 8 }}
      p={{ base: 4, md: 6, lg: 8 }}
    >
      <ArticleCoverImage
        article={article}
        maxW={{ base: "full", md: "350px" }}
      />
      <VStack alignItems={"flex-start"} gap={4}>
        <ArticleMeta article={article} />
        <Link href={`/blog/${article.slug}`}>
          <ArticleTitleDetail
            title={article.title}
            subtitle={article.description}
          />
        </Link>
        <ArticleCategoryTags categories={[article.category]} />
        <ArticleAuthor article={article} />
      </VStack>
    </Card.Root>
  );
};

export default ArticleItem;
