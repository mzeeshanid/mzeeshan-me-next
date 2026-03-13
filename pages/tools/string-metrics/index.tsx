import { fetchArticleBySlugNextJs } from "@/apis/articles/articleDetail";
import { ArticleModel } from "@/apis/articles/articles";
import React from "react";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import PageHeader from "@/components/PageHeader/PageHeader";
import StringMetricsAlgorithms from "@/components/Tools/StringMetrics/Algorithms/StringMetricsAlgorithms";
import StringMetricsComplexity from "@/components/Tools/StringMetrics/Complexity/StringMetricsComplexity";
import StringMetricsFaqs from "@/components/Tools/StringMetrics/Faqs/StringMetricsFaqs";
import StringMetricsFeatures from "@/components/Tools/StringMetrics/Features/StringMetricsFeatures";
import StringMetricsHero from "@/components/Tools/StringMetrics/Hero/StringMetricsHero";
import StringMetricsSeo from "@/components/Tools/StringMetrics/Seo/StringMetricsSeo";
import StringMetricsStats from "@/components/Tools/StringMetrics/Stats/StringMetricsStats";
import StringMetricsUses from "@/components/Tools/StringMetrics/Uses/StringMetricsUses";
import StringMetricsWorking from "@/components/Tools/StringMetrics/Working/StringMetricsWorking";
import { stringMetricsHeaderData } from "@/data/tools/stringMetrics/stringMetricsFeatures";
import { Box, Container, Spacer } from "@chakra-ui/react";
import { GetStaticProps } from "next";

type Props = {
  article?: ArticleModel;
};

const StringMetricsHome: React.FC<Props> = (props: Props) => {
  const { title, subtitle, icon, alt } = stringMetricsHeaderData;

  return (
    <>
      <StringMetricsSeo />
      <NavBar
        header={{
          title,
          subtitle,
          icon,
          alt,
          rounded: false,
        }}
      />
      <Spacer p={4} />

      <Container maxW="6xl">
        <PageHeader
          title="String Metrics Calculator"
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "String Metrics" },
          ]}
        />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <StringMetricsHero />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <StringMetricsFeatures />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <StringMetricsAlgorithms />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <StringMetricsComplexity />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <StringMetricsStats />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <StringMetricsUses />
      </Container>

      {props.article && (
        <Box>
          <Spacer p={8} />
          <Container maxW="6xl">
            <StringMetricsWorking article={props.article} />
          </Container>
        </Box>
      )}

      <Spacer p={8} />
      <Container maxW="6xl">
        <StringMetricsFaqs />
      </Container>

      <Spacer p={8} />
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const article = await fetchArticleBySlugNextJs(
      "string-metrics-string-similarity-calculator",
    );
    return {
      props: {
        article,
      },
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

export default StringMetricsHome;
