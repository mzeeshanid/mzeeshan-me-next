import { fetchArticleBySlugStrapi } from "@/apis/articles/articleDetail";
import { ArticleModel } from "@/apis/articles/articles";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import PageHeader from "@/components/PageHeader/PageHeader";
import AppIconGeneratorComparison from "@/components/Tools/AppIconGenerator/Comparison/AppIconGeneratorComparison";
import AppIconGeneratorFaqs from "@/components/Tools/AppIconGenerator/Faqs/AppIconGeneratorFaqs";
import AppIconGeneratorFeatures from "@/components/Tools/AppIconGenerator/Features/AppIconGeneratorFeatures";
import AppIconGeneratorHero from "@/components/Tools/AppIconGenerator/Hero/AppIconGeneratorHero";
import AppIconGeneratorHowItWorks from "@/components/Tools/AppIconGenerator/HowItWorks/AppIconGeneratorHowItWorks";
import AppIconGeneratorSeo from "@/components/Tools/AppIconGenerator/Seo/AppIconGeneratorSeo";
import ToolRelatedArticle from "@/components/Tools/RelatedArticle/ToolRelatedArticle";
import { appIconGeneratorHeaderData } from "@/data/tools/appIconGenerator/appIconGeneratorData";
import { Container, Spacer } from "@chakra-ui/react";
import { GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";

type Props = {
  article: ArticleModel;
};

const AppIconGeneratorPage: React.FC<Props> = ({ article }) => {
  return (
    <>
      <AppIconGeneratorSeo />
      <NavBar header={appIconGeneratorHeaderData} />
      <Spacer p={4} />

      <Container maxW="6xl">
        <PageHeader
          title="App Icon Generator"
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "App Icon Generator" },
          ]}
        />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <AppIconGeneratorHero />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <AppIconGeneratorFeatures />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <AppIconGeneratorHowItWorks />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <AppIconGeneratorComparison />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <ToolRelatedArticle
          article={article}
          header={{
            badge: "Learn More",
            title: "Related Article",
            desc: "Read a related article while the dedicated app icon guide is being prepared.",
          }}
        />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <AppIconGeneratorFaqs />
      </Container>

      <Spacer p={8} />
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = (async (
  context: GetStaticPropsContext,
) => {
  const slug = "app-icon-generator";
  const [article] = await Promise.all([fetchArticleBySlugStrapi(slug)]);

  return {
    props: { article },
    revalidate: 3600,
  };
}) satisfies GetStaticProps<Props>;

export default AppIconGeneratorPage;
