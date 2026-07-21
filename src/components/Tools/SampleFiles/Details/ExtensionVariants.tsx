import {
  SampleFilesExtensionDetailModel,
  SampleFileVariantModel,
  getVariantDownloadUrl,
} from "@/apis/sampleFiles/sampleFilesExtensionDetails";
import { incrementVariantDownloadCount } from "@/apis/sampleFiles/sampleFilesVariant";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { useColorPalette } from "@/contexts/useColorPalette";
import {
  Badge,
  Box,
  Button,
  Collapsible,
  Dialog,
  Highlight,
  HStack,
  IconButton,
  Input,
  Link,
  Popover,
  Portal,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import {
  LuChevronDown,
  LuChevronRight,
  LuInfo,
  LuSearch,
  LuX,
} from "react-icons/lu";

// ── Constants ─────────────────────────────────────────────────────────────────

const SECTION_ORDER = [
  { key: "basic", label: "Basic" },
  { key: "size_duration", label: "Size & Duration" },
  { key: "size_resolution", label: "Size & Resolution" },
  { key: "general", label: "General" },
  { key: "aspect_ratio", label: "Aspect Ratio" },
  { key: "resolution", label: "Resolution" },
  { key: "dpi", label: "DPI" },
  { key: "orientation", label: "Orientation" },
  { key: "frame_rate", label: "Frame Rate" },
  { key: "codec", label: "Codec" },
  { key: "bitrate", label: "Bitrate" },
  { key: "color_profile", label: "Color Profile" },
  { key: "header_container", label: "Header & Container" },
  { key: "audio", label: "Audio" },
  { key: "audio_quality", label: "Audio Quality" },
  { key: "bit_depth", label: "Bit Depth" },
  { key: "block_size", label: "Block Size" },
  { key: "channels", label: "Channels" },
  { key: "compression", label: "Compression" },
  { key: "content_type", label: "Content Type" },
  { key: "edge_cases", label: "Edge Cases" },
  { key: "encoding_variants", label: "Encoding Variants" },
  { key: "character_encoding", label: "Character Encoding" },
  { key: "line_endings", label: "Line Endings" },
  { key: "metadata", label: "Metadata" },
  { key: "sample_rate_bit_depth", label: "Sample Rate & Bit Depth" },
  { key: "waveform_signal", label: "Waveform & Signal Type" },
  { key: "misc", label: "Misc" },
];

const SEARCH_LIMIT = 15;

// ── Helpers ───────────────────────────────────────────────────────────────────

function trimPrefix(name: string): string {
  return name.replace(/^[A-Za-z0-9+]+ - /i, "");
}

function isGoogleDriveUrl(url: string): boolean {
  try {
    return new URL(url).hostname.includes("drive.google.com");
  } catch {
    return false;
  }
}

// CDN responses are served with a Content-Disposition header set by a
// CloudFront function that triggers when this query param is present.
function withDownloadParam(url: string): string {
  if (isGoogleDriveUrl(url)) return url;
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("download", "1");
    return parsed.toString();
  } catch {
    return url;
  }
}

function sectionLabel(key: string): string {
  return SECTION_ORDER.find((s) => s.key === key)?.label ?? key;
}

function groupVariants(variants: SampleFileVariantModel[]) {
  const map = new Map<string, SampleFileVariantModel[]>();
  for (const v of variants) {
    const key = v.section?.trim() || "general";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(v);
  }
  const orderKeys = SECTION_ORDER.map((s) => s.key);
  return Array.from(map.keys())
    .sort((a, b) => {
      const ai = orderKeys.indexOf(a);
      const bi = orderKeys.indexOf(b);
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    })
    .map((key) => ({ key, label: sectionLabel(key), items: map.get(key)! }));
}

interface NoteDedupResult {
  sharedNote: string | null;
  perVariantNote: Map<string, string>;
}

const NOTE_DEDUP_THRESHOLD = 2;

// When 2+ variants in a group share identical note text, collapse them into
// one shared banner instead of repeating the same tooltip on every row.
function computeNoteDedup(
  items: SampleFileVariantModel[],
  threshold = NOTE_DEDUP_THRESHOLD,
): NoteDedupResult {
  const counts = new Map<string, { count: number; original: string }>();
  for (const v of items) {
    const raw = v.notes?.trim();
    if (!raw) continue;
    const key = raw.toLowerCase();
    const existing = counts.get(key);
    if (existing) existing.count++;
    else counts.set(key, { count: 1, original: raw });
  }

  let sharedKey: string | null = null;
  let sharedCount = 0;
  for (const [key, entry] of counts) {
    if (entry.count >= threshold && entry.count > sharedCount) {
      sharedKey = key;
      sharedCount = entry.count;
    }
  }

  const perVariantNote = new Map<string, string>();
  for (const v of items) {
    const raw = v.notes?.trim();
    if (!raw) continue;
    if (sharedKey && raw.toLowerCase() === sharedKey) continue;
    perVariantNote.set(v.documentId, raw);
  }

  return {
    sharedNote: sharedKey ? counts.get(sharedKey)!.original : null,
    perVariantNote,
  };
}

// ── iOS 26 card style ─────────────────────────────────────────────────────────

const cardStyle = {
  borderRadius: "2xl",
  overflow: "hidden" as const,
  borderWidth: "1px",
  borderColor: "border.subtle",
  bg: "bg",
  _dark: { bg: "whiteAlpha.50" },
};

// ── AudioModal ────────────────────────────────────────────────────────────────

interface AudioModalProps {
  variant: SampleFileVariantModel | null;
  extensionName: string;
  onClose: () => void;
}

const AudioModal: React.FC<AudioModalProps> = ({
  variant,
  extensionName,
  onClose,
}) => {
  const url = variant ? getVariantDownloadUrl(variant) : undefined;

  return (
    <Dialog.Root
      open={!!variant}
      onOpenChange={(e) => {
        if (!e.open) onClose();
      }}
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <Portal>
        <Dialog.Backdrop
          backdropFilter="auto"
          backdropBlur="sm"
          bg="blackAlpha.500"
        />
        <Dialog.Positioner>
          <Dialog.Content maxW="sm" borderRadius="3xl" overflow="hidden">
            <Dialog.Header px={5} pt={5} pb={0}>
              <VStack gap={0} align="start" pr={8}>
                <Text fontSize="xs" color="fg.muted" fontWeight="medium">
                  {extensionName}
                </Text>
                <Dialog.Title fontSize="md" fontWeight="semibold" lineClamp={2}>
                  {variant ? trimPrefix(variant.name) : ""}
                </Dialog.Title>
                {variant?.shortInfo && (
                  <Text fontSize="sm" color="fg.muted" mt={0.5}>
                    {variant.shortInfo}
                  </Text>
                )}
              </VStack>
              <Dialog.CloseTrigger asChild>
                <IconButton
                  aria-label="Close"
                  variant="ghost"
                  size="sm"
                  position="absolute"
                  top={4}
                  right={4}
                  borderRadius="full"
                >
                  <LuX />
                </IconButton>
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <Dialog.Body px={5} pt={4} pb={5}>
              {url ? (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <audio
                  key={url}
                  controls
                  autoPlay
                  style={{ width: "100%", borderRadius: "12px" }}
                  src={url}
                />
              ) : (
                <Text color="fg.muted" fontSize="sm" textAlign="center" py={4}>
                  Audio not available
                </Text>
              )}

              {(variant?.duration || variant?.size) && (
                <HStack mt={3} gap={4} justify="center">
                  {variant.duration && (
                    <Text fontSize="xs" color="fg.muted">
                      {variant.duration}
                    </Text>
                  )}
                  {variant.size && (
                    <Text fontSize="xs" color="fg.muted">
                      {variant.size}
                    </Text>
                  )}
                </HStack>
              )}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

// ── VariantRow ────────────────────────────────────────────────────────────────

interface VariantRowProps {
  variant: SampleFileVariantModel;
  searchQuery: string;
  palette: string;
  isLast: boolean;
  onPlay: (v: SampleFileVariantModel) => void;
  onDownload: (v: SampleFileVariantModel) => void;
  downloadingId: string | null;
  isAudio: boolean;
  inlineNote?: string;
}

const VariantRow: React.FC<VariantRowProps> = ({
  variant,
  searchQuery,
  palette,
  isLast,
  onPlay,
  onDownload,
  downloadingId,
  isAudio,
  inlineNote,
}) => {
  const displayName = trimPrefix(variant.name);
  const downloadUrl = getVariantDownloadUrl(variant);

  return (
    <Box>
      <HStack px={4} py={3} gap={3} minH="44px" align="center">
        {/* Circular play button */}
        {isAudio && (
          <IconButton
            aria-label={`Play ${displayName}`}
            variant="solid"
            colorPalette={palette}
            size="sm"
            borderRadius="full"
            flexShrink={0}
            onClick={() => onPlay(variant)}
            disabled={!downloadUrl}
          >
            <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
              <path d="M0.5 1.2v9.6L9.5 6 0.5 1.2z" />
            </svg>
          </IconButton>
        )}

        {/* Name + shortInfo */}
        <VStack gap={0.5} align="start" flex={1} minW={0}>
          <HStack gap={0.5} align="center" w="full">
            <Text fontSize="sm" fontWeight="medium" lineClamp={2} minW={0}>
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
                  {displayName}
                </Highlight>
              ) : (
                displayName
              )}
            </Text>
            {inlineNote && (
              <Popover.Root positioning={{ placement: "top" }}>
                <Popover.Trigger asChild>
                  <IconButton
                    aria-label={`Note about ${displayName}`}
                    variant="ghost"
                    size="xs"
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
            )}
          </HStack>
          {variant.shortInfo && (
            <Text fontSize="xs" color="fg.muted" lineClamp={2}>
              {variant.shortInfo}
            </Text>
          )}
        </VStack>

        {/* Duration + size */}
        <VStack gap={0} align="end" flexShrink={0}>
          {variant.duration && (
            <Text fontSize="xs" color="fg.muted">
              {variant.duration}
            </Text>
          )}
          <Text fontSize="xs" color="fg.muted">
            {variant.size}
          </Text>
        </VStack>

        {/* Download */}
        <Link
          href={downloadUrl ? withDownloadParam(downloadUrl) : downloadUrl}
          flexShrink={0}
        >
          <Button
            variant="surface"
            loading={downloadingId === variant.documentId}
            size="xs"
            colorPalette={palette}
            onClick={() => onDownload(variant)}
            disabled={downloadingId !== null || !downloadUrl}
          >
            Download
          </Button>
        </Link>
      </HStack>

      {/* Inset separator — iOS style, omit after last row */}
      {!isLast && (
        <Box
          ml={isAudio ? "60px" : "16px"}
          mr={0}
          borderBottomWidth="0.5px"
          borderColor="border.emphasized"
        />
      )}
    </Box>
  );
};

// ── SectionBlock ──────────────────────────────────────────────────────────────

interface SectionBlockProps {
  label: string;
  items: SampleFileVariantModel[];
  defaultOpen: boolean;
  palette: string;
  onPlay: (v: SampleFileVariantModel) => void;
  onDownload: (v: SampleFileVariantModel) => void;
  downloadingId: string | null;
  isAudio: boolean;
  noteDedup: NoteDedupResult;
}

const SectionBlock: React.FC<SectionBlockProps> = ({
  label,
  items,
  defaultOpen,
  palette,
  onPlay,
  onDownload,
  downloadingId,
  isAudio,
  noteDedup,
}) => {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <Box mb={1}>
      {/* iOS 26 section header — sits above the card, sticky */}
      <Collapsible.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Collapsible.Trigger asChild>
          <HStack
            px={3}
            pt={5}
            pb={1}
            cursor="pointer"
            userSelect="none"
            position="sticky"
            top={0}
            zIndex={2}
            bg="bg.subtle"
            _hover={{ opacity: 0.75 }}
            gap={1}
          >
            <Text
              fontSize="xs"
              fontWeight="semibold"
              color="fg.muted"
              textTransform="uppercase"
              letterSpacing="wider"
              flex={1}
            >
              {label}
            </Text>
            <Text fontSize="xs" color="fg.muted">
              {items.length}
            </Text>
            <Collapsible.Indicator>
              {open ? (
                <LuChevronDown size={12} />
              ) : (
                <LuChevronRight size={12} />
              )}
            </Collapsible.Indicator>
          </HStack>
        </Collapsible.Trigger>

        {/* iOS 26 card */}
        <Collapsible.Content>
          {noteDedup.sharedNote && (
            <Box
              mb={1.5}
              px={3}
              py={2}
              borderRadius="lg"
              bg={`${palette}.subtle`}
              display="flex"
              gap={2}
              alignItems="flex-start"
            >
              <LuInfo size={14} style={{ marginTop: 2, flexShrink: 0 }} />
              <Text fontSize="xs" color="fg.muted">
                {noteDedup.sharedNote}
              </Text>
            </Box>
          )}
          <Box {...cardStyle}>
            {items.map((v, i) => (
              <VariantRow
                key={v.documentId}
                variant={v}
                searchQuery=""
                palette={palette}
                isLast={i === items.length - 1}
                onPlay={onPlay}
                onDownload={onDownload}
                downloadingId={downloadingId}
                isAudio={isAudio}
                inlineNote={noteDedup.perVariantNote.get(v.documentId)}
              />
            ))}
          </Box>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
};

// ── SectionChips ──────────────────────────────────────────────────────────────

interface SectionChipsProps {
  availableSections: { key: string; label: string }[];
  selectedSections: Set<string>;
  onToggle: (key: string) => void;
  onClear: () => void;
  palette: string;
}

const SectionChips: React.FC<SectionChipsProps> = ({
  availableSections,
  selectedSections,
  onToggle,
  onClear,
  palette,
}) => {
  const count = selectedSections.size;

  return (
    <HStack
      gap={2}
      overflowX="auto"
      pb={1}
      css={{
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {count > 0 && (
        <Button
          size="xs"
          variant="solid"
          colorPalette="red"
          borderRadius="full"
          flexShrink={0}
          onClick={onClear}
          px={3}
        >
          <LuX size={10} />
          Clear
        </Button>
      )}
      {availableSections.map((s) => {
        const active = selectedSections.has(s.key);
        return (
          <Button
            key={s.key}
            size="xs"
            variant={active ? "solid" : "outline"}
            colorPalette={active ? palette : "gray"}
            borderRadius="full"
            flexShrink={0}
            onClick={() => onToggle(s.key)}
            px={3}
            fontWeight={active ? "semibold" : "normal"}
          >
            {s.label}
          </Button>
        );
      })}
    </HStack>
  );
};

// ── Main component ────────────────────────────────────────────────────────────

interface Props {
  extension: SampleFilesExtensionDetailModel;
}

const ExtensionVariants: React.FC<Props> = ({ extension }) => {
  const variants = extension.variants || [];
  const { palette } = useColorPalette();

  // Search: input value updates immediately; deferred value drives filtering
  const [inputValue, setInputValue] = React.useState("");
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const [committedQuery, setCommittedQuery] = React.useState("");

  const [downloadingId, setDownloadingId] = React.useState<string | null>(null);
  const [playingVariant, setPlayingVariant] =
    React.useState<SampleFileVariantModel | null>(null);
  const [selectedSections, setSelectedSections] = React.useState<Set<string>>(
    new Set(),
  );

  const isAudio = extension.type?.slug?.toLowerCase() === "audios";
  const hasSections = variants.some((v) => v.section);
  const isSearching = committedQuery.trim().length > 0;

  const groups = React.useMemo(() => groupVariants(variants), [variants]);

  const availableSections = React.useMemo(
    () => groups.map((g) => ({ key: g.key, label: g.label })),
    [groups],
  );

  // Visible groups (filtered by section selection when not searching)
  const visibleGroups = React.useMemo(() => {
    if (selectedSections.size === 0) return groups;
    return groups.filter((g) => selectedSections.has(g.key));
  }, [groups, selectedSections]);

  // Note dedup is computed against full group/variant membership — never
  // against filtered/search subsets, which would flicker as filters change.
  const sectionNoteDedup = React.useMemo(
    () => new Map(groups.map((g) => [g.key, computeNoteDedup(g.items)])),
    [groups],
  );
  const flatNoteDedup = React.useMemo(
    () => computeNoteDedup(variants),
    [variants],
  );

  // Async debounced search — cancel previous timer before scheduling next
  const handleInput = React.useCallback((value: string) => {
    setInputValue(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setCommittedQuery(value);
    }, 220);
  }, []);

  const clearSearch = React.useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setInputValue("");
    setCommittedQuery("");
  }, []);

  // Flat search results, capped at 15
  const searchResults = React.useMemo(() => {
    if (!committedQuery.trim()) return [];
    const q = committedQuery.toLowerCase();
    const results: SampleFileVariantModel[] = [];
    for (const v of variants) {
      if (results.length >= SEARCH_LIMIT) break;
      const display = trimPrefix(v.name).toLowerCase();
      if (
        v.name.toLowerCase().includes(q) ||
        display.includes(q) ||
        (v.shortInfo?.toLowerCase().includes(q) ?? false)
      ) {
        results.push(v);
      }
    }
    return results;
  }, [committedQuery, variants]);

  const handleDownload = React.useCallback(
    async (variant: SampleFileVariantModel) => {
      if (!getVariantDownloadUrl(variant)) return;
      try {
        setDownloadingId(variant.documentId);
        await incrementVariantDownloadCount(
          variant.documentId,
          extension.documentId,
        );
      } catch {
        // silent
      } finally {
        setDownloadingId(null);
      }
    },
    [extension.documentId],
  );

  const toggleSection = React.useCallback((key: string) => {
    setSelectedSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  if (variants.length === 0) {
    return (
      <VStack gap={4} py={8}>
        <Text color="fg.muted">No variants available for this extension.</Text>
      </VStack>
    );
  }

  return (
    <Box as="section">
      <SectionHeader
        tagline="Details"
        headline={extension.name}
        description={extension.info}
      />
      {hasSections && (
        <HStack mt={3} gap={2} flexWrap="wrap">
          <Badge
            variant="subtle"
            colorPalette="gray"
            borderRadius="full"
            px={3}
            py={1}
          >
            {variants.length} variant{variants.length !== 1 ? "s" : ""}{" "}
            available
          </Badge>
          <Badge
            variant="subtle"
            colorPalette="gray"
            borderRadius="full"
            px={3}
            py={1}
          >
            {groups.length} section{groups.length !== 1 ? "s" : ""}
          </Badge>
        </HStack>
      )}
      <Spacer p={4} />

      {/* Search bar */}
      <Box
        position="relative"
        bg="bg.subtle"
        borderRadius="full"
        overflow="hidden"
        _focusWithin={{
          ring: "2px",
          ringColor: `${palette}.500`,
          ringOffset: "0px",
        }}
      >
        <Box
          position="absolute"
          left={4}
          top="50%"
          transform="translateY(-50%)"
          color="fg.muted"
          pointerEvents="none"
          zIndex={1}
        >
          <LuSearch size={15} />
        </Box>
        <Input
          pl={10}
          pr={inputValue ? 10 : 5}
          size="md"
          placeholder={`Search ${extension.name} variants…`}
          value={inputValue}
          onChange={(e) => handleInput(e.target.value)}
          border="none"
          bg="transparent"
          borderRadius="full"
          _focus={{ outline: "none", boxShadow: "none" }}
          _placeholder={{ color: "fg.subtle" }}
        />
        {inputValue && (
          <IconButton
            aria-label="Clear search"
            variant="ghost"
            size="xs"
            borderRadius="full"
            position="absolute"
            right={2}
            top="50%"
            transform="translateY(-50%)"
            color="fg.muted"
            onClick={clearSearch}
            zIndex={1}
          >
            <LuX size={13} />
          </IconButton>
        )}
      </Box>

      {/* Section filter chips — only shown when NOT searching */}
      {hasSections && !isSearching && (
        <Box mt={3}>
          <SectionChips
            availableSections={availableSections}
            selectedSections={selectedSections}
            onToggle={toggleSection}
            onClear={() => setSelectedSections(new Set())}
            palette={palette}
          />
        </Box>
      )}

      {/* ── Search results (flat list) ── */}
      {isSearching ? (
        <Box>
          {searchResults.length === 0 ? (
            <VStack py={12}>
              <Text color="fg.muted" fontSize="sm">
                No results for &ldquo;{committedQuery}&rdquo;
              </Text>
            </VStack>
          ) : (
            <>
              <Box {...cardStyle} mt={3}>
                {searchResults.map((v, i) => (
                  <VariantRow
                    key={v.documentId}
                    variant={v}
                    searchQuery={committedQuery}
                    palette={palette}
                    isLast={i === searchResults.length - 1}
                    onPlay={setPlayingVariant}
                    onDownload={handleDownload}
                    downloadingId={downloadingId}
                    isAudio={isAudio}
                    inlineNote={v.notes?.trim() || undefined}
                  />
                ))}
              </Box>
              {searchResults.length === SEARCH_LIMIT && (
                <Text fontSize="xs" color="fg.muted" textAlign="center" mt={2}>
                  Showing first {SEARCH_LIMIT} results — refine your search to
                  narrow down
                </Text>
              )}
            </>
          )}
        </Box>
      ) : hasSections ? (
        /* ── iOS 26 grouped sectioned view ── */
        <Box bg="bg.subtle" borderRadius="2xl" px={2} pb={3} mt={1}>
          {visibleGroups.map((g, index) => (
            <SectionBlock
              key={g.key}
              label={g.label}
              items={g.items}
              defaultOpen={index < 3}
              palette={palette}
              onPlay={setPlayingVariant}
              onDownload={handleDownload}
              downloadingId={downloadingId}
              isAudio={isAudio}
              noteDedup={
                sectionNoteDedup.get(g.key) ?? {
                  sharedNote: null,
                  perVariantNote: new Map(),
                }
              }
            />
          ))}
        </Box>
      ) : (
        /* ── Legacy flat card (non-audio / no sections) ── */
        <Box {...cardStyle} mt={3}>
          {variants.map((v, i) => (
            <VariantRow
              key={v.documentId}
              variant={v}
              searchQuery=""
              palette={palette}
              isLast={i === variants.length - 1}
              onPlay={setPlayingVariant}
              onDownload={handleDownload}
              downloadingId={downloadingId}
              isAudio={isAudio}
              inlineNote={flatNoteDedup.perVariantNote.get(v.documentId)}
            />
          ))}
        </Box>
      )}

      {/* Audio modal */}
      <AudioModal
        variant={playingVariant}
        extensionName={extension.name}
        onClose={() => setPlayingVariant(null)}
      />
    </Box>
  );
};

export default ExtensionVariants;
