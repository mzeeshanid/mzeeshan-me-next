import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import React from "react";
import { Container, Spacer } from "@chakra-ui/react";

import { fetchArticleBySlugStrapi } from "@/apis/articles/articleDetail";
import type { ArticleModel } from "@/apis/articles/articles";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import PageHeader from "@/components/PageHeader/PageHeader";
import ImageConverterComparison from "@/components/Tools/ImageFormatConverter/Comparison/ImageConverterComparison";
import ImageConverterFaqs from "@/components/Tools/ImageFormatConverter/Faqs/ImageConverterFaqs";
import ImageConverterHero from "@/components/Tools/ImageFormatConverter/Hero/ImageConverterHero";
import RelatedImageConversions from "@/components/Tools/ImageFormatConverter/Related/RelatedImageConversions";
import ImageConverterSeo from "@/components/Tools/ImageFormatConverter/Seo/ImageConverterSeo";
import ImageConverterFeatureCards from "@/components/Tools/ImageFormatConverter/Sections/ImageConverterFeatureCards";
import ImageConverterTextCards from "@/components/Tools/ImageFormatConverter/Sections/ImageConverterTextCards";
import ImageConverterUseCaseCards from "@/components/Tools/ImageFormatConverter/Sections/ImageConverterUseCaseCards";
import ToolRelatedArticle from "@/components/Tools/RelatedArticle/ToolRelatedArticle";
import { imageFormatConverterDetailDataBySlug } from "@/data/tools/imageFormatConverter/imageFormatConverterData";
import {
  getImageConversionRouteBySlug,
  imageConversionRoutes,
} from "@/data/tools/imageFormatConverter/imageConversionRoutes";

type Props = {
  article: ArticleModel;
  slug: string;
};

const ImageFormatConverterDetailPage: React.FC<Props> = ({ article, slug }) => {
  const data = imageFormatConverterDetailDataBySlug[slug];
  const currentRoute = getImageConversionRouteBySlug(data.routeSlug);

  return (
    <>
      <ImageConverterSeo meta={data.meta} />
      <NavBar header={data.header} />
      <main>
      <Spacer p={4} />

      <Container maxW="6xl">
        <PageHeader
          title={data.header.title}
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            {
              label: "Image Format Converter",
              href: "/tools/image-format-converter",
            },
            { label: data.header.title },
          ]}
        />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <ImageConverterHero content={data.hero} currentRoute={currentRoute} />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <ImageConverterTextCards
          header={data.intro.header}
          cards={data.intro.cards}
        />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <ImageConverterTextCards
          header={data.benefits.header}
          cards={data.benefits.cards}
        />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <ImageConverterUseCaseCards
          header={data.useCases.header}
          items={data.useCases.items}
        />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <ImageConverterFeatureCards
          header={data.features.header}
          items={data.features.items}
        />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <ImageConverterComparison
          header={data.comparison.header}
          columns={data.comparison.columns}
          rows={data.comparison.rows}
        />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <RelatedImageConversions
          currentSlug={data.routeSlug}
          header={data.relatedConversions.header}
        />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <ToolRelatedArticle article={article} header={data.relatedArticle} />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <ImageConverterFaqs header={data.faqs.header} items={data.faqs.items} />
      </Container>

      <Spacer p={8} />
      </main>
      <Footer />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: imageConversionRoutes.map((route) => ({
      params: { slug: route.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = (async (
  context: GetStaticPropsContext,
) => {
  const slug = context.params?.slug;

  if (typeof slug !== "string") {
    return { notFound: true };
  }

  const data = imageFormatConverterDetailDataBySlug[slug];

  if (!data) {
    return { notFound: true };
  }

  const article = await fetchArticleBySlugStrapi("image-format-converter");

  return {
    props: { article, slug },
    revalidate: 3600,
  };
}) satisfies GetStaticProps<Props>;

export default ImageFormatConverterDetailPage;
