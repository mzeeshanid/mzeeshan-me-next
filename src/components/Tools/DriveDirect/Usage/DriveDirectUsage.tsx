import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { driveDirectData } from "@/data/tools/driveDirect/driveDirectData";
import { Box, GridItem, SimpleGrid, Spacer } from "@chakra-ui/react";
import React from "react";
import DriveDirectUsageItem from "./DriveDirectUsageItem";

type Props = {};

const DriveDirectUsage: React.FC<Props> = (props: Props) => {
  const { usage } = driveDirectData();
  return (
    <Box as="section">
      <SectionHeader
        tagline={usage.header.badge}
        headline={usage.header.title}
        description={usage.header.desc}
      />
      <Spacer p={4} />
      <SimpleGrid minChildWidth={"xs"} gap={6}>
        {usage.usages.map((item, index) => (
          <GridItem key={index}>
            <DriveDirectUsageItem item={item} />
          </GridItem>
        ))}
      </SimpleGrid>
      <Spacer p={2} />
    </Box>
  );
};

export default DriveDirectUsage;
