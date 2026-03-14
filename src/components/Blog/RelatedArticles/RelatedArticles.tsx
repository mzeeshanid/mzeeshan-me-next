import { ArticleModel } from "@/apis/articles/articles";
import {
  Box,
  GridItem,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import RelatedArticleItem from "./RelatedArticleItem";

type RelatedArticlesProps = {
  articles: ArticleModel[];
};

const RelatedArticles: React.FC<RelatedArticlesProps> = (props) => {
  const { articles } = props;
  return (
    <VStack gap={0}>
      <Box w={"full"} p={4} bg="bg.muted" borderRadius="md">
        <Text
          fontWeight={"bold"}
          textAlign={"center"}
          fontSize={{ base: "xl", md: "2xl" }}
        >
          {"More To Read"}
        </Text>
      </Box>
      <Spacer p={4} />
      <SimpleGrid minChildWidth={{ base: "none", md: "sm" }} gap={4}>
        {articles.map((article, key) => (
          <GridItem key={key} h="full">
            <RelatedArticleItem article={article} />
          </GridItem>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default RelatedArticles;
