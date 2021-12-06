import { LightMode } from "@chakra-ui/color-mode";
import { Center, Text, VStack, Box } from "@chakra-ui/layout";
import theme from "@chakra-ui/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { fetchAPI } from "../../../lib/api";
import AppFooter from "../../../src/components/AppFooter";
import AppNavBar from "../../../src/components/AppNavBar";
import AppStats from "../../../src/components/AppStats";
import SampleFileFeatured from "../../../src/components/SampleFiles/SampleFileFeatured";
import SampleFileRequest from "../../../src/components/SampleFiles/SampleFileRequest";
import sampleFileStats from "../../../src/data/sampleFileStats";

import SampleFileExtensions from "../../../src/components/SampleFiles/SampleFileExtensions";
import SampleFileVariant from "../../../src/components/SampleFiles/SampleFileVariant";
import SampleFileTagline from "../../../src/components/SampleFiles/SampleFileTagline";
import { NextSeo } from "next-seo";

export default function SampleFilesResultsIndex({ categories, extensions }) {
  const navItems = [
    {
      title: "Home",
      path: "/samplefiles",
    },
    ...categories.map((category) => {
      return {
        title: category.name,
        path: "/samplefiles/category/" + category.slug,
      };
    }),
  ];

  const metaTitle = extensions[0].slug;
  const metaDesc = extensions[0].details;
  const slug = extensions[0].slug;

  return (
    <LightMode>
      <NextSeo
        title={metaTitle.toUpperCase() + " - Sample File"}
        description={metaDesc}
        openGraph={{
          title: metaTitle,
          description: metaDesc,
          url: `https://www.mzeeshan.me/samplefiles/results/${slug}`,
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
      />
      <AppNavBar navItems={navItems} />
      {extensions.map((extension, idx) => {
        return <SampleFileVariant key={idx} extension={extension} />;
      })}
      <SampleFileTagline />
      <AppStats stats={sampleFileStats()} />
      <SampleFileFeatured
        items={categories.map((category) => {
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
            path: "/samplefiles/category/" + category.slug,
          };
        })}
      />
      <VStack p={2} bg={"gray.700"} />
      <SampleFileRequest />
      <AppFooter />
    </LightMode>
  );
}

export async function getStaticPaths() {
  const extensions = await fetchAPI(`/sample-file-extensions?_limit=-1`);

  return {
    paths: extensions.map((extension) => ({
      params: {
        slug: extension.slug.toLowerCase(),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const [categories, extensions] = await Promise.all([
    fetchAPI("/sample-file-types"),
    fetchAPI(`/sample-file-extensions?_where[slug]=${slug.toLowerCase()}`),
  ]);

  return {
    props: { categories, extensions },
    revalidate: 1,
  };
}
