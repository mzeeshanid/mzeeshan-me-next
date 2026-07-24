import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { driveDirectData } from "@/data/tools/driveDirect/driveDirectData";
import { Box, GridItem, SimpleGrid, Spacer } from "@chakra-ui/react";
import React from "react";
import DriveDirectUseCaseItem from "./DriveDirectUseCaseItem";

type Props = {};

const DriveDirectUseCases: React.FC<Props> = (props: Props) => {
  const { useCases } = driveDirectData();
  return (
    <Box as="section">
      <SectionHeader
        tagline={useCases.header.badge}
        headline={useCases.header.title}
        description={useCases.header.desc}
      />
      <Spacer p={4} />
      <SimpleGrid minChildWidth={"xs"} gap={6}>
        {useCases.useCases.map((item, idx) => (
          <GridItem key={idx}>
            <DriveDirectUseCaseItem key={idx} item={item} />
          </GridItem>
        ))}
      </SimpleGrid>
      <Spacer p={2} />
    </Box>
  );
};

export default DriveDirectUseCases;
