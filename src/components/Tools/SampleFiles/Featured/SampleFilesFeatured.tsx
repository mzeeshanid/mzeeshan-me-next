import { SampleFilesExtensionModel } from "@/apis/sampleFiles/sampleFilesExtension";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { ExtensionCard } from "@/components/Tools/SampleFiles/Shared/ExtensionCard";
import ToolByline from "@/components/ToolByline/ToolByline";
import { useColorPalette } from "@/contexts/useColorPalette";
import { Box, SimpleGrid, Spacer, VStack } from "@chakra-ui/react";
import React from "react";

type Props = {
  featured: SampleFilesExtensionModel[];
};

const SampleFilesFeatured: React.FC<Props> = (props: Props) => {
  const extensions = props.featured || [];
  const { palette } = useColorPalette();

  return (
    <Box as="section">
      <SectionHeader
        tagline={"Featured"}
        headline={"Featured Sample Files"}
        description={
          "Discover the handpicked featured and commonly used sample file formats."
        }
      >
        <ToolByline />
      </SectionHeader>
      <Spacer p={4} />
      <VStack gap={8} alignItems="center">
        {extensions.length > 0 ? (
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={4} w="full">
            {extensions.map((extension) => (
              <ExtensionCard
                key={extension.documentId}
                extension={extension}
                palette={palette}
              />
            ))}
          </SimpleGrid>
        ) : null}
      </VStack>
    </Box>
  );
};

export default SampleFilesFeatured;
