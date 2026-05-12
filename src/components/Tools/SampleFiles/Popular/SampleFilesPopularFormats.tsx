import DeferredIcon from "@/components/DeferredIcon/DeferredIcon";
import { SampleFilesExtensionModel } from "@/apis/sampleFiles/sampleFilesExtension";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { useColorPalette } from "@/contexts/useColorPalette";
import { formatStatsValue } from "@/data/tools/sampleFiles/sampleFilesStatsData";
import {
  Badge,
  Box,
  Card,
  HStack,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { FaDownload } from "react-icons/fa6";

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
        {extensions.map((extension, idx) => {
          const formatted =
            extension.downloads != null
              ? formatStatsValue(extension.downloads)
              : null;

          return (
            <Link
              key={idx}
              href={`/tools/sample-files/extensions/${extension.slug}`}
            >
              <Card.Root bg={"bg.muted"} h="full">
                <Card.Body gap={3}>
                  <VStack alignItems="flex-start" gap={2} h="full">
                    <Badge
                      colorPalette={palette}
                      variant="surface"
                      fontSize="md"
                      fontWeight="bold"
                    >
                      .{extension.name}
                    </Badge>
                    {extension.type && (
                      <Text fontSize="xs" color="fg.muted">
                        {extension.type.name}
                      </Text>
                    )}
                    {formatted && (
                      <HStack gap={1} mt="auto">
                        <DeferredIcon icon={FaDownload} color="fg.muted" boxSize={3} />
                        <Text fontSize="xs" color="fg.muted">
                          {formatted.value}
                          {formatted.unit}
                        </Text>
                      </HStack>
                    )}
                  </VStack>
                </Card.Body>
              </Card.Root>
            </Link>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default SampleFilesPopularFormats;
