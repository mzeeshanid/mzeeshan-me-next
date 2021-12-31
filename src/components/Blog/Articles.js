import React from "react";
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  Link,
  theme,
  Text,
} from "@chakra-ui/react";
import Moment from "react-moment";
import StrapiImage from "./StrapiImage";

const Articles = ({ articles }) => {
  return articles.map((article, idx) => {
    const articleAttributes = article.attributes;

    const authorData = articleAttributes.writer.data;
    const { data: authorImageData } = authorData.attributes.picture;
    const imageData = articleAttributes.image.data;
    const categoryData = articleAttributes.category.data;

    return (
      <Flex
        key={idx}
        bg={useColorModeValue("#F9FAFB", "gray.600")}
        p={50}
        w="full"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          mx="auto"
          rounded="lg"
          shadow="md"
          bg={useColorModeValue("white", "gray.800")}
          maxW="2xl"
        >
          {imageData && imageData.attributes && imageData.attributes.formats && (
            <Box w="full" roundedTop="lg" overflow={"hidden"}>
              <StrapiImage
                image={imageData.attributes}
                width={imageData.attributes.width}
                height={imageData.attributes.height}
              />
            </Box>
          )}

          <Box p={6}>
            <Box>
              <chakra.span
                fontSize="xs"
                textTransform="uppercase"
                color={theme.colors.teal[500]}
              >
                {categoryData.attributes.name}
              </chakra.span>
              <Link
                href={`/article/${articleAttributes.slug}`}
                display="block"
                color={useColorModeValue("gray.800", "white")}
                fontWeight="bold"
                fontSize="2xl"
                mt={2}
                _hover={{ color: "gray.600", textDecor: "underline" }}
              >
                {articleAttributes.title}
              </Link>
              <chakra.p
                mt={2}
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                {articleAttributes.description}
              </chakra.p>
            </Box>
            <Box mt={4}>
              <Flex alignItems="center">
                <Flex alignItems="center">
                  {authorImageData && (
                    <Box w={"50px"} h={"50px"} rounded="full" overflow="hidden">
                      <StrapiImage
                        image={authorImageData.attributes}
                        width="100%"
                        height="100%"
                      />
                    </Box>
                  )}
                  <Text mx={2} fontWeight="bold" color={theme.colors.black}>
                    {authorData.attributes.name}
                  </Text>
                </Flex>
                <chakra.span
                  mx={1}
                  fontSize="sm"
                  color={theme.colors.gray[600]}
                >
                  <Moment format="Do MMM YYYY">
                    {articleAttributes.publishedAt}
                  </Moment>
                </chakra.span>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Flex>
    );
  });
};

export default Articles;
