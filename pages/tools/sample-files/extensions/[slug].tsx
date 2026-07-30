import {
  fetchSampleFilesExtensionDetailsStrapi,
  SampleFilesExtensionDetailModel,
} from "@/apis/sampleFiles/sampleFilesExtensionDetails";
import {
  fetchSampleFilesExtensionsStrapi,
  SampleFilesExtensionModel,
} from "@/apis/sampleFiles/sampleFilesExtension";
import {
  fetchSampleFilesChangelogStrapi,
  SampleFilesChangelogEntry,
} from "@/apis/sampleFiles/sampleFilesVariant";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import PageHeader from "@/components/PageHeader/PageHeader";
import SampleFilesChangelog from "@/components/Tools/SampleFiles/Changelog/SampleFilesChangelog";
import ExtensionBenefitsUsage from "@/components/Tools/SampleFiles/Details/ExtensionBenefitsUsage";
import ExtensionCompatibility from "@/components/Tools/SampleFiles/Details/ExtensionCompatibility";
import ExtensionFact from "@/components/Tools/SampleFiles/Details/ExtensionFact";
import ExtensionGeneralInfo from "@/components/Tools/SampleFiles/Details/ExtensionGeneralInfo";
import ExtensionHistory from "@/components/Tools/SampleFiles/Details/ExtensionHistory";
import ExtensionSeo from "@/components/Tools/SampleFiles/Details/ExtensionSeo";
import ExtensionTestCoverage from "@/components/Tools/SampleFiles/Details/ExtensionTestCoverage";
import ExtensionTechnicalDetails from "@/components/Tools/SampleFiles/Details/ExtensionTechnicalDetails";
import ExtensionUseCases from "@/components/Tools/SampleFiles/Details/ExtensionUseCases";
import ExtensionVariants from "@/components/Tools/SampleFiles/Details/ExtensionVariants";
import RelatedExtensions from "@/components/Tools/SampleFiles/Details/RelatedExtensions";
import SampleFilesFaqs from "@/components/Tools/SampleFiles/Faq/SampleFilesFaqs";
import SampleFilesHero from "@/components/Tools/SampleFiles/Hero/SampleFilesHero";
import SampleFilesStickyCategoryBar from "@/components/Tools/SampleFiles/Hero/SampleFilesStickyCategoryBar";
import { sampleFilesHeaderData } from "@/data/tools/sampleFiles/sampleFilesHeaderData";
import { Box, Container, Spacer } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

interface Props {
  extension: SampleFilesExtensionDetailModel;
  allExtensions: SampleFilesExtensionModel[];
  changelog: SampleFilesChangelogEntry[];
}

const ExtensionDetailHome: React.FC<Props> = ({
  extension,
  allExtensions,
  changelog,
}) => {
  const header = sampleFilesHeaderData;
  const { sections } = extension.details || {};
  const hasTestCoverage = (extension.variants || []).some((v) => v.section);

  return (
    <>
      <ExtensionSeo extension={extension} />
      <NavBar header={header} />
      <main>
      <Spacer p={4} />
      <Container maxW="6xl">
        <PageHeader
          title="Sample Files"
          currentHref={`/tools/sample-files/extensions/${extension.slug}`}
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Sample Files", href: "/tools/sample-files" },
            { label: extension.name },
          ]}
        />
      </Container>
      <Spacer p={4} />
      <Container maxW="6xl">
        <Box data-sample-files-hero>
          <SampleFilesHero initialValue={extension.name} extensions={allExtensions} />
        </Box>
      </Container>
      <Box>
        {/* Category bar is sticky only within this box, so it scrolls away
            once the changelog ends — the variants sidebar takes over as the
            next sticky element, matching a sectioned table view. */}
        <Box position="relative">
          <SampleFilesStickyCategoryBar />
          <Container maxW="6xl">
            <Spacer p={4} />
            <SampleFilesChangelog entries={changelog} />
          </Container>
        </Box>
        {/* Extension Details Section */}
        <Container maxW="6xl">
          <Spacer p={4} />
          <ExtensionVariants extension={extension} />
        </Container>
        {/* What Is Section */}
        {sections?.whatIs && (
          <Container maxW="6xl">
            <Spacer p={8} />
            <ExtensionGeneralInfo data={sections.whatIs} />
          </Container>
        )}
        {/* Fact / Observations Section */}
        {sections?.fact && (
          <Container maxW="6xl">
            <Spacer p={8} />
            <ExtensionFact data={sections.fact} />
          </Container>
        )}
        {/* History Section */}
        {sections?.history && (
          <Container maxW="6xl">
            <Spacer p={8} />
            <ExtensionHistory data={sections.history} />
          </Container>
        )}
        {/* What Is Section */}
        {sections?.whatIs && (
          <Container maxW="6xl">
            <Spacer p={4} />
            <ExtensionBenefitsUsage
              benefits={sections.benefits}
              usage={sections.howToUse}
            />
          </Container>
        )}
        {/* Use Cases Section */}
        {sections?.useCases && (
          <Container maxW="6xl">
            <Spacer p={4} />
            <ExtensionUseCases data={sections.useCases} />
          </Container>
        )}
        {/* Test Coverage Section */}
        {hasTestCoverage && (
          <Container maxW="6xl">
            <Spacer p={4} />
            <ExtensionTestCoverage extension={extension} />
          </Container>
        )}
        {/* Compatibility Section */}
        {sections?.compatibility && (
          <Container maxW="6xl">
            <Spacer p={8} />
            <ExtensionCompatibility data={sections.compatibility} />
          </Container>
        )}
        {/* Technical Details Section */}
        {sections?.technicalDetails && (
          <Container maxW="6xl">
            <Spacer p={8} />
            <ExtensionTechnicalDetails data={sections.technicalDetails} />
          </Container>
        )}
        {/* Related Extensions Section */}
        {sections?.relatedExtensions && (
          <Container maxW="6xl">
            <Spacer p={4} />
            <RelatedExtensions
              data={sections.relatedExtensions}
              allExtensions={allExtensions}
            />
          </Container>
        )}
        {/* FAQ Section */}
        {sections?.faq && (
          <Container maxW="6xl">
            <Spacer p={8} />
            <SampleFilesFaqs
              faqsData={{
                badge: "FAQs",
                title: sections.faq.title || "Got Questions?",
                subtitle: "Get answers to common questions",
                faqs: sections.faq.categories.flatMap((category) => category.items),
                groups: sections.faq.categories.map((category) => ({
                  title: category.title,
                  faqs: category.items,
                })),
              }}
            />
          </Container>
        )}
        <Spacer p={8} />
      </Box>
      </main>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const slug = context.params?.slug as string | undefined;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  try {
    const [extension, allExtensionsResponse, changelog] = await Promise.all([
      fetchSampleFilesExtensionDetailsStrapi(slug),
      fetchSampleFilesExtensionsStrapi(
        undefined, 200, 1, undefined, undefined, undefined, true,
      ),
      fetchSampleFilesChangelogStrapi(undefined, 5, slug).catch(() => []),
    ]);

    return {
      props: {
        extension,
        allExtensions: allExtensionsResponse.data || [],
        changelog,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Failed to fetch extension details:", error);
    return {
      notFound: true,
      revalidate: 60,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const extensionsResponse = await fetchSampleFilesExtensionsStrapi(
      undefined,
      200,
      1,
    );

    return {
      paths: (extensionsResponse.data || []).map((extension) => ({
        params: { slug: extension.slug },
      })),
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Failed to fetch extension paths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export default ExtensionDetailHome;
