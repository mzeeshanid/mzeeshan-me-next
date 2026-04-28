import { fetchArticleBySlugStrapi } from "@/apis/articles/articleDetail";
import { MyStrapiError } from "@/strapiClient/strapiError";
import { ArticleModel } from "@/apis/articles/articles";
import ArticleDetail from "@/components/Blog/ArticleDetail/ArticleDetail";
import { ArticleDetailSeo } from "@/components/Blog/ArticleSeo/ArticleDetailSeo";
import RelatedArticles from "@/components/Blog/RelatedArticles/RelatedArticles";
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

type ArticleDetailPageProps = {
  article: ArticleModel;
};

const ArticleDetailPage: React.FC<ArticleDetailPageProps> = (
  props: ArticleDetailPageProps
) => {
  const { article } = props;

  const image = article.image?.formats?.large;

  return (
    <>
      <ArticleDetailSeo article={article} />
      <NavBar />
      <main>
      <Spacer p={4} />

      <Container maxW="6xl">
        <PageHeader
          title={"Blog"}
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: article.title },
          ]}
        />
      </Container>

      <Spacer p={4} />

      <Container maxW={"6xl"}>
        <ArticleDetail article={article} />
      </Container>

      {article.related && article.related.length > 0 && (
        <>
          <Spacer p={4} />
          <Container maxW={"6xl"}>
            <RelatedArticles articles={article.related} />
          </Container>
        </>
      )}
      <Spacer p={4} />
      </main>
      <Footer />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async (
  context: GetStaticPathsContext
) => {
  return {
    paths: [], // 👈 no pre-rendered articles
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<ArticleDetailPageProps> = (async (
  context: GetStaticPropsContext
) => {
  const slug = context.params!.slug as string;
  try {
    const article = await fetchArticleBySlugStrapi(slug);
    return { props: { article }, revalidate: 60 };
  } catch (error) {
    if (error instanceof MyStrapiError && error.status === 404) {
      return { notFound: true };
    }
    throw error;
  }
}) satisfies GetStaticProps<ArticleDetailPageProps>;

export default ArticleDetailPage;
