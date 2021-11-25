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

const Category = ({ category, categories, articles }) => {
  const seo = {
    metaTitle: category.name,
    metaDescription: `All ${category.name} articles`,
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
      <Articles articles={articles} />
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
    `/articles?_sort=published_at:DESC&_where[category.slug]=${params.slug}`
  );

  return {
    props: { category, categories, articles },
    revalidate: 1,
  };
}

export default Category;
