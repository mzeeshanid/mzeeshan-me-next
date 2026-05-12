import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { Toaster, toaster } from "@/components/ui/toaster";
import { Tooltip } from "@/components/ui/tooltip";
import { useColorMode } from "@/components/ui/color-mode";
import { useColorPalette } from "@/contexts/useColorPalette";
import { useMounted } from "@/hooks/useMounted";
import type { OutputLanguage } from "./JsonConverterOutputEditor";
import type { JsonConverterHeroData } from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import { jsonValidatorFormatterDefaultJson } from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import dynamic from "next/dynamic";
import type { JsonCodeMirrorEditorHandle } from "./JsonCodeMirrorEditor";
import {
  Box,
  Button,
  HStack,
  IconButton,
  NumberInput,
  Popover,
  Portal,
  Separator,
  Spacer,
  Switch,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import {
  LuCheck,
  LuClipboard,
  LuCopy,
  LuEraser,
  LuMoon,
  LuSettings,
  LuSun,
  LuWandSparkles,
} from "react-icons/lu";

const JsonCodeMirrorEditor = dynamic(() => import("./JsonCodeMirrorEditor"), {
  ssr: false,
});
const JsonConverterOutputEditor = dynamic(
  () => import("./JsonConverterOutputEditor"),
  { ssr: false },
);

// ── Settings sub-components (identical to validator) ──────────────────────────

const SettingsSectionTitle: React.FC<{ children: string }> = ({ children }) => (
  <Text fontSize="xs" fontWeight="semibold" color="fg.muted" px={1}>
    {children.toUpperCase()}
  </Text>
);

const SettingsRow: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <HStack justify="space-between" px={3} py={2} align="center">
    <Text fontSize="sm" flex={1} mr={2}>
      {label}
    </Text>
    {children}
  </HStack>
);

// ── Types ─────────────────────────────────────────────────────────────────────

export interface JsonConverterHeroBaseProps {
  heroData: JsonConverterHeroData;
  outputLanguage: OutputLanguage;
  convert: (json: string) => string;
}

// ── Component ─────────────────────────────────────────────────────────────────

const JsonConverterHeroBase: React.FC<JsonConverterHeroBaseProps> = ({
  heroData,
  outputLanguage,
  convert,
}) => {
  const { palette } = useColorPalette();
  const { colorMode, toggleColorMode } = useColorMode();
  const mounted = useMounted();
  const editorColorMode: "light" | "dark" = mounted
    ? colorMode === "dark"
      ? "dark"
      : "light"
    : "light";

  const editorRef = React.useRef<JsonCodeMirrorEditorHandle>(null);

  const [input, setInput] = React.useState(jsonValidatorFormatterDefaultJson);
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState("input");

  // Editor settings
  const [wordWrap, setWordWrap] = React.useState(true);
  const [showLineNumbers, setShowLineNumbers] = React.useState(true);
  const [syntaxHighlight, setSyntaxHighlight] = React.useState(true);
  const [fontSize, setFontSize] = React.useState(14);

  // ── Actions ─────────────────────────────────────────────────────────────────

  const handleConvert = React.useCallback(() => {
    try {
      JSON.parse(input);
    } catch {
      setError("Invalid JSON — fix the syntax before converting.");
      return;
    }
    try {
      const result = convert(input);
      setOutput(result);
      setError(null);
      setActiveTab("output");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed.");
    }
  }, [input, convert]);

  const handleFormatInput = React.useCallback(() => {
    try {
      setInput(JSON.stringify(JSON.parse(input), null, 2));
    } catch {
      // editor will show lint error
    }
  }, [input]);

  const handleCopyInput = React.useCallback(() => {
    navigator.clipboard.writeText(input).then(() =>
      toaster.create({ title: "Input copied", type: "success", duration: 1500 }),
    );
  }, [input]);

  const handleCopyOutput = React.useCallback(() => {
    navigator.clipboard.writeText(output).then(() =>
      toaster.create({ title: "Output copied", type: "success", duration: 1500 }),
    );
  }, [output]);

  const handleClear = React.useCallback(() => {
    setInput("");
    setOutput("");
    setError(null);
    setActiveTab("input");
  }, []);

  // ── Settings popover (same structure as validator) ────────────────────────

  const settingsPopover = (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Tooltip content="Editor settings" openDelay={300}>
          <IconButton
            aria-label="Editor settings"
            variant="ghost"
            size="sm"
            colorPalette={palette}
          >
            <LuSettings />
          </IconButton>
        </Tooltip>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content w="260px">
            <Popover.Arrow />
            <Box py={2}>
              <SettingsSectionTitle>Appearance</SettingsSectionTitle>
              <SettingsRow label="Color mode">
                <HStack gap={1}>
                  <IconButton
                    aria-label="Light mode"
                    size="xs"
                    variant={colorMode === "light" ? "solid" : "ghost"}
                    colorPalette={palette}
                    onClick={colorMode === "dark" ? toggleColorMode : undefined}
                  >
                    <LuSun />
                  </IconButton>
                  <IconButton
                    aria-label="Dark mode"
                    size="xs"
                    variant={colorMode === "dark" ? "solid" : "ghost"}
                    colorPalette={palette}
                    onClick={colorMode === "light" ? toggleColorMode : undefined}
                  >
                    <LuMoon />
                  </IconButton>
                </HStack>
              </SettingsRow>
              <SettingsRow label="Font size">
                <NumberInput.Root
                  size="xs"
                  value={String(fontSize)}
                  min={10}
                  max={24}
                  onValueChange={(d) => setFontSize(Number(d.value))}
                  w="70px"
                >
                  <NumberInput.Input />
                  <NumberInput.Control>
                    <NumberInput.IncrementTrigger />
                    <NumberInput.DecrementTrigger />
                  </NumberInput.Control>
                </NumberInput.Root>
              </SettingsRow>

              <Separator my={1} />
              <SettingsSectionTitle>Editor</SettingsSectionTitle>
              <SettingsRow label="Word wrap">
                <Switch.Root
                  size="sm"
                  checked={wordWrap}
                  onCheckedChange={(d) => setWordWrap(d.checked)}
                  colorPalette={palette}
                >
                  <Switch.HiddenInput />
                  <Switch.Control />
                </Switch.Root>
              </SettingsRow>
              <SettingsRow label="Line numbers">
                <Switch.Root
                  size="sm"
                  checked={showLineNumbers}
                  onCheckedChange={(d) => setShowLineNumbers(d.checked)}
                  colorPalette={palette}
                >
                  <Switch.HiddenInput />
                  <Switch.Control />
                </Switch.Root>
              </SettingsRow>
              <SettingsRow label="Syntax highlighting">
                <Switch.Root
                  size="sm"
                  checked={syntaxHighlight}
                  onCheckedChange={(d) => setSyntaxHighlight(d.checked)}
                  colorPalette={palette}
                >
                  <Switch.HiddenInput />
                  <Switch.Control />
                </Switch.Root>
              </SettingsRow>
            </Box>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );

  // ── Input toolbar ─────────────────────────────────────────────────────────

  const inputToolbar = (
    <HStack
      px={{ base: 3, md: 4 }}
      py={1.5}
      gap={0}
      borderBottomWidth="1px"
      flexShrink={0}
    >
      <HStack
        flex={1}
        minW={0}
        gap={1}
        overflowX="auto"
        flexWrap="nowrap"
        css={{
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        <Tooltip content="Format JSON" openDelay={300}>
          <IconButton
            aria-label="Format JSON"
            variant="ghost"
            size="sm"
            colorPalette={palette}
            onClick={handleFormatInput}
          >
            <LuWandSparkles />
          </IconButton>
        </Tooltip>
        <Tooltip content="Copy input" openDelay={300}>
          <IconButton
            aria-label="Copy input"
            variant="ghost"
            size="sm"
            colorPalette={palette}
            onClick={handleCopyInput}
          >
            <LuClipboard />
          </IconButton>
        </Tooltip>
        <Tooltip content="Clear" openDelay={300}>
          <IconButton
            aria-label="Clear"
            variant="ghost"
            size="sm"
            colorPalette={palette}
            onClick={handleClear}
          >
            <LuEraser />
          </IconButton>
        </Tooltip>
      </HStack>
      <HStack gap={1} flexShrink={0}>
        <Button
          colorPalette={palette}
          size="sm"
          px={4}
          onClick={handleConvert}
        >
          <LuCheck />
          {heroData.convertButtonLabel}
        </Button>
      </HStack>
    </HStack>
  );

  // ── Output toolbar ────────────────────────────────────────────────────────

  const outputToolbar = (
    <HStack
      px={{ base: 3, md: 4 }}
      py={1.5}
      gap={0}
      borderBottomWidth="1px"
      flexShrink={0}
    >
      <HStack flex={1} minW={0} gap={1}>
        <Tooltip content="Copy output" openDelay={300}>
          <IconButton
            aria-label="Copy output"
            variant="ghost"
            size="sm"
            colorPalette={palette}
            onClick={handleCopyOutput}
            disabled={!output}
          >
            <LuCopy />
          </IconButton>
        </Tooltip>
      </HStack>
      <HStack gap={1} flexShrink={0}>
        <Button
          colorPalette={palette}
          size="sm"
          px={4}
          variant="outline"
          onClick={handleConvert}
        >
          <LuCheck />
          Re-convert
        </Button>
      </HStack>
    </HStack>
  );

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <Box as="section">
      <Toaster />
      <SectionHeader
        tagline={heroData.badge}
        headline={heroData.title}
        description={heroData.description}
        headingAs="h1"
      />
      <Spacer p={4} />
      <Box
        w="full"
        minH="400px"
        maxH="800px"
        borderWidth="1px"
        borderRadius="2xl"
        overflow="hidden"
        bg="bg.panel"
        display="flex"
        flexDirection="column"
      >
        <Tabs.Root
          value={activeTab}
          onValueChange={(d) => setActiveTab(d.value)}
          colorPalette={palette}
          display="flex"
          flexDirection="column"
          flex="1"
          minH="0"
        >
          {/* Tab list */}
          <Box px={{ base: 3, md: 4 }} pt={3} flexShrink={0}>
            <Tabs.List>
              <Tabs.Trigger value="input">
                {heroData.inputLabel}
              </Tabs.Trigger>
              <Tabs.Trigger value="output">
                {heroData.outputLabel}
              </Tabs.Trigger>
            </Tabs.List>
          </Box>

          {/* ── Input tab ────────────────────────────────────────────────── */}
          <Tabs.Content
            value="input"
            p={0}
            display="flex"
            flexDirection="column"
            flex="1"
            minH="0"
            overflow="hidden"
          >
            {inputToolbar}

            {error && (
              <Box
                px={{ base: 3, md: 4 }}
                py={2}
                bg="bg.error"
                borderBottomWidth="1px"
                borderColor="border.error"
                flexShrink={0}
              >
                <Text fontSize="sm" color="fg.error">
                  {error}
                </Text>
              </Box>
            )}

            <Box flex="1" minH="0" overflow="auto">
              <JsonCodeMirrorEditor
                value={input}
                onChange={setInput}
                colorMode={editorColorMode}
                syntaxHighlight={syntaxHighlight}
                showLineNumbers={showLineNumbers}
                wordWrap={wordWrap}
                fontSize={fontSize}
                minHeight="100%"
                placeholder="Paste JSON here…"
                editorRef={editorRef}
              />
            </Box>

            {heroData.inputHint && (
              <Box
                px={{ base: 3, md: 4 }}
                py={2}
                borderTopWidth="1px"
                bg="bg.subtle"
                flexShrink={0}
              >
                <Text fontSize="xs" color="fg.muted">
                  {heroData.inputHint}
                </Text>
              </Box>
            )}
          </Tabs.Content>

          {/* ── Output tab ───────────────────────────────────────────────── */}
          <Tabs.Content
            value="output"
            p={0}
            display="flex"
            flexDirection="column"
            flex="1"
            minH="0"
            overflow="hidden"
          >
            {outputToolbar}

            <Box flex="1" minH="0" overflow="auto">
              {output ? (
                <JsonConverterOutputEditor
                  value={output}
                  language={outputLanguage}
                  colorMode={editorColorMode}
                  syntaxHighlight={syntaxHighlight}
                  showLineNumbers={showLineNumbers}
                  wordWrap={wordWrap}
                  fontSize={fontSize}
                  minHeight="100%"
                />
              ) : (
                <VStack
                  h="full"
                  justify="center"
                  align="center"
                  gap={3}
                  p={6}
                  minH="300px"
                >
                  <Text color="fg.muted" textAlign="center" fontSize="sm">
                    Paste JSON in the{" "}
                    <Text as="span" fontWeight="semibold">
                      {heroData.inputLabel}
                    </Text>{" "}
                    tab and click{" "}
                    <Text as="span" fontWeight="semibold">
                      {heroData.convertButtonLabel}
                    </Text>{" "}
                    to see the result here.
                  </Text>
                  <Button
                    colorPalette={palette}
                    size="sm"
                    variant="outline"
                    onClick={() => setActiveTab("input")}
                  >
                    Go to Input
                  </Button>
                </VStack>
              )}
            </Box>
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Box>
  );
};

export default JsonConverterHeroBase;
