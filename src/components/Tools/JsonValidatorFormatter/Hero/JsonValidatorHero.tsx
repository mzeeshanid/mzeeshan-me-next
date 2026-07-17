import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { Toaster, toaster } from "@/components/ui/toaster";
import { Tooltip } from "@/components/ui/tooltip";
import { useColorMode } from "@/components/ui/color-mode";
import { useColorPalette } from "@/contexts/useColorPalette";
import { jsonValidatorFormatterHeroData } from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import { useMounted } from "@/hooks/useMounted";
import dynamic from "next/dynamic";

import type { JsonCodeMirrorEditorHandle } from "./JsonCodeMirrorEditor";
import JsonTreeView, {
  type JsonTreeViewHandle,
  type BreadcrumbItem,
} from "./JsonTreeView";

const JsonCodeMirrorEditor = dynamic(() => import("./JsonCodeMirrorEditor"), {
  ssr: false,
});
const JsonSideBySideDiff = dynamic(
  () => import("./JsonDiffView").then((m) => ({ default: m.JsonSideBySideDiff })),
  { ssr: false },
);
const JsonUnifiedDiff = dynamic(
  () => import("./JsonDiffView").then((m) => ({ default: m.JsonUnifiedDiff })),
  { ssr: false },
);
import {
  Box,
  Breadcrumb,
  Button,
  Dialog,
  Field,
  HStack,
  IconButton,
  Input,
  InputGroup,
  NumberInput,
  Popover,
  Portal,
  SegmentGroup,
  Separator,
  Spacer,
  Switch,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import {
  LuArrowDownAZ,
  LuArrowLeftRight,
  LuArrowUpAZ,
  LuChevronsDown,
  LuChevronsUp,
  LuCopy,
  LuEraser,
  LuFolderOpen,
  LuHistory,
  LuLink,
  LuMinimize2,
  LuRedo2,
  LuSave,
  LuSearch,
  LuSettings,
  LuTrash2,
  LuUndo2,
  LuWand,
  LuX,
} from "react-icons/lu";

// ── Settings sub-components ───────────────────────────────────────────────────

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

// ── Document storage ──────────────────────────────────────────────────────────

const DOC_STORAGE_KEY = "json-validator-docs";
const MAX_DOCS = 10;

interface StoredDocument {
  id: string;
  name: string;
  content: string;
  updatedAt: number;
}

function loadDocs(): StoredDocument[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(DOC_STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveDocs(docs: StoredDocument[]): void {
  localStorage.setItem(DOC_STORAGE_KEY, JSON.stringify(docs));
}

function upsertDoc(doc: StoredDocument): void {
  const docs = loadDocs();
  const idx = docs.findIndex((d) => d.id === doc.id);
  if (idx >= 0) {
    docs[idx] = doc;
  } else {
    if (docs.length >= MAX_DOCS) {
      docs.sort((a, b) => a.updatedAt - b.updatedAt);
      docs.splice(0, docs.length - MAX_DOCS + 1);
    }
    docs.push(doc);
  }
  saveDocs(docs);
}

function deleteDoc(id: string): void {
  saveDocs(loadDocs().filter((d) => d.id !== id));
}

function nextDocName(docs: StoredDocument[]): string {
  const base = "New Document";
  const names = new Set(docs.map((d) => d.name));
  if (!names.has(base)) return base;
  for (let i = 2; i <= 999; i++) {
    const c = `${base} ${i}`;
    if (!names.has(c)) return c;
  }
  return `${base} ${Date.now()}`;
}

function newDocId(): string {
  return `doc_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

// ── Document name header ──────────────────────────────────────────────────────

const DocumentNameHeader: React.FC<{
  name: string;
  onChange: (name: string) => void;
}> = ({ name, onChange }) => {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(name);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const commit = () => {
    const trimmed = draft.trim() || name;
    setEditing(false);
    if (trimmed !== name) onChange(trimmed);
  };

  React.useEffect(() => {
    if (editing) {
      setDraft(name);
      requestAnimationFrame(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      });
    }
  }, [editing, name]);

  if (editing) {
    return (
      <Input
        ref={inputRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") { setDraft(name); setEditing(false); }
        }}
        variant="flushed"
        size="sm"
        fontWeight="medium"
        w="auto"
        minW="180px"
        maxW="320px"
      />
    );
  }

  return (
    <Text
      fontSize="sm"
      fontWeight="medium"
      cursor="text"
      onClick={() => setEditing(true)}
      px={1}
      py={0.5}
      borderRadius="sm"
      userSelect="none"
      _hover={{ bg: "bg.subtle" }}
      title="Click to rename"
      maxW="320px"
      overflow="hidden"
      textOverflow="ellipsis"
      whiteSpace="nowrap"
    >
      {name}
    </Text>
  );
};

// ── History dialog ────────────────────────────────────────────────────────────

const HistoryDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  onLoad: (doc: StoredDocument) => void;
  currentDocId: string;
  palette: string;
}> = ({ open, onClose, onLoad, currentDocId, palette }) => {
  const [docs, setDocs] = React.useState<StoredDocument[]>([]);

  React.useEffect(() => {
    if (open) {
      setDocs(loadDocs().sort((a, b) => b.updatedAt - a.updatedAt));
    }
  }, [open]);

  const handleDelete = (id: string) => {
    deleteDoc(id);
    setDocs((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(d) => { if (!d.open) onClose(); }}
      placement="center"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="md">
            <Dialog.Header>
              <Dialog.Title>{"Saved Documents"}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body px={2}>
              {docs.length === 0 ? (
                <Text fontSize="sm" color="fg.muted" textAlign="center" py={6}>
                  {"No saved documents yet."}
                </Text>
              ) : (
                <VStack align="stretch" gap={0.5}>
                  {docs.map((doc) => (
                    <HStack
                      key={doc.id}
                      px={3}
                      py={2}
                      borderRadius="md"
                      bg={doc.id === currentDocId ? "bg.subtle" : undefined}
                      _hover={{ bg: "bg.subtle" }}
                    >
                      <VStack align="start" gap={0} flex={1} minW={0}>
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                          w="full"
                        >
                          {doc.name}
                          {doc.id === currentDocId && (
                            <Text as="span" fontSize="xs" color="fg.muted" ml={2}>
                              {"(current)"}
                            </Text>
                          )}
                        </Text>
                        <Text fontSize="xs" color="fg.muted">
                          {new Date(doc.updatedAt).toLocaleString()}
                        </Text>
                      </VStack>
                      <HStack gap={1} flexShrink={0}>
                        <Button
                          size="xs"
                          variant="ghost"
                          colorPalette={palette}
                          onClick={() => { onLoad(doc); onClose(); }}
                        >
                          {"Load"}
                        </Button>
                        <Tooltip content="Delete" openDelay={300}>
                          <IconButton
                            size="xs"
                            variant="ghost"
                            colorPalette="red"
                            aria-label="Delete document"
                            onClick={() => handleDelete(doc.id)}
                          >
                            <LuTrash2 />
                          </IconButton>
                        </Tooltip>
                      </HStack>
                    </HStack>
                  ))}
                </VStack>
              )}
            </Dialog.Body>
            <Dialog.Footer>
              <Text fontSize="xs" color="fg.muted">
                {`${docs.length} / ${MAX_DOCS} documents`}
              </Text>
              <Spacer />
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={onClose}>
                  {"Close"}
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

// ── Save dialog ───────────────────────────────────────────────────────────────

const SaveDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  content: string;
  palette: string;
  defaultFileName?: string;
}> = ({ open, onClose, content, palette, defaultFileName }) => {
  const [fileName, setFileName] = React.useState(defaultFileName ?? "data");

  React.useEffect(() => {
    if (open) setFileName(defaultFileName ?? "data");
  }, [open, defaultFileName]);

  const handleSave = () => {
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName || "data"}.json`;
    a.click();
    URL.revokeObjectURL(url);
    onClose();
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(d) => {
        if (!d.open) onClose();
      }}
      placement="center"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{"Save as JSON"}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Field.Root>
                <Field.Label>{"File name"}</Field.Label>
                <HStack>
                  <Input
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder="data"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSave();
                    }}
                    autoFocus
                  />
                  <Text color="fg.muted" flexShrink={0}>
                    {".json"}
                  </Text>
                </HStack>
              </Field.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={onClose}>
                  {"Cancel"}
                </Button>
              </Dialog.ActionTrigger>
              <Button colorPalette={palette} onClick={handleSave}>
                {"Save"}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

// ── Load from URL dialog ──────────────────────────────────────────────────────

const LoadUrlDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  onLoad: (content: string) => void;
  palette: string;
}> = ({ open, onClose, onLoad, palette }) => {
  const [url, setUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleLoad = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(url.trim());
      const text = await res.text();
      onLoad(text);
      setUrl("");
      onClose();
    } catch {
      setError("Failed to fetch. Check the URL or CORS policy.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(d) => {
        if (!d.open) {
          setError("");
          onClose();
        }
      }}
      placement="center"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{"Load from URL"}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Field.Root invalid={!!error}>
                <Field.Label>{"URL"}</Field.Label>
                <Input
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setError("");
                  }}
                  placeholder="https://example.com/data.json"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleLoad();
                  }}
                  autoFocus
                />
                {error && <Field.ErrorText>{error}</Field.ErrorText>}
              </Field.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={onClose}>
                  {"Cancel"}
                </Button>
              </Dialog.ActionTrigger>
              <Button
                colorPalette={palette}
                onClick={handleLoad}
                loading={loading}
                disabled={!url.trim()}
              >
                {"Load"}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

// ── Settings popover ──────────────────────────────────────────────────────────

const SettingsPopover: React.FC<{
  palette: string;
  indent: number;
  onIndentChange: (v: number) => void;
  indentStyle: "spaces" | "tabs";
  onIndentStyleChange: (v: "spaces" | "tabs") => void;
  syntaxHighlight: boolean;
  onSyntaxHighlightChange: (v: boolean) => void;
  showLineNumbers: boolean;
  onShowLineNumbersChange: (v: boolean) => void;
  wordWrap: boolean;
  onWordWrapChange: (v: boolean) => void;
  fontSize: number;
  onFontSizeChange: (v: number) => void;
}> = ({
  palette,
  indent,
  onIndentChange,
  indentStyle,
  onIndentStyleChange,
  syntaxHighlight,
  onSyntaxHighlightChange,
  showLineNumbers,
  onShowLineNumbersChange,
  wordWrap,
  onWordWrapChange,
  fontSize,
  onFontSizeChange,
}) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <IconButton variant="ghost" size="sm" aria-label="Settings">
          <LuSettings />
        </IconButton>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content w="xs">
            <Popover.Body p={3}>
              <VStack align="stretch" gap={3}>
                <HStack justify="space-between" align="center" px={1}>
                  <Text fontSize="sm" fontWeight="semibold">
                    {"Settings"}
                  </Text>
                  <Button
                    size="xs"
                    variant="ghost"
                    color="fg.error"
                    onClick={() => {
                      onSyntaxHighlightChange(true);
                      onShowLineNumbersChange(true);
                      onWordWrapChange(true);
                      onFontSizeChange(14);
                      onIndentChange(2);
                      onIndentStyleChange("spaces");
                    }}
                  >
                    {"Reset"}
                  </Button>
                </HStack>

                {/* General */}
                <VStack align="stretch" gap={0}>
                  <SettingsSectionTitle>{"General"}</SettingsSectionTitle>
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
                        onValueChange={(d) => {
                          const n = d.valueAsNumber;
                          if (!Number.isNaN(n)) onFontSizeChange(n);
                        }}
                        allowMouseWheel
                        size="xs"
                        colorPalette={palette}
                        w="24"
                      >
                        <NumberInput.Control />
                        <NumberInput.Input />
                      </NumberInput.Root>
                    </SettingsRow>
                  </Box>
                </VStack>

                {/* Options */}
                <VStack align="stretch" gap={0}>
                  <SettingsSectionTitle>{"Options"}</SettingsSectionTitle>
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
                        onValueChange={(d) => {
                          const n = d.valueAsNumber;
                          if (!Number.isNaN(n)) onIndentChange(n);
                        }}
                        allowMouseWheel
                        size="xs"
                        colorPalette={palette}
                        w="24"
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
                          onIndentStyleChange(d.value as "spaces" | "tabs")
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
                  </Box>
                </VStack>
              </VStack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

// ── Sample JSON ───────────────────────────────────────────────────────────────

function sortJsonKeys(value: unknown, dir: "asc" | "desc"): unknown {
  if (Array.isArray(value)) return value.map((v) => sortJsonKeys(v, dir));
  if (value !== null && typeof value === "object") {
    const sorted = Object.keys(value as Record<string, unknown>).sort((a, b) =>
      dir === "asc" ? a.localeCompare(b) : b.localeCompare(a),
    );
    const out: Record<string, unknown> = {};
    for (const k of sorted)
      out[k] = sortJsonKeys((value as Record<string, unknown>)[k], dir);
    return out;
  }
  return value;
}

// ── Sample JSON ───────────────────────────────────────────────────────────────

const SAMPLE_JSON = `{
  "user": {
    "id": 1,
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "age": 28,
    "isActive": true,
    "roles": ["admin", "editor"],
    "address": {
      "street": "123 Main St",
      "city": "San Francisco",
      "state": "CA",
      "zip": "94105"
    },
    "preferences": {
      "theme": "dark",
      "language": "en",
      "notifications": {
        "email": true,
        "sms": false,
        "push": true
      }
    },
    "tags": ["verified", "premium"],
    "createdAt": "2024-01-15T08:30:00Z",
    "metadata": null
  }
}`;

// ── Main component ────────────────────────────────────────────────────────────

const JsonValidatorHero: React.FC = () => {
  const { palette } = useColorPalette();
  const { colorMode } = useColorMode();
  const mounted = useMounted();
  const editorColorMode = mounted
    ? colorMode === "dark"
      ? "dark"
      : "light"
    : "light";

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const diffOriginalFileRef = React.useRef<HTMLInputElement>(null);
  const diffModifiedFileRef = React.useRef<HTMLInputElement>(null);
  const validatorEditorRef = React.useRef<JsonCodeMirrorEditorHandle>(null);

  const [indent, setIndent] = React.useState(2);
  const [indentStyle, setIndentStyle] = React.useState<"spaces" | "tabs">(
    "spaces",
  );
  const [syntaxHighlight, setSyntaxHighlight] = React.useState(true);
  const [showLineNumbers, setShowLineNumbers] = React.useState(true);
  const [wordWrap, setWordWrap] = React.useState(true);
  const [fontSize, setFontSize] = React.useState(14);
  const [validatorValue, setValidatorValue] = React.useState(SAMPLE_JSON);
  const [diffOriginal, setDiffOriginal] = React.useState("");
  const [diffModified, setDiffModified] = React.useState("");
  const [diffMode, setDiffMode] = React.useState<"split" | "unified">("split");
  const [saveDialogOpen, setSaveDialogOpen] = React.useState(false);
  const [urlDialogOpen, setUrlDialogOpen] = React.useState(false);
  const [historyOpen, setHistoryOpen] = React.useState(false);
  // docId and docName must start with stable defaults (matching SSR) and be
  // updated after mount so hydration sees identical HTML on server and client.
  const [docId] = React.useState("init");
  const [docName, setDocName] = React.useState("New Document");
  const [autoSaved, setAutoSaved] = React.useState(false);
  React.useEffect(() => {
    if (!autoSaved) return;
    const t = setTimeout(() => setAutoSaved(false), 2000);
    return () => clearTimeout(t);
  }, [autoSaved]);
  const docIdRef = React.useRef(docId);
  const docNameRef = React.useRef(docName);
  React.useEffect(() => { docNameRef.current = docName; }, [docName]);

  // Initialise doc identity from localStorage after first paint.
  React.useEffect(() => {
    const id = newDocId();
    docIdRef.current = id;
    const name = nextDocName(loadDocs());
    setDocName(name);
    docNameRef.current = name;
  }, []);

  // Auto-save: skip the very first render, then debounce 1 s after each change.
  const autoSaveSkipFirst = React.useRef(true);
  React.useEffect(() => {
    if (autoSaveSkipFirst.current) { autoSaveSkipFirst.current = false; return; }
    const timer = setTimeout(() => {
      upsertDoc({
        id: docIdRef.current,
        name: docNameRef.current,
        content: validatorValue,
        updatedAt: Date.now(),
      });
      setAutoSaved(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [validatorValue]);
  const treeViewRef = React.useRef<JsonTreeViewHandle>(null);
  const [activeTab, setActiveTab] = React.useState("validator");
  const [viewMode, setViewMode] = React.useState<"text" | "tree">("text");
  const [treeBreadcrumbs, setTreeBreadcrumbs] = React.useState<
    BreadcrumbItem[]
  >([]);
  const [treeSearchOpen, setTreeSearchOpen] = React.useState(false);
  const [treeSearchQuery, setTreeSearchQuery] = React.useState("");
  const treeSearchInputRef = React.useRef<HTMLInputElement>(null);

  // Close tree search when switching away from tree mode.
  React.useEffect(() => {
    if (viewMode !== "tree") {
      setTreeSearchOpen(false);
      setTreeSearchQuery("");
    }
  }, [viewMode]);

  // Auto-focus the search input when it opens.
  React.useEffect(() => {
    if (treeSearchOpen) {
      requestAnimationFrame(() => treeSearchInputRef.current?.focus());
    }
  }, [treeSearchOpen]);
  const heroData = jsonValidatorFormatterHeroData;

  return (
    <Box as="section">
      <Toaster />
      <SaveDialog
        open={saveDialogOpen}
        onClose={() => setSaveDialogOpen(false)}
        content={validatorValue}
        palette={palette}
        defaultFileName={docName}
      />
      <HistoryDialog
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        currentDocId={docId}
        palette={palette}
        onLoad={(doc) => {
          setValidatorValue(doc.content);
          setDocName(doc.name);
          docNameRef.current = doc.name;
        }}
      />
      <LoadUrlDialog
        open={urlDialogOpen}
        onClose={() => setUrlDialogOpen(false)}
        onLoad={setValidatorValue}
        palette={palette}
      />
      <SectionHeader
        tagline={heroData.badge}
        headline={heroData.title}
        description={heroData.description}
        headingAs="h2"
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
          {/* ── Tab list ───────────────────────────────────────────────────── */}
          <Box px={{ base: 3, md: 4 }} pt={3} flexShrink={0}>
            <Tabs.List>
              <Tabs.Trigger value="validator">{"Validator"}</Tabs.Trigger>
              <Tabs.Trigger value="diff">{"Diff"}</Tabs.Trigger>
            </Tabs.List>
          </Box>

          {/* ── Validator tab ──────────────────────────────────────────────── */}
          <Tabs.Content
            value="validator"
            p={0}
            display="flex"
            flexDirection="column"
            flex="1"
            minH="0"
            overflow="hidden"
          >
            {/* ── Document name header ──────────────────────────────────── */}
            <HStack
              px={{ base: 3, md: 4 }}
              py={1.5}
              borderBottomWidth="1px"
              flexShrink={0}
              gap={2}
            >
              <DocumentNameHeader
                name={docName}
                onChange={(name) => {
                  setDocName(name);
                  docNameRef.current = name;
                  upsertDoc({ id: docIdRef.current, name, content: validatorValue, updatedAt: Date.now() });
                  setAutoSaved(true);
                }}
              />
              <Spacer />
              {autoSaved && (
                <Text fontSize="xs" color="fg.subtle" flexShrink={0}>
                  Auto saved
                </Text>
              )}
            </HStack>

            {/* ── Toolbar ───────────────────────────────────────────────── */}
            <HStack
              px={{ base: 3, md: 4 }}
              py={1.5}
              gap={0}
              borderBottomWidth="1px"
              flexShrink={0}
            >
              {/* Scrollable tool buttons */}
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
              <SegmentGroup.Root
                value={viewMode}
                onValueChange={(d) => setViewMode(d.value as "text" | "tree")}
                size="xs"
                colorPalette={palette}
              >
                <SegmentGroup.Indicator />
                <SegmentGroup.Item value="text">
                  <SegmentGroup.ItemText>{"Text"}</SegmentGroup.ItemText>
                  <SegmentGroup.ItemHiddenInput />
                </SegmentGroup.Item>
                <SegmentGroup.Item value="tree">
                  <SegmentGroup.ItemText>{"Tree"}</SegmentGroup.ItemText>
                  <SegmentGroup.ItemHiddenInput />
                </SegmentGroup.Item>
              </SegmentGroup.Root>

              <Separator orientation="vertical" h="5" ml={2} />

              <Tooltip content="Collapse all" openDelay={300}>
                <IconButton
                  variant="ghost"
                  size="sm"
                  colorPalette={palette}
                  aria-label="Collapse all"
                  onClick={() => {
                    validatorEditorRef.current?.foldAll();
                    treeViewRef.current?.collapseAll();
                  }}
                >
                  <LuChevronsUp />
                </IconButton>
              </Tooltip>

              <Tooltip content="Expand all" openDelay={300}>
                <IconButton
                  variant="ghost"
                  size="sm"
                  colorPalette={palette}
                  aria-label="Expand all"
                  onClick={() => {
                    validatorEditorRef.current?.unfoldAll();
                    treeViewRef.current?.expandAll();
                  }}
                >
                  <LuChevronsDown />
                </IconButton>
              </Tooltip>

              <Tooltip content="Search" openDelay={300}>
                <IconButton
                  variant={
                    viewMode === "tree" && treeSearchOpen ? "solid" : "ghost"
                  }
                  size="sm"
                  colorPalette={palette}
                  aria-label="Search"
                  onClick={() => {
                    if (viewMode === "tree") {
                      setTreeSearchOpen((prev) => {
                        if (prev) setTreeSearchQuery("");
                        return !prev;
                      });
                    } else {
                      validatorEditorRef.current?.toggleSearch();
                    }
                  }}
                >
                  <LuSearch />
                </IconButton>
              </Tooltip>

              <Separator orientation="vertical" h="5" />

              <Tooltip content="Sort keys A→Z" openDelay={300}>
                <IconButton
                  variant="ghost"
                  size="sm"
                  colorPalette={palette}
                  aria-label="Sort keys ascending"
                  onClick={() => {
                    try {
                      const space = indentStyle === "tabs" ? "\t" : indent;
                      setValidatorValue(
                        JSON.stringify(
                          sortJsonKeys(JSON.parse(validatorValue), "asc"),
                          null,
                          space,
                        ),
                      );
                    } catch {}
                  }}
                >
                  <LuArrowUpAZ />
                </IconButton>
              </Tooltip>

              <Tooltip content="Sort keys Z→A" openDelay={300}>
                <IconButton
                  variant="ghost"
                  size="sm"
                  colorPalette={palette}
                  aria-label="Sort keys descending"
                  onClick={() => {
                    try {
                      const space = indentStyle === "tabs" ? "\t" : indent;
                      setValidatorValue(
                        JSON.stringify(
                          sortJsonKeys(JSON.parse(validatorValue), "desc"),
                          null,
                          space,
                        ),
                      );
                    } catch {}
                  }}
                >
                  <LuArrowDownAZ />
                </IconButton>
              </Tooltip>

              <Separator orientation="vertical" h="5" />

              {viewMode !== "tree" && (
                <Tooltip content="Format JSON" openDelay={300}>
                  <IconButton
                    variant="ghost"
                    size="sm"
                    colorPalette={palette}
                    aria-label="Format JSON"
                    onClick={() => {
                      try {
                        const space = indentStyle === "tabs" ? "\t" : indent;
                        setValidatorValue(
                          JSON.stringify(
                            JSON.parse(validatorValue),
                            null,
                            space,
                          ),
                        );
                      } catch {}
                    }}
                  >
                    <LuWand />
                  </IconButton>
                </Tooltip>
              )}

              <Tooltip content="Copy JSON" openDelay={300}>
                <IconButton
                  variant="ghost"
                  size="sm"
                  colorPalette={palette}
                  aria-label="Copy JSON"
                  onClick={() => {
                    navigator.clipboard.writeText(validatorValue);
                    toaster.success({ title: "Copied successfully" });
                  }}
                >
                  <LuCopy />
                </IconButton>
              </Tooltip>

              <Tooltip content="Save as JSON" openDelay={300}>
                <IconButton
                  variant="ghost"
                  size="sm"
                  colorPalette={palette}
                  aria-label="Save as JSON"
                  disabled={!validatorValue.trim()}
                  onClick={() => setSaveDialogOpen(true)}
                >
                  <LuSave />
                </IconButton>
              </Tooltip>

              <Separator orientation="vertical" h="5" />
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,text/plain"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    setValidatorValue((ev.target?.result as string) ?? "");
                  };
                  reader.readAsText(file);
                  e.target.value = "";
                }}
              />
              <Tooltip content="Load from file" openDelay={300}>
                <IconButton
                  variant="ghost"
                  size="sm"
                  colorPalette={palette}
                  aria-label="Load from file"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <LuFolderOpen />
                </IconButton>
              </Tooltip>

              <Tooltip content="Load from URL" openDelay={300}>
                <IconButton
                  variant="ghost"
                  size="sm"
                  colorPalette={palette}
                  aria-label="Load from URL"
                  onClick={() => setUrlDialogOpen(true)}
                >
                  <LuLink />
                </IconButton>
              </Tooltip>

              <Separator orientation="vertical" h="5" />

              {viewMode !== "tree" && (
                <Tooltip content="Minify JSON" openDelay={300}>
                  <IconButton
                    variant="ghost"
                    size="sm"
                    colorPalette={palette}
                    aria-label="Minify JSON"
                    onClick={() => {
                      try {
                        setValidatorValue(
                          JSON.stringify(JSON.parse(validatorValue)),
                        );
                      } catch {}
                    }}
                  >
                    <LuMinimize2 />
                  </IconButton>
                </Tooltip>
              )}

              {viewMode !== "tree" && (
                <Tooltip content="Remove escape characters" openDelay={300}>
                  <IconButton
                    variant="ghost"
                    size="sm"
                    colorPalette={palette}
                    aria-label="Remove escape characters"
                    onClick={() => {
                      try {
                        const unescaped = JSON.parse(`"${validatorValue}"`);
                        setValidatorValue(unescaped);
                      } catch {
                        setValidatorValue(
                          validatorValue
                            .replace(/\\"/g, '"')
                            .replace(/\\\\/g, "\\"),
                        );
                      }
                    }}
                  >
                    <LuEraser />
                  </IconButton>
                </Tooltip>
              )}

              <Tooltip content="Clear" openDelay={300}>
                <IconButton
                  variant="ghost"
                  size="sm"
                  colorPalette={palette}
                  aria-label="Clear"
                  onClick={() => setValidatorValue("")}
                >
                  <LuX />
                </IconButton>
              </Tooltip>

              {/* ── Undo / Redo ──
                  Routing rule: text mode delegates to CodeMirror's history,
                  tree mode delegates to JsonTreeView's tree-local snapshot
                  history. The two histories are intentionally independent
                  so neither view can rewind past edits performed in the
                  other (which would be confusing).
                  Both `canUndo` / `canRedo` probes are functions on the
                  imperative handle, so they re-evaluate every render — and
                  since each undo/redo causes `validatorValue` to change
                  (or, for CodeMirror, a doc-change `onChange` does), the
                  toolbar re-renders and the disabled state stays current. */}
              <Tooltip content="Undo" openDelay={300}>
                <IconButton
                  variant="ghost"
                  size="sm"
                  colorPalette={palette}
                  aria-label="Undo"
                  disabled={
                    viewMode === "tree"
                      ? !treeViewRef.current?.canUndo?.()
                      : !validatorEditorRef.current?.canUndo?.()
                  }
                  onClick={() => {
                    if (viewMode === "tree") treeViewRef.current?.undo();
                    else validatorEditorRef.current?.undo();
                  }}
                >
                  <LuUndo2 />
                </IconButton>
              </Tooltip>

              <Tooltip content="Redo" openDelay={300}>
                <IconButton
                  variant="ghost"
                  size="sm"
                  colorPalette={palette}
                  aria-label="Redo"
                  disabled={
                    viewMode === "tree"
                      ? !treeViewRef.current?.canRedo?.()
                      : !validatorEditorRef.current?.canRedo?.()
                  }
                  onClick={() => {
                    if (viewMode === "tree") treeViewRef.current?.redo();
                    else validatorEditorRef.current?.redo();
                  }}
                >
                  <LuRedo2 />
                </IconButton>
              </Tooltip>

              </HStack>

              {/* Pinned right: history + settings */}
              <HStack flexShrink={0} gap={0} pl={1} borderLeftWidth="1px">
                <Tooltip content="History" openDelay={300}>
                  <IconButton
                    variant="ghost"
                    size="sm"
                    colorPalette={palette}
                    aria-label="Document history"
                    onClick={() => setHistoryOpen(true)}
                  >
                    <LuHistory />
                  </IconButton>
                </Tooltip>

                <SettingsPopover
                  palette={palette}
                  indent={indent}
                  onIndentChange={setIndent}
                  indentStyle={indentStyle}
                  onIndentStyleChange={setIndentStyle}
                  syntaxHighlight={syntaxHighlight}
                  onSyntaxHighlightChange={setSyntaxHighlight}
                  showLineNumbers={showLineNumbers}
                  onShowLineNumbersChange={setShowLineNumbers}
                  wordWrap={wordWrap}
                  onWordWrapChange={setWordWrap}
                  fontSize={fontSize}
                  onFontSizeChange={setFontSize}
                />
              </HStack>
            </HStack>

            {/* ── Tree search bar ────────────────────────────────────────── */}
            {viewMode === "tree" && treeSearchOpen && (
              <HStack
                px={{ base: 3, md: 4 }}
                py={1.5}
                gap={2}
                borderBottomWidth="1px"
                flexShrink={0}
                bg="bg.subtle"
              >
                <InputGroup
                  startElement={
                    <LuSearch size={14} color="var(--chakra-colors-fg-muted)" />
                  }
                  endElement={
                    <IconButton
                      size="2xs"
                      variant="ghost"
                      aria-label={
                        treeSearchQuery ? "Clear search" : "Close search"
                      }
                      onClick={() => {
                        if (treeSearchQuery) {
                          setTreeSearchQuery("");
                          treeSearchInputRef.current?.focus();
                        } else {
                          setTreeSearchOpen(false);
                        }
                      }}
                    >
                      <LuX />
                    </IconButton>
                  }
                >
                  <Input
                    ref={treeSearchInputRef}
                    size="xs"
                    flex="1"
                    fontFamily="mono"
                    borderWidth="0px"
                    placeholder="Filter by key or value…"
                    value={treeSearchQuery}
                    onChange={(e) => setTreeSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        setTreeSearchOpen(false);
                        setTreeSearchQuery("");
                      }
                    }}
                  />
                </InputGroup>
              </HStack>
            )}

            {/* ── Breadcrumb bar (tree mode only) ───────────────────────── */}
            {viewMode === "tree" && (
              <HStack
                px={{ base: 3, md: 4 }}
                py={1.5}
                borderBottomWidth="1px"
                flexShrink={0}
                overflowX="auto"
                minH="32px"
              >
                {treeBreadcrumbs.length > 0 ? (
                  <Breadcrumb.Root size="sm">
                    <Breadcrumb.List>
                      {treeBreadcrumbs.map((item, index) => {
                        const isLast = index === treeBreadcrumbs.length - 1;
                        return (
                          <React.Fragment key={item.nodeId}>
                            <Breadcrumb.Item>
                              {isLast ? (
                                <Breadcrumb.CurrentLink fontFamily="mono">
                                  {item.label}
                                </Breadcrumb.CurrentLink>
                              ) : (
                                <Breadcrumb.Link
                                  fontFamily="mono"
                                  as="button"
                                  onClick={() =>
                                    treeViewRef.current?.selectNode(item.nodeId)
                                  }
                                >
                                  {item.label}
                                </Breadcrumb.Link>
                              )}
                            </Breadcrumb.Item>
                            {!isLast && <Breadcrumb.Separator />}
                          </React.Fragment>
                        );
                      })}
                    </Breadcrumb.List>
                  </Breadcrumb.Root>
                ) : (
                  <Text fontSize="xs" color="fg.subtle" fontFamily="mono">
                    {"Select a node to see its path"}
                  </Text>
                )}
              </HStack>
            )}

            <Box flex="1" overflow="auto" minH="0">
              {viewMode === "tree" ? (
                <JsonTreeView
                  value={validatorValue}
                  colorMode={editorColorMode}
                  showLineNumbers={showLineNumbers}
                  fontSize={fontSize}
                  treeRef={treeViewRef}
                  onSelectionChange={(items) => setTreeBreadcrumbs(items ?? [])}
                  onChange={setValidatorValue}
                  searchQuery={treeSearchQuery}
                />
              ) : (
                <JsonCodeMirrorEditor
                  editorRef={validatorEditorRef}
                  value={validatorValue}
                  onChange={setValidatorValue}
                  colorMode={editorColorMode}
                  placeholder="Paste or type JSON here…"
                  minHeight="100%"
                  syntaxHighlight={syntaxHighlight}
                  showLineNumbers={showLineNumbers}
                  wordWrap={wordWrap}
                  fontSize={fontSize}
                />
              )}
            </Box>
          </Tabs.Content>

          {/* ── Diff tab ───────────────────────────────────────────────────── */}
          <Tabs.Content
            value="diff"
            p={0}
            display="flex"
            flexDirection="column"
            flex="1"
            minH="0"
            overflow="hidden"
          >
            {/* Hidden file inputs */}
            <input
              ref={diffOriginalFileRef}
              type="file"
              accept=".json,text/plain"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (ev) => setDiffOriginal((ev.target?.result as string) ?? "");
                reader.readAsText(file);
                e.target.value = "";
              }}
            />
            <input
              ref={diffModifiedFileRef}
              type="file"
              accept=".json,text/plain"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (ev) => setDiffModified((ev.target?.result as string) ?? "");
                reader.readAsText(file);
                e.target.value = "";
              }}
            />

            {/* Diff toolbar */}
            <HStack
              px={{ base: 3, md: 4 }}
              py={1.5}
              gap={0}
              borderBottomWidth="1px"
              flexShrink={0}
            >
              {/* Scrollable tool buttons */}
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
                <SegmentGroup.Root
                  value={diffMode}
                  onValueChange={(d) => setDiffMode(d.value as "split" | "unified")}
                  size="xs"
                  colorPalette={palette}
                >
                  <SegmentGroup.Indicator />
                  <SegmentGroup.Item value="split">
                    <SegmentGroup.ItemText>{"Split"}</SegmentGroup.ItemText>
                    <SegmentGroup.ItemHiddenInput />
                  </SegmentGroup.Item>
                  <SegmentGroup.Item value="unified">
                    <SegmentGroup.ItemText>{"Unified"}</SegmentGroup.ItemText>
                    <SegmentGroup.ItemHiddenInput />
                  </SegmentGroup.Item>
                </SegmentGroup.Root>

                <Separator orientation="vertical" h="5" ml={2} />

                <Tooltip content="Format both" openDelay={300}>
                  <IconButton
                    variant="ghost"
                    size="sm"
                    colorPalette={palette}
                    aria-label="Format both"
                    onClick={() => {
                      try {
                        const space = indentStyle === "tabs" ? "\t" : indent;
                        setDiffOriginal(JSON.stringify(JSON.parse(diffOriginal), null, space));
                      } catch {}
                      try {
                        const space = indentStyle === "tabs" ? "\t" : indent;
                        setDiffModified(JSON.stringify(JSON.parse(diffModified), null, space));
                      } catch {}
                    }}
                  >
                    <LuWand />
                  </IconButton>
                </Tooltip>

                <Separator orientation="vertical" h="5" />

                <Tooltip content="Swap panels" openDelay={300}>
                  <IconButton
                    variant="ghost"
                    size="sm"
                    colorPalette={palette}
                    aria-label="Swap panels"
                    onClick={() => {
                      setDiffOriginal(diffModified);
                      setDiffModified(diffOriginal);
                    }}
                  >
                    <LuArrowLeftRight />
                  </IconButton>
                </Tooltip>

                <Separator orientation="vertical" h="5" />

                <Tooltip content="Copy original" openDelay={300}>
                  <IconButton
                    variant="ghost"
                    size="sm"
                    colorPalette={palette}
                    aria-label="Copy original"
                    disabled={!diffOriginal.trim()}
                    onClick={() => {
                      navigator.clipboard.writeText(diffOriginal);
                      toaster.success({ title: "Original copied" });
                    }}
                  >
                    <LuCopy />
                  </IconButton>
                </Tooltip>

                <Tooltip content="Copy modified" openDelay={300}>
                  <IconButton
                    variant="ghost"
                    size="sm"
                    colorPalette={palette}
                    aria-label="Copy modified"
                    disabled={!diffModified.trim()}
                    onClick={() => {
                      navigator.clipboard.writeText(diffModified);
                      toaster.success({ title: "Modified copied" });
                    }}
                  >
                    <LuCopy />
                  </IconButton>
                </Tooltip>

                <Separator orientation="vertical" h="5" />

                <Tooltip content="Load original from file" openDelay={300}>
                  <IconButton
                    variant="ghost"
                    size="sm"
                    colorPalette={palette}
                    aria-label="Load original from file"
                    onClick={() => diffOriginalFileRef.current?.click()}
                  >
                    <LuFolderOpen />
                  </IconButton>
                </Tooltip>

                <Tooltip content="Load modified from file" openDelay={300}>
                  <IconButton
                    variant="ghost"
                    size="sm"
                    colorPalette={palette}
                    aria-label="Load modified from file"
                    onClick={() => diffModifiedFileRef.current?.click()}
                  >
                    <LuFolderOpen />
                  </IconButton>
                </Tooltip>

                <Separator orientation="vertical" h="5" />

                <Tooltip content="Clear both" openDelay={300}>
                  <IconButton
                    variant="ghost"
                    size="sm"
                    colorPalette={palette}
                    aria-label="Clear both"
                    onClick={() => { setDiffOriginal(""); setDiffModified(""); }}
                  >
                    <LuX />
                  </IconButton>
                </Tooltip>
              </HStack>

              {/* Pinned right: settings */}
              <HStack flexShrink={0} gap={0} pl={1} borderLeftWidth="1px">
                <SettingsPopover
                  palette={palette}
                  indent={indent}
                  onIndentChange={setIndent}
                  indentStyle={indentStyle}
                  onIndentStyleChange={setIndentStyle}
                  syntaxHighlight={syntaxHighlight}
                  onSyntaxHighlightChange={setSyntaxHighlight}
                  showLineNumbers={showLineNumbers}
                  onShowLineNumbersChange={setShowLineNumbers}
                  wordWrap={wordWrap}
                  onWordWrapChange={setWordWrap}
                  fontSize={fontSize}
                  onFontSizeChange={setFontSize}
                />
              </HStack>
            </HStack>

            {/* Diff editors */}
            <Box flex="1" minH="0" overflow="auto">
              {diffMode === "split" ? (
                <JsonSideBySideDiff
                  original={diffOriginal}
                  modified={diffModified}
                  onOriginalChange={setDiffOriginal}
                  onModifiedChange={setDiffModified}
                  colorMode={editorColorMode}
                  syntaxHighlight={syntaxHighlight}
                  showLineNumbers={showLineNumbers}
                  wordWrap={wordWrap}
                  fontSize={fontSize}
                />
              ) : (
                <JsonUnifiedDiff
                  original={diffOriginal}
                  modified={diffModified}
                  onModifiedChange={setDiffModified}
                  colorMode={editorColorMode}
                  syntaxHighlight={syntaxHighlight}
                  showLineNumbers={showLineNumbers}
                  wordWrap={wordWrap}
                  fontSize={fontSize}
                />
              )}
            </Box>
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Box>
  );
};

export default JsonValidatorHero;
