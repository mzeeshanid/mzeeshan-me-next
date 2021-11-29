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
import { useRouter } from "next/router";
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

    const responseArticles = await fetchAPI(
      `/articles?_sort=published_at:DESC&_limit=${limit}&_start=${start}`
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
              url: "https://dzm9gzl83npws.cloudfront.net/profile_pic_ca75ff8ec8.jpeg",
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
          "https://dzm9gzl83npws.cloudfront.net/profile_pic_ca75ff8ec8.jpeg",
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
  const [articles, categories, totalArticles] = await Promise.all([
    fetchAPI("/articles?_sort=published_at:DESC&_limit=10"),
    fetchAPI("/categories"),
    fetchAPI("/articles/count"),
  ]);

  return {
    props: { articles, categories, totalArticles },
    revalidate: 1,
  };
}
