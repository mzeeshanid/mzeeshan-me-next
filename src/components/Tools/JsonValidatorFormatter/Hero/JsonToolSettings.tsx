import { useColorPalette } from "@/contexts/useColorPalette";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  NativeSelect,
  NumberInput,
  Popover,
  SegmentGroup,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { LuSettings } from "react-icons/lu";

export type ToolId = "csv" | "xml" | "typescript" | "yaml";

type Props = {
  // Display settings (shown on both Input and Output tabs)
  syntaxHighlight: boolean;
  onSyntaxHighlightChange: (value: boolean) => void;
  showLineNumbers: boolean;
  onShowLineNumbersChange: (value: boolean) => void;
  wordWrap: boolean;
  onWordWrapChange: (value: boolean) => void;
  fontSize: number;
  onFontSizeChange: (value: number) => void;
  /** When false the Options section is hidden — use on Output tabs */
  showIndent?: boolean;
  // Formatting options (Input tab only)
  indent?: number;
  onIndentChange?: (value: number) => void;
  indentStyle?: "spaces" | "tabs";
  onIndentStyleChange?: (value: "spaces" | "tabs") => void;
  sortKeys?: boolean;
  onSortKeysChange?: (value: boolean) => void;
  sortOrder?: "asc" | "desc";
  onSortOrderChange?: (value: "asc" | "desc") => void;
  trailingCommas?: boolean;
  onTrailingCommasChange?: (value: boolean) => void;
  allowComments?: boolean;
  onAllowCommentsChange?: (value: boolean) => void;
  // Tool-specific settings
  toolId?: ToolId;
  onResetSettings?: () => void;
  // CSV
  csvDelimiter?: string;
  onCsvDelimiterChange?: (value: string) => void;
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

const PREDEFINED_DELIMITERS = [",", ";", "\t"];
const OTHER_DELIMITER_OPTIONS = ["|", ":", " ", "#", "~"];

const SectionTitle: React.FC<{ children: string }> = ({ children }) => (
  <Text fontSize="xs" fontWeight="semibold" color="fg.muted" px={1}>
    {children.toUpperCase()}
  </Text>
);

const SettingsRow: React.FC<{
  label: string;
  hint?: string;
  children: React.ReactNode;
}> = ({ label, hint, children }) => (
  <HStack
    justify="space-between"
    px={3}
    py={2}
    align={hint ? "flex-start" : "center"}
  >
    <VStack align="start" gap={0} flex={1} mr={2}>
      <Text fontSize="sm">{label}</Text>
      {hint && (
        <Text fontSize="xs" color="fg.muted" fontFamily="mono">
          {hint}
        </Text>
      )}
    </VStack>
    {children}
  </HStack>
);

const TOOL_SECTION_TITLES: Record<ToolId, string> = {
  csv: "CSV Options",
  xml: "XML Options",
  typescript: "TypeScript Options",
  yaml: "YAML Options",
};

const JsonToolSettings: React.FC<Props> = ({
  syntaxHighlight,
  onSyntaxHighlightChange,
  showLineNumbers,
  onShowLineNumbersChange,
  wordWrap,
  onWordWrapChange,
  fontSize,
  onFontSizeChange,
  showIndent = true,
  indent = 2,
  onIndentChange,
  indentStyle = "spaces",
  onIndentStyleChange,
  sortKeys = false,
  onSortKeysChange,
  sortOrder = "asc",
  onSortOrderChange,
  trailingCommas = false,
  onTrailingCommasChange,
  allowComments = false,
  onAllowCommentsChange,
  toolId,
  onResetSettings,
  csvDelimiter = ",",
  onCsvDelimiterChange,
  xmlRootTag = "root",
  onXmlRootTagChange,
  tsExportStyle = "interface",
  onTsExportStyleChange,
  tsOptionalFields = "nulls-only",
  onTsOptionalFieldsChange,
  yamlQuoteStyle = "minimal",
  onYamlQuoteStyleChange,
}) => {
  const { palette } = useColorPalette();

  // For CSV "other" delimiter: determine segment value
  const csvSegmentValue = PREDEFINED_DELIMITERS.includes(csvDelimiter)
    ? csvDelimiter
    : "other";
  const csvOtherValue = PREDEFINED_DELIMITERS.includes(csvDelimiter)
    ? OTHER_DELIMITER_OPTIONS[0]
    : csvDelimiter;

  const handleCsvSegmentChange = (val: string) => {
    if (val === "other") {
      onCsvDelimiterChange?.(csvOtherValue);
    } else {
      onCsvDelimiterChange?.(val);
    }
  };

  const delimiterLabel = (d: string) => {
    if (d === ",") return "Comma";
    if (d === ";") return "Semicolon";
    if (d === "\t") return "Tab";
    return "Other";
  };

  const otherDelimiterLabel = (d: string) => {
    if (d === "|") return "Pipe (|)";
    if (d === ":") return "Colon (:)";
    if (d === " ") return "Space ( )";
    if (d === "#") return "Hash (#)";
    if (d === "~") return "Tilde (~)";
    return d;
  };

  const showToolSection = showIndent && toolId !== undefined;

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <IconButton variant="subtle" size="sm" aria-label="Settings">
          <LuSettings />
        </IconButton>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content w="xs">
          <Popover.Body p={3}>
            <VStack align="stretch" gap={3}>
              {/* ── Navigation bar ───────────────────────────────────── */}
              <HStack justify="space-between" align="center" px={1}>
                <Text fontSize="sm" fontWeight="semibold">
                  {"Settings"}
                </Text>
                {onResetSettings && (
                  <Button
                    size="xs"
                    variant="ghost"
                    color="fg.error"
                    onClick={onResetSettings}
                  >
                    {"Reset"}
                  </Button>
                )}
              </HStack>

              {/* ── Tool-specific section (index 0) ──────────────────── */}
              {showToolSection && (
                <VStack align="stretch" gap={0}>
                  <SectionTitle>{TOOL_SECTION_TITLES[toolId!]}</SectionTitle>
                  <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    mt={1}
                  >
                    {/* CSV */}
                    {toolId === "csv" && (
                      <>
                        <SettingsRow label="Delimiter">
                          <SegmentGroup.Root
                            value={csvSegmentValue}
                            onValueChange={(d) => d.value && handleCsvSegmentChange(d.value)}
                            size="xs"
                            colorPalette={palette}
                          >
                            <SegmentGroup.Indicator />
                            {[",", ";", "\t", "other"].map((d) => (
                              <SegmentGroup.Item key={d} value={d}>
                                <SegmentGroup.ItemText>
                                  {delimiterLabel(d)}
                                </SegmentGroup.ItemText>
                                <SegmentGroup.ItemHiddenInput />
                              </SegmentGroup.Item>
                            ))}
                          </SegmentGroup.Root>
                        </SettingsRow>
                        {csvSegmentValue === "other" && (
                          <>
                            <Box borderTopWidth="1px" />
                            <SettingsRow label="Custom Delimiter">
                              <NativeSelect.Root size="xs" w="32">
                                <NativeSelect.Field
                                  value={csvOtherValue}
                                  onChange={(e) =>
                                    onCsvDelimiterChange?.(e.target.value)
                                  }
                                >
                                  {OTHER_DELIMITER_OPTIONS.map((d) => (
                                    <option key={d} value={d}>
                                      {otherDelimiterLabel(d)}
                                    </option>
                                  ))}
                                </NativeSelect.Field>
                                <NativeSelect.Indicator />
                              </NativeSelect.Root>
                            </SettingsRow>
                          </>
                        )}
                      </>
                    )}

                    {/* XML */}
                    {toolId === "xml" && (
                      <SettingsRow label="Root Tag">
                        <Input
                          size="xs"
                          value={xmlRootTag}
                          onChange={(e) => onXmlRootTagChange?.(e.target.value)}
                          placeholder="root"
                          w="24"
                          fontFamily="mono"
                        />
                      </SettingsRow>
                    )}

                    {/* TypeScript */}
                    {toolId === "typescript" && (
                      <>
                        <SettingsRow label="Export Style">
                          <SegmentGroup.Root
                            value={tsExportStyle}
                            onValueChange={(d) =>
                              onTsExportStyleChange?.(d.value as "interface" | "type")
                            }
                            size="xs"
                            colorPalette={palette}
                          >
                            <SegmentGroup.Indicator />
                            <SegmentGroup.Item value="interface">
                              <SegmentGroup.ItemText>{"interface"}</SegmentGroup.ItemText>
                              <SegmentGroup.ItemHiddenInput />
                            </SegmentGroup.Item>
                            <SegmentGroup.Item value="type">
                              <SegmentGroup.ItemText>{"type"}</SegmentGroup.ItemText>
                              <SegmentGroup.ItemHiddenInput />
                            </SegmentGroup.Item>
                          </SegmentGroup.Root>
                        </SettingsRow>
                        <Box borderTopWidth="1px" />
                        <SettingsRow label="Optional Fields">
                          <SegmentGroup.Root
                            value={tsOptionalFields}
                            onValueChange={(d) =>
                              onTsOptionalFieldsChange?.(d.value as "all" | "nulls-only")
                            }
                            size="xs"
                            colorPalette={palette}
                          >
                            <SegmentGroup.Indicator />
                            <SegmentGroup.Item value="nulls-only">
                              <SegmentGroup.ItemText>{"Nulls"}</SegmentGroup.ItemText>
                              <SegmentGroup.ItemHiddenInput />
                            </SegmentGroup.Item>
                            <SegmentGroup.Item value="all">
                              <SegmentGroup.ItemText>{"All"}</SegmentGroup.ItemText>
                              <SegmentGroup.ItemHiddenInput />
                            </SegmentGroup.Item>
                          </SegmentGroup.Root>
                        </SettingsRow>
                      </>
                    )}

                    {/* YAML */}
                    {toolId === "yaml" && (
                      <SettingsRow label="Quote Style">
                        <SegmentGroup.Root
                          value={yamlQuoteStyle}
                          onValueChange={(d) =>
                            onYamlQuoteStyleChange?.(d.value as "minimal" | "always")
                          }
                          size="xs"
                          colorPalette={palette}
                        >
                          <SegmentGroup.Indicator />
                          <SegmentGroup.Item value="minimal">
                            <SegmentGroup.ItemText>{"Minimal"}</SegmentGroup.ItemText>
                            <SegmentGroup.ItemHiddenInput />
                          </SegmentGroup.Item>
                          <SegmentGroup.Item value="always">
                            <SegmentGroup.ItemText>{"Always"}</SegmentGroup.ItemText>
                            <SegmentGroup.ItemHiddenInput />
                          </SegmentGroup.Item>
                        </SegmentGroup.Root>
                      </SettingsRow>
                    )}
                  </Box>
                </VStack>
              )}

              {/* ── General ─────────────────────────────────────────── */}
              <VStack align="stretch" gap={0}>
                <SectionTitle>{"General"}</SectionTitle>
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  mt={1}
                >
                  <SettingsRow label="Syntax Highlighting">
                    <Switch.Root
                      colorPalette={palette}
                      checked={syntaxHighlight}
                      onCheckedChange={(e) =>
                        onSyntaxHighlightChange(!!e.checked)
                      }
                      size="sm"
                    >
                      <Switch.HiddenInput />
                      <Switch.Control>
                        <Switch.Thumb />
                      </Switch.Control>
                    </Switch.Root>
                  </SettingsRow>
                  <Box borderTopWidth="1px" />
                  <SettingsRow label="Line Numbers">
                    <Switch.Root
                      colorPalette={palette}
                      checked={showLineNumbers}
                      onCheckedChange={(e) =>
                        onShowLineNumbersChange(!!e.checked)
                      }
                      size="sm"
                    >
                      <Switch.HiddenInput />
                      <Switch.Control>
                        <Switch.Thumb />
                      </Switch.Control>
                    </Switch.Root>
                  </SettingsRow>
                  <Box borderTopWidth="1px" />
                  <SettingsRow label="Word Wrap">
                    <Switch.Root
                      colorPalette={palette}
                      checked={wordWrap}
                      onCheckedChange={(e) => onWordWrapChange(!!e.checked)}
                      size="sm"
                    >
                      <Switch.HiddenInput />
                      <Switch.Control>
                        <Switch.Thumb />
                      </Switch.Control>
                    </Switch.Root>
                  </SettingsRow>
                  <Box borderTopWidth="1px" />
                  <SettingsRow label="Font Size">
                    <NumberInput.Root
                      value={String(fontSize)}
                      min={10}
                      max={20}
                      onValueChange={(details) => {
                        const next = details.valueAsNumber;
                        if (!Number.isNaN(next)) onFontSizeChange(next);
                      }}
                      allowMouseWheel
                      size="xs"
                      colorPalette={palette}
                    >
                      <NumberInput.Control />
                      <NumberInput.Input />
                    </NumberInput.Root>
                  </SettingsRow>
                </Box>
              </VStack>

              {/* ── Options ─────────────────────────────────────────── */}
              {showIndent && (
                <VStack align="stretch" gap={0}>
                  <SectionTitle>{"Options"}</SectionTitle>
                  <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    mt={1}
                  >
                    <SettingsRow label="Indent">
                      <NumberInput.Root
                        value={String(indent)}
                        min={1}
                        max={8}
                        onValueChange={(details) => {
                          const next = details.valueAsNumber;
                          if (!Number.isNaN(next)) onIndentChange?.(next);
                        }}
                        allowMouseWheel
                        size="xs"
                        colorPalette={palette}
                        disabled={indentStyle === "tabs"}
                      >
                        <NumberInput.Control />
                        <NumberInput.Input />
                      </NumberInput.Root>
                    </SettingsRow>
                    <Box borderTopWidth="1px" />
                    <SettingsRow label="Indent Style">
                      <SegmentGroup.Root
                        value={indentStyle}
                        onValueChange={(d) =>
                          onIndentStyleChange?.(d.value as "spaces" | "tabs")
                        }
                        size="xs"
                        colorPalette={palette}
                      >
                        <SegmentGroup.Indicator />
                        <SegmentGroup.Item value="spaces">
                          <SegmentGroup.ItemText>
                            {"Spaces"}
                          </SegmentGroup.ItemText>
                          <SegmentGroup.ItemHiddenInput />
                        </SegmentGroup.Item>
                        <SegmentGroup.Item value="tabs">
                          <SegmentGroup.ItemText>
                            {"Tabs"}
                          </SegmentGroup.ItemText>
                          <SegmentGroup.ItemHiddenInput />
                        </SegmentGroup.Item>
                      </SegmentGroup.Root>
                    </SettingsRow>
                    <Box borderTopWidth="1px" />
                    <HStack
                      justify="space-between"
                      px={3}
                      py={2}
                      align="center"
                    >
                      <Text fontSize="sm">{"Sort Keys"}</Text>
                      <HStack gap={2}>
                        {sortKeys && (
                          <SegmentGroup.Root
                            value={sortOrder}
                            onValueChange={(d) =>
                              onSortOrderChange?.(d.value as "asc" | "desc")
                            }
                            size="xs"
                            colorPalette={palette}
                          >
                            <SegmentGroup.Indicator />
                            <SegmentGroup.Item value="asc">
                              <SegmentGroup.ItemText>
                                {"A→Z"}
                              </SegmentGroup.ItemText>
                              <SegmentGroup.ItemHiddenInput />
                            </SegmentGroup.Item>
                            <SegmentGroup.Item value="desc">
                              <SegmentGroup.ItemText>
                                {"Z→A"}
                              </SegmentGroup.ItemText>
                              <SegmentGroup.ItemHiddenInput />
                            </SegmentGroup.Item>
                          </SegmentGroup.Root>
                        )}
                        <Switch.Root
                          colorPalette={palette}
                          checked={sortKeys}
                          onCheckedChange={(e) =>
                            onSortKeysChange?.(!!e.checked)
                          }
                          size="sm"
                        >
                          <Switch.HiddenInput />
                          <Switch.Control>
                            <Switch.Thumb />
                          </Switch.Control>
                        </Switch.Root>
                      </HStack>
                    </HStack>
                    <Box borderTopWidth="1px" />
                    <SettingsRow label="Trailing Commas">
                      <Switch.Root
                        colorPalette={palette}
                        checked={trailingCommas}
                        onCheckedChange={(e) =>
                          onTrailingCommasChange?.(!!e.checked)
                        }
                        size="sm"
                      >
                        <Switch.HiddenInput />
                        <Switch.Control>
                          <Switch.Thumb />
                        </Switch.Control>
                      </Switch.Root>
                    </SettingsRow>
                    <Box borderTopWidth="1px" />
                    <SettingsRow label="Allow Comments">
                      <Switch.Root
                        colorPalette={palette}
                        checked={allowComments}
                        onCheckedChange={(e) =>
                          onAllowCommentsChange?.(!!e.checked)
                        }
                        size="sm"
                      >
                        <Switch.HiddenInput />
                        <Switch.Control>
                          <Switch.Thumb />
                        </Switch.Control>
                      </Switch.Root>
                    </SettingsRow>
                  </Box>
                  <VStack align="start" gap={0} px={3} pt={1} pb={1}>
                    <Text fontSize="xs" color="fg.muted">
                      {"Trailing Commas: strips [1, 2,] → [1, 2] before parsing."}
                    </Text>
                    <Text fontSize="xs" color="fg.muted">
                      {"Allow Comments: strips // and /* */ before parsing."}
                    </Text>
                  </VStack>
                </VStack>
              )}
            </VStack>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
};

export default JsonToolSettings;
