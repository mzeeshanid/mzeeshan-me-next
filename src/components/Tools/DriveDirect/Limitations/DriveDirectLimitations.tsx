import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { driveDirectData } from "@/data/tools/driveDirect/driveDirectData";
import { Box, GridItem, SimpleGrid, Spacer } from "@chakra-ui/react";
import React from "react";
import DriveDirectLimitationItem from "./DriveDirectLimitationItem";

type Props = {};

const DriveDirectLimitations: React.FC<Props> = (props: Props) => {
  const { limitation } = driveDirectData();
  return (
    <Box as="section">
      <SectionHeader
        tagline={limitation.header.badge}
        headline={limitation.header.title}
        description={limitation.header.desc}
      />
      <Spacer p={4} />
      <SimpleGrid minChildWidth={"xs"} gap={6}>
        {limitation.limitations.map((item, idx) => (
          <GridItem key={idx}>
            <DriveDirectLimitationItem key={idx} item={item} />
          </GridItem>
        ))}
      </SimpleGrid>
      <Spacer p={2} />
    </Box>
  );
};

export default DriveDirectLimitations;
