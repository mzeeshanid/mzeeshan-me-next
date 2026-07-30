import { SampleFileVariantModel } from "@/apis/sampleFiles/sampleFilesExtensionDetails";
import {
  Box,
  Button,
  HStack,
  Highlight,
  IconButton,
  Link,
  Popover,
  Portal,
  Text,
  VisuallyHidden,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { LuInfo } from "react-icons/lu";

export const variantCardStyle = {
  borderRadius: "2xl",
  overflow: "hidden" as const,
  borderWidth: "1px",
  borderColor: "border.subtle",
  bg: "bg",
  _dark: { bg: "whiteAlpha.50" },
};

// Matches the "6.4k downloads" style used on variant cards — deliberately
// distinct from formatStatsValue, which appends a "+" meant for rounded
// aggregate stats rather than a literal per-variant count.
function formatDownloadsCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

interface VariantCardProps {
  variant: SampleFileVariantModel;
  title: string;
  subtitle?: string;
  searchQuery?: string;
  palette: string;
  isAudio: boolean;
  onPlay: (v: SampleFileVariantModel) => void;
  onDownload: (v: SampleFileVariantModel) => void;
  downloadUrl?: string;
  downloadingId: string | null;
  inlineNote?: string;
}

export const VariantCard: React.FC<VariantCardProps> = ({
  variant,
  title,
  subtitle,
  searchQuery,
  palette,
  isAudio,
  onPlay,
  onDownload,
  downloadUrl,
  downloadingId,
  inlineNote,
}) => {
  const metaParts: React.ReactNode[] = [];
  if (variant.size) metaParts.push(variant.size);
  if (variant.duration) metaParts.push(variant.duration);

  return (
    <Box
      id={`variant-${variant.documentId}`}
      {...variantCardStyle}
      h="full"
      p={4}
      display="flex"
      flexDirection="column"
      transition="all 0.15s ease"
      scrollMarginTop="calc(var(--navbar-height, 0px) + 16px)"
      _hover={{
        borderColor: `${palette}.400`,
        transform: "translateY(-2px)",
      }}
    >
      <HStack gap={1} align="start" mb={isAudio ? 2 : 1}>
        {isAudio && (
          <IconButton
            aria-label={`Play ${title}`}
            variant="solid"
            colorPalette={palette}
            size="xs"
            borderRadius="full"
            flexShrink={0}
            onClick={() => onPlay(variant)}
            disabled={!downloadUrl}
          >
            <svg width="9" height="11" viewBox="0 0 10 12" fill="currentColor">
              <path d="M0.5 1.2v9.6L9.5 6 0.5 1.2z" />
            </svg>
          </IconButton>
        )}
        <Text fontSize="md" fontWeight="semibold" lineClamp={2} minW={0}>
          {searchQuery ? (
            <Highlight
              query={searchQuery}
              styles={{
                px: "0.5",
                bg: "yellow.subtle",
                color: "yellow.fg",
                borderRadius: "sm",
              }}
              ignoreCase
            >
              {title}
            </Highlight>
          ) : (
            title
          )}
        </Text>
        {inlineNote && (
          <>
            <Popover.Root positioning={{ placement: "top" }}>
              <Popover.Trigger asChild>
                <IconButton
                  aria-label={`Note about ${title}`}
                  variant="ghost"
                  size="2xs"
                  borderRadius="full"
                  flexShrink={0}
                  onClick={(e) => e.stopPropagation()}
                >
                  <LuInfo size={12} />
                </IconButton>
              </Popover.Trigger>
              <Portal>
                <Popover.Positioner>
                  <Popover.Content maxW="260px" p={2}>
                    <Popover.Arrow />
                    <Text fontSize="xs" color="fg.muted">
                      {inlineNote}
                    </Text>
                  </Popover.Content>
                </Popover.Positioner>
              </Portal>
            </Popover.Root>
            {/* Popover content only mounts once opened, so it's invisible to
                crawlers that don't simulate a click. Keep a permanent,
                screen-reader/crawler-visible copy of the same note. */}
            <VisuallyHidden>{inlineNote}</VisuallyHidden>
          </>
        )}
      </HStack>

      {subtitle && (
        <Text fontSize="xs" color="fg.muted" lineClamp={2} mb={3}>
          {searchQuery ? (
            <Highlight
              query={searchQuery}
              styles={{
                px: "0.5",
                bg: "yellow.subtle",
                color: "yellow.fg",
                borderRadius: "sm",
              }}
              ignoreCase
            >
              {subtitle}
            </Highlight>
          ) : (
            subtitle
          )}
        </Text>
      )}

      <VStack align="stretch" gap={2} mt="auto" pt={2}>
        <Text fontSize="xs" color="fg.muted" truncate>
          {metaParts.length > 0 && `${metaParts.join(" · ")}${variant.downloads != null ? " · " : ""}`}
          {variant.downloads != null && (
            <Text as="span" fontWeight="semibold" color={`${palette}.fg`}>
              {formatDownloadsCount(variant.downloads)} downloads
            </Text>
          )}
        </Text>
        <Link href={downloadUrl} w="full">
          <Button
            variant="surface"
            loading={downloadingId === variant.documentId}
            size="xs"
            colorPalette={palette}
            w="full"
            onClick={() => onDownload(variant)}
            disabled={downloadingId !== null || !downloadUrl}
          >
            Download
          </Button>
        </Link>
      </VStack>
    </Box>
  );
};

export default VariantCard;
