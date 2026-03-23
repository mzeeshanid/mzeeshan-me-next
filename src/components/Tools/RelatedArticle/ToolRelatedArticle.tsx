import { ArticleModel } from "@/apis/articles/articles";
import ArticleItem from "@/components/Blog/ArticlesList/ArticleItem";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { Box, VStack } from "@chakra-ui/react";
import React from "react";

type Props = {
  article: ArticleModel;
  header: {
    badge: string;
    title: string;
    desc: string;
  };
};

const ToolRelatedArticle: React.FC<Props> = ({ article, header }) => {
  return (
    <Box as="section">
      <VStack align="start" gap={4}>
        <SectionHeader
          tagline={header.badge}
          headline={header.title}
          description={header.desc}
        />
        <ArticleItem article={article} />
      </VStack>
    </Box>
  );
};

export default ToolRelatedArticle;
