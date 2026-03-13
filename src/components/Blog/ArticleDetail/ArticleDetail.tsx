import { ArticleModel } from "@/apis/articles/articles";
import React from "react";
import ArticleCoverImage from "../ArticleCoverImage/ArticleCoverImage";
import { Container, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import ArticleMeta from "../ArticleMeta/ArticleMeta";
import ArticleTitleDetail from "../ArticleTitleDetail/ArticleTitleDetail";
import ArticleCategoryTags from "../ArticleCategoryTags/ArticleCategoryTags";
import ArticleAuthor from "../ArticleAuthor/ArticleAuthor";
import ArticleContent from "../ArticleContent/ArticleContent";

type ArticleDetailProps = {
  article: ArticleModel;
};

const ArticleDetail: React.FC<ArticleDetailProps> = (
  props: ArticleDetailProps
) => {
  const { article } = props;
  return (
    <Container maxW={"4xl"}>
      <VStack>
        <VStack>
          <HStack>
            <ArticleMeta article={article} />
            <Text color={"fg.muted"}>‒</Text>
            <ArticleCategoryTags categories={[article.category]} />
          </HStack>
          <ArticleTitleDetail title={article.title} />
          <ArticleAuthor article={article} />
        </VStack>
        <Spacer p={2} />
        <ArticleCoverImage article={article} maxW={"2xl"} />
        <Spacer p={2} />
        <ArticleContent content={article.content ?? ""} />
      </VStack>
    </Container>
  );
};

export default ArticleDetail;
