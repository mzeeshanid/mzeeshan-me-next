import { fetchArticleBySlugStrapi } from "@/apis/articles/articleDetail";
import { ArticleModel } from "@/apis/articles/articles";
import React from "react";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import PageHeader from "@/components/PageHeader/PageHeader";
import ToolRelatedArticle from "@/components/Tools/RelatedArticle/ToolRelatedArticle";
import ColorConverterHero from "@/components/Tools/ColorFormatConverter/Hero/ColorConverterHero";
import ColorConverterFeatures from "@/components/Tools/ColorFormatConverter/Features/ColorConverterFeatures";
import ColorConverterHowItWorks from "@/components/Tools/ColorFormatConverter/HowItWorks/ColorConverterHowItWorks";
import ColorConverterCodeExamples from "@/components/Tools/ColorFormatConverter/CodeExamples/ColorConverterCodeExamples";
import ColorConverterComparison from "@/components/Tools/ColorFormatConverter/Comparison/ColorConverterComparison";
import ColorConverterFaqs from "@/components/Tools/ColorFormatConverter/Faqs/ColorConverterFaqs";
import ColorConverterSeo from "@/components/Tools/ColorFormatConverter/Seo/ColorConverterSeo";
import { colorConverterHeaderData } from "@/data/tools/colorFormatConverter";
import { Box, Container, Spacer } from "@chakra-ui/react";
import { GetStaticProps } from "next";

type Props = {
  article?: ArticleModel;
};

const ColorFormatConverterPage: React.FC<Props> = (props: Props) => {
  const { title, subtitle, icon, alt } = colorConverterHeaderData;

  return (
    <>
      <ColorConverterSeo />
      <NavBar
        header={{
          title,
          subtitle,
          icon,
          alt,
          rounded: false,
        }}
      />
      <main>
        <Spacer p={4} />

        <Container maxW="6xl">
          <PageHeader
            title="Color Format Converter"
            breadcrumbItems={[
              { label: "Home", href: "/" },
              { label: "Tools", href: "/tools" },
              { label: "Color Format Converter" },
            ]}
          />
        </Container>

        <Spacer p={4} />
        <Container maxW="6xl">
          <ColorConverterHero />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <ColorConverterFeatures />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <ColorConverterHowItWorks />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <ColorConverterCodeExamples />
        </Container>

        {props.article && (
          <Box>
            <Spacer p={8} />
            <Container maxW="6xl">
              <ToolRelatedArticle
                article={props.article}
                header={{
                  badge: "Article",
                  title: "Learn More About CSS Color Formats",
                  desc: "Dive deeper into HEX, RGB, HSL, and HSV — with practical CSS tips and browser compatibility notes.",
                }}
              />
            </Container>
          </Box>
        )}

        <Spacer p={8} />
        <Container maxW="6xl">
          <ColorConverterComparison />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <ColorConverterFaqs />
        </Container>

        <Spacer p={8} />
      </main>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const article = await fetchArticleBySlugStrapi("color-format-converter");
    return {
      props: { article },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Failed to fetch article in getStaticProps:", error);
    return {
      props: {},
      revalidate: 60,
    };
  }
};

export default ColorFormatConverterPage;
