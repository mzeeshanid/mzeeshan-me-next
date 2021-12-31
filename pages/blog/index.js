import {
  LightMode,
  theme,
  Box,
  Flex,
  Button,
  Spacer,
  Center,
} from "@chakra-ui/react";
import { BlogJsonLd, NextSeo } from "next-seo";
import React, { useEffect, useState } from "react";
import { fetchAPI } from "../../lib/api";
import AppFooter from "../../src/components/AppFooter";
import AppHeadingText from "../../src/components/AppHeadingText";
import AppNavBar from "../../src/components/AppNavBar";
import Articles from "../../src/components/Blog/Articles";
import BlogCategories from "../../src/components/Blog/BlogCategories";
import myNavItems from "../../src/data/myNavItems";

export default function Index({ articles, categories, totalArticles }) {
  const aTitle = "Blog - A personal blog for sharing experiences";
  const aDesc =
    "A personal blog where I write about iOS development and my personal apps. Sometime I share my travelling experiences, stories and jokes.";

  const [writings, setWritings] = useState(articles);

  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(writings.length < totalArticles);
  const [page, setPage] = useState(1);

  const limit = 10;

  const fetchArticles = async () => {
    setIsLoading(true);

    const start = page * limit;

    const { data: responseArticles } = await fetchAPI(
      `/articles?sort=publishedAt:desc&pagination[limit]=${limit}&pagination[start]=${start}&populate[0]=image&populate[1]=category&populate[2]=writer.picture`
    );

    setPage(page + 1);
    setIsLoading(false);
    setWritings(writings.concat(responseArticles));
    setHasMore(writings.length + responseArticles.length < totalArticles);
  };

  return (
    <LightMode>
      <NextSeo
        title={aTitle}
        description={aDesc}
        openGraph={{
          title: aTitle,
          description: aDesc,
          url: "https://www.mzeeshan.me/blog",
          images: [
            {
              url: "https://dzm9gzl83npws.cloudfront.net/avatar_me_239a1f707b.jpeg",
              width: 400,
              height: 400,
              alt: "Profile picture",
              type: "image/jpeg",
            },
          ],
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <BlogJsonLd
        url="https://www.mzeeshan.me/blog"
        title="A personal blog for sharing experiences"
        images={[
          "https://dzm9gzl83npws.cloudfront.net/avatar_me_239a1f707b.jpeg",
        ]}
        datePublished="2021-02-05T08:00:00+08:00"
        dateModified="2021-02-05T09:00:00+08:00"
        authorName="Muhammad Zeeshan"
        description="A personal blog where I write about iOS development and my personal apps. Sometime I share my travelling experiences, stories and jokes."
      />
      <AppNavBar navItems={myNavItems()} />
      <Box bg={theme.colors.gray[50]} p={4}>
        <AppHeadingText
          heading="Blog - Sharing Experiences"
          as="h1"
          headingColor={theme.colors.black}
          bg={theme.colors.gray[50]}
        />
      </Box>
      <BlogCategories categories={categories} />
      <Articles articles={writings} />
      {hasMore && (
        <Center pb={10} bg={theme.colors.gray[50]}>
          <Button
            colorScheme="teal"
            variant="outline"
            isLoading={isLoading}
            onClick={() => {
              fetchArticles();
            }}
          >
            Load More
          </Button>
        </Center>
      )}
      <AppFooter />
    </LightMode>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [articlesResponse, categoriesResponse] = await Promise.all([
    fetchAPI(
      "/articles?sort=publishedAt:desc&pagination[limit]=10&populate[0]=image&populate[1]=category&populate[2]=writer.picture"
    ),
    fetchAPI("/categories"),
  ]);

  const { data: articles, meta } = articlesResponse;
  const { data: categories } = categoriesResponse;
  const totalArticles = meta.pagination.total;
  return {
    props: { articles, categories, totalArticles },
    revalidate: 1,
  };
}
