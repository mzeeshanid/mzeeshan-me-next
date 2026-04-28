import { fetchArticleBySlugStrapi } from "@/apis/articles/articleDetail";
import { ArticleModel } from "@/apis/articles/articles";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import PageHeader from "@/components/PageHeader/PageHeader";
import ToolRelatedArticle from "@/components/Tools/RelatedArticle/ToolRelatedArticle";
import JsonToCsvConverter from "@/components/Tools/JsonValidatorFormatter/Hero/JsonToCsvConverter";
import JsonValidatorFormatterBenefits from "@/components/Tools/JsonValidatorFormatter/Benefits/JsonValidatorFormatterBenefits";
import JsonValidatorFormatterFaqs from "@/components/Tools/JsonValidatorFormatter/Faqs/JsonValidatorFormatterFaqs";
import JsonValidatorFormatterFeatures from "@/components/Tools/JsonValidatorFormatter/Features/JsonValidatorFormatterFeatures";
import JsonValidatorFormatterIntro from "@/components/Tools/JsonValidatorFormatter/Intro/JsonValidatorFormatterIntro";
import JsonRelatedTools from "@/components/Tools/JsonValidatorFormatter/RelatedTools/JsonRelatedTools";
import JsonValidatorFormatterSeo from "@/components/Tools/JsonValidatorFormatter/Seo/JsonValidatorFormatterSeo";
import {
  jsonConverterBenefitsDataByTab,
  jsonConverterFaqsDataByTab,
  jsonConverterFeaturesDataByTab,
  jsonConverterIntroDataByTab,
  jsonConverterRelatedArticleDataByTab,
  jsonConverterTabHeaderData,
  jsonConverterTabMetaData,
} from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import { Container, Spacer } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import React from "react";

type Props = { article?: ArticleModel };

const meta = jsonConverterTabMetaData.csv;
const header = jsonConverterTabHeaderData.csv;
const introData = jsonConverterIntroDataByTab.csv;
const benefitsData = jsonConverterBenefitsDataByTab.csv;
const featuresData = jsonConverterFeaturesDataByTab.csv;
const faqsData = jsonConverterFaqsDataByTab.csv;
const relatedArticleHeader = jsonConverterRelatedArticleDataByTab.csv;

const JsonToCsvPage: React.FC<Props> = ({ article }) => (
  <>
    <JsonValidatorFormatterSeo meta={meta} />
    <NavBar header={header} />
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
      <JsonToCsvConverter />
    </Container>

    <Spacer p={8} />
    <Container maxW="6xl">
      <JsonRelatedTools currentToolId="csv" />
    </Container>

    <Spacer p={8} />
    <Container maxW="6xl">
      <JsonValidatorFormatterIntro data={introData} />
    </Container>

    <Spacer p={8} />
    <Container maxW="6xl">
      <JsonValidatorFormatterBenefits data={benefitsData} />
    </Container>

    <Spacer p={8} />
    <Container maxW="6xl">
      <JsonValidatorFormatterFeatures data={featuresData} />
    </Container>

    {article && (
      <>
        <Spacer p={8} />
        <Container maxW="6xl">
          <ToolRelatedArticle article={article} header={relatedArticleHeader} />
        </Container>
      </>
    )}

    <Spacer p={8} />
    <Container maxW="6xl">
      <JsonValidatorFormatterFaqs data={faqsData} />
    </Container>

    <Spacer p={8} />
    </main>
    <Footer />
  </>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const article = await fetchArticleBySlugStrapi("working-with-json-five-tools-for-every-workflow");
    return { props: { article }, revalidate: 3600 };
  } catch {
    return { props: {}, revalidate: 60 };
  }
};

export default JsonToCsvPage;
