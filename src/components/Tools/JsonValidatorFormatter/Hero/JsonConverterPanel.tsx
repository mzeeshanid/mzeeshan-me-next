import { useColorMode } from "@/components/ui/color-mode";
import { useColorPalette } from "@/contexts/useColorPalette";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useMounted } from "@/hooks/useMounted";
import {
  Box,
  Button,
  Clipboard,
  Field,
  HStack,
  Spacer,
  Tabs,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Highlight, themes } from "prism-react-renderer";
import React from "react";
import { softPrettifyJson, stripTrailingCommas, tryRemoveEscapeCharacters, validateJson } from "./jsonValidatorFormatterUtils";
import InputErrorPanel from "./InputErrorPanel";
import JsonToolSettings, { ToolId } from "./JsonToolSettings";
import type { ValidationErrorDetails } from "./jsonValidatorFormatterTypes";

type ConvertOpts = { sortKeys: boolean; sortOrder: "asc" | "desc"; allowComments: boolean };

type Props = {
  storageKey: string;
  inputValue: string;
  onInputChange: (value: string) => void;
  outputValue: string;
  outputError?: string;
  inputLabel: string;
  outputLabel: string;
  convertButtonLabel: string;
  inputHint: string;
  onConvert: (processedInput: string, opts: ConvertOpts) => void;
  onClear: () => void;
  // Tool-specific
  toolId?: ToolId;
  // CSV
  csvDelimiter?: string;
  onCsvDelimiterChange?: (value: string) => void;
  onResetToolSettings?: () => void;
  // XML
  xmlRootTag?: string;
  onXmlRootTagChange?: (value: string) => void;
  // TypeScript
  tsExportStyle?: "interface" | "type";
  onTsExportStyleChange?: (value: "interface" | "type") => void;
  tsOptionalFields?: "all" | "nulls-only";
  onTsOptionalFieldsChange?: (value: "all" | "nulls-only") => void;
  // YAML
  yamlQuoteStyle?: "minimal" | "always";
  onYamlQuoteStyleChange?: (value: "minimal" | "always") => void;
};

/**
 * Shared converter panel used by every JSON → X converter component.
 * Two tabs: Input (paste + convert) and Output (result + copy).
 * Clicking Convert auto-switches to the Output tab.
 */
const JsonConverterPanel: React.FC<Props> = ({
  storageKey,
  inputValue,
  onInputChange,
  outputValue,
  outputError,
  inputLabel,
  outputLabel,
  convertButtonLabel,
  inputHint,
  onConvert,
  onClear,
  toolId,
  csvDelimiter,
  onCsvDelimiterChange,
  onResetToolSettings,
  xmlRootTag,
  onXmlRootTagChange,
  tsExportStyle,
  onTsExportStyleChange,
  tsOptionalFields,
  onTsOptionalFieldsChange,
  yamlQuoteStyle,
  onYamlQuoteStyleChange,
}) => {
  const { palette } = useColorPalette();
  const { colorMode } = useColorMode();
  const mounted = useMounted();
  const prismTheme = mounted
    ? colorMode === "dark"
      ? themes.gruvboxMaterialDark
      : themes.gruvboxMaterialLight
    : undefined;
  const [activeTab, setActiveTab] = React.useState("input");
  const [inputError, setInputError] = React.useState<ValidationErrorDetails | null>(null);

  const sk = `mz-json-${storageKey}`;
  const [syntaxHighlight, setSyntaxHighlight] = useLocalStorage(`${sk}-syntax-highlight`, true);
  const [showLineNumbers, setShowLineNumbers] = useLocalStorage(`${sk}-show-line-numbers`, true);
  const [wordWrap, setWordWrap] = useLocalStorage(`${sk}-word-wrap`, false);
  const [fontSize, setFontSize] = useLocalStorage(`${sk}-font-size`, 14);
  const [indent, setIndent] = useLocalStorage(`${sk}-indent`, 2);
  const [indentStyle, setIndentStyle] = useLocalStorage<"spaces" | "tabs">(`${sk}-indent-style`, "spaces");
  const [sortKeys, setSortKeys] = useLocalStorage(`${sk}-sort-keys`, false);
  const [sortOrder, setSortOrder] = useLocalStorage<"asc" | "desc">(`${sk}-sort-order`, "asc");
  const [trailingCommas, setTrailingCommas] = useLocalStorage(`${sk}-trailing-commas`, false);
  const [allowComments, setAllowComments] = useLocalStorage(`${sk}-allow-comments`, false);

  React.useEffect(() => {
    if (!inputValue.trim()) return;
    const next = validateJson(inputValue, { indent, indentStyle, sortKeys, sortOrder, trailingCommas, allowComments });
    if (next.formatted) onInputChange(next.formatted);
    // intentionally only re-runs when formatting options change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indent, indentStyle, sortKeys, sortOrder, trailingCommas, allowComments]);

  const inputTextareaRef = React.useRef<HTMLTextAreaElement>(null);
  const inputGutterRef = React.useRef<HTMLDivElement>(null);
  const inputPreRef = React.useRef<HTMLElement>(null);
  const outputTextareaRef = React.useRef<HTMLTextAreaElement>(null);
  const outputGutterRef = React.useRef<HTMLDivElement>(null);
  const outputPreRef = React.useRef<HTMLElement>(null);

  const syncInputScroll = () => {
    if (inputGutterRef.current && inputTextareaRef.current) {
      inputGutterRef.current.scrollTop = inputTextareaRef.current.scrollTop;
    }
    if (inputPreRef.current && inputTextareaRef.current) {
      inputPreRef.current.scrollTop = inputTextareaRef.current.scrollTop;
      inputPreRef.current.scrollLeft = inputTextareaRef.current.scrollLeft;
    }
  };

  const syncOutputScroll = () => {
    if (outputGutterRef.current && outputTextareaRef.current) {
      outputGutterRef.current.scrollTop = outputTextareaRef.current.scrollTop;
    }
    if (outputPreRef.current && outputTextareaRef.current) {
      outputPreRef.current.scrollTop = outputTextareaRef.current.scrollTop;
      outputPreRef.current.scrollLeft = outputTextareaRef.current.scrollLeft;
    }
  };

  const handleConvert = () => {
    const processedInput = trailingCommas ? stripTrailingCommas(inputValue) : inputValue;
    if (trailingCommas && processedInput !== inputValue) onInputChange(processedInput);
    onConvert(processedInput, { sortKeys, sortOrder, allowComments });
    setActiveTab("output");
  };

  const handleClear = () => {
    onClear();
    setActiveTab("input");
    setInputError(null);
  };

  const handleFormat = () => {
    const expanded = softPrettifyJson(inputValue, indent);
    const textToValidate = expanded !== inputValue ? expanded : inputValue;
    const result = validateJson(textToValidate, { indent, indentStyle, sortKeys, sortOrder, trailingCommas, allowComments });
    if (result.formatted) {
      onInputChange(result.formatted);
      setInputError(null);
    } else if (result.error) {
      if (textToValidate !== inputValue) onInputChange(textToValidate);
      setInputError(result.error);
    }
  };

  const handleRemoveWhiteSpace = () => {
    const { value } = validateJson(inputValue, { trailingCommas });
    if (value !== undefined) {
      onInputChange(JSON.stringify(value));
    }
  };

  const handleRemoveEscapeCharacters = () => {
    onInputChange(tryRemoveEscapeCharacters(inputValue));
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
    onResetToolSettings?.();
  };

  const textareaWithGutter = (
    value: string,
    onChange: ((v: string) => void) | null,
    textareaRef: React.RefObject<HTMLTextAreaElement | null>,
    gutterRef: React.RefObject<HTMLDivElement | null>,
    preRef: React.RefObject<HTMLElement | null>,
    onScroll: () => void,
    placeholder: string,
    readOnly = false,
  ) => (
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
          ref={gutterRef}
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
          {(value || " ").split("\n").map((_, i) => (
            <Box key={i} px={3} lineHeight="21px">
              {i + 1}
            </Box>
          ))}
        </Box>
      )}
      <Box position="relative" flex={1} minH={{ base: "20rem", md: "24rem" }}>
        {syntaxHighlight && prismTheme && (
          <Box
            as="pre"
            ref={preRef}
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
            <Highlight code={value || " "} language="json" theme={prismTheme}>
              {({ tokens, getLineProps, getTokenProps }) =>
                tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))
              }
            </Highlight>
          </Box>
        )}
        <Textarea
          ref={textareaRef}
          value={value}
          readOnly={readOnly}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          onScroll={onScroll}
          h="full"
          minH={{ base: "20rem", md: "24rem" }}
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
          color={syntaxHighlight && prismTheme ? "transparent" : undefined}
          style={syntaxHighlight && prismTheme ? { caretColor: colorMode === "dark" ? "white" : "black" } : undefined}
          px="12px"
          pt="8px"
          pb="8px"
          placeholder={placeholder}
        />
      </Box>
    </HStack>
  );

  return (
    <Box borderWidth="1px" borderRadius="2xl" overflow="hidden" bg="bg.panel">
      <Tabs.Root value={activeTab} onValueChange={(d) => setActiveTab(d.value)}>
        <Box px={{ base: 4, md: 6 }} pt={{ base: 4, md: 6 }}>
          <Tabs.List>
            <Tabs.Trigger value="input">{"Input"}</Tabs.Trigger>
            <Tabs.Trigger value="output">{"Output"}</Tabs.Trigger>
          </Tabs.List>
        </Box>

        {/* ── Input tab ─────────────────────────────────────────────────── */}
        <Tabs.Content value="input">
          <VStack align="stretch" gap={4} p={{ base: 4, md: 6 }}>
            <HStack gap={3} flexWrap="wrap">
              <Button
                colorPalette={palette}
                variant="solid"
                onClick={handleConvert}
              >
                {convertButtonLabel}
              </Button>
              <Button variant="surface" onClick={handleFormat}>
                {"Format"}
              </Button>
              <Clipboard.Root value={inputValue}>
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
              <Button variant="surface" onClick={handleRemoveEscapeCharacters}>
                {"Remove Escape Characters"}
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
                toolId={toolId}
                onResetSettings={handleReset}
                csvDelimiter={csvDelimiter}
                onCsvDelimiterChange={onCsvDelimiterChange}
                xmlRootTag={xmlRootTag}
                onXmlRootTagChange={onXmlRootTagChange}
                tsExportStyle={tsExportStyle}
                onTsExportStyleChange={onTsExportStyleChange}
                tsOptionalFields={tsOptionalFields}
                onTsOptionalFieldsChange={onTsOptionalFieldsChange}
                yamlQuoteStyle={yamlQuoteStyle}
                onYamlQuoteStyleChange={onYamlQuoteStyleChange}
              />
            </HStack>
            <Field.Root>
              <Field.Label>{inputLabel}</Field.Label>
              {textareaWithGutter(
                inputValue,
                (v) => { onInputChange(v); setInputError(null); },
                inputTextareaRef,
                inputGutterRef,
                inputPreRef,
                syncInputScroll,
                "Paste JSON here…",
              )}
            </Field.Root>
            {inputError && (
              <InputErrorPanel
                error={inputError}
                text={inputValue}
                onDismiss={() => setInputError(null)}
              />
            )}
            <Text color="fg.muted">{inputHint}</Text>
          </VStack>
        </Tabs.Content>

        {/* ── Output tab ────────────────────────────────────────────────── */}
        <Tabs.Content value="output">
          <VStack align="stretch" gap={4} p={{ base: 4, md: 6 }}>
            <HStack gap={3} flexWrap="wrap">
              <Clipboard.Root value={outputValue}>
                <Clipboard.Trigger asChild>
                  <Button variant="surface" disabled={!outputValue && !outputError}>
                    <Clipboard.Indicator />
                    <Clipboard.CopyText />
                  </Button>
                </Clipboard.Trigger>
              </Clipboard.Root>
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
            <Field.Root>
              <Field.Label>{outputLabel}</Field.Label>
              {outputError ? (
                <Box w="full" borderWidth="1px" borderRadius="md" p={4} bg="bg.panel">
                  <Text color="fg.error" fontFamily="mono" fontSize="sm">
                    {outputError}
                  </Text>
                </Box>
              ) : (
                textareaWithGutter(
                  outputValue,
                  null,
                  outputTextareaRef,
                  outputGutterRef,
                  outputPreRef,
                  syncOutputScroll,
                  "Output will appear here after conversion…",
                  true,
                )
              )}
            </Field.Root>
          </VStack>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export default JsonConverterPanel;
