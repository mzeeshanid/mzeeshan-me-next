import {
  ArticleCategoryResponseCollection,
  fetchArticleCategoriesStrapi,
} from "@/apis/articles/articleCategories";
import {
  ArticleResponseCollection,
  fetchArticlesStrapi,
} from "@/apis/articles/articles";
import { ArticleListingContainer } from "@/components/Blog/ArticleListingContainer/ArticleListingContainer";
import ArticleListingSeo from "@/components/Blog/ArticleSeo/ArticleListingSeo";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import PageHeader from "@/components/PageHeader/PageHeader";
import { Container, Spacer } from "@chakra-ui/react";
import type { GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";

type BlogHomePageProps = {
  categoriesResponse: ArticleCategoryResponseCollection;
  initialArticlesResponse: ArticleResponseCollection;
};

type BlogHomePageQueryParams = {
  page?: number;
  keyword?: string;
};

const PAGE_SIZE = 10;

const BlogHomePage: React.FC<BlogHomePageProps> = (
  props: BlogHomePageProps,
) => {
  return (
    <>
      <ArticleListingSeo />
      <NavBar />
      <main>
      <Spacer p={4} />

      <Container maxW="6xl">
        <PageHeader
          title="Blog"
          breadcrumbItems={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        />
      </Container>

      <Spacer p={4} />

      <ArticleListingContainer
        categoriesResponse={props.categoriesResponse}
        initialArticlesResponse={props.initialArticlesResponse}
        pageSize={PAGE_SIZE}
      />

      <Spacer p={4} />
      </main>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogHomePageProps> = (async (
  context: GetStaticPropsContext,
) => {
  const [categoriesResponse, initialArticlesResponse] = await Promise.all([
    fetchArticleCategoriesStrapi(),
    fetchArticlesStrapi(1, PAGE_SIZE),
  ]);

  return {
    props: { categoriesResponse, initialArticlesResponse },
    revalidate: 60,
  };
}) satisfies GetStaticProps<BlogHomePageProps>;

export default BlogHomePage;
