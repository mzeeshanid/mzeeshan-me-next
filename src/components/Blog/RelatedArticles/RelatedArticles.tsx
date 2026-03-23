import { ArticleModel } from "@/apis/articles/articles";
import {
  Box,
  Carousel,
  IconButton,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
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
      <Carousel.Root
        autoSize
        slideCount={articles.length}
        gap={4}
        w="full"
        mx="auto"
      >
        <Carousel.ItemGroup>
          {articles.map((article, index) => (
            <Carousel.Item key={article.slug || index} index={index} width="auto">
              <Box
                w={{ base: "calc(100vw - 5rem)", md: "22rem" }}
                maxW="full"
                h="full"
              >
                <RelatedArticleItem article={article} />
              </Box>
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>

        <Carousel.Control justifyContent="center" gap={4} pt={4}>
          <Carousel.PrevTrigger asChild>
            <IconButton size="xs" variant="outline">
              <LuChevronLeft />
            </IconButton>
          </Carousel.PrevTrigger>

          <Carousel.Indicators />

          <Carousel.NextTrigger asChild>
            <IconButton size="xs" variant="outline">
              <LuChevronRight />
            </IconButton>
          </Carousel.NextTrigger>
        </Carousel.Control>
      </Carousel.Root>
    </VStack>
  );
};

export default RelatedArticles;
