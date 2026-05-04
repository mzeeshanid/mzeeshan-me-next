import { Badge, Box, Checkbox, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import type { DiffNode, DiffStats, JsonValue } from "./jsonValidatorFormatterTypes";
import { collectDefaultExpandedDiffPaths } from "./jsonValidatorFormatterUtils";

const formatValue = (value: JsonValue | undefined): string => {
  if (value === undefined) return "";
  if (value === null) return "null";
  if (typeof value === "string") return `"${value}"`;
  if (typeof value === "boolean" || typeof value === "number") return String(value);
  if (Array.isArray(value)) {
    const n = value.length;
    return n === 0 ? "[]" : `[${n} ${n === 1 ? "item" : "items"}]`;
  }
  const n = Object.keys(value as Record<string, unknown>).length;
  return n === 0 ? "{}" : `{${n} ${n === 1 ? "key" : "keys"}}`;
};

const formatKey = (key: string, depth: number): string => {
  if (depth === 0) return "root";
  return /^\d+$/.test(key) ? `[${key}]` : key;
};

const ROW_BG: Record<string, string> = {
  added: "rgba(34,197,94,0.08)",
  removed: "rgba(239,68,68,0.08)",
  changed: "rgba(234,179,8,0.10)",
  unchanged: "transparent",
  nested: "transparent",
};

const PREFIX_COLOR: Record<string, string> = {
  added: "green.fg",
  removed: "red.fg",
  changed: "orange.fg",
  unchanged: "fg.muted",
  nested: "fg.muted",
};

const PREFIX_SYMBOL: Record<string, string> = {
  added: "+",
  removed: "−",
  changed: "~",
  unchanged: " ",
  nested: " ",
};

interface RowProps {
  node: DiffNode;
  depth: number;
  path: string;
  expandedPaths: Set<string>;
  onToggle: (path: string) => void;
  hideUnchanged: boolean;
}

const diffNodeHasChange = (node: DiffNode): boolean => {
  if (node.type === "added" || node.type === "removed" || node.type === "changed") return true;
  return (node.children ?? []).some(diffNodeHasChange);
};

const DiffRow: React.FC<RowProps> = ({ node, depth, path, expandedPaths, onToggle, hideUnchanged }) => {
  const hasChildren = (node.children?.length ?? 0) > 0;
  const isExpanded = expandedPaths.has(path);

  if (hideUnchanged && node.type === "unchanged") return null;
  if (hideUnchanged && node.type === "nested" && !diffNodeHasChange(node)) return null;

  const bg = ROW_BG[node.type] ?? "transparent";
  const prefixColor = PREFIX_COLOR[node.type] ?? "fg.muted";
  const prefix = PREFIX_SYMBOL[node.type] ?? " ";
  const displayKey = formatKey(node.key, depth);
  const isChanged = node.type !== "unchanged" && node.type !== "nested";

  const visibleChildren = hasChildren && isExpanded
    ? hideUnchanged
      ? node.children!.filter((c) => c.type !== "unchanged" && (c.type !== "nested" || diffNodeHasChange(c)))
      : node.children!
    : [];

  return (
    <>
      <HStack
        gap={0}
        bg={bg}
        cursor={hasChildren ? "pointer" : "default"}
        onClick={hasChildren ? () => onToggle(path) : undefined}
        _hover={hasChildren ? { opacity: 0.85 } : undefined}
        px={2}
        py="2px"
        borderRadius="sm"
        minH="22px"
        align="center"
      >
        <Box w={`${depth * 20}px`} flexShrink={0} />

        <Text
          fontFamily="mono"
          fontSize="sm"
          color={prefixColor}
          w="18px"
          flexShrink={0}
          fontWeight="bold"
          lineHeight="inherit"
        >
          {prefix}
        </Text>

        {hasChildren ? (
          <Text color="fg.muted" fontSize="10px" w="14px" flexShrink={0} lineHeight="inherit">
            {isExpanded ? "▾" : "▸"}
          </Text>
        ) : (
          <Box w="14px" flexShrink={0} />
        )}

        <Text
          fontFamily="mono"
          fontSize="sm"
          fontWeight={isChanged ? "semibold" : "normal"}
          color={isChanged ? prefixColor : "fg"}
          lineHeight="inherit"
        >
          {displayKey}
        </Text>

        {node.type === "changed" && (
          <HStack gap={1} ml={1} flexShrink={1} overflow="hidden">
            <Text fontFamily="mono" fontSize="sm" color="fg.muted">{":"}</Text>
            <Text fontFamily="mono" fontSize="sm" color="red.fg" textDecoration="line-through" flexShrink={1} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
              {formatValue(node.oldValue)}
            </Text>
            <Text fontFamily="mono" fontSize="sm" color="fg.muted">{"→"}</Text>
            <Text fontFamily="mono" fontSize="sm" color="green.fg" flexShrink={1} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
              {formatValue(node.newValue)}
            </Text>
          </HStack>
        )}

        {node.type === "added" && (
          <Text fontFamily="mono" fontSize="sm" color="green.fg" ml={1} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
            {hasChildren && !isExpanded ? `: ${formatValue(node.newValue)}` : hasChildren ? "" : `: ${formatValue(node.newValue)}`}
          </Text>
        )}

        {node.type === "removed" && (
          <Text fontFamily="mono" fontSize="sm" color="red.fg" ml={1} textDecoration="line-through" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
            {hasChildren && !isExpanded ? `: ${formatValue(node.oldValue)}` : hasChildren ? "" : `: ${formatValue(node.oldValue)}`}
          </Text>
        )}

        {(node.type === "unchanged" || node.type === "nested") && !isExpanded && (
          <Text fontFamily="mono" fontSize="sm" color="fg.muted" ml={1} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
            {`: ${formatValue(node.newValue ?? node.oldValue)}`}
          </Text>
        )}
      </HStack>

      {visibleChildren.map((child, i) => (
        <DiffRow
          key={`${child.key}-${i}`}
          node={child}
          depth={depth + 1}
          path={`${path}.${child.key}`}
          expandedPaths={expandedPaths}
          onToggle={onToggle}
          hideUnchanged={hideUnchanged}
        />
      ))}
    </>
  );
};

interface JsonDiffViewerProps {
  diff: DiffNode;
  stats: DiffStats;
}

const JsonDiffViewer: React.FC<JsonDiffViewerProps> = ({ diff, stats }) => {
  const [expandedPaths, setExpandedPaths] = React.useState<Set<string>>(() =>
    collectDefaultExpandedDiffPaths(diff),
  );
  const [hideUnchanged, setHideUnchanged] = React.useState(false);

  React.useEffect(() => {
    setExpandedPaths(collectDefaultExpandedDiffPaths(diff));
    setHideUnchanged(false);
  }, [diff]);

  const handleToggle = (path: string) => {
    setExpandedPaths((current) => {
      const next = new Set(current);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const isIdentical = stats.added === 0 && stats.removed === 0 && stats.changed === 0;

  return (
    <VStack align="stretch" gap={3}>
      <HStack gap={3} flexWrap="wrap" justify="space-between">
        <HStack gap={2} flexWrap="wrap">
          {isIdentical ? (
            <Badge colorPalette="gray" variant="subtle">{"Identical — no differences found"}</Badge>
          ) : (
            <>
              {stats.added > 0 && (
                <Badge colorPalette="green" variant="subtle">{`+${stats.added} added`}</Badge>
              )}
              {stats.removed > 0 && (
                <Badge colorPalette="red" variant="subtle">{`−${stats.removed} removed`}</Badge>
              )}
              {stats.changed > 0 && (
                <Badge colorPalette="orange" variant="subtle">{`~${stats.changed} changed`}</Badge>
              )}
            </>
          )}
        </HStack>
        {!isIdentical && (
          <Checkbox.Root
            size="sm"
            checked={hideUnchanged}
            onCheckedChange={(e) => setHideUnchanged(Boolean(e.checked))}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label fontSize="sm" color="fg.muted">{"Hide unchanged"}</Checkbox.Label>
          </Checkbox.Root>
        )}
      </HStack>

      <HStack gap={4} fontSize="xs" color="fg.muted">
        <HStack gap={1}>
          <Text fontFamily="mono" color="green.fg" fontWeight="bold">{" + "}</Text>
          <Text>{"added"}</Text>
        </HStack>
        <HStack gap={1}>
          <Text fontFamily="mono" color="red.fg" fontWeight="bold">{" − "}</Text>
          <Text>{"removed"}</Text>
        </HStack>
        <HStack gap={1}>
          <Text fontFamily="mono" color="orange.fg" fontWeight="bold">{" ~ "}</Text>
          <Text>{"changed"}</Text>
        </HStack>
      </HStack>

      <Box borderWidth="1px" borderRadius="lg" overflow="auto" maxH="40rem" p={2}>
        <Box minW="max-content">
          <DiffRow
            node={diff}
            depth={0}
            path="$"
            expandedPaths={expandedPaths}
            onToggle={handleToggle}
            hideUnchanged={hideUnchanged}
          />
        </Box>
      </Box>
    </VStack>
  );
};

export default JsonDiffViewer;
