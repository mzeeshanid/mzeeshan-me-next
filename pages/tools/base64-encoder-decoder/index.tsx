import { fetchArticleBySlugStrapi } from "@/apis/articles/articleDetail";
import { ArticleModel } from "@/apis/articles/articles";
import React from "react";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import PageHeader from "@/components/PageHeader/PageHeader";
import ToolRelatedArticle from "@/components/Tools/RelatedArticle/ToolRelatedArticle";
import Base64EncoderDecoderHero from "@/components/Tools/Base64EncoderDecoder/Hero/Base64EncoderDecoderHero";
import Base64Features from "@/components/Tools/Base64EncoderDecoder/Features/Base64Features";
import Base64UseCases from "@/components/Tools/Base64EncoderDecoder/UseCases/Base64UseCases";
import Base64CodeExamples from "@/components/Tools/Base64EncoderDecoder/CodeExamples/Base64CodeExamples";
import Base64Troubleshooting from "@/components/Tools/Base64EncoderDecoder/Troubleshooting/Base64Troubleshooting";
import Base64Comparison from "@/components/Tools/Base64EncoderDecoder/Comparison/Base64Comparison";
import Base64Faqs from "@/components/Tools/Base64EncoderDecoder/Faqs/Base64Faqs";
import Base64Seo from "@/components/Tools/Base64EncoderDecoder/Seo/Base64Seo";
import { base64HeaderData } from "@/data/tools/base64EncoderDecoder/base64EncoderDecoderFeatures";
import { Box, Container, Spacer } from "@chakra-ui/react";
import { GetStaticProps } from "next";

type Props = {
  article?: ArticleModel;
};

const Base64EncoderDecoderHome: React.FC<Props> = (props: Props) => {
  const { title, subtitle, icon, alt } = base64HeaderData;

  return (
    <>
      <Base64Seo />
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
            title="Base64 Encoder & Decoder"
            breadcrumbItems={[
              { label: "Home", href: "/" },
              { label: "Tools", href: "/tools" },
              { label: "Base64 Encoder & Decoder" },
            ]}
          />
        </Container>

        <Spacer p={4} />
        <Container maxW="6xl">
          <Base64EncoderDecoderHero />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <Base64Features />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <Base64UseCases />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <Base64CodeExamples />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <Base64Troubleshooting />
        </Container>

        {props.article && (
          <Box>
            <Spacer p={8} />
            <Container maxW="6xl">
              <ToolRelatedArticle
                article={props.article}
                header={{
                  badge: "Article",
                  title: "Learn More About Base64",
                  desc: "Dive deeper into Base64 encoding, use cases, and best practices.",
                }}
              />
            </Container>
          </Box>
        )}

        <Spacer p={8} />
        <Container maxW="6xl">
          <Base64Comparison />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <Base64Faqs />
        </Container>

        <Spacer p={8} />
      </main>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const article = await fetchArticleBySlugStrapi("base64-encoder-decoder");
    return {
      props: { article },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Failed to fetch working article in getStaticProps:", error);
    return {
      props: {},
      revalidate: 60,
    };
  }
};

export default Base64EncoderDecoderHome;
