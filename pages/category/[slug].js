import { fetchAPI } from "../../lib/api";
import BlogCategories from "../../src/components/Blog/BlogCategories";
import { Center, Heading } from "@chakra-ui/layout";
import theme from "@chakra-ui/theme";
import Articles from "../../src/components/Blog/Articles";
import { LightMode } from "@chakra-ui/color-mode";
import myNavItems from "../../src/data/myNavItems";
import AppNavBar from "../../src/components/AppNavBar";
import AppFooter from "../../src/components/AppFooter";
import Seo from "../../src/components/Blog/BlogSEO";
import { useState } from "react";
import { Button } from "@chakra-ui/button";

const Category = ({ category, categories, articles, totalArticles }) => {
  // console.log(
  //   "props --> category: ",
  //   category,
  //   "categories: ",
  //   categories,
  //   " articles: ",
  //   articles,
  //   "totalArticles: ",
  //   totalArticles
  // );

  const seo = {
    metaTitle: category.name,
    metaDescription: `All ${category.name} articles`,
  };

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
      <Seo
        seo={seo}
        url={`https://www.mzeeshan.me/category/${category.slug}`}
      />
      <AppNavBar navItems={myNavItems()} />
      <BlogCategories categories={categories} />
      <Center p={2} bg={theme.colors.white}>
        <Heading as={"h1"} color={theme.colors.black}>
          {category.name}
        </Heading>
      </Center>
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
};

export async function getStaticPaths() {
  const categories = await fetchAPI("/categories");

  return {
    paths: categories.map((category) => ({
      params: {
        slug: category.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const categories = await fetchAPI("/categories");

  const category = categories.filter((cat) => {
    return cat.slug.toLowerCase() === params.slug.toLowerCase();
  })[0];

  const articles = await fetchAPI(
    `/articles?_sort=published_at:DESC&_where[category.slug]=${params.slug}&_limit=10`
  );

  const totalArticles = await fetchAPI(
    `/articles/count?_where[category.slug]=${params.slug}`
  );

  return {
    props: { category, categories, articles, totalArticles },
    revalidate: 1,
  };
}

export default Category;
