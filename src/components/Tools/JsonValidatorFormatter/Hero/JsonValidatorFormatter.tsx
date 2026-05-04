import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import JsonSearch from "@/components/Tools/JsonValidatorFormatter/Hero/JsonSearch";
import JsonSelectedNodeDetails from "@/components/Tools/JsonValidatorFormatter/Hero/JsonSelectedNodeDetails";
import JsonTypeLegend from "@/components/Tools/JsonValidatorFormatter/Hero/JsonTypeLegend";
import { useColorMode } from "@/components/ui/color-mode";
import { useColorPalette } from "@/contexts/useColorPalette";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useMounted } from "@/hooks/useMounted";
import {
  jsonValidatorFormatterDefaultJson,
  jsonValidatorFormatterHeroData,
} from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import {
  Box,
  Button,
  CloseButton,
  Clipboard,
  Dialog,
  Field,
  HStack,
  Input,
  Portal,
  SimpleGrid,
  Spacer,
  Tabs,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Highlight, themes } from "prism-react-renderer";
import React from "react";
import InputErrorPanel from "./InputErrorPanel";
import JsonDiffViewer from "./JsonDiffViewer";
import JsonToolSettings from "./JsonToolSettings";
import JsonTreeNode from "./JsonTreeNode";
import type {
  DiffNode,
  DiffStats,
  JsonValue,
  SearchMatch,
  SelectedNode,
  ValidationErrorDetails,
  ValidationState,
} from "./jsonValidatorFormatterTypes";
import {
  collectAllExpandablePaths,
  collectSearchMatches,
  computeJsonDiff,
  computeViewerLineNumbers,
  countDiffStats,
  detectJsonType,
  getAncestorPaths,
  getDisplayType,
  getNodePrefix,
  getNodeSummary,
  getSelectedNodeDetailRows,
  getSelectedNodeValueDisplay,
  softPrettifyJson,
  tryRemoveEscapeCharacters,
  TYPE_COLORS,
  validateJson,
} from "./jsonValidatorFormatterUtils";

const JsonValidatorFormatter: React.FC = () => {
  const { palette } = useColorPalette();
  const { colorMode } = useColorMode();
  const mounted = useMounted();
  const prismTheme = mounted
    ? colorMode === "dark"
      ? themes.gruvboxMaterialDark
      : themes.gruvboxMaterialLight
    : undefined;
  const heroData = jsonValidatorFormatterHeroData;
  const [activeTab, setActiveTab] = React.useState("input");
  const [jsonText, setJsonText] = React.useState(
    jsonValidatorFormatterDefaultJson,
  );
  const [validation, setValidation] = React.useState<ValidationState>(() =>
    validateJson(jsonValidatorFormatterDefaultJson, { indent: 2 }),
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
  const [inputError, setInputError] =
    React.useState<ValidationErrorDetails | null>(null);
  const sk = "mz-json-validator";
  const [syntaxHighlight, setSyntaxHighlight] = useLocalStorage(
    `${sk}-syntax-highlight`,
    true,
  );
  const [showLineNumbers, setShowLineNumbers] = useLocalStorage(
    `${sk}-show-line-numbers`,
    true,
  );
  const [wordWrap, setWordWrap] = useLocalStorage(`${sk}-word-wrap`, false);
  const [fontSize, setFontSize] = useLocalStorage(`${sk}-font-size`, 14);
  const [indent, setIndent] = useLocalStorage(`${sk}-indent`, 2);
  const [indentStyle, setIndentStyle] = useLocalStorage<"spaces" | "tabs">(
    `${sk}-indent-style`,
    "spaces",
  );
  const [sortKeys, setSortKeys] = useLocalStorage(`${sk}-sort-keys`, false);
  const [sortOrder, setSortOrder] = useLocalStorage<"asc" | "desc">(
    `${sk}-sort-order`,
    "asc",
  );
  const [trailingCommas, setTrailingCommas] = useLocalStorage(
    `${sk}-trailing-commas`,
    false,
  );
  const [allowComments, setAllowComments] = useLocalStorage(
    `${sk}-allow-comments`,
    false,
  );

  React.useEffect(() => {
    if (!jsonText.trim()) return;
    const next = validateJson(jsonText, {
      indent,
      indentStyle,
      sortKeys,
      sortOrder,
      trailingCommas,
      allowComments,
    });
    setValidation(next);
    if (next.formatted) setJsonText(next.formatted);
    // intentionally only re-runs when formatting options change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indent, indentStyle, sortKeys, sortOrder, trailingCommas, allowComments]);
  const [saveAsOpen, setSaveAsOpen] = React.useState(false);
  const [saveAsFilename, setSaveAsFilename] = React.useState("output.json");
  const [diffOriginal, setDiffOriginal] = React.useState("");
  const [diffModified, setDiffModified] = React.useState("");
  const [diffResult, setDiffResult] = React.useState<DiffNode | null>(null);
  const [diffStats, setDiffStats] = React.useState<DiffStats>({
    added: 0,
    removed: 0,
    changed: 0,
  });
  const [diffOriginalError, setDiffOriginalError] = React.useState<
    string | null
  >(null);
  const [diffModifiedError, setDiffModifiedError] = React.useState<
    string | null
  >(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const lineGutterRef = React.useRef<HTMLDivElement>(null);
  const inputPreRef = React.useRef<HTMLElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const diffOriginalTextareaRef = React.useRef<HTMLTextAreaElement>(null);
  const diffOriginalGutterRef = React.useRef<HTMLDivElement>(null);
  const diffModifiedTextareaRef = React.useRef<HTMLTextAreaElement>(null);
  const diffModifiedGutterRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (activeTab === "output") {
      const nextValidation = validateJson(jsonText, {
        indent,
        indentStyle,
        sortKeys,
        sortOrder,
        trailingCommas,
        allowComments,
      });
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
    // If the text looks minified, expand it first so error line numbers are meaningful
    const expanded = softPrettifyJson(jsonText, indent);
    const textToValidate = expanded !== jsonText ? expanded : jsonText;

    const nextValidation = validateJson(textToValidate, {
      indent,
      indentStyle,
      sortKeys,
      sortOrder,
      trailingCommas,
      allowComments,
    });
    setValidation(nextValidation);

    if (nextValidation.formatted) {
      setJsonText(nextValidation.formatted);
      setInputError(null);
    } else if (nextValidation.error) {
      // Apply the expanded text so line numbers in the error point to real lines
      if (textToValidate !== jsonText) setJsonText(textToValidate);
      setInputError(nextValidation.error);
    }
  };

  const handleRemoveWhiteSpace = () => {
    const nextValidation = validateJson(jsonText, { trailingCommas });
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
    setValidation(validateJson("", { indent }));
    setSelectedNode(null);
    setExpandedPaths(new Set());
    setMatches([]);
    setActiveMatchIndex(-1);
    setSearchTerm("");
    setLastSearchedTerm("");
    setInputError(null);
  };

  const handleLoadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const nextValidation = validateJson(text, {
        indent,
        indentStyle,
        sortKeys,
        sortOrder,
        trailingCommas,
        allowComments,
      });
      setJsonText(nextValidation.formatted ?? text);
      setValidation(nextValidation);
      setInputError(null);
      if (nextValidation.value) {
        setActiveTab("output");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  const handleCollapseAll = () => {
    setExpandedPaths(new Set());
  };

  const handleExpandAll = () => {
    if (validation.value) {
      setExpandedPaths(collectAllExpandablePaths(validation.value));
    }
  };

  const triggerJsonDownload = (filename: string) => {
    const content = validation.formatted ?? jsonText;
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveJson = () => {
    triggerJsonDownload("output.json");
  };

  const handleSaveJsonAs = () => {
    setSaveAsFilename("output.json");
    setSaveAsOpen(true);
  };

  const handleSaveAsConfirm = () => {
    const trimmed = saveAsFilename.trim() || "output.json";
    const filename = trimmed.endsWith(".json") ? trimmed : `${trimmed}.json`;
    triggerJsonDownload(filename);
    setSaveAsOpen(false);
  };

  const handleCompare = () => {
    setDiffOriginalError(null);
    setDiffModifiedError(null);
    const origV = validateJson(diffOriginal, { trailingCommas, allowComments });
    const modV = validateJson(diffModified, { trailingCommas, allowComments });
    if (origV.error) {
      setDiffOriginalError(origV.error.message);
      return;
    }
    if (modV.error) {
      setDiffModifiedError(modV.error.message);
      return;
    }
    const result = computeJsonDiff(origV.value!, modV.value!);
    setDiffResult(result);
    setDiffStats(countDiffStats(result));
  };

  const handleSwap = () => {
    setDiffOriginal(diffModified);
    setDiffModified(diffOriginal);
    setDiffResult(null);
    setDiffOriginalError(null);
    setDiffModifiedError(null);
  };

  const handleClearDiff = () => {
    setDiffOriginal("");
    setDiffModified("");
    setDiffResult(null);
    setDiffOriginalError(null);
    setDiffModifiedError(null);
  };

  const handleReset = () => {
    setSyntaxHighlight(true);
    setShowLineNumbers(true);
    setWordWrap(false);
    setFontSize(14);
    setIndent(2);
    setIndentStyle("spaces");
    setSortKeys(false);
    setSortOrder("asc");
    setTrailingCommas(false);
    setAllowComments(false);
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
    if (!textareaRef.current) return;
    // Batch all reads before any writes to avoid forced reflow
    const scrollTop = textareaRef.current.scrollTop;
    const scrollLeft = textareaRef.current.scrollLeft;
    if (lineGutterRef.current) {
      lineGutterRef.current.scrollTop = scrollTop;
    }
    if (inputPreRef.current) {
      inputPreRef.current.scrollTop = scrollTop;
      inputPreRef.current.scrollLeft = scrollLeft;
    }
  };

  const syncDiffOriginalScroll = () => {
    if (!diffOriginalTextareaRef.current || !diffOriginalGutterRef.current)
      return;
    diffOriginalGutterRef.current.scrollTop =
      diffOriginalTextareaRef.current.scrollTop;
  };

  const syncDiffModifiedScroll = () => {
    if (!diffModifiedTextareaRef.current || !diffModifiedGutterRef.current)
      return;
    diffModifiedGutterRef.current.scrollTop =
      diffModifiedTextareaRef.current.scrollTop;
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
      />
      <Spacer p={4} />
      <Box borderWidth="1px" borderRadius="2xl" overflow="hidden" bg="bg.panel">
        <Tabs.Root value={activeTab} onValueChange={handleTabChange}>
          <Box px={{ base: 4, md: 6 }} pt={{ base: 4, md: 6 }}>
            <Tabs.List>
              <Tabs.Trigger value="input">{"Input"}</Tabs.Trigger>
              <Tabs.Trigger value="output">{"Output"}</Tabs.Trigger>
              <Tabs.Trigger value="diff">{"Diff"}</Tabs.Trigger>
            </Tabs.List>
          </Box>

          <Tabs.Content value="input">
            <VStack align="stretch" gap={4} p={{ base: 4, md: 6 }}>
              <HStack gap={3} flexWrap="wrap">
                <Button
                  colorPalette={palette}
                  variant="solid"
                  onClick={() => {
                    const expanded = softPrettifyJson(jsonText, indent);
                    const textToValidate =
                      expanded !== jsonText ? expanded : jsonText;
                    const nextValidation = validateJson(textToValidate, {
                      indent,
                      indentStyle,
                      sortKeys,
                      sortOrder,
                      trailingCommas,
                      allowComments,
                    });
                    setValidation(nextValidation);
                    if (nextValidation.error) {
                      if (textToValidate !== jsonText)
                        setJsonText(textToValidate);
                      setInputError(nextValidation.error);
                    } else {
                      setInputError(null);
                      setActiveTab("output");
                    }
                  }}
                >
                  {"Validate"}
                </Button>
                <Button variant="surface" onClick={handleFormat}>
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
                <Button
                  variant="surface"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {"Load File"}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,.txt,application/json,text/plain"
                  style={{ display: "none" }}
                  onChange={handleLoadFile}
                />
                <Button variant="surface" onClick={handleRemoveWhiteSpace}>
                  {"Remove White Space"}
                </Button>
                <Button
                  variant="surface"
                  onClick={handleRemoveEscapeCharacters}
                >
                  {"Remove Escape Chars"}
                </Button>
                <Button variant="ghost" onClick={handleClear}>
                  {"Clear"}
                </Button>
                <Spacer />
                <JsonToolSettings
                  syntaxHighlight={syntaxHighlight}
                  onSyntaxHighlightChange={setSyntaxHighlight}
                  showLineNumbers={showLineNumbers}
                  onShowLineNumbersChange={setShowLineNumbers}
                  wordWrap={wordWrap}
                  onWordWrapChange={setWordWrap}
                  fontSize={fontSize}
                  onFontSizeChange={setFontSize}
                  showIndent
                  indent={indent}
                  onIndentChange={setIndent}
                  indentStyle={indentStyle}
                  onIndentStyleChange={setIndentStyle}
                  sortKeys={sortKeys}
                  onSortKeysChange={setSortKeys}
                  sortOrder={sortOrder}
                  onSortOrderChange={setSortOrder}
                  trailingCommas={trailingCommas}
                  onTrailingCommasChange={setTrailingCommas}
                  allowComments={allowComments}
                  onAllowCommentsChange={setAllowComments}
                  onResetSettings={handleReset}
                />
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
                  <Box
                    position="relative"
                    flex={1}
                    minH={{ base: "24rem", md: "30rem" }}
                  >
                    {syntaxHighlight && prismTheme && (
                      <Box
                        as="pre"
                        ref={inputPreRef}
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        pointerEvents="none"
                        overflow="hidden"
                        fontFamily="mono"
                        fontSize={`${fontSize}px`}
                        lineHeight="21px"
                        whiteSpace={wordWrap ? "pre-wrap" : "pre"}
                        overflowWrap={wordWrap ? "anywhere" : undefined}
                        pt="8px"
                        pb="8px"
                        px="12px"
                        m={0}
                        zIndex={0}
                      >
                        <Highlight
                          code={jsonText || " "}
                          language="json"
                          theme={prismTheme}
                        >
                          {({ tokens, getLineProps, getTokenProps }) =>
                            tokens.map((line, i) => (
                              <div key={i} {...getLineProps({ line })}>
                                {line.map((token, key) => (
                                  <span
                                    key={key}
                                    {...getTokenProps({ token })}
                                  />
                                ))}
                              </div>
                            ))
                          }
                        </Highlight>
                      </Box>
                    )}
                    <Textarea
                      ref={textareaRef}
                      value={jsonText}
                      onChange={(event) => {
                        setJsonText(event.target.value);
                        setInputError(null);
                      }}
                      onScroll={syncScroll}
                      h="full"
                      minH={{ base: "24rem", md: "30rem" }}
                      fontFamily="mono"
                      fontSize={`${fontSize}px`}
                      lineHeight="21px"
                      spellCheck={false}
                      resize="vertical"
                      whiteSpace={wordWrap ? "pre-wrap" : "pre"}
                      overflowWrap={wordWrap ? "anywhere" : undefined}
                      borderWidth={0}
                      borderRadius={0}
                      position="relative"
                      zIndex={1}
                      bg="transparent"
                      color={
                        syntaxHighlight && prismTheme
                          ? "transparent"
                          : undefined
                      }
                      style={
                        syntaxHighlight && prismTheme
                          ? {
                              caretColor:
                                colorMode === "dark" ? "white" : "black",
                            }
                          : undefined
                      }
                      px="12px"
                      pt="8px"
                      pb="8px"
                    />
                  </Box>
                </HStack>
              </Field.Root>
              {inputError && (
                <InputErrorPanel
                  error={inputError}
                  text={jsonText}
                  onDismiss={() => setInputError(null)}
                />
              )}
              <Text color="fg.muted">{heroData.textInputHint}</Text>
            </VStack>
          </Tabs.Content>

          <Tabs.Content value="output">
            <VStack align="stretch" gap={5} p={{ base: 4, md: 6 }}>
              <HStack gap={3} flexWrap="wrap">
                <Clipboard.Root value={validation.formatted ?? jsonText}>
                  <Clipboard.Trigger asChild>
                    <Button variant="surface" disabled={!validation.value}>
                      <Clipboard.Indicator />
                      <Clipboard.CopyText />
                    </Button>
                  </Clipboard.Trigger>
                </Clipboard.Root>
                <Button
                  variant="surface"
                  disabled={!validation.value}
                  onClick={handleCollapseAll}
                >
                  {"Collapse All"}
                </Button>
                <Button
                  variant="surface"
                  disabled={!validation.value}
                  onClick={handleExpandAll}
                >
                  {"Expand All"}
                </Button>
                <Button
                  variant="surface"
                  disabled={!validation.value}
                  onClick={handleSaveJson}
                >
                  {"Save"}
                </Button>
                <Button
                  variant="surface"
                  disabled={!validation.value}
                  onClick={handleSaveJsonAs}
                >
                  {"Save As"}
                </Button>
                <Spacer />
                <JsonToolSettings
                  syntaxHighlight={syntaxHighlight}
                  onSyntaxHighlightChange={setSyntaxHighlight}
                  showLineNumbers={showLineNumbers}
                  onShowLineNumbersChange={setShowLineNumbers}
                  wordWrap={wordWrap}
                  onWordWrapChange={setWordWrap}
                  fontSize={fontSize}
                  onFontSizeChange={setFontSize}
                  showIndent={false}
                />
              </HStack>
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
                          activeTab === "output" && Boolean(validation.value)
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
          <Tabs.Content value="diff">
            <VStack align="stretch" gap={4} p={{ base: 4, md: 6 }}>
              <HStack gap={3} flexWrap="wrap">
                <Button
                  colorPalette={palette}
                  variant="solid"
                  onClick={handleCompare}
                >
                  {"Compare"}
                </Button>
                <Button variant="surface" onClick={handleSwap}>
                  {"Swap"}
                </Button>
                <Button variant="ghost" onClick={handleClearDiff}>
                  {"Clear"}
                </Button>
              </HStack>

              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                <Field.Root invalid={Boolean(diffOriginalError)}>
                  <Field.Label>{"Original JSON"}</Field.Label>
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
                    <Box
                      ref={diffOriginalGutterRef}
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
                      {(diffOriginal || " ").split("\n").map((_, i) => (
                        <Box key={i} px={3} lineHeight="21px">
                          {i + 1}
                        </Box>
                      ))}
                    </Box>
                    <Textarea
                      ref={diffOriginalTextareaRef}
                      value={diffOriginal}
                      onChange={(e) => {
                        setDiffOriginal(e.target.value);
                        setDiffOriginalError(null);
                      }}
                      onScroll={syncDiffOriginalScroll}
                      placeholder={"Paste original JSON here…"}
                      minH={{ base: "14rem", md: "18rem" }}
                      fontFamily="mono"
                      fontSize="sm"
                      lineHeight="21px"
                      spellCheck={false}
                      resize="vertical"
                      borderWidth={0}
                      borderRadius={0}
                      pt="8px"
                      pb="8px"
                      px="12px"
                    />
                  </HStack>
                  {diffOriginalError && (
                    <Field.ErrorText>{diffOriginalError}</Field.ErrorText>
                  )}
                </Field.Root>

                <Field.Root invalid={Boolean(diffModifiedError)}>
                  <Field.Label>{"Modified JSON"}</Field.Label>
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
                    <Box
                      ref={diffModifiedGutterRef}
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
                      {(diffModified || " ").split("\n").map((_, i) => (
                        <Box key={i} px={3} lineHeight="21px">
                          {i + 1}
                        </Box>
                      ))}
                    </Box>
                    <Textarea
                      ref={diffModifiedTextareaRef}
                      value={diffModified}
                      onChange={(e) => {
                        setDiffModified(e.target.value);
                        setDiffModifiedError(null);
                      }}
                      onScroll={syncDiffModifiedScroll}
                      placeholder={"Paste modified JSON here…"}
                      minH={{ base: "14rem", md: "18rem" }}
                      fontFamily="mono"
                      fontSize="sm"
                      lineHeight="21px"
                      spellCheck={false}
                      resize="vertical"
                      borderWidth={0}
                      borderRadius={0}
                      pt="8px"
                      pb="8px"
                      px="12px"
                    />
                  </HStack>
                  {diffModifiedError && (
                    <Field.ErrorText>{diffModifiedError}</Field.ErrorText>
                  )}
                </Field.Root>
              </SimpleGrid>

              {diffResult && (
                <Box borderWidth="1px" borderRadius="xl" p={4}>
                  <Text fontWeight="bold" mb={3}>
                    {"Diff Result"}
                  </Text>
                  <JsonDiffViewer diff={diffResult} stats={diffStats} />
                </Box>
              )}
            </VStack>
          </Tabs.Content>
        </Tabs.Root>
      </Box>

      <Dialog.Root
        open={saveAsOpen}
        onOpenChange={(e) => setSaveAsOpen(e.open)}
        size="sm"
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header fontWeight="bold">{"Save As"}</Dialog.Header>
              <Dialog.Body>
                <Field.Root>
                  <Field.Label>{"File name"}</Field.Label>
                  <Input
                    value={saveAsFilename}
                    onChange={(e) => setSaveAsFilename(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveAsConfirm();
                    }}
                    autoFocus
                  />
                  <Field.HelperText>
                    {".json will be appended if omitted"}
                  </Field.HelperText>
                </Field.Root>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">{"Cancel"}</Button>
                </Dialog.ActionTrigger>
                <Button colorPalette={palette} onClick={handleSaveAsConfirm}>
                  {"Save"}
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
};

export default JsonValidatorFormatter;
