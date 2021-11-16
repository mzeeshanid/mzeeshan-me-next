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

const Category = ({ category, categories }) => {
  const seo = {
    metaTitle: category.name,
    metaDescription: `All ${category.name} articles`,
  };

  return (
    <LightMode>
      <Seo seo={seo} />
      <AppNavBar navItems={myNavItems()} />
      <BlogCategories categories={categories} />
      <Center p={2} bg={theme.colors.white}>
        <Heading color={theme.colors.black}>{category.name}</Heading>
      </Center>
      <Articles articles={category.articles} />
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
  const category = (
    await fetchAPI(
      `/categories?slug=${params.slug}&_sort=articles.published_at:DESC`
    )
  )[0];
  const categories = await fetchAPI("/categories");

  return {
    props: { category, categories },
    revalidate: 1,
  };
}

export default Category;
