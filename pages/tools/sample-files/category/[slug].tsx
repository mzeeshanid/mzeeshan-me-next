import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import PageHeader from "@/components/PageHeader/PageHeader";
import SampleFilesExtensions from "@/components/Tools/SampleFiles/Extensions/SampleFilesExtensions";
import { sampleFilesHeaderData } from "@/data/tools/sampleFiles/sampleFilesHeaderData";
import { Box, Container, Spacer } from "@chakra-ui/react";
import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  fetchSampleFilesExtensionsStrapi,
  SampleFilesExtensionModel,
} from "@/apis/sampleFiles/sampleFilesExtension";
import {
  fetchSampleFilesCategoriesStrapi,
  SampleFilesCategoryModel,
} from "@/apis/sampleFiles/sampleFilesCategories";
import SampleFilesCategories from "@/components/Tools/SampleFiles/Categories/SampleFilesCategories";
import SampleFilesStats from "@/components/Tools/SampleFiles/Stats/SampleFilesStats";
import SampleFilesCTA from "@/components/Tools/SampleFiles/CTA/SampleFilesCTA";
import SampleFilesFeatures from "@/components/Tools/SampleFiles/Features/SampleFilesFeatures";
import SampleFilesRequestFile from "@/components/Tools/SampleFiles/RequestFile/SampleFilesRequestFile";
import SampleFilesFaqs from "@/components/Tools/SampleFiles/Faq/SampleFilesFaqs";
import SampleFilesHero from "@/components/Tools/SampleFiles/Hero/SampleFilesHero";
import { sampleFilesFAQData } from "@/data/tools/sampleFiles/sampleFilesFaqsData";
import SampleFilesCategorySeo from "@/components/Tools/SampleFiles/Categories/SampleFilesCategorySeo";

type Props = {
  category: SampleFilesCategoryModel;
  extensions: SampleFilesExtensionModel[];
  allExtensions: SampleFilesExtensionModel[];
};

const SampleFilesCategoryPage: React.FC<Props> = (props: Props) => {
  const header = sampleFilesHeaderData;

  return (
    <>
      <SampleFilesCategorySeo category={props.category} extensions={props.extensions} />
      <NavBar header={header} />
      <main>
      <Spacer p={4} />

      <Container maxW="6xl">
        <PageHeader
          title={props.category.name}
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Sample Files", href: "/tools/sample-files" },
            { label: props.category.name },
          ]}
        />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <Box data-sample-files-hero>
          <SampleFilesHero extensions={props.allExtensions} />
        </Box>
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <SampleFilesExtensions
          extensions={props.extensions}
          headerProps={{
            badge: "Extensions",
            title: `${props.category.name} Extensions`,
            detail: `Browse all available ${props.category.name.toLowerCase()} extensions.`,
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

      <Spacer p={8} />
      <Container maxW="6xl">
        <SampleFilesFaqs faqsData={sampleFilesFAQData} />
      </Container>

      <Spacer p={4} />
      </main>
      <Footer />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response = await fetchSampleFilesCategoriesStrapi();
    const categories = response.data || [];

    return {
      paths: categories.map((category) => ({
        params: {
          slug: category.slug,
        },
      })),
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Failed to fetch categories for paths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { params } = context;
  const slug = params?.slug as string;

  try {
    // Fetch all categories
    const categoriesResponse = await fetchSampleFilesCategoriesStrapi();
    const categories = categoriesResponse.data || [];

    // Find the category by slug
    const category = categories.find((cat) => cat.slug === slug);

    if (!category) {
      return {
        notFound: true,
        revalidate: 60,
      };
    }

    const [extensionsResponse, allExtensionsResponse] = await Promise.all([
      fetchSampleFilesExtensionsStrapi(undefined, 200, 1, slug),
      fetchSampleFilesExtensionsStrapi(undefined, 200, 1),
    ]);

    return {
      props: {
        category,
        extensions: extensionsResponse.data || [],
        allExtensions: allExtensionsResponse.data || [],
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Failed to fetch category data:", error);
    return {
      revalidate: 60,
      notFound: true,
    };
  }
};

export default SampleFilesCategoryPage;
