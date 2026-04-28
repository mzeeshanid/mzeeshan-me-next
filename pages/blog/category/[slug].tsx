import {
  ArticleCategoryModel,
  ArticleCategoryResponseCollection,
  fetchArticleCategoriesStrapi,
} from "@/apis/articles/articleCategories";
import {
  ArticleResponseCollection,
  fetchArticlesStrapi,
} from "@/apis/articles/articles";
import { ArticleListingContainer } from "@/components/Blog/ArticleListingContainer/ArticleListingContainer";
import { ArticleCategorySeo } from "@/components/Blog/ArticleSeo/ArticleCategorySeo";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import PageHeader from "@/components/PageHeader/PageHeader";
import { Container, Spacer } from "@chakra-ui/react";
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import React from "react";

type BlogCategoryArticlesPageProps = {
  category: ArticleCategoryModel;
  categoriesResponse: ArticleCategoryResponseCollection;
  initialArticlesResponse: ArticleResponseCollection;
};

const PAGE_SIZE = 3;

const BlogCategoryArticlesPage: React.FC<BlogCategoryArticlesPageProps> = (
  props: BlogCategoryArticlesPageProps
) => {
  const { category } = props;
  return (
    <>
      <ArticleCategorySeo category={category} />
      <NavBar />
      <main>
      <Spacer p={4} />

      <Container maxW="6xl">
        <PageHeader
          title="Blog"
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: category.name },
          ]}
        />
      </Container>

      <Spacer p={4} />

      <ArticleListingContainer
        categoriesResponse={props.categoriesResponse}
        initialArticlesResponse={props.initialArticlesResponse}
        pageSize={PAGE_SIZE}
        categorySlug={props.category.slug}
      />

      <Spacer p={4} />
      </main>
      <Footer />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async (
  context: GetStaticPathsContext
) => {
  const categoriesResponse = await fetchArticleCategoriesStrapi();

  const paths = categoriesResponse.data.map((category) => ({
    params: { slug: category.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<BlogCategoryArticlesPageProps> =
  (async (context: GetStaticPropsContext) => {
    const slug = context.params?.slug as string;
    const [categoriesResponse, initialArticlesResponse] = await Promise.all([
      fetchArticleCategoriesStrapi(),
      fetchArticlesStrapi(1, PAGE_SIZE, undefined, slug),
    ]);

    const category = categoriesResponse.data.find(
      (category) => category.slug === slug
    );

    if (!category) {
      return {
        notFound: true,
      };
    }

    return {
      props: { category, categoriesResponse, initialArticlesResponse },
      revalidate: 60,
    };
  }) satisfies GetStaticProps<BlogCategoryArticlesPageProps>;

export default BlogCategoryArticlesPage;
