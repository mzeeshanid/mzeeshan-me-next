import {
  Card,
  Heading,
  HStack,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

type ArticleListSkeletonItemProps = {};

const ArticleListSkeletonItem: React.FC<ArticleListSkeletonItemProps> = () => {
  return (
    <Card.Root
      w="100%"
      bg="bg.subtle"
      flexDir={{ base: "column", md: "row" }}
      overflow="hidden"
      alignItems={{ base: "flex-start", md: "center" }}
      gap={{ base: 4, md: 6, lg: 8 }}
      p={{ base: 4, md: 6, lg: 8 }}
    >
      <Skeleton
        height={225}
        width={{ base: "100%", md: "400px" }}
        borderRadius="md"
      />
      <VStack alignItems={"flex-start"} gap={4} w="full">
        <Skeleton>
          <Text>August 20, 2023</Text>
        </Skeleton>
        <Skeleton>
          <Heading size="2xl">Loading Article Title</Heading>
        </Skeleton>
        <Skeleton>
          <Text>Dummy description of the article while loading</Text>
        </Skeleton>
        <HStack>
          <Skeleton>
            <Text>tags</Text>
          </Skeleton>
        </HStack>
        <HStack>
          <SkeletonCircle size={10} />
          <Skeleton>
            <Text>Loading Author</Text>
          </Skeleton>
        </HStack>
      </VStack>
    </Card.Root>
  );
};

export default ArticleListSkeletonItem;
