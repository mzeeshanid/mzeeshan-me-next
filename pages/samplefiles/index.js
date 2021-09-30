import { theme } from "@chakra-ui/react";
import { LightMode } from "@chakra-ui/color-mode";
import { VStack } from "@chakra-ui/layout";
import React from "react";
import AppFooter from "../../src/components/AppFooter";
import AppHeadingText from "../../src/components/AppHeadingText";
import AppNavBar from "../../src/components/AppNavBar";
import AppStats from "../../src/components/AppStats";
import SampleFileFeatured from "../../src/components/SampleFiles/SampleFileFeatured";
import SampleFileRequest from "../../src/components/SampleFiles/SampleFileRequest";
import SampleFilesHero from "../../src/components/SampleFiles/SampleFilesHero";
import sampleFilesCategories from "../../src/data/sampleFilesCategories";
import sampleFileStats from "../../src/data/sampleFileStats";

function index() {
  const navItems = [
    {
      title: "Home",
      path: "/samplefiles",
    },
    ...sampleFilesCategories().map((category) => {
      return { title: category.name, path: category.path };
    }),
  ];
  return (
    <LightMode>
      <AppNavBar navItems={navItems} />
      <SampleFilesHero />
      <VStack p={4}>
        <AppHeadingText
          headingColor={theme.colors.black}
          heading={"Trusted by developers from all over the world"}
          text={
            "Free, safe and easy way to download sample files for testing and other purposes."
          }
          bg={"white"}
        />
      </VStack>
      <AppStats stats={sampleFileStats()} />
      <SampleFileFeatured
        items={sampleFilesCategories().map((item) => {
          return {
            title: item.name,
            detail: item.detail,
            icon: item.icon,
            path: item.path,
          };
        })}
      />
      <VStack p={2} bg={"gray.700"} />
      <SampleFileRequest />
      <AppFooter />
    </LightMode>
  );
}

export default index;
