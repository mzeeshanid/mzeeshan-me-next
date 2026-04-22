import { SampleFilesExtensionModel } from "@/apis/sampleFiles/sampleFilesExtension";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { useColorPalette } from "@/contexts/useColorPalette";
import {
  Badge,
  Box,
  Button,
  Collapsible,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { LuChevronDown, LuChevronRight, LuX } from "react-icons/lu";

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
    .map(([key, { name, items }]) => ({ key, name, items }));
}

// ── Shared card style ─────────────────────────────────────────────────────────

const cardStyle = {
  borderRadius: "2xl",
  overflow: "hidden" as const,
  borderWidth: "1px",
  borderColor: "border.subtle",
  bg: "bg",
  _dark: { bg: "whiteAlpha.50" },
};

// ── ExtensionRow ──────────────────────────────────────────────────────────────

interface ExtensionRowProps {
  extension: SampleFilesExtensionModel;
  isLast: boolean;
}

const ExtensionRow: React.FC<ExtensionRowProps> = ({ extension, isLast }) => (
  <Box>
    <Link
      href={`/tools/sample-files/extensions/${extension.slug}`}
      display="block"
      _hover={{ textDecoration: "none", bg: "bg.subtle" }}
    >
      <HStack px={4} py={3} gap={3} minH="44px" align="center">
        <Badge
          variant="subtle"
          colorPalette="gray"
          fontFamily="mono"
          fontSize="xs"
          flexShrink={0}
          px={2}
          borderRadius="md"
        >
          .{extension.slug}
        </Badge>

        <VStack gap={0.5} align="start" flex={1} minW={0}>
          <Text fontSize="sm" fontWeight="medium" lineClamp={1}>
            {extension.name}
          </Text>
          {extension.info && (
            <Text fontSize="xs" color="fg.muted" lineClamp={1}>
              {extension.info}
            </Text>
          )}
        </VStack>

        <Box color="fg.subtle" flexShrink={0}>
          <LuChevronRight size={14} />
        </Box>
      </HStack>
    </Link>

    {!isLast && (
      <Box ml="16px" borderBottomWidth="0.5px" borderColor="border.emphasized" />
    )}
  </Box>
);

// ── CategorySection ───────────────────────────────────────────────────────────

interface CategorySectionProps {
  name: string;
  items: SampleFilesExtensionModel[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ name, items }) => {
  const [open, setOpen] = React.useState(true);

  return (
    <Box mb={1}>
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
              {name}
            </Text>
            <Text fontSize="xs" color="fg.muted">{items.length}</Text>
            <Collapsible.Indicator>
              {open ? <LuChevronDown size={12} /> : <LuChevronRight size={12} />}
            </Collapsible.Indicator>
          </HStack>
        </Collapsible.Trigger>

        <Collapsible.Content>
          <Box {...cardStyle}>
            {items.map((ext, i) => (
              <ExtensionRow
                key={ext.documentId}
                extension={ext}
                isLast={i === items.length - 1}
              />
            ))}
          </Box>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
};

// ── CategoryChips ─────────────────────────────────────────────────────────────

interface CategoryChipsProps {
  categories: { key: string; name: string }[];
  selected: Set<string>;
  onToggle: (key: string) => void;
  onClear: () => void;
  palette: string;
}

const CategoryChips: React.FC<CategoryChipsProps> = ({
  categories,
  selected,
  onToggle,
  onClear,
  palette,
}) => (
  <HStack
    gap={2}
    overflowX="auto"
    pb={1}
    css={{
      scrollbarWidth: "none",
      "&::-webkit-scrollbar": { display: "none" },
    }}
  >
    {selected.size > 0 && (
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
    {categories.map((cat) => {
      const active = selected.has(cat.key);
      return (
        <Button
          key={cat.key}
          size="xs"
          variant={active ? "solid" : "outline"}
          colorPalette={active ? palette : "gray"}
          borderRadius="full"
          flexShrink={0}
          onClick={() => onToggle(cat.key)}
          px={3}
          fontWeight={active ? "semibold" : "normal"}
        >
          {cat.name}
        </Button>
      );
    })}
  </HStack>
);

// ── Main component ────────────────────────────────────────────────────────────

const SampleFilesExtensions: React.FC<Props> = ({ extensions, headerProps, grouped = false }) => {
  const { palette } = useColorPalette();
  const groups = React.useMemo(() => groupByCategory(extensions), [extensions]);

  const [selectedCategories, setSelectedCategories] = React.useState<Set<string>>(new Set());

  const visibleGroups = React.useMemo(() => {
    if (selectedCategories.size === 0) return groups;
    return groups.filter((g) => selectedCategories.has(g.key));
  }, [groups, selectedCategories]);

  const toggleCategory = React.useCallback((key: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const categoryList = React.useMemo(
    () => groups.map((g) => ({ key: g.key, name: g.name })),
    [groups],
  );

  return (
    <Box as="section" py={8} px={{ base: 4, md: 8 }}>
      <VStack gap={6} alignItems="start" w="full">
        <SectionHeader
          tagline={headerProps.badge}
          headline={headerProps.title}
          description={headerProps.detail}
        />

        {extensions.length > 0 && (
          <HStack gap={3} flexWrap="wrap">
            <HStack gap={1.5}>
              <Text fontSize="sm" fontWeight="semibold">{extensions.length}</Text>
              <Text fontSize="sm" color="fg.muted">extensions</Text>
            </HStack>
            {grouped && (
              <>
                <Box w="1px" h="14px" bg="border.subtle" />
                <HStack gap={1.5}>
                  <Text fontSize="sm" fontWeight="semibold">{groups.length}</Text>
                  <Text fontSize="sm" color="fg.muted">
                    {groups.length === 1 ? "category" : "categories"}
                  </Text>
                </HStack>
              </>
            )}
          </HStack>
        )}

        {grouped && extensions.length > 0 && (
          <CategoryChips
            categories={categoryList}
            selected={selectedCategories}
            onToggle={toggleCategory}
            onClear={() => setSelectedCategories(new Set())}
            palette={palette}
          />
        )}

        {extensions.length === 0 ? (
          <Text color="fg.muted" py={8} w="full" textAlign="center">
            No extensions found
          </Text>
        ) : grouped ? (
          <Box bg="bg.subtle" borderRadius="2xl" px={2} pb={3} w="full">
            {visibleGroups.map((g) => (
              <CategorySection
                key={g.key}
                name={g.name}
                items={g.items}
              />
            ))}
          </Box>
        ) : (
          <Box {...cardStyle} w="full">
            {extensions.map((ext, i) => (
              <ExtensionRow
                key={ext.documentId}
                extension={ext}
                isLast={i === extensions.length - 1}
              />
            ))}
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default SampleFilesExtensions;
