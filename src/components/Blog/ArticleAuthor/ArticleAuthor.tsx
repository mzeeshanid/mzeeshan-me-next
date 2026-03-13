import { ArticleModel } from "@/apis/articles/articles";
import { Avatar, HStack, Text } from "@chakra-ui/react";
import React from "react";

type ArticleAuthorProps = {
  article: ArticleModel;
};

const ArticleAuthor: React.FC<ArticleAuthorProps> = (
  props: ArticleAuthorProps
) => {
  const { article } = props;
  return (
    <HStack>
      <Avatar.Root>
        <Avatar.Fallback name={article.writer.name} />
        {article.writer?.picture?.url && (
          <Avatar.Image src={article.writer.picture.url} />
        )}
      </Avatar.Root>
      <Text>{article.writer.name}</Text>
    </HStack>
  );
};

export default ArticleAuthor;
