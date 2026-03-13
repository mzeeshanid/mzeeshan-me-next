import { useColorPalette } from "@/contexts/useColorPalette";
import { driveDirectData } from "@/data/tools/driveDirect/driveDirectData";
import {
  Box,
  GridItem,
  Heading,
  SimpleGrid,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import DriveDirectFeatureItem from "./DriveDirectFeatureItem";

type Props = {};

const DriveDirectFeatures: React.FC<Props> = (props: Props) => {
  const { palette } = useColorPalette();
  const { features } = driveDirectData();

  return (
    <Box as="section">
      <SimpleGrid gap={8} minChildWidth={"xs"} alignItems={"center"}>
        <GridItem colSpan={{ base: 2, lg: 1 }}>
          <VStack align={"flex-start"} gap={4}>
            <Tag.Root
              variant={"surface"}
              colorPalette={palette}
              size={{ base: "lg", md: "xl" }}
            >
              <Tag.Label>{features.header.badge}</Tag.Label>
            </Tag.Root>
            <Heading
              as="h3"
              fontWeight={"bold"}
              fontSize={{ base: "2xl", md: "4xl" }}
              lineHeight={"normal"}
            >
              {features.header.title}
            </Heading>
            <Text color={"fg.muted"}>{features.header.desc}</Text>
          </VStack>
        </GridItem>
        <GridItem colSpan={2}>
          <SimpleGrid minChildWidth={"xs"} gap={{ base: 4, md: 8 }}>
            {features.features.map((feature, idx) => (
              <GridItem key={idx}>
                <DriveDirectFeatureItem key={idx} feature={feature} />
              </GridItem>
            ))}
          </SimpleGrid>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default DriveDirectFeatures;
