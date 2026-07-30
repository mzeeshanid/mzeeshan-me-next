import { fetchArticleBySlugStrapi } from "@/apis/articles/articleDetail";
import { ArticleModel } from "@/apis/articles/articles";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import PageHeader from "@/components/PageHeader/PageHeader";
import ToolRelatedArticle from "@/components/Tools/RelatedArticle/ToolRelatedArticle";
import JsonValidatorHero from "@/components/Tools/JsonValidatorFormatter/Hero/JsonValidatorHero";
import JsonValidatorFormatterTroubleshooting from "@/components/Tools/JsonValidatorFormatter/Troubleshooting/JsonValidatorFormatterTroubleshooting";
import JsonValidatorFormatterGuide from "@/components/Tools/JsonValidatorFormatter/Guide/JsonValidatorFormatterGuide";
import JsonValidatorFormatterCheatSheet from "@/components/Tools/JsonValidatorFormatter/CheatSheet/JsonValidatorFormatterCheatSheet";
import JsonValidatorFormatterUseCases from "@/components/Tools/JsonValidatorFormatter/UseCases/JsonValidatorFormatterUseCases";
import JsonValidatorFormatterBenefits from "@/components/Tools/JsonValidatorFormatter/Benefits/JsonValidatorFormatterBenefits";
import JsonValidatorFormatterComparison from "@/components/Tools/JsonValidatorFormatter/Comparison/JsonValidatorFormatterComparison";
import JsonValidatorFormatterFaqs from "@/components/Tools/JsonValidatorFormatter/Faqs/JsonValidatorFormatterFaqs";
import JsonValidatorFormatterFeatures from "@/components/Tools/JsonValidatorFormatter/Features/JsonValidatorFormatterFeatures";
import JsonValidatorFormatterIntro from "@/components/Tools/JsonValidatorFormatter/Intro/JsonValidatorFormatterIntro";
import JsonRelatedTools from "@/components/Tools/JsonValidatorFormatter/RelatedTools/JsonRelatedTools";
import JsonValidatorFormatterSeo from "@/components/Tools/JsonValidatorFormatter/Seo/JsonValidatorFormatterSeo";
import {
  jsonValidatorFormatterHeaderData,
  jsonValidatorFormatterMetaData,
  jsonConverterRelatedArticleDataByTab,
} from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import { Container, Spacer } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import React from "react";

type Props = {
  article?: ArticleModel;
};

const relatedArticleHeader = jsonConverterRelatedArticleDataByTab.validator;

const JsonValidatorAndFormatterHome: React.FC<Props> = ({ article }) => (
  <>
    <JsonValidatorFormatterSeo />
    <NavBar header={jsonValidatorFormatterHeaderData} />
    <main>
      <Spacer p={4} />

      <Container maxW="6xl">
        <PageHeader
          title={jsonValidatorFormatterMetaData.title}
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: jsonValidatorFormatterMetaData.title },
          ]}
        />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <JsonValidatorHero />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <JsonValidatorFormatterTroubleshooting />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <JsonValidatorFormatterGuide />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <JsonRelatedTools currentToolId="validator" />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <JsonValidatorFormatterIntro />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <JsonValidatorFormatterCheatSheet />
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
        <JsonValidatorFormatterUseCases />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <JsonValidatorFormatterComparison />
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
        <JsonValidatorFormatterFaqs />
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

export default JsonValidatorAndFormatterHome;
