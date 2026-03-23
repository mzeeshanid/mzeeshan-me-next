import { fetchArticleBySlugStrapi } from "@/apis/articles/articleDetail";
import { ArticleModel } from "@/apis/articles/articles";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import PageHeader from "@/components/PageHeader/PageHeader";
import ToolRelatedArticle from "@/components/Tools/RelatedArticle/ToolRelatedArticle";
import JsonValidatorFormatterBenefits from "@/components/Tools/JsonValidatorFormatter/Benefits/JsonValidatorFormatterBenefits";
import JsonValidatorFormatterComparison from "@/components/Tools/JsonValidatorFormatter/Comparison/JsonValidatorFormatterComparison";
import JsonValidatorFormatterFaqs from "@/components/Tools/JsonValidatorFormatter/Faqs/JsonValidatorFormatterFaqs";
import JsonValidatorFormatterFeatures from "@/components/Tools/JsonValidatorFormatter/Features/JsonValidatorFormatterFeatures";
import JsonValidatorFormatterHero from "@/components/Tools/JsonValidatorFormatter/Hero/JsonValidatorFormatterHero";
import JsonValidatorFormatterIntro from "@/components/Tools/JsonValidatorFormatter/Intro/JsonValidatorFormatterIntro";
import JsonValidatorFormatterSeo from "@/components/Tools/JsonValidatorFormatter/Seo/JsonValidatorFormatterSeo";
import {
  jsonValidatorFormatterHeaderData,
  jsonValidatorFormatterRelatedArticleData,
} from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import { Container, Spacer } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import React from "react";

type Props = {
  article?: ArticleModel;
};

const JsonValidatorAndFormatterHome: React.FC<Props> = ({ article }) => {
  return (
    <>
      <JsonValidatorFormatterSeo />
      <NavBar header={jsonValidatorFormatterHeaderData} />
      <Spacer p={4} />

      <Container maxW="6xl">
        <PageHeader
          title="JSON Validator And Formatter"
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "JSON Validator And Formatter" },
          ]}
        />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <JsonValidatorFormatterHero />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <JsonValidatorFormatterIntro />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <JsonValidatorFormatterBenefits />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <JsonValidatorFormatterFeatures />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <JsonValidatorFormatterComparison />
      </Container>

      {article && (
        <>
          <Spacer p={8} />
          <Container maxW="6xl">
            <ToolRelatedArticle
              article={article}
              header={{
                badge: jsonValidatorFormatterRelatedArticleData.badge,
                title: jsonValidatorFormatterRelatedArticleData.title,
                desc: jsonValidatorFormatterRelatedArticleData.description,
              }}
            />
          </Container>
        </>
      )}

      <Spacer p={8} />
      <Container maxW="6xl">
        <JsonValidatorFormatterFaqs />
      </Container>

      <Spacer p={8} />
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const article = await fetchArticleBySlugStrapi(
      "json-validator-and-formatter",
    );

    return {
      props: {
        article,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Failed to fetch related article in getStaticProps:", error);

    return {
      props: {},
      revalidate: 60,
    };
  }
};

export default JsonValidatorAndFormatterHome;
