import myAppsData from "@/data/home/myAppsData";
import { Box, Center, SimpleGrid, Spacer } from "@chakra-ui/react";
import React from "react";
import MyAppsListingItem from "./MyAppsListingItem";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";

type Props = {};

const MyAppsListing: React.FC<Props> = (props) => {
  const myApps = myAppsData();
  return (
    <Box as={"section"}>
      <Center textAlign={"center"}>
        <SectionHeader
          tagline={"My Apps"}
          headline={"My Published Apps"}
          description={
            "Here are some of the apps that I have developed and published. These apps showcase my skills in development, user interface design, and user experience optimization."
          }
        />
      </Center>
      <Spacer p={4} />
      <SimpleGrid minChildWidth={"xs"} gap={6}>
        {myApps.apps.map((app, index) => (
          <MyAppsListingItem key={index} app={app} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default MyAppsListing;
