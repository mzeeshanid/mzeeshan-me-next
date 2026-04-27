import { SampleFilesExtensionModel } from "@/apis/sampleFiles/sampleFilesExtension";
import React from "react";
import { Box, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import SampleFilesSearchBar from "./SampleFilesSearchBar";
import SampleFilesCategoryTags from "./SampleFilesCategoryTags";

type Props = {
  initialValue?: string;
  extensions?: SampleFilesExtensionModel[];
};

const SampleFilesHero: React.FC<Props> = ({ initialValue = "", extensions }) => {
  return (
    <Box as="section">
      <VStack gap={8} alignItems="center">
        <VStack gap={3} textAlign="center">
          <Heading as="h1" size={{ base: "3xl", md: "5xl" }}>
            {initialValue
              ? `Free ${initialValue} Sample Files`
              : "Find & Download Sample Files"}
          </Heading>
          <Text fontSize="lg" color="fg.muted">
            {initialValue
              ? `Download free ${initialValue} files for testing and development.`
              : "Enter an extension name below to find and download free sample files."}
          </Text>
        </VStack>

        <SampleFilesSearchBar initialValue={initialValue} extensions={extensions} />

        <Stack
          direction={{ base: "column", md: "row" }}
          gap={4}
          alignItems="center"
        >
          <Text fontSize={"sm"}>{"Categories: "}</Text>
          <SampleFilesCategoryTags />
        </Stack>
      </VStack>
    </Box>
  );
};

export default SampleFilesHero;
