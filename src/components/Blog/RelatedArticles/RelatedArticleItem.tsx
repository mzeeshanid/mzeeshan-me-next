import { ArticleModel } from "@/apis/articles/articles";
import { Card, Link, VStack } from "@chakra-ui/react";
import React from "react";
import ArticleCoverImage from "../ArticleCoverImage/ArticleCoverImage";
import ArticleCategoryTags from "../ArticleCategoryTags/ArticleCategoryTags";
import ArticleAuthor from "../ArticleAuthor/ArticleAuthor";

type RelatedArticleItemProps = {
  article: ArticleModel;
};

const RelatedArticleItem: React.FC<RelatedArticleItemProps> = (
  props: RelatedArticleItemProps
) => {
  const { article } = props;
  return (
    <Card.Root maxW="sm" overflow="hidden">
      <Card.Header>
        <ArticleCoverImage article={article} borderRadius={"none"} />
      </Card.Header>
      <Card.Body gap={4}>
        <Link href={`/blog/${article.slug}`}>
          <VStack align={"flex-start"}>
            <Card.Title>{article.title}</Card.Title>
            <Card.Description>{article.description}</Card.Description>
          </VStack>
        </Link>
        <ArticleCategoryTags categories={[article.category]} />
      </Card.Body>
      <Card.Footer>
        <ArticleAuthor article={article} />
      </Card.Footer>
    </Card.Root>
  );
};

export default RelatedArticleItem;
