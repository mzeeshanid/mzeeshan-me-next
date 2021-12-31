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
    metaTitle: category.attributes.name,
    metaDescription: `All ${category.attributes.name} articles`,
  };

  const [writings, setWritings] = useState(articles);

  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(writings.length < totalArticles);
  const [page, setPage] = useState(1);

  const limit = 10;

  const fetchArticles = async () => {
    setIsLoading(true);

    const start = page * limit;

    const { data: responseArticles } = await fetchAPI(
      `/articles?pagination[limit]=${limit}&pagination[start]=${start}&sort=publishedAt:desc&filters[category][slug]=${category.attributes.slug}&populate[0]=image&populate[1]=category&populate[2]=writer.picture`
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
        url={`https://www.mzeeshan.me/category/${category.attributes.slug}`}
      />
      <AppNavBar navItems={myNavItems()} />
      <BlogCategories categories={categories} />
      <Center p={2} bg={theme.colors.white}>
        <Heading as={"h1"} color={theme.colors.black}>
          {category.attributes.name}
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
  const { data: categories } = await fetchAPI(
    "/categories?pagination[limit]=-1"
  );

  return {
    paths: categories.map((category) => ({
      params: {
        slug: category.attributes.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { data: categories } = await fetchAPI(
    "/categories?pagination[limit]=-1"
  );

  const category = categories.filter((cat) => {
    return cat.attributes.slug.toLowerCase() === params.slug.toLowerCase();
  })[0];

  const { data: articles, meta } = await fetchAPI(
    `/articles?pagination[limit]=10&sort=publishedAt:desc&filters[category][slug]=${params.slug}&populate[0]=image&populate[1]=category&populate[2]=writer.picture`
  );

  const totalArticles = meta.pagination.total;

  return {
    props: { category, categories, articles, totalArticles },
    revalidate: 1,
  };
}

export default Category;
