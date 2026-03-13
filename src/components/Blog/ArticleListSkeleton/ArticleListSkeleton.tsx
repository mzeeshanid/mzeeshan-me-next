import React from "react";
import ArticleListSkeletonItem from "./ArticleListSkeletonItem";
import { VStack } from "@chakra-ui/react";

type ArticleListSkeletonProps = {
  count: number;
};

const ArticleListSkeleton: React.FC<ArticleListSkeletonProps> = (
  props: ArticleListSkeletonProps
) => {
  return (
    <VStack gap={8}>
      {Array.from({ length: props.count }).map((_, index) => (
        <ArticleListSkeletonItem key={index} />
      ))}
    </VStack>
  );
};

export default ArticleListSkeleton;
