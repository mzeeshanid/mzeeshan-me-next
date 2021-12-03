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

export default function index({ categories }) {
  const navItems = [
    {
      title: "Home",
      path: "samplefiles",
    },
    ...categories.map((category) => {
      return {
        title: category.name,
        path: "samplefiles/category/" + category.slug,
      };
    }),
  ];
  return (
    <LightMode>
      <AppNavBar navItems={navItems} />
      <SampleFilesHero />
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
            path: "samplefiles/category/" + category.slug,
          };
        })}
      />
      <VStack p={2} bg={"gray.700"} />
      <SampleFileRequest />
      <AppFooter />
    </LightMode>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const categories = await fetchAPI("/sample-file-types");

  return {
    props: { categories },
    revalidate: 1,
  };
}
