import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import JsonSearch from "@/components/Tools/JsonValidatorFormatter/Hero/JsonSearch";
import JsonSelectedNodeDetails from "@/components/Tools/JsonValidatorFormatter/Hero/JsonSelectedNodeDetails";
import JsonTypeLegend from "@/components/Tools/JsonValidatorFormatter/Hero/JsonTypeLegend";
import { useColorPalette } from "@/contexts/useColorPalette";
import {
  jsonValidatorFormatterDefaultJson,
  jsonValidatorFormatterHeroData,
} from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import {
  Box,
  Button,
  Clipboard,
  Field,
  HStack,
  SimpleGrid,
  Spacer,
  Switch,
  Tabs,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import JsonTreeNode from "./JsonTreeNode";
import type {
  JsonValue,
  SearchMatch,
  SelectedNode,
  ValidationState,
} from "./jsonValidatorFormatterTypes";
import {
  collectSearchMatches,
  computeViewerLineNumbers,
  detectJsonType,
  getAncestorPaths,
  getDisplayType,
  getNodePrefix,
  getNodeSummary,
  getSelectedNodeDetailRows,
  getSelectedNodeValueDisplay,
  tryRemoveEscapeCharacters,
  TYPE_COLORS,
  validateJson,
} from "./jsonValidatorFormatterUtils";

const JsonValidatorFormatterHero: React.FC = () => {
  const { palette } = useColorPalette();
  const heroData = jsonValidatorFormatterHeroData;
  const [activeTab, setActiveTab] = React.useState("text");
  const [jsonText, setJsonText] = React.useState(
    jsonValidatorFormatterDefaultJson,
  );
  const [validation, setValidation] = React.useState<ValidationState>(() =>
    validateJson(jsonValidatorFormatterDefaultJson),
  );
  const [selectedNode, setSelectedNode] = React.useState<SelectedNode | null>(
    null,
  );
  const [expandedPaths, setExpandedPaths] = React.useState<Set<string>>(
    () => new Set(),
  );
  const [searchTerm, setSearchTerm] = React.useState("");
  const [matches, setMatches] = React.useState<SearchMatch[]>([]);
  const [activeMatchIndex, setActiveMatchIndex] = React.useState<number>(-1);
  const [lastSearchedTerm, setLastSearchedTerm] = React.useState("");
  const [showLineNumbers, setShowLineNumbers] = React.useState(true);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const lineGutterRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (activeTab === "viewer") {
      const nextValidation = validateJson(jsonText);
      setValidation(nextValidation);

      if (nextValidation.value) {
        setSelectedNode(
          (current) =>
            current ?? {
              path: "$",
              key: "root",
              value: nextValidation.value as JsonValue,
            },
        );
      } else {
        setSelectedNode(null);
      }
    }
  }, [activeTab, jsonText]);

  const activeMatch = activeMatchIndex >= 0 ? matches[activeMatchIndex] : null;
  const matchPaths = React.useMemo(
    () => new Set(matches.map((match) => match.path)),
    [matches],
  );

  React.useEffect(() => {
    if (!activeMatch) {
      return;
    }

    setSelectedNode({
      path: activeMatch.path,
      key: activeMatch.key,
      value: activeMatch.value,
    });

    setExpandedPaths((current) => {
      const next = new Set(current);
      getAncestorPaths(activeMatch.path).forEach((path) => next.add(path));
      return next;
    });
  }, [activeMatch]);

  const handleTabChange = (details: { value: string }) => {
    setActiveTab(details.value);
  };

  const handleFormat = () => {
    const nextValidation = validateJson(jsonText);
    setValidation(nextValidation);

    if (nextValidation.formatted) {
      setJsonText(nextValidation.formatted);
    }
  };

  const handleRemoveWhiteSpace = () => {
    const nextValidation = validateJson(jsonText);
    setValidation(nextValidation);

    if (nextValidation.value !== undefined) {
      setJsonText(JSON.stringify(nextValidation.value));
    }
  };

  const handleRemoveEscapeCharacters = () => {
    setJsonText((currentText) => tryRemoveEscapeCharacters(currentText));
  };

  const handleClear = () => {
    setJsonText("");
    setValidation(validateJson(""));
    setSelectedNode(null);
    setExpandedPaths(new Set());
    setMatches([]);
    setActiveMatchIndex(-1);
    setSearchTerm("");
    setLastSearchedTerm("");
  };

  const handleTogglePath = (path: string) => {
    setExpandedPaths((current) => {
      const next = new Set(current);

      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }

      return next;
    });
  };

  const handleSelectNode = (selection: SelectedNode) => {
    setSelectedNode(selection);
  };

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();

    if (!validation.value) {
      setMatches([]);
      setActiveMatchIndex(-1);
      setLastSearchedTerm(trimmedSearchTerm);
      return;
    }

    const nextMatches = collectSearchMatches(
      validation.value,
      trimmedSearchTerm,
    );
    setMatches(nextMatches);
    setActiveMatchIndex(nextMatches.length > 0 ? 0 : -1);
    setLastSearchedTerm(trimmedSearchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setMatches([]);
    setActiveMatchIndex(-1);
    setLastSearchedTerm("");
  };

  const stepSearch = (direction: "next" | "previous") => {
    if (matches.length === 0) {
      return;
    }

    setActiveMatchIndex((current) => {
      const baseIndex = current < 0 ? 0 : current;

      if (direction === "next") {
        return (baseIndex + 1) % matches.length;
      }

      return (baseIndex - 1 + matches.length) % matches.length;
    });
  };

  const errorLine = validation.error?.line;
  const selectedNodeRows = selectedNode
    ? getSelectedNodeDetailRows(selectedNode)
    : [];

  const syncScroll = () => {
    if (lineGutterRef.current && textareaRef.current) {
      lineGutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const lineNumberMap = React.useMemo(
    () =>
      validation.value
        ? computeViewerLineNumbers(validation.value)
        : new Map<string, number>(),
    [validation.value],
  );

  return (
    <Box as="section">
      <SectionHeader
        tagline={heroData.badge}
        headline={heroData.title}
        description={heroData.description}
        headingAs="h1"
      />
      <Spacer p={4} />
      <Box borderWidth="1px" borderRadius="2xl" overflow="hidden" bg="bg.panel">
        <Tabs.Root value={activeTab} onValueChange={handleTabChange}>
          <Box px={{ base: 4, md: 6 }} pt={{ base: 4, md: 6 }}>
            <Tabs.List>
              <Tabs.Trigger value="viewer">{"Viewer"}</Tabs.Trigger>
              <Tabs.Trigger value="text">{"Text"}</Tabs.Trigger>
            </Tabs.List>
          </Box>

          <Tabs.Content value="text">
            <VStack align="stretch" gap={4} p={{ base: 4, md: 6 }}>
              <HStack gap={3} flexWrap="wrap">
                <Button
                  colorPalette={palette}
                  variant="solid"
                  onClick={handleFormat}
                >
                  {"Format"}
                </Button>
                <Clipboard.Root value={jsonText}>
                  <Clipboard.Trigger asChild>
                    <Button variant="surface">
                      <Clipboard.Indicator />
                      <Clipboard.CopyText />
                    </Button>
                  </Clipboard.Trigger>
                </Clipboard.Root>

                <Button variant="surface" onClick={handleRemoveWhiteSpace}>
                  {"Remove White Space"}
                </Button>
                <Button
                  variant="surface"
                  onClick={handleRemoveEscapeCharacters}
                >
                  {"Remove Escape Characters"}
                </Button>
                <Button variant="ghost" onClick={handleClear}>
                  {"Clear"}
                </Button>
                <Spacer />
                <Switch.Root
                  colorPalette={palette}
                  checked={showLineNumbers}
                  onCheckedChange={(e) => setShowLineNumbers(!!e.checked)}
                >
                  <Switch.HiddenInput />
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                  <Switch.Label color="fg.muted">{"Line Numbers"}</Switch.Label>
                </Switch.Root>
              </HStack>
              <Field.Root>
                <Field.Label>{heroData.textInputLabel}</Field.Label>
                <HStack
                  align="stretch"
                  gap={0}
                  w="full"
                  borderWidth="1px"
                  borderRadius="md"
                  overflow="hidden"
                  fontFamily="mono"
                  fontSize="sm"
                >
                  {showLineNumbers && (
                    <Box
                      ref={lineGutterRef}
                      minW="48px"
                      overflowY="hidden"
                      borderRightWidth="1px"
                      bg="bg.subtle"
                      color="fg.muted"
                      userSelect="none"
                      textAlign="right"
                      pt="8px"
                      pb="8px"
                      flexShrink={0}
                    >
                      {jsonText.split("\n").map((_, i) => (
                        <Box key={i} px={3} lineHeight="21px">
                          {i + 1}
                        </Box>
                      ))}
                    </Box>
                  )}
                  <Textarea
                    ref={textareaRef}
                    value={jsonText}
                    onChange={(event) => setJsonText(event.target.value)}
                    onScroll={syncScroll}
                    minH={{ base: "24rem", md: "30rem" }}
                    fontFamily="mono"
                    fontSize="sm"
                    lineHeight="21px"
                    spellCheck={false}
                    resize="vertical"
                    borderWidth={0}
                    borderRadius={0}
                    flex={1}
                    pt="8px"
                    pb="8px"
                  />
                </HStack>
              </Field.Root>
              <Text color="fg.muted">{heroData.textInputHint}</Text>
            </VStack>
          </Tabs.Content>

          <Tabs.Content value="viewer">
            <VStack align="stretch" gap={5} p={{ base: 4, md: 6 }}>
              {validation.error ? (
                <Box borderWidth="1px" borderRadius="xl" p={4}>
                  <Text fontWeight="bold" color="fg.error">
                    {heroData.validationTitle}
                  </Text>
                  <Text color="fg.muted" mt={1}>
                    {validation.error.message}
                  </Text>
                  {(validation.error.line || validation.error.column) && (
                    <Text color="fg.muted" mt={2}>
                      {`Line ${validation.error.line ?? "?"}, Column ${validation.error.column ?? "?"}`}
                    </Text>
                  )}
                  <Spacer p={2} />
                  <Box
                    maxH="20rem"
                    overflowY="auto"
                    borderWidth="1px"
                    borderRadius="lg"
                    fontFamily="mono"
                    fontSize="sm"
                  >
                    {jsonText.split("\n").map((line, index) => {
                      const lineNumber = index + 1;
                      const isErrorLine = errorLine === lineNumber;

                      return (
                        <HStack
                          key={`${lineNumber}-${line}`}
                          align="flex-start"
                          gap={0}
                          bg={
                            isErrorLine
                              ? "rgba(239, 68, 68, 0.12)"
                              : "transparent"
                          }
                        >
                          <Box
                            minW="52px"
                            px={3}
                            py={1}
                            textAlign="right"
                            color={isErrorLine ? "fg.error" : "fg.muted"}
                            borderRightWidth="1px"
                          >
                            {lineNumber}
                          </Box>
                          <Text whiteSpace="pre-wrap" px={3} py={1} flex="1">
                            {line || " "}
                          </Text>
                        </HStack>
                      );
                    })}
                  </Box>
                </Box>
              ) : validation.value ? (
                <>
                  <SimpleGrid columns={{ base: 1, xl: 2 }} gap={5}>
                    <Box borderWidth="1px" borderRadius="xl" p={4} minH="44rem">
                      <Text fontWeight="bold">{heroData.viewerTitle}</Text>
                      <Text color="fg.muted" mt={1}>
                        {heroData.viewerDescription}
                      </Text>
                      <Spacer p={2} />
                      <Box maxH="64rem" overflow="auto">
                        <Box minW="max-content" pr={2}>
                          <JsonTreeNode
                            detectJsonType={detectJsonType}
                            getNodePrefix={getNodePrefix}
                            getNodeSummary={getNodeSummary}
                            nodeKey="root"
                            value={validation.value}
                            path="$"
                            depth={0}
                            expandedPaths={expandedPaths}
                            onToggle={handleTogglePath}
                            onSelect={handleSelectNode}
                            selectedPath={selectedNode?.path ?? null}
                            matchPaths={matchPaths}
                            activeMatchPath={activeMatch?.path ?? null}
                            typeColors={TYPE_COLORS}
                            showLineNumbers={showLineNumbers}
                            lineNumberMap={lineNumberMap}
                          />
                        </Box>
                      </Box>
                      <JsonSearch
                        activeMatchPath={activeMatch?.path ?? null}
                        activeMatchIndex={activeMatchIndex}
                        matchesCount={matches.length}
                        onClear={handleClearSearch}
                        onGo={handleSearch}
                        onNext={() => stepSearch("next")}
                        onPrevious={() => stepSearch("previous")}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        searchEnabled={
                          activeTab === "viewer" && Boolean(validation.value)
                        }
                        lastSearchedTerm={lastSearchedTerm}
                      />
                    </Box>

                    <VStack align="stretch" gap={5}>
                      <JsonTypeLegend typeColors={TYPE_COLORS} />

                      <JsonSelectedNodeDetails
                        getDisplayType={getDisplayType}
                        getSelectedNodeValueDisplay={
                          getSelectedNodeValueDisplay
                        }
                        path={selectedNode?.path ?? null}
                        rows={selectedNodeRows}
                      />
                    </VStack>
                  </SimpleGrid>
                </>
              ) : null}
            </VStack>
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Box>
  );
};

export default JsonValidatorFormatterHero;
