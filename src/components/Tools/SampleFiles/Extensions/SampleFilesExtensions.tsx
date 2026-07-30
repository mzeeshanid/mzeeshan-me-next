import { SampleFilesExtensionModel } from "@/apis/sampleFiles/sampleFilesExtension";
import { useColorPalette } from "@/contexts/useColorPalette";
import { cardStyle, ExtensionCard } from "@/components/Tools/SampleFiles/Shared/ExtensionCard";
import SectionPills from "@/components/Tools/SampleFiles/Shared/SectionPills";
import SectionSidebar, {
  SectionItem,
} from "@/components/Tools/SampleFiles/Shared/SectionSidebar";
import {
  Box,
  Collapsible,
  Grid,
  GridItem,
  Heading,
  HStack,
  Link,
  Separator,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";

// ── Types ─────────────────────────────────────────────────────────────────────

type HeaderProps = {
  badge?: string;
  title: string;
  detail?: string;
};

type Props = {
  extensions: SampleFilesExtensionModel[];
  headerProps: HeaderProps;
  grouped?: boolean;
};

// ── Category colors ──────────────────────────────────────────────────────────
// Each category gets a distinct Chakra semantic color so its badge and the
// section sidebar's initials avatar stay visually tied together. Rotated by
// position so it stays stable regardless of how many categories the CMS
// returns.

const CATEGORY_COLOR_PALETTES = [
  "orange",
  "blue",
  "purple",
  "green",
  "yellow",
  "red",
  "cyan",
  "pink",
  "teal",
];

function getCategoryInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function groupByCategory(extensions: SampleFilesExtensionModel[]) {
  const map = new Map<string, { name: string; items: SampleFilesExtensionModel[] }>();
  for (const ext of extensions) {
    const key = ext.type?.slug ?? "others";
    const name = ext.type?.name ?? "Others";
    if (!map.has(key)) map.set(key, { name, items: [] });
    map.get(key)!.items.push(ext);
  }
  return Array.from(map.entries())
    .sort(([, a], [, b]) => a.name.localeCompare(b.name))
    .map(([key, { name, items }], index) => ({
      key,
      name,
      items,
      color: CATEGORY_COLOR_PALETTES[index % CATEGORY_COLOR_PALETTES.length],
    }));
}

// ── ExtensionTile ─────────────────────────────────────────────────────────────

interface ExtensionTileProps {
  extension: SampleFilesExtensionModel;
  color: string;
}

const ExtensionTile: React.FC<ExtensionTileProps> = ({ extension, color }) => (
  <Link
    href={`/tools/sample-files/extensions/${extension.slug}`}
    display="block"
    _hover={{ textDecoration: "none" }}
  >
    <HStack
      gap={3}
      p={3}
      align="start"
      borderWidth="1px"
      borderColor="border.subtle"
      borderRadius="xl"
      bg="bg"
      _dark={{ bg: "whiteAlpha.50" }}
      transition="all 0.15s ease"
      // Collapsible.Content clips overflow to animate height, so a translateY
      // hover here would get cut off for tiles in the first row — use a
      // border/shadow shift instead, which doesn't need extra layout space.
      _hover={{ borderColor: `${color}.400`, boxShadow: "sm" }}
    >
      <Box
        w={9}
        h={9}
        borderRadius="lg"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg={`${color}.subtle`}
        color={`${color}.fg`}
        fontFamily="mono"
        fontWeight="bold"
        fontSize="10px"
        flexShrink={0}
      >
        {extension.slug.slice(0, 2).toUpperCase()}
      </Box>

      <VStack gap={0.5} align="start" minW={0}>
        <Text fontSize="sm" fontWeight="semibold" lineClamp={1}>
          .{extension.slug}
        </Text>
        {extension.info && (
          <Text fontSize="xs" color="fg.muted" lineClamp={1}>
            {extension.info}
          </Text>
        )}
      </VStack>
    </HStack>
  </Link>
);

// ── CategorySection ───────────────────────────────────────────────────────────

interface CategorySectionProps {
  name: string;
  items: SampleFilesExtensionModel[];
  color: string;
  initialOpen?: boolean;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  name,
  items,
  color,
  initialOpen = false,
}) => {
  const [open, setOpen] = React.useState(initialOpen);
  const initials = getCategoryInitials(name);

  return (
    <Box {...cardStyle}>
      <Collapsible.Root
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        // collapsedHeight={0} keeps the panel clipped via CSS instead of the
        // `hidden` attribute, so every extension stays in the server-rendered
        // HTML and readable by search engine crawlers even when collapsed.
        collapsedHeight={0}
      >
        <Collapsible.Trigger asChild>
          <HStack
            px={4}
            py={4}
            gap={3}
            cursor="pointer"
            userSelect="none"
            justify="space-between"
            _hover={{ bg: "bg.subtle" }}
          >
            <HStack gap={3} minW={0}>
              <Box
                w={10}
                h={10}
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg={`${color}.subtle`}
                color={`${color}.fg`}
                fontFamily="mono"
                fontWeight="bold"
                fontSize="xs"
                flexShrink={0}
              >
                {initials}
              </Box>
              <HStack gap={2} align="baseline" minW={0} flexWrap="wrap">
                <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold">
                  {name}
                </Text>
                <Text fontSize="sm" color="fg.muted">
                  {items.length} {items.length === 1 ? "extension" : "extensions"}
                </Text>
              </HStack>
            </HStack>

            <Collapsible.Indicator>
              <Box color="fg.muted">
                {open ? <LuChevronDown size={18} /> : <LuChevronRight size={18} />}
              </Box>
            </Collapsible.Indicator>
          </HStack>
        </Collapsible.Trigger>

        <Collapsible.Content>
          {/* pt gives the first row's translateY hover lift room — see the
              matching note on VariantSectionCard for why. */}
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={3} px={4} pt={1} pb={4}>
            {items.map((ext) => (
              <ExtensionTile key={ext.documentId} extension={ext} color={color} />
            ))}
          </SimpleGrid>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
};

// ── Main component ────────────────────────────────────────────────────────────

const SampleFilesExtensions: React.FC<Props> = ({ extensions, headerProps, grouped = false }) => {
  const { palette } = useColorPalette();
  const groups = React.useMemo(() => groupByCategory(extensions), [extensions]);

  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  // Switching category can drastically shrink the page, and the browser
  // clamps an out-of-range scroll position to the new bottom of the
  // document — dropping the user into whatever section happens to land
  // there. Realign to the top of the listing whenever the filter changes.
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
  }, [selectedCategory]);

  const activeGroup = React.useMemo(
    () => (selectedCategory ? groups.find((g) => g.key === selectedCategory) : null),
    [groups, selectedCategory],
  );

  const sidebarItems: SectionItem[] = React.useMemo(
    () => [
      { key: null, label: "All Extensions", count: extensions.length },
      ...groups.map((g) => ({ key: g.key, label: g.name, count: g.items.length })),
    ],
    [groups, extensions.length],
  );

  const totalCount = extensions.length;
  const shownCount = selectedCategory ? activeGroup?.items.length ?? 0 : totalCount;
  const contentTitle = selectedCategory ? activeGroup?.name ?? "Extensions" : "All Extensions";
  const contentSubtitle = `${shownCount} of ${totalCount} extension${totalCount !== 1 ? "s" : ""} shown`;

  return (
    <Box as="section" py={8} px={{ base: 4, md: 8 }}>
      <VStack gap={6} alignItems="start" w="full">
        <VStack gap={2} alignItems="start" w="full">
          {(headerProps.badge || (grouped && groups.length > 0)) && (
            <HStack gap={2.5} alignItems="center">
              {headerProps.badge && (
                <Text
                  textStyle={{ base: "sm", md: "md" }}
                  fontWeight="medium"
                  color={`${palette}.solid`}
                >
                  {extensions.length > 0 && (
                    <Text as="span" fontWeight="bold">
                      {extensions.length}{" "}
                    </Text>
                  )}
                  {headerProps.badge}
                </Text>
              )}
              {headerProps.badge && grouped && groups.length > 0 && (
                <Separator orientation="vertical" height={4} />
              )}
              {grouped && groups.length > 0 && (
                <Text textStyle={{ base: "sm", md: "md" }} color="fg.muted">
                  <Text as="span" fontWeight="bold" color="fg">
                    {groups.length}{" "}
                  </Text>
                  {groups.length === 1 ? "category" : "categories"}
                </Text>
              )}
            </HStack>
          )}
          <Heading as="h2" textStyle={{ base: "3xl", md: "4xl" }}>
            {headerProps.title}
          </Heading>
          {headerProps.detail && (
            <Text color="fg.muted" textStyle={{ base: "sm", md: "md" }} maxW="3xl">
              {headerProps.detail}
            </Text>
          )}
        </VStack>

        {extensions.length === 0 ? (
          <Text color="fg.muted" py={8} w="full" textAlign="center">
            No extensions found
          </Text>
        ) : grouped && groups.length > 0 ? (
          <Grid
            ref={listingRef}
            w="full"
            templateColumns={{ base: "1fr", lg: "220px 1fr" }}
            gap={{ base: 4, lg: 8 }}
          >
            <GridItem display={{ base: "none", lg: "block" }}>
              <SectionSidebar
                heading="Browse by category"
                items={sidebarItems}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
                palette={palette}
              />
            </GridItem>

            <GridItem minW={0}>
              <Box display={{ base: "block", lg: "none" }} mb={4}>
                <SectionPills
                  items={sidebarItems}
                  selected={selectedCategory}
                  onSelect={setSelectedCategory}
                  palette={palette}
                />
              </Box>

              <VStack align="start" gap={0} mb={6}>
                <Heading as="h3" fontSize="xl" fontWeight="bold">
                  {contentTitle}
                </Heading>
                <Text fontSize="sm" color="fg.muted">
                  {contentSubtitle}
                </Text>
              </VStack>

              {selectedCategory === null ? (
                <VStack gap={3} align="stretch" w="full">
                  {groups.map((g, index) => (
                    <CategorySection
                      key={g.key}
                      name={g.name}
                      items={g.items}
                      color={g.color}
                      initialOpen={index < 2}
                    />
                  ))}
                </VStack>
              ) : (
                <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={4} w="full">
                  {(activeGroup?.items ?? []).map((ext) => (
                    <ExtensionCard key={ext.documentId} extension={ext} palette={palette} />
                  ))}
                </SimpleGrid>
              )}
            </GridItem>
          </Grid>
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={4} w="full">
            {extensions.map((ext) => (
              <ExtensionCard key={ext.documentId} extension={ext} palette={palette} />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Box>
  );
};

export default SampleFilesExtensions;
