import { SampleFilesExtensionModel } from "@/apis/sampleFiles/sampleFilesExtension";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { Box, SimpleGrid, Spacer, VStack } from "@chakra-ui/react";
import React from "react";
import SampleFilesExtensionCard from "./SampleFilesExtensionCard";

type Props = {
  featured: SampleFilesExtensionModel[];
};

const SampleFilesFeatured: React.FC<Props> = (props: Props) => {
  const extensions = props.featured || [];
  const isLoading = false;

  return (
    <Box as="section">
      <SectionHeader
        tagline={"Featured"}
        headline={"Explore Popular Sample File Formats"}
        description={
          "Discover the most popular and commonly used sample file formats."
        }
      />
      <Spacer p={4} />
      <VStack gap={8} alignItems="center">
        {extensions.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="full">
            {extensions.map((extension, index) => (
              <SampleFilesExtensionCard key={index} extension={extension} />
            ))}
          </SimpleGrid>
        ) : null}
      </VStack>
    </Box>
  );
};

export default SampleFilesFeatured;
