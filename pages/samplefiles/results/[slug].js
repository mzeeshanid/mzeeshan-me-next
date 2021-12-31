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
    ...categories.map((item) => {
      const category = item.attributes;
      return {
        title: category.name,
        path: "/samplefiles/category/" + category.slug,
      };
    }),
  ];

  const metaTitle = extensions[0].attributes.slug;
  const metaDesc = extensions[0].attributes.details;
  const slug = extensions[0].attributes.slug;

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
  const { data: extensions } = await fetchAPI(
    `/sample-file-extensions?pagination[limit]=-1`
  );

  return {
    paths: extensions.map((extension) => ({
      params: {
        slug: extension.attributes.slug.toLowerCase(),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const [{ data: categories }, { data: extension }] = await Promise.all([
    fetchAPI("/sample-file-types?pagination[limit]=-1"),
    fetchAPI(`/sample-file-extensions/${slug.toLowerCase()}`),
  ]);

  const extensions = extension === undefined ? [] : [extension];
  return {
    props: { categories, extensions },
    revalidate: 1,
  };
}
