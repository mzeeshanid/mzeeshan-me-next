import { fetchArticleBySlugStrapi } from "@/apis/articles/articleDetail";
import { ArticleModel } from "@/apis/articles/articles";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import PageHeader from "@/components/PageHeader/PageHeader";
import ToolRelatedArticle from "@/components/Tools/RelatedArticle/ToolRelatedArticle";
import AspectRatioCommon from "@/components/Tools/AspectRatio/CommonRatios/AspectRatioCommon";
import AspectRatioComparison from "@/components/Tools/AspectRatio/Comparison/AspectRatioComparison";
import AspectRatioFaqs from "@/components/Tools/AspectRatio/Faqs/AspectRatioFaqs";
import AspectRatioFeatures from "@/components/Tools/AspectRatio/Features/AspectRatioFeatures";
import AspectRatioFormula from "@/components/Tools/AspectRatio/Formula/AspectRatioFormula";
import AspectRatioHero from "@/components/Tools/AspectRatio/Hero/AspectRatioHero";
import AspectRatioInstructions from "@/components/Tools/AspectRatio/Instructions/AspectRatioInstructions";
import AspectRatioSeo from "@/components/Tools/AspectRatio/Seo/AspectRatioSeo";
import { aspectRatioHeaderData } from "@/data/tools/aspectRatio/aspectRatioHeaderData";
import { aspectRatioWorkingData } from "@/data/tools/aspectRatio/aspectRatioLearnMoreData";
import { aspectRatioMetaData } from "@/data/tools/aspectRatio/aspectRatioMetaData";
import { Container, Spacer } from "@chakra-ui/react";
import { GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";

type Props = {
  article: ArticleModel;
};

const AspectRatioCalculatorHome: React.FC<Props> = (props: Props) => {
  const { article } = props;
  const meta = aspectRatioMetaData;
  return (
    <>
      <AspectRatioSeo />
      <NavBar header={aspectRatioHeaderData} />
      <main>
      <Spacer p={4} />

      <Container maxW="6xl">
        <PageHeader
          title={meta.title}
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: meta.title },
          ]}
        />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <AspectRatioHero />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <AspectRatioInstructions />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <AspectRatioFormula />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <AspectRatioFeatures />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <AspectRatioCommon />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <ToolRelatedArticle article={article} header={aspectRatioWorkingData.header} />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <AspectRatioComparison />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <AspectRatioFaqs />
      </Container>

      <Spacer p={4} />
      </main>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = (async (
  context: GetStaticPropsContext,
) => {
  const slug = "aspect-ratio-calculator";
  const [article] = await Promise.all([fetchArticleBySlugStrapi(slug)]);

  return {
    props: { article },
    revalidate: 60,
  };
}) satisfies GetStaticProps<Props>;

export default AspectRatioCalculatorHome;
