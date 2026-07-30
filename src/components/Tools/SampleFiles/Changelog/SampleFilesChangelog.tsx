import { SampleFilesChangelogEntry } from "@/apis/sampleFiles/sampleFilesVariant";
import { useColorPalette } from "@/contexts/useColorPalette";
import { Box, Link, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  entries: SampleFilesChangelogEntry[];
};

const SampleFilesChangelog: React.FC<Props> = ({ entries }) => {
  const { palette } = useColorPalette();

  if (entries.length === 0) return null;

  return (
    <Box
      as="section"
      borderRadius="2xl"
      borderWidth="1px"
      borderColor="border.subtle"
      bg="bg"
      _dark={{ bg: "whiteAlpha.50" }}
      px={5}
      py={4}
    >
      {/* lineClamp caps this to 2 lines — as newer entries are prepended,
          older ones are pushed past the clamp and disappear on their own. */}
      <Text fontSize="sm" lineClamp={2} lineHeight="tall">
        <Text
          as="span"
          fontWeight="bold"
          textTransform="uppercase"
          letterSpacing="wider"
          color={`${palette}.fg`}
        >
          Recently Added
        </Text>
        <Text as="span" color="border.emphasized" mx={2}>
          |
        </Text>
        {entries.map((entry, idx) => (
          <React.Fragment key={`${entry.date}-${entry.extension}`}>
            <Text as="span" color="fg.muted">
              {entry.date}
            </Text>{" "}
            <Link
              href={`/tools/sample-files/extensions/${entry.extensionSlug}`}
              fontWeight="semibold"
              color="fg"
              _hover={{ textDecoration: "underline" }}
            >
              {entry.extension}
            </Link>
            {" — added "}
            {entry.variants.map((variant, variantIdx) => (
              <React.Fragment key={variant.documentId}>
                {variantIdx > 0 && ", "}
                <Link
                  href={`/tools/sample-files/extensions/${entry.extensionSlug}#variant-${variant.documentId}`}
                  color="fg"
                  _hover={{ textDecoration: "underline" }}
                >
                  {variant.name}
                </Link>
              </React.Fragment>
            ))}
            {entry.moreCount > 0 && ` +${entry.moreCount} more`}
            {idx < entries.length - 1 && (
              <Text as="span" color="fg.subtle">
                {" "}
                •{" "}
              </Text>
            )}
          </React.Fragment>
        ))}
      </Text>
    </Box>
  );
};

export default SampleFilesChangelog;
