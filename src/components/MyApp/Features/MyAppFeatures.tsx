import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { MyAppFeaturesDataModel } from "@/data/myApps/myAppFeaturesData";
import { Box, Center, GridItem, SimpleGrid, Spacer } from "@chakra-ui/react";
import React from "react";
import MyAppFeatureItem from "./MyAppFeatureItem";

type Props = {
  featuresData: MyAppFeaturesDataModel;
};

const MyAppFeatures: React.FC<Props> = (props: Props) => {
  const { featuresData } = props;
  return (
    <Box as="section">
      <Center textAlign={"center"}>
        <SectionHeader
          tagline={featuresData.header.badge}
          headline={featuresData.header.title}
          description={featuresData.header.detail}
        />
      </Center>
      <Spacer p={4} />
      <SimpleGrid minChildWidth={"sm"} gap={{ base: 4, md: 8 }}>
        {featuresData.features.map((feature, idx) => (
          <GridItem key={idx}>
            <MyAppFeatureItem key={idx} featureItem={feature} />
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default MyAppFeatures;
