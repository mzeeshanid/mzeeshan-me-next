import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { aspectRatioCommon } from "@/data/tools/aspectRatio/aspectRatioCommon";
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import AspectRatioCommonItem from "./AspectRatioCommonItem";

type Props = {};

const AspectRatioCommon: React.FC<Props> = (props: Props) => {
  const ratioData = aspectRatioCommon;
  return (
    <Box as="section">
      <Center>
        <SectionHeader
          textAlign={"center"}
          headline={ratioData.header.title}
          description={ratioData.header.desc}
          tagline={ratioData.header.badge}
        />
      </Center>
      <Spacer p={4} />
      <SimpleGrid minChildWidth={"xs"} gap={4}>
        {ratioData.items.map((item, idx) => (
          <GridItem key={idx}>
            <AspectRatioCommonItem item={item} />
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AspectRatioCommon;
