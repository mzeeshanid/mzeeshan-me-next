import {
  SampleFilesExtensionDetailModel,
  SampleFileVariantModel,
  getVariantDownloadUrl,
} from "@/apis/sampleFiles/sampleFilesExtensionDetails";
import {
  incrementVariantDownloadCount,
  trimVariantNamePrefix,
} from "@/apis/sampleFiles/sampleFilesVariant";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import SharedNoteBanner from "@/components/Tools/SampleFiles/Details/SharedNoteBanner";
import VariantCard from "@/components/Tools/SampleFiles/Details/VariantCard";
import VariantSectionCard from "@/components/Tools/SampleFiles/Details/VariantSectionCard";
import SectionPills from "@/components/Tools/SampleFiles/Shared/SectionPills";
import SectionSidebar, {
  SectionItem,
} from "@/components/Tools/SampleFiles/Shared/SectionSidebar";
import { groupVariants } from "@/components/Tools/SampleFiles/Shared/variantSections";
import { useColorPalette } from "@/contexts/useColorPalette";
import {
  Box,
  Button,
  Dialog,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Input,
  Portal,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { LuSearch, LuSearchX, LuX } from "react-icons/lu";

// ── Constants ─────────────────────────────────────────────────────────────────

const SEARCH_LIMIT = 15;

// ── Helpers ───────────────────────────────────────────────────────────────────

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

function resolveDownloadHref(variant: SampleFileVariantModel): string | undefined {
  const url = getVariantDownloadUrl(variant);
  return url ? withDownloadParam(url) : undefined;
}

// Variant names are stored as "EXT - <shortInfo> - <spec>" (e.g.
// "MP4 - H.264 - 1280 × 720 720p HD" with shortInfo "H.264"). The card's
// title is the short label; the spec remainder becomes the subtitle.
function splitVariantDisplay(
  name: string,
  shortInfo?: string,
): { title: string; subtitle?: string } {
  const trimmed = trimVariantNamePrefix(name);
  const label = shortInfo?.trim();
  if (!label) return { title: trimmed };

  const prefix = `${label} - `;
  if (trimmed.toLowerCase().startsWith(prefix.toLowerCase())) {
    return { title: label, subtitle: trimmed.slice(prefix.length) };
  }
  return { title: label, subtitle: trimmed !== label ? trimmed : undefined };
}

interface NoteDedupResult {
  sharedNote: string | null;
  perVariantNote: Map<string, string>;
}

const NOTE_DEDUP_THRESHOLD = 2;

// When 2+ variants in a group share identical note text, collapse them into
// one shared banner instead of repeating the same tooltip on every card.
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
                  {variant ? trimVariantNamePrefix(variant.name) : ""}
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
  const [selectedSection, setSelectedSection] = React.useState<string | null>(
    null,
  );

  const isAudio = extension.type?.slug?.toLowerCase() === "audios";
  const hasSections = variants.some((v) => v.section);
  const isSearching = committedQuery.trim().length > 0;

  // Changelog links point here as `#variant-<documentId>`. On load, jump to
  // whichever section holds that variant (sections start collapsed, so a
  // plain browser anchor jump would land on a hidden, zero-height card) and
  // queue a smooth scroll to the card itself once it's rendered.
  const pendingScrollVariantId = React.useRef<string | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const match = window.location.hash.match(/^#variant-(.+)$/);
    if (!match) return;
    const targetId = match[1];
    const target = variants.find((v) => v.documentId === targetId);
    if (!target) return;

    pendingScrollVariantId.current = targetId;
    if (hasSections) {
      setSelectedSection(target.section?.trim() || "general");
    }
    // Only ever handle the hash present on the initial load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const targetId = pendingScrollVariantId.current;
    if (!targetId) return;
    pendingScrollVariantId.current = null;
    requestAnimationFrame(() => {
      document
        .getElementById(`variant-${targetId}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }, [selectedSection]);

  // Switching filters can drastically shrink the page (e.g. from 41 cards
  // down to 5), and the browser clamps an out-of-range scroll position to
  // the new bottom of the document — dropping the user into whatever
  // section happens to land there instead of the listing they just picked.
  // Realign to the top of the listing whenever the active filter changes.
  const listingRef = React.useRef<HTMLDivElement>(null);
  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const el = listingRef.current;
    if (!el) return;
    const navbarHeight =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--navbar-height",
        ),
      ) || 0;
    const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;
    window.scrollTo({ top: Math.max(top, 0) });
  }, [selectedSection, isSearching]);

  const groups = React.useMemo(() => groupVariants(variants), [variants]);

  const activeGroup = React.useMemo(
    () => (selectedSection ? groups.find((g) => g.key === selectedSection) : null),
    [groups, selectedSection],
  );

  const sidebarItems: SectionItem[] = React.useMemo(
    () => [
      { key: null, label: "All Variants", count: variants.length },
      ...groups.map((g) => ({ key: g.key, label: g.label, count: g.items.length })),
    ],
    [groups, variants.length],
  );

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

  // Flat search results, capped at 15 — always searched across every
  // variant regardless of the section currently selected in the sidebar.
  const searchResults = React.useMemo(() => {
    if (!committedQuery.trim()) return [];
    const q = committedQuery.toLowerCase();
    const results: SampleFileVariantModel[] = [];
    for (const v of variants) {
      if (results.length >= SEARCH_LIMIT) break;
      const display = trimVariantNamePrefix(v.name).toLowerCase();
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

  const totalCount = variants.length;
  const shownCount = isSearching
    ? searchResults.length
    : selectedSection
    ? activeGroup?.items.length ?? 0
    : totalCount;

  const headerTitle = isSearching
    ? "Search Results"
    : selectedSection
    ? activeGroup?.label ?? "Variants"
    : "All Variants";

  const headerSubtitle = isSearching
    ? `${searchResults.length} result${searchResults.length !== 1 ? "s" : ""} for “${committedQuery}”`
    : `${shownCount} of ${totalCount} variant${totalCount !== 1 ? "s" : ""} shown`;

  const renderSearchBar = (full: boolean) => (
    <Box
      position="relative"
      bg="bg"
      borderWidth="1.5px"
      borderColor="border.emphasized"
      borderRadius="full"
      overflow="hidden"
      w={full ? "full" : "sm"}
      flexShrink={0}
      boxShadow="xs"
      transition="border-color 0.15s ease, box-shadow 0.15s ease"
      _hover={{ borderColor: `${palette}.400` }}
      _focusWithin={{
        borderColor: `${palette}.500`,
        ring: "3px",
        ringColor: `${palette}.500/30`,
        ringOffset: "0px",
      }}
    >
      <Box
        position="absolute"
        left={4}
        top="50%"
        transform="translateY(-50%)"
        color={`${palette}.fg`}
        pointerEvents="none"
        zIndex={1}
      >
        <LuSearch size={16} strokeWidth={2.5} />
      </Box>
      <Input
        pl={10}
        pr={inputValue ? 10 : 5}
        size="md"
        fontWeight="medium"
        placeholder="Search variants…"
        value={inputValue}
        onChange={(e) => handleInput(e.target.value)}
        border="none"
        bg="transparent"
        borderRadius="full"
        _focus={{ outline: "none", boxShadow: "none" }}
        _placeholder={{ color: "fg.muted" }}
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
  );

  const renderCard = (
    v: SampleFileVariantModel,
    inlineNote: string | undefined,
    withSearchHighlight: boolean,
  ) => {
    const { title, subtitle } = splitVariantDisplay(v.name, v.shortInfo);
    return (
      <VariantCard
        key={v.documentId}
        variant={v}
        title={title}
        subtitle={subtitle}
        searchQuery={withSearchHighlight ? committedQuery : undefined}
        palette={palette}
        isAudio={isAudio}
        onPlay={setPlayingVariant}
        onDownload={handleDownload}
        downloadUrl={resolveDownloadHref(v)}
        downloadingId={downloadingId}
        inlineNote={inlineNote}
      />
    );
  };

  if (variants.length === 0) {
    return (
      <VStack gap={4} py={8}>
        <Text color="fg.muted">No variants available for this extension.</Text>
      </VStack>
    );
  }

  const mainContent = isSearching ? (
    searchResults.length === 0 ? (
      <VStack py={16} gap={4} textAlign="center">
        <Box
          w={16}
          h={16}
          borderRadius="full"
          bg="bg.subtle"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="fg.subtle"
        >
          <LuSearchX size={28} strokeWidth={1.5} />
        </Box>
        <VStack gap={1}>
          <Text fontWeight="semibold" fontSize="md">
            No matches for &ldquo;{committedQuery}&rdquo;
          </Text>
          <Text color="fg.muted" fontSize="sm" maxW="sm">
            Try a different keyword, or check the spelling of the variant
            name.
          </Text>
        </VStack>
        <Button
          variant="outline"
          colorPalette={palette}
          size="sm"
          borderRadius="full"
          onClick={clearSearch}
        >
          Clear search
        </Button>
      </VStack>
    ) : (
      <>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={4}>
          {searchResults.map((v) =>
            renderCard(v, v.notes?.trim() || undefined, true),
          )}
        </SimpleGrid>
        {searchResults.length === SEARCH_LIMIT && (
          <Text fontSize="xs" color="fg.muted" textAlign="center" mt={4}>
            Showing first {SEARCH_LIMIT} results — refine your search to
            narrow down
          </Text>
        )}
      </>
    )
  ) : hasSections ? (
    selectedSection === null ? (
      <VStack align="stretch" gap={3}>
        {groups.map((g, index) => {
          const dedup = sectionNoteDedup.get(g.key);
          return (
            <VariantSectionCard
              key={g.key}
              sectionKey={g.key}
              label={g.label}
              items={g.items}
              initialOpen={index < 2}
              sharedNote={dedup?.sharedNote ?? null}
              palette={palette}
              renderCard={(v) =>
                renderCard(v, dedup?.perVariantNote.get(v.documentId), false)
              }
            />
          );
        })}
      </VStack>
    ) : (
      <Box>
        {(() => {
          const dedup = sectionNoteDedup.get(selectedSection);
          return (
            <>
              {dedup?.sharedNote && (
                <SharedNoteBanner note={dedup.sharedNote} palette={palette} />
              )}
              <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={4}>
                {(activeGroup?.items ?? []).map((v) =>
                  renderCard(v, dedup?.perVariantNote.get(v.documentId), false),
                )}
              </SimpleGrid>
            </>
          );
        })()}
      </Box>
    )
  ) : (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={4}>
      {variants.map((v) =>
        renderCard(v, flatNoteDedup.perVariantNote.get(v.documentId), false),
      )}
    </SimpleGrid>
  );

  return (
    <Box as="section">
      <SectionHeader
        tagline="Details"
        headline={extension.name}
        description={extension.info}
      />

      <Grid
        ref={listingRef}
        mt={6}
        templateColumns={{ base: "1fr", lg: hasSections ? "220px 1fr" : "1fr" }}
        gap={{ base: 4, lg: 8 }}
      >
        {hasSections && (
          <GridItem display={{ base: "none", lg: "block" }}>
            <SectionSidebar
              items={sidebarItems}
              selected={selectedSection}
              onSelect={setSelectedSection}
              palette={palette}
            />
          </GridItem>
        )}

        <GridItem minW={0}>
          {/* ── Mobile header: pills, then full-width search, then title ── */}
          <Box display={{ base: "block", lg: "none" }}>
            {hasSections && (
              <SectionPills
                items={sidebarItems}
                selected={selectedSection}
                onSelect={setSelectedSection}
                palette={palette}
              />
            )}
            <Box mt={hasSections ? 3 : 0}>{renderSearchBar(true)}</Box>
            <VStack align="start" gap={0} mt={4} mb={4}>
              <Heading as="h3" fontSize="xl" fontWeight="bold">
                {headerTitle}
              </Heading>
              <Text fontSize="sm" color="fg.muted">
                {headerSubtitle}
              </Text>
            </VStack>
          </Box>

          {/* ── Desktop header: title/count left, search right, same row ── */}
          <HStack
            display={{ base: "none", lg: "flex" }}
            justify="space-between"
            align="start"
            mb={6}
            gap={4}
          >
            <VStack align="start" gap={0}>
              <Heading as="h3" fontSize="xl" fontWeight="bold">
                {headerTitle}
              </Heading>
              <Text fontSize="sm" color="fg.muted">
                {headerSubtitle}
              </Text>
            </VStack>
            {renderSearchBar(false)}
          </HStack>

          {mainContent}
        </GridItem>
      </Grid>

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
