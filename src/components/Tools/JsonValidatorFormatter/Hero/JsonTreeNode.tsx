import { Box, Button, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { FaChevronDown, FaChevronRight, FaCircle } from "react-icons/fa6";

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };
type JsonTypeName =
  | "object"
  | "array"
  | "string"
  | "number"
  | "boolean"
  | "null";

type SelectedNode = {
  path: string;
  key: string;
  value: JsonValue;
};

type Props = {
  detectJsonType: (value: JsonValue) => JsonTypeName;
  getNodePrefix: (type: JsonTypeName) => string | null;
  getNodeSummary: (value: JsonValue) => string;
  nodeKey: string;
  value: JsonValue;
  path: string;
  depth: number;
  expandedPaths: Set<string>;
  onToggle: (path: string) => void;
  onSelect: (selection: SelectedNode) => void;
  selectedPath: string | null;
  matchPaths: Set<string>;
  activeMatchPath: string | null;
  typeColors: Record<JsonTypeName, string>;
};

const JsonTreeNode: React.FC<Props> = ({
  detectJsonType,
  getNodePrefix,
  getNodeSummary,
  nodeKey,
  value,
  path,
  depth,
  expandedPaths,
  onToggle,
  onSelect,
  selectedPath,
  matchPaths,
  activeMatchPath,
  typeColors,
}) => {
  const type = detectJsonType(value);
  const isExpandable = type === "object" || type === "array";
  const isExpanded = expandedPaths.has(path);
  const isSelected = selectedPath === path;
  const isMatch = matchPaths.has(path);
  const isActiveMatch = activeMatchPath === path;

  const children =
    type === "array"
      ? (value as JsonValue[]).map((item, index) => ({
          key: String(index),
          value: item,
          path: `${path}.${index}`,
        }))
      : type === "object"
        ? Object.entries(value as Record<string, JsonValue>).map(
            ([key, child]) => ({
              key,
              value: child,
              path: `${path}.${key}`,
            }),
          )
        : [];

  return (
    <Box minW="max-content">
      <HStack
        gap={2}
        align="flex-start"
        pl={depth * 8}
        py={1.5}
        px={2}
        minW="max-content"
        borderRadius="md"
        bg={
          isActiveMatch
            ? "rgba(250, 204, 21, 0.22)"
            : isSelected
              ? "bg.emphasized"
              : isMatch
                ? "rgba(250, 204, 21, 0.12)"
                : "transparent"
        }
      >
        {isExpandable ? (
          <Button
            size="2xs"
            variant="ghost"
            onClick={() => onToggle(path)}
            aria-label={isExpanded ? "Collapse node" : "Expand node"}
          >
            {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
          </Button>
        ) : (
          <Box w="28px" />
        )}
        <Button
          variant="ghost"
          size="sm"
          justifyContent="flex-start"
          px={1}
          h="auto"
          whiteSpace="nowrap"
          onClick={() => onSelect({ path, key: nodeKey, value })}
        >
          <HStack align="center" gap={2} flexWrap="nowrap">
            <Icon
              as={FaCircle}
              color={`${typeColors[type]}.solid`}
              boxSize={3}
            />
            {getNodePrefix(type) && (
              <Text fontFamily="mono" fontWeight="bold">
                {getNodePrefix(type)}
              </Text>
            )}
            <Text fontFamily="mono" fontWeight="semibold">
              {nodeKey}
            </Text>
            <Text color="fg.subtle" fontFamily="mono">
              {getNodeSummary(value)}
            </Text>
          </HStack>
        </Button>
      </HStack>
      {isExpandable && isExpanded && (
        <VStack
          align="stretch"
          gap={0}
          ml={6}
          borderLeftWidth="1px"
          borderLeftStyle="dashed"
          borderColor="border"
        >
          {children.map((child) => (
            <JsonTreeNode
              key={child.path}
              detectJsonType={detectJsonType}
              getNodePrefix={getNodePrefix}
              getNodeSummary={getNodeSummary}
              nodeKey={child.key}
              value={child.value}
              path={child.path}
              depth={depth + 1}
              expandedPaths={expandedPaths}
              onToggle={onToggle}
              onSelect={onSelect}
              selectedPath={selectedPath}
              matchPaths={matchPaths}
              activeMatchPath={activeMatchPath}
              typeColors={typeColors}
            />
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default JsonTreeNode;
