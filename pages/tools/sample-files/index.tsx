import { fetchArticleBySlugStrapi } from "@/apis/articles/articleDetail";
import { ArticleModel } from "@/apis/articles/articles";
import {
  fetchSampleFilesExtensionsStrapi,
  fetchSampleFilesStatsStrapi,
  SampleFilesExtensionModel,
  SampleFilesStatsModel,
} from "@/apis/sampleFiles/sampleFilesExtension";
import {
  fetchSampleFilesChangelogStrapi,
  SampleFilesChangelogEntry,
} from "@/apis/sampleFiles/sampleFilesVariant";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import PageHeader from "@/components/PageHeader/PageHeader";
import ToolRelatedArticle from "@/components/Tools/RelatedArticle/ToolRelatedArticle";
import SampleFilesChangelog from "@/components/Tools/SampleFiles/Changelog/SampleFilesChangelog";
import SampleFilesStats from "@/components/Tools/SampleFiles/Stats/SampleFilesStats";
import SampleFilesFaqs from "@/components/Tools/SampleFiles/Faq/SampleFilesFaqs";
import SampleFilesWhyUse from "@/components/Tools/SampleFiles/WhyUse/SampleFilesWhyUse";
import { sampleFilesHeaderData } from "@/data/tools/sampleFiles/sampleFilesHeaderData";
import { Box, Container, Spacer } from "@chakra-ui/react";
import React from "react";
import dynamic from "next/dynamic";
import SampleFilesHero from "@/components/Tools/SampleFiles/Hero/SampleFilesHero";
import SampleFilesStickyCategoryBar from "@/components/Tools/SampleFiles/Hero/SampleFilesStickyCategoryBar";
import SampleFilesFeatured from "@/components/Tools/SampleFiles/Featured/SampleFilesFeatured";
import SampleFilesExtensions from "@/components/Tools/SampleFiles/Extensions/SampleFilesExtensions";
import SampleFilesFeatures from "@/components/Tools/SampleFiles/Features/SampleFilesFeatures";
import SampleFilesRequestFile from "@/components/Tools/SampleFiles/RequestFile/SampleFilesRequestFile";
import SampleFilesCTA from "@/components/Tools/SampleFiles/CTA/SampleFilesCTA";
import { GetStaticProps } from "next";
import { sampleFilesFAQData } from "@/data/tools/sampleFiles/sampleFilesFaqsData";
import SampleFilesSeo from "@/components/Tools/SampleFiles/Seo/SampleFilesSeo";
import { sampleFilesWorkingData } from "@/data/tools/sampleFiles/sampleFilesWorkingData";
import SampleFilesPopularFormats from "@/components/Tools/SampleFiles/Popular/SampleFilesPopularFormats";
import SampleFilesChartsSkeleton from "@/components/Tools/SampleFiles/Charts/SampleFilesChartsSkeleton";
import { SampleFilesChartsData } from "@/components/Tools/SampleFiles/Charts/SampleFilesCharts";

const SampleFilesCharts = dynamic(
  () => import("@/components/Tools/SampleFiles/Charts/SampleFilesCharts"),
  { ssr: false, loading: () => <SampleFilesChartsSkeleton /> },
);

type Props = {
  article?: ArticleModel;
  extensions: SampleFilesExtensionModel[];
  featuredExtensions?: SampleFilesExtensionModel[];
  stats: SampleFilesStatsModel | null;
  popularExtensions: SampleFilesExtensionModel[] | null;
  chartsData: SampleFilesChartsData | null;
  changelog: SampleFilesChangelogEntry[];
};

const SampleFilesHome: React.FC<Props> = (props: Props) => {
  const header = sampleFilesHeaderData;
  return (
    <>
      <SampleFilesSeo />
      <NavBar header={header} />
      <main>
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

      <Box>
        {/* Category bar is sticky only within this box, so it scrolls away
            once this content ends — the extensions sidebar takes over as the
            next sticky element, matching a sectioned table view. */}
        <Box position="relative">
          <SampleFilesStickyCategoryBar />

          <Spacer p={4} />
          <Container maxW="6xl">
            <SampleFilesStats dynamicStats={props.stats ?? undefined} />
          </Container>

          <Spacer p={4} />
          <Container maxW="6xl">
            <SampleFilesChangelog entries={props.changelog} />
          </Container>

          <Spacer p={4} />
          <Container maxW="6xl">
            <SampleFilesFeatured featured={props.featuredExtensions || []} />
          </Container>

          {props.popularExtensions && props.popularExtensions.length > 0 && (
            <>
              <Spacer p={4} />
              <Container maxW="6xl">
                <SampleFilesPopularFormats extensions={props.popularExtensions} />
              </Container>
            </>
          )}
        </Box>

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

        {props.chartsData && (
          <>
            <Spacer p={8} />
            <Container maxW="6xl">
              <SampleFilesCharts chartsData={props.chartsData} />
            </Container>
          </>
        )}

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
          <SampleFilesWhyUse />
        </Container>

        <Spacer p={8} />
        <Container maxW="6xl">
          <SampleFilesFaqs faqsData={sampleFilesFAQData} />
        </Container>
      </Box>

      <Spacer p={4} />
      </main>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const [allExtensionsResponse, featuredResponse, article, stats, popularResponse, changelog] =
      await Promise.all([
        fetchSampleFilesExtensionsStrapi(undefined, 200, 1, undefined),
        fetchSampleFilesExtensionsStrapi(
          undefined, 8, 1, undefined, true, undefined, true,
        ),
        fetchArticleBySlugStrapi(
          "download-sample-files-for-testing-development",
        ),
        fetchSampleFilesStatsStrapi().catch(() => null),
        fetchSampleFilesExtensionsStrapi(
          undefined, 6, 1, undefined, undefined,
          { field: "downloads", order: "desc" }
        ).catch(() => null),
        fetchSampleFilesChangelogStrapi().catch(() => []),
      ]);

    const allExtensions = allExtensionsResponse.data ?? [];
    const popularExts = popularResponse?.data ?? [];

    // Bar chart: top extensions by downloads
    const topExtensions = popularExts
      .filter((ext) => (ext.downloads ?? 0) > 0)
      .map((ext) => ({ name: ext.name, downloads: ext.downloads! }));

    // Donut chart: count of extensions per category
    const categoryMap = new Map<string, number>();
    for (const ext of allExtensions) {
      if (!ext.type) continue;
      categoryMap.set(ext.type.name, (categoryMap.get(ext.type.name) ?? 0) + 1);
    }
    const byCategory = Array.from(categoryMap.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    const chartsData = byCategory.length > 0 ? { topExtensions, byCategory } : null;

    return {
      props: {
        article,
        extensions: allExtensions,
        featuredExtensions: featuredResponse.data || [],
        stats: stats ?? null,
        popularExtensions: popularResponse?.data ?? null,
        chartsData,
        changelog,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Failed to fetch extensions in getStaticProps:", error);
    return {
      props: {
        extensions: [],
        featuredExtensions: [],
        stats: null,
        popularExtensions: null,
        chartsData: null,
        changelog: [],
      },
      revalidate: 60,
    };
  }
};

export default SampleFilesHome;
