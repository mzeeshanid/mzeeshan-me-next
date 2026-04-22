import { fetchArticleBySlugStrapi } from "@/apis/articles/articleDetail";
import { ArticleModel } from "@/apis/articles/articles";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import PageHeader from "@/components/PageHeader/PageHeader";
import ToolRelatedArticle from "@/components/Tools/RelatedArticle/ToolRelatedArticle";
import SampleFilesStats from "@/components/Tools/SampleFiles/Stats/SampleFilesStats";
import SampleFilesFaqs from "@/components/Tools/SampleFiles/Faq/SampleFilesFaqs";
import { sampleFilesHeaderData } from "@/data/tools/sampleFiles/sampleFilesHeaderData";
import { Box, Container, Spacer } from "@chakra-ui/react";
import React from "react";
import SampleFilesHero from "@/components/Tools/SampleFiles/Hero/SampleFilesHero";
import SampleFilesFeatured from "@/components/Tools/SampleFiles/Featured/SampleFilesFeatured";
import SampleFilesExtensions from "@/components/Tools/SampleFiles/Extensions/SampleFilesExtensions";
import SampleFilesFeatures from "@/components/Tools/SampleFiles/Features/SampleFilesFeatures";
import SampleFilesRequestFile from "@/components/Tools/SampleFiles/RequestFile/SampleFilesRequestFile";
import SampleFilesCTA from "@/components/Tools/SampleFiles/CTA/SampleFilesCTA";
import { GetStaticProps } from "next";
import {
  fetchSampleFilesExtensionsStrapi,
  SampleFilesExtensionModel,
} from "@/apis/sampleFiles/sampleFilesExtension";
import SampleFilesCategories from "@/components/Tools/SampleFiles/Categories/SampleFilesCategories";
import { sampleFilesFAQData } from "@/data/tools/sampleFiles/sampleFilesFaqsData";
import SampleFilesSeo from "@/components/Tools/SampleFiles/Seo/SampleFilesSeo";
import { sampleFilesWorkingData } from "@/data/tools/sampleFiles/sampleFilesWorkingData";

type Props = {
  article?: ArticleModel;
  extensions: SampleFilesExtensionModel[];
  featuredExtensions?: SampleFilesExtensionModel[];
};

const SampleFilesHome: React.FC<Props> = (props: Props) => {
  const header = sampleFilesHeaderData;
  return (
    <>
      <SampleFilesSeo />
      <NavBar header={header} />
      <Spacer p={4} />

      <Container maxW="6xl">
        <PageHeader
          title="Sample Files"
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Sample Files" },
          ]}
        />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <Box data-sample-files-hero>
          <SampleFilesHero extensions={props.extensions} />
        </Box>
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <SampleFilesFeatured featured={props.featuredExtensions || []} />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <SampleFilesExtensions
          extensions={props.extensions}
          grouped
          headerProps={{
            badge: "Extensions",
            title: "All Extensions",
            detail: "Browse all available extensions for different file types.",
          }}
        />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <SampleFilesCategories />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <SampleFilesStats />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <SampleFilesCTA />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <SampleFilesFeatures />
      </Container>

      <Spacer p={8} />
      <Container maxW="6xl">
        <SampleFilesRequestFile />
      </Container>

      {props.article && (
        <Box>
          <Spacer p={8} />
          <Container maxW="6xl">
            <ToolRelatedArticle
              article={props.article}
              header={sampleFilesWorkingData.header}
            />
          </Container>
        </Box>
      )}

      <Spacer p={8} />
      <Container maxW="6xl">
        <SampleFilesFaqs faqsData={sampleFilesFAQData} />
      </Container>

      <Spacer p={4} />
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const [allExtensionsResponse, featuredResponse, article] =
      await Promise.all([
        fetchSampleFilesExtensionsStrapi(undefined, 200, 1, undefined),
        fetchSampleFilesExtensionsStrapi(undefined, 8, 1, undefined, true),
        fetchArticleBySlugStrapi(
          "download-sample-files-for-testing-development",
        ),
      ]);
    return {
      props: {
        article,
        extensions: allExtensionsResponse.data || [],
        featuredExtensions: featuredResponse.data || [],
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Failed to fetch extensions in getStaticProps:", error);
    return {
      props: {
        extensions: [],
        featuredExtensions: [],
      },
      revalidate: 60,
    };
  }
};

export default SampleFilesHome;
