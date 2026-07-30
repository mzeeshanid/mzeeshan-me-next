import { SampleFilesExtensionModel } from "@/apis/sampleFiles/sampleFilesExtension";
import { RelatedExtensionData as RelatedExtensionsSectionType } from "@/data/tools/sampleFiles/sampleFilesExtensionDetails";
import { formatStatsValue } from "@/data/tools/sampleFiles/sampleFilesStatsData";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { cardStyle } from "@/components/Tools/SampleFiles/Shared/ExtensionCard";
import { useColorPalette } from "@/contexts/useColorPalette";
import { Box, GridItem, HStack, Link, SimpleGrid, Spacer, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { LuChevronRight } from "react-icons/lu";

interface Props {
  data: RelatedExtensionsSectionType;
  allExtensions?: SampleFilesExtensionModel[];
}

const RelatedExtensions: React.FC<Props> = ({ data, allExtensions = [] }) => {
  const { palette } = useColorPalette();

  return (
    <Box as="section">
      <SectionHeader
        tagline={"Related"}
        headline={data.title}
        description={"Here are some related extensions"}
      />
      <Spacer p={4} />
      <SimpleGrid minChildWidth={{ base: "100%", md: "260px" }} gap={4}>
        {data.related.map((ext, idx) => {
          const matched = allExtensions.find(
            (e) => e.slug.toLowerCase() === ext.extension.toLowerCase()
          );
          const variantsCount = matched?.variants?.length;
          const downloads =
            matched?.downloads != null
              ? formatStatsValue(matched.downloads)
              : null;

          return (
            <GridItem key={idx} h="full">
              <Link
                href={`/tools/sample-files/extensions/${ext.extension.toLowerCase()}`}
                display="block"
                h="full"
                _hover={{ textDecoration: "none" }}
              >
                <Box
                  {...cardStyle}
                  h="full"
                  p={4}
                  display="flex"
                  flexDirection="column"
                  transition="all 0.15s ease"
                  _hover={{
                    borderColor: `${palette}.400`,
                    transform: "translateY(-2px)",
                  }}
                >
                  <HStack justify="space-between" align="start" mb={4}>
                    <Box
                      w={11}
                      h={11}
                      borderRadius="xl"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      bg="bg.subtle"
                      color="fg.muted"
                      fontFamily="mono"
                      fontWeight="bold"
                      fontSize="10px"
                      flexShrink={0}
                    >
                      {ext.extension.toUpperCase()}
                    </Box>
                    <Box color="fg.subtle" mt={1}>
                      <LuChevronRight size={14} />
                    </Box>
                  </HStack>
                  <Text fontSize="md" fontWeight="semibold" lineClamp={1}>
                    .{ext.extension.toLowerCase()}
                  </Text>
                  <Text fontSize="xs" color="fg.muted" mt={0.5} lineClamp={2}>
                    {ext.description}
                  </Text>

                  {(variantsCount != null || downloads) && (
                    <VStack align="stretch" gap={1.5} mt="auto" pt={3}>
                      {variantsCount != null && (
                        <HStack justify="space-between">
                          <Text fontSize="xs" color="fg.muted">
                            Variants
                          </Text>
                          <Text fontSize="xs" fontWeight="medium">
                            {variantsCount}
                          </Text>
                        </HStack>
                      )}
                      {downloads && (
                        <HStack justify="space-between">
                          <Text fontSize="xs" color="fg.muted">
                            Downloads
                          </Text>
                          <Text
                            fontSize="xs"
                            fontWeight="semibold"
                            color={`${palette}.fg`}
                          >
                            {downloads.value}
                            {downloads.unit}
                          </Text>
                        </HStack>
                      )}
                    </VStack>
                  )}
                </Box>
              </Link>
            </GridItem>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default RelatedExtensions;
