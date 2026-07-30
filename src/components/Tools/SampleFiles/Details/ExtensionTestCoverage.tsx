import {
  SampleFilesExtensionDetailModel,
  SampleFileVariantModel,
} from "@/apis/sampleFiles/sampleFilesExtensionDetails";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { cardStyle } from "@/components/Tools/SampleFiles/Shared/ExtensionCard";
import {
  groupVariants,
  VariantSectionGroup,
} from "@/components/Tools/SampleFiles/Shared/variantSections";
import { useColorPalette } from "@/contexts/useColorPalette";
import { Box, GridItem, HStack, SimpleGrid, Spacer, Text, VStack } from "@chakra-ui/react";
import React from "react";

interface Props {
  extension: SampleFilesExtensionDetailModel;
}

// Ordered so the earliest match in a variant's name is treated as the
// "lowest" rung and the latest as the "highest" when building a range label.
const RESOLUTION_LADDER: { pattern: RegExp; label: string }[] = [
  { pattern: /144p/i, label: "144p" },
  { pattern: /240p/i, label: "240p" },
  { pattern: /360p/i, label: "360p" },
  { pattern: /480p/i, label: "480p" },
  { pattern: /576p/i, label: "576p" },
  { pattern: /720p/i, label: "720p" },
  { pattern: /900p/i, label: "900p" },
  { pattern: /1080p/i, label: "1080p" },
  { pattern: /1440p/i, label: "1440p" },
  { pattern: /\b2k\b/i, label: "2K" },
  { pattern: /\b4k\b/i, label: "4K" },
  { pattern: /\b5k\b/i, label: "5K" },
  { pattern: /\b6k\b/i, label: "6K" },
  { pattern: /\b8k\b/i, label: "8K" },
];

function resolutionRange(items: SampleFileVariantModel[]): string | null {
  let minIdx = -1;
  let maxIdx = -1;
  let minLabel = "";
  let maxLabel = "";

  for (const item of items) {
    RESOLUTION_LADDER.forEach((rung, idx) => {
      if (!rung.pattern.test(item.name)) return;
      if (minIdx === -1 || idx < minIdx) {
        minIdx = idx;
        minLabel = rung.label;
      }
      if (maxIdx === -1 || idx > maxIdx) {
        maxIdx = idx;
        maxLabel = rung.label;
      }
    });
  }

  if (minIdx === -1) return null;
  return minIdx === maxIdx ? minLabel : `${minLabel}→${maxLabel}`;
}

interface MetricConfig {
  key: string;
  label: string;
  range?: (items: SampleFileVariantModel[]) => string | null;
}

// Picked per category from the dimensions that best signal real-world
// coverage for that file type — not just whichever section has the most
// variants (e.g. for video, codec coverage matters more than raw count).
const CATEGORY_METRICS: Record<
  string,
  { primary: MetricConfig; secondary: MetricConfig }
> = {
  videos: {
    primary: { key: "codec", label: "Codecs Tested" },
    secondary: { key: "resolution", label: "Resolutions", range: resolutionRange },
  },
  images: {
    primary: { key: "color_profile", label: "Color Profiles" },
    secondary: { key: "size_resolution", label: "Resolutions", range: resolutionRange },
  },
  audios: {
    primary: { key: "sample_rate_bit_depth", label: "Sample Rates Tested" },
    secondary: { key: "channels", label: "Channel Types Tested" },
  },
  docs: {
    primary: { key: "character_encoding", label: "Encodings Tested" },
    secondary: { key: "spec_version", label: "Spec Versions Tested" },
  },
  archives: {
    primary: { key: "compression", label: "Compression Types" },
    secondary: { key: "block_size", label: "Block Sizes Tested" },
  },
};

// "video pipeline", "audio pipeline", etc — used in the section description.
const CATEGORY_PIPELINE_NOUN: Record<string, string> = {
  videos: "video",
  audios: "audio",
  docs: "document",
  images: "image",
  archives: "archive",
};

function resolveMetric(
  groups: VariantSectionGroup[],
  metric: MetricConfig | undefined,
  usedKeys: Set<string>,
): { value: number; label: string } | null {
  let group = metric ? groups.find((g) => g.key === metric.key) : undefined;
  let label = metric?.label;
  const rangeFn = group ? metric?.range : undefined;

  // Fall back to the largest not-yet-used section when the category's
  // configured metric has no data for this particular extension.
  if (!group || group.items.length === 0) {
    group = groups.find((g) => !usedKeys.has(g.key) && g.key !== "general");
    label = group ? `${group.label} Tested` : undefined;
  }

  if (!group || !label) return null;
  usedKeys.add(group.key);

  const rangeText = rangeFn?.(group.items) ?? null;
  return {
    value: group.items.length,
    label: rangeText ? `${label}, ${rangeText}` : label,
  };
}

const ExtensionTestCoverage: React.FC<Props> = ({ extension }) => {
  const { palette } = useColorPalette();
  const variants = extension.variants || [];
  const hasSections = variants.some((v) => v.section);

  if (!hasSections) return null;

  const groups = groupVariants(variants);
  const sortedGroups = [...groups].sort(
    (a, b) => b.items.length - a.items.length,
  );

  const categorySlug = extension.type?.slug;
  const metrics = categorySlug ? CATEGORY_METRICS[categorySlug] : undefined;
  const usedKeys = new Set<string>();

  const cards = [
    { value: variants.length, label: "Total variants" },
    { value: groups.length, label: "Categories covered" },
    resolveMetric(sortedGroups, metrics?.primary, usedKeys),
    resolveMetric(sortedGroups, metrics?.secondary, usedKeys),
  ].filter((card): card is { value: number; label: string } => card !== null);

  const maxCount = sortedGroups[0]?.items.length || 1;
  const pipelineNoun = (categorySlug && CATEGORY_PIPELINE_NOUN[categorySlug]) || "file";

  return (
    <Box as="section">
      <SectionHeader
        tagline="Test Coverage"
        headline={`Coverage Across ${variants.length} Variants`}
        description={`How the sample set breaks down across the ${groups.length} dimensions most likely to trip up a ${pipelineNoun} pipeline.`}
      />
      <Spacer p={4} />
      <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
        {cards.map((card, idx) => (
          <GridItem key={idx}>
            <Box {...cardStyle} p={4} textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color={`${palette}.fg`}>
                {card.value}
              </Text>
              <Text fontSize="sm" color="fg.muted" mt={1}>
                {card.label}
              </Text>
            </Box>
          </GridItem>
        ))}
      </SimpleGrid>
      <Spacer p={6} />
      <VStack align="stretch" gap={3}>
        {sortedGroups.map((group) => (
          <HStack key={group.key} gap={3}>
            <Text
              fontSize="sm"
              fontWeight="semibold"
              w={{ base: "90px", md: "140px" }}
              flexShrink={0}
            >
              {group.label}
            </Text>
            <Box
              flex={1}
              h="8px"
              bg="bg.subtle"
              borderRadius="full"
              overflow="hidden"
            >
              <Box
                h="full"
                bg={`${palette}.solid`}
                borderRadius="full"
                w={`${(group.items.length / maxCount) * 100}%`}
              />
            </Box>
            <Text
              fontSize="sm"
              color="fg.muted"
              w="24px"
              textAlign="right"
              flexShrink={0}
            >
              {group.items.length}
            </Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default ExtensionTestCoverage;
