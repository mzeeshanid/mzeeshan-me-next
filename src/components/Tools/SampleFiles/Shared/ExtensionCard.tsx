import { SampleFilesExtensionModel } from "@/apis/sampleFiles/sampleFilesExtension";
import { formatStatsValue } from "@/data/tools/sampleFiles/sampleFilesStatsData";
import { Box, HStack, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { LuChevronRight } from "react-icons/lu";

export const cardStyle = {
  borderRadius: "2xl",
  overflow: "hidden" as const,
  borderWidth: "1px",
  borderColor: "border.subtle",
  bg: "bg.muted",
};

interface ExtensionCardProps {
  extension: SampleFilesExtensionModel;
  palette: string;
}

export const ExtensionCard: React.FC<ExtensionCardProps> = ({
  extension,
  palette,
}) => {
  const variantsCount = extension.variants?.length;
  const downloads =
    extension.downloads != null ? formatStatsValue(extension.downloads) : null;
  const featured = !!extension.isFeatured;

  return (
    <Link
      href={`/tools/sample-files/extensions/${extension.slug}`}
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
            bg={featured ? `${palette}.subtle` : "bg.subtle"}
            color={featured ? `${palette}.fg` : "fg.muted"}
            fontFamily="mono"
            fontWeight="bold"
            fontSize="10px"
            flexShrink={0}
          >
            {extension.slug.toUpperCase()}
          </Box>
          <Box color="fg.subtle" mt={1}>
            <LuChevronRight size={14} />
          </Box>
        </HStack>

        <Text fontSize="md" fontWeight="semibold" lineClamp={1}>
          .{extension.slug}
        </Text>
        {extension.info && (
          <Text fontSize="xs" color="fg.muted" mt={0.5} lineClamp={2}>
            {extension.info}
          </Text>
        )}

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
  );
};
