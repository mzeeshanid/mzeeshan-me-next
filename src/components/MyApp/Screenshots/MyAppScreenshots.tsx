import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { Box, Spacer } from "@chakra-ui/react";
import React from "react";
import MyAppScreenshotCarousel from "./MyAppScreenshotCarousel";
import { MyAppScreenshotsDataModel } from "@/data/myApps/myAppScreenshotsData";

type Props = {
  screenshotsData: MyAppScreenshotsDataModel;
};

const MyAppScreenshots: React.FC<Props> = (props: Props) => {
  const { screenshotsData } = props;
  return (
    <Box as="section">
      <SectionHeader
        tagline={screenshotsData.header.badge}
        headline={screenshotsData.header.title}
        description={screenshotsData.header.description}
      />
      <Spacer p={4} />
      <MyAppScreenshotCarousel screenshots={screenshotsData.screenshots} />
    </Box>
  );
};

export default MyAppScreenshots;
