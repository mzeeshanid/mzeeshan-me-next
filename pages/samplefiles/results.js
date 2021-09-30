import { VStack } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React from "react";
import AppFooter from "../../src/components/AppFooter";
import AppNavBar from "../../src/components/AppNavBar";
import AppStats from "../../src/components/AppStats";
import SampleFileFeatured from "../../src/components/SampleFiles/SampleFileFeatured";
import SampleFileRequest from "../../src/components/SampleFiles/SampleFileRequest";
import SampleFileResults from "../../src/components/SampleFiles/SampleFileResults";
import sampleFilesCategories from "../../src/data/sampleFilesCategories";
import sampleFileStats from "../../src/data/sampleFileStats";

function results() {
  const router = useRouter();

  const { isReady, query } = router;

  const { categoryId, extension } = query;

  const navItems = [
    {
      title: "Home",
      path: "/samplefiles",
    },
    ...sampleFilesCategories().map((category) => {
      return { title: category.name, path: category.path };
    }),
  ];

  if (!isReady) return <></>;

  return (
    <>
      <AppNavBar navItems={navItems} />
      <SampleFileResults categoryId={categoryId} extension={extension} />
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
    </>
  );
}

export default results;
