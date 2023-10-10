import { fetchAPI } from "../../lib/api";
import { theme, Box } from "@chakra-ui/react";
import { LightMode } from "@chakra-ui/color-mode";
import { VStack } from "@chakra-ui/layout";
import React from "react";
import AppFooter from "../../src/components/AppFooter";
import AppNavBar from "../../src/components/AppNavBar";
import AppStats from "../../src/components/AppStats";
import SampleFileFeatured from "../../src/components/SampleFiles/SampleFileFeatured";
import SampleFileRequest from "../../src/components/SampleFiles/SampleFileRequest";
import SampleFilesHero from "../../src/components/SampleFiles/SampleFilesHero";
import sampleFileStats from "../../src/data/sampleFileStats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SampleFileTagline from "../../src/components/SampleFiles/SampleFileTagline";
import AppHeadingText from "../../src/components/AppHeadingText";
import { FAQPageJsonLd, NextSeo } from "next-seo";
import AppFaqs from "../../src/components/PersonalAppsTemplate/AppFaqs";

export default function index({ categories }) {
  const navItems = [
    {
      title: "Home",
      path: "samplefiles",
    },
    ...categories.map((item) => {
      const category = item.attributes;
      return {
        title: category.name,
        path: "samplefiles/category/" + category.slug,
      };
    }),
  ];

  const metaTitle = "Ultimate Resource for Sample Files";
  const metaDesc =
    "A web app, that allow developers and testers to download free sample files, having more than 55 differet types.";

  const faqs = [
    {
      question: "What is Sample Files?",
      answer:
        "Its a web app, that allow developers and testers to download free sample files for testing purpose.",
    },
    {
      question: "How many file types are there?",
      answer: "Currently we have more than 55 different file types.",
    },
    {
      question: "Can we download file in different sizes?",
      answer:
        "Yes, we have multiple variants available for each file type based on size.",
    },
    {
      question: "What if required file type is not available?",
      answer:
        "You can send a request for required file type by typing extension in the field above.",
    },
  ];

  return (
    <LightMode>
      <NextSeo
        title={metaTitle + " - Free download"}
        description={metaDesc}
        openGraph={{
          title: metaTitle,
          description: metaDesc,
          url: "https://www.mzeeshan.me/samplefiles",
          images: [
            {
              url: "https://www.mzeeshan.me/assets/mzfilemanage_appicon.png",
              width: 400,
              height: 400,
              alt: "Sample Files Web App Icon",
              type: "image/png",
            },
          ],
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            property: "keywords",
            content:
              "free download sample files, free download example files, testing files free download, free download mp4, mp4 files for testing, testing file mp3 free download",
          },
        ]}
      />
      <FAQPageJsonLd
        mainEntity={faqs.map((faq) => {
          return {
            questionName: faq.question,
            acceptedAnswerText: faq.answer,
          };
        })}
      />
      <AppNavBar navItems={navItems} />
      <SampleFilesHero />
      <Box p={4} bg={theme.colors.gray[50]}>
        <AppHeadingText
          heading={metaTitle}
          text={metaDesc}
          headingColor={theme.colors.black}
          bg={theme.colors.gray[50]}
        />
      </Box>
      <SampleFileTagline />
      <AppStats stats={sampleFileStats()} />
      <SampleFileFeatured
        items={categories.map((item) => {
          const category = item.attributes;
          return {
            title: category.name,
            detail: category.info,
            icon: (
              <FontAwesomeIcon
                size="4x"
                color={theme.colors.gray[700]}
                icon={category.icon}
              />
            ),
            path: "samplefiles/category/" + category.slug,
          };
        })}
      />
      <VStack p={2} bg={"gray.700"} />
      <SampleFileRequest />
      <AppFaqs faqs={faqs} />
      <AppFooter />
    </LightMode>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const { data: categories } = await fetchAPI(
    "/sample-file-types?pagination[limit]=-1"
  );

  return {
    props: { categories },
    revalidate: 1,
  };
}
