import { SampleFilesExtensionModel } from "@/apis/sampleFiles/sampleFilesExtension";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { ExtensionCard } from "@/components/Tools/SampleFiles/Shared/ExtensionCard";
import { useColorPalette } from "@/contexts/useColorPalette";
import { Box, SimpleGrid, Spacer } from "@chakra-ui/react";
import React from "react";

type Props = {
  extensions: SampleFilesExtensionModel[];
};

const SampleFilesPopularFormats: React.FC<Props> = ({ extensions }) => {
  const { palette } = useColorPalette();

  if (extensions.length === 0) return null;

  return (
    <Box as="section">
      <SectionHeader
        tagline={"Most Popular"}
        headline={"Top Downloaded Formats"}
        description={"The most downloaded file formats by our users."}
      />
      <Spacer p={4} />
      <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} gap={4}>
        {extensions.map((extension) => (
          <ExtensionCard
            key={extension.documentId}
            extension={extension}
            palette={palette}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default SampleFilesPopularFormats;
