import { ArticleModel } from "@/apis/articles/articles";
import { Text } from "@chakra-ui/react";
import React from "react";

type ArticleMetaProps = {
  article: ArticleModel;
};

const ArticleMeta: React.FC<ArticleMetaProps> = (props: ArticleMetaProps) => {
  const { article } = props;
  return (
    <Text fontSize="sm" color="fg.muted">
      {`${new Date(article.createdAt).toDateString()} ‒ ${article.readingTime} read`}
    </Text>
  );
};

export default ArticleMeta;
