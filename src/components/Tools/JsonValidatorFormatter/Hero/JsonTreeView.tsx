"use client";

import {
  Box,
  Button,
  Highlight,
  HStack,
  IconButton,
  Kbd,
  Menu,
  Portal,
  Spacer,
  Table,
  Text,
  TreeView,
  createTreeCollection,
  useClipboard,
  useFilter,
} from "@chakra-ui/react";
import { useColorPalette } from "@/contexts/useColorPalette";
import { LuChevronRight, LuCheck, LuCopy, LuGripVertical, LuPlus, LuTrash2, LuBraces } from "react-icons/lu";
import React from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | JsonValue[];

type ValueType = "object" | "array" | "string" | "number" | "boolean" | "null";
type LabelType = "key" | "index" | "root";

interface JsonTreeNode {
  id: string;
  label: string;
  labelType: LabelType;
  valueStr: string;
  valueType: ValueType;
  childCount: number;
  rawValue: JsonValue;
  children?: JsonTreeNode[];
}

// ── Type colours ──────────────────────────────────────────────────────────────

const TYPE_BG: Record<ValueType, string> = {
  object: "orange.400",
  array: "pink.400",
  string: "green.400",
  number: "blue.400",
  boolean: "purple.400",
  null: "red.400",
};

const TYPE_LABEL: Record<ValueType, string> = {
  object: "Object",
  array: "Array",
  string: "String",
  number: "Number",
  boolean: "Boolean",
  null: "Null",
};

// ── Tree builder ──────────────────────────────────────────────────────────────

function buildNode(
  value: JsonValue,
  label: string,
  labelType: LabelType,
  path: string,
): JsonTreeNode {
  if (Array.isArray(value)) {
    if (value.length === 0)
      return {
        id: path,
        label,
        labelType,
        valueStr: "[]",
        valueType: "array",
        childCount: 0,
        rawValue: value,
      };
    return {
      id: path,
      label,
      labelType,
      valueStr: "",
      valueType: "array",
      childCount: value.length,
      rawValue: value,
      children: value.map((v, i) =>
        buildNode(v, String(i), "index", `${path}[${i}]`),
      ),
    };
  }
  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value as Record<string, JsonValue>);
    if (entries.length === 0)
      return {
        id: path,
        label,
        labelType,
        valueStr: "{}",
        valueType: "object",
        childCount: 0,
        rawValue: value,
      };
    return {
      id: path,
      label,
      labelType,
      valueStr: "",
      valueType: "object",
      childCount: entries.length,
      rawValue: value,
      children: entries.map(([k, v]) =>
        buildNode(v, k, "key", `${path}.${k.replace(/\./g, "·")}`),
      ),
    };
  }
  const type =
    value === null ? "null" : (typeof value as "string" | "number" | "boolean");
  return {
    id: path,
    label,
    labelType,
    childCount: 0,
    rawValue: value,
    valueType: type,
    valueStr:
      value === null
        ? "null"
        : typeof value === "string"
          ? `"${value}"`
          : String(value),
  };
}

function indexNodes(node: JsonTreeNode, map: Map<string, JsonTreeNode>) {
  map.set(node.id, node);
  node.children?.forEach((c) => indexNodes(c, map));
}

// ── JSONPath from node id ─────────────────────────────────────────────────────

function nodeIdToPath(id: string): string {
  if (id === "root") return "$";
  return "$" + id.slice(4).replace(/·/g, ".");
}

// ── Path mutation utilities ───────────────────────────────────────────────────

function segsToNodeId(segs: (string | number)[]): string {
  if (segs.length === 0) return "root";
  let id = "root";
  for (const seg of segs)
    id += typeof seg === "number" ? `[${seg}]` : `.${String(seg).replace(/\./g, "·")}`;
  return id;
}

function isDescendantOrSelf(ancestorId: string, nodeId: string): boolean {
  if (ancestorId === nodeId) return true;
  return nodeId.startsWith(ancestorId + ".") || nodeId.startsWith(ancestorId + "[");
}

function idToSegments(id: string): (string | number)[] {
  if (id === "root") return [];
  const segs: (string | number)[] = [];
  const tokens = id.slice(4).match(/\.[^.[[\]]+|\[\d+\]/g) ?? [];
  for (const tok of tokens)
    segs.push(
      tok.startsWith(".")
        ? tok.slice(1).replace(/·/g, ".")
        : parseInt(tok.slice(1, -1), 10),
    );
  return segs;
}

function getAtPath(data: JsonValue, segs: (string | number)[]): JsonValue {
  let cur = data;
  for (const s of segs) {
    if (cur === null || typeof cur !== "object") return null;
    cur = (cur as Record<string | number, JsonValue>)[s];
  }
  return cur;
}

function setAtPath(
  data: JsonValue,
  segs: (string | number)[],
  val: JsonValue,
): JsonValue {
  if (segs.length === 0) return val;
  const [head, ...tail] = segs;
  if (Array.isArray(data)) {
    const arr = [...data];
    arr[head as number] = setAtPath(arr[head as number], tail, val);
    return arr;
  }
  const obj = { ...(data as Record<string, JsonValue>) };
  obj[head as string] = setAtPath(obj[head as string] ?? null, tail, val);
  return obj;
}

function deleteAtPath(data: JsonValue, segs: (string | number)[]): JsonValue {
  if (segs.length === 0) return data;
  const [head, ...tail] = segs;
  if (Array.isArray(data)) {
    if (tail.length === 0)
      return (data as JsonValue[]).filter((_, i) => i !== (head as number));
    const arr = [...data];
    arr[head as number] = deleteAtPath(arr[head as number], tail);
    return arr;
  }
  const obj = { ...(data as Record<string, JsonValue>) };
  if (tail.length === 0) {
    delete obj[head as string];
    return obj;
  }
  obj[head as string] = deleteAtPath(obj[head as string], tail);
  return obj;
}

function renameKeyAtPath(
  data: JsonValue,
  segs: (string | number)[],
  newKey: string,
): JsonValue {
  const parentSegs = segs.slice(0, -1);
  const oldKey = segs[segs.length - 1] as string;
  const parent = getAtPath(data, parentSegs) as Record<string, JsonValue>;
  const newObj: Record<string, JsonValue> = {};
  for (const [k, v] of Object.entries(parent))
    newObj[k === oldKey ? newKey : k] = v;
  return setAtPath(data, parentSegs, newObj);
}

// Dynamic type inference for free-form edits.
//
// Rules (applied to the trimmed input, in priority order):
//   wrapped in "…"   → string (literal). The user has explicitly opted into
//                       a string by quoting their value, so token-typed
//                       inference is skipped: `"1"` becomes the string `1`,
//                       `"true"` becomes the string `true`, etc. The wrapper
//                       quotes themselves are stripped, and standard JSON
//                       escape sequences inside (`\"`, `\\`, `\n`, …) are
//                       decoded via `JSON.parse`.
//   "true" / "false" → boolean
//   "null"           → null
//   "{}" / "[]"      → empty object / array
//   numeric literal  → number  (e.g. "1", "-3.14", "1e5")
//   anything else    → string  (the RAW input, NOT trimmed, NOT JSON-decoded)
//
// The raw string is stored as-is in the JS data model. When the document is
// later serialized via `JSON.stringify`, any embedded `"` / `\` characters
// are escaped automatically per the JSON spec, so users can freely type
// literal quotes inside a string without producing malformed JSON.
function parseTypedValue(s: string): JsonValue {
  const t = s.trim();

  // Explicitly-quoted string. We require BOTH ends to be `"` and at least
  // two characters (so `"` alone falls through to the default-string path).
  // `JSON.parse` handles escape decoding; if it fails (unbalanced/invalid
  // escapes) we fall back to stripping just the outer quotes so the user's
  // intent — "this is a string" — is still honoured.
  if (t.length >= 2 && t.startsWith('"') && t.endsWith('"')) {
    try {
      const decoded = JSON.parse(t);
      if (typeof decoded === "string") return decoded;
    } catch {
      // Malformed escape sequence inside the quotes — keep the inner
      // characters verbatim rather than crashing the edit.
      return t.slice(1, -1);
    }
  }

  if (t === "true") return true;
  if (t === "false") return false;
  if (t === "null") return null;
  if (t === "{}") return {};
  if (t === "[]") return [];

  // A bare numeric literal — but reject inputs like "1 2" or "1abc" by
  // requiring the trimmed form to round-trip through Number(). Empty string
  // must NOT match (Number("") === 0).
  if (t !== "") {
    const n = Number(t);
    if (!Number.isNaN(n) && Number.isFinite(n) && String(n) === t.replace(/^\+/, "")) {
      return n;
    }
    // Also accept common numeric forms that don't round-trip exactly
    // (e.g. "1.0", "1e2") — fall back to permissive numeric detection.
    if (!Number.isNaN(n) && Number.isFinite(n) && /^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(t)) {
      return n;
    }
  }
  return s;
}

// Round-trip helper: produces the input-box seed text for editing a string
// value such that committing without changes leaves the underlying type
// unchanged.
//
// Most strings can be edited as their raw content. But if the raw content
// would itself be re-typed by `parseTypedValue` on commit — e.g. a string
// whose value happens to be `"1"`, `"true"`, `"null"`, `"{}"`, or already
// starts with `"` — we must seed the input with the JSON-encoded form
// (`"1"`, `"true"`, `"\"already-quoted\""`, etc.) so the user can clearly
// see the string is quoted, AND so the inverse `parseTypedValue` returns
// the original string.
function stringEditSeed(raw: string): string {
  const probe = parseTypedValue(raw);
  if (typeof probe !== "string" || probe !== raw) {
    // The raw content would be re-typed (number / bool / null / container)
    // or interpreted as an already-quoted string. Use JSON.stringify so the
    // user sees the explicit quoted form, with embedded quotes/backslashes
    // properly escaped.
    return JSON.stringify(raw);
  }
  return raw;
}

// For a non-root node id, returns the parent's segments and the child's
// position within the parent (0-based). Used to insert "after" a node.
function parentInsertSiteAfter(
  data: JsonValue,
  nodeId: string,
): { parentSegs: (string | number)[]; insertIndex: number } | null {
  if (nodeId === "root") return null;
  const segs = idToSegments(nodeId);
  const parentSegs = segs.slice(0, -1);
  const last = segs[segs.length - 1];
  const parent = getAtPath(data, parentSegs);
  if (Array.isArray(parent)) {
    return { parentSegs, insertIndex: (last as number) + 1 };
  }
  if (parent !== null && typeof parent === "object") {
    const keys = Object.keys(parent as Record<string, JsonValue>);
    const idx = keys.indexOf(String(last));
    return { parentSegs, insertIndex: idx < 0 ? keys.length : idx + 1 };
  }
  return null;
}

// Generate a unique "new item" / "new item 1" / "new item 2" … key for an object.
function uniqueNewItemKey(obj: Record<string, JsonValue>): string {
  const base = "new item";
  if (!(base in obj)) return base;
  for (let i = 1; ; i++) {
    const candidate = `${base} ${i}`;
    if (!(candidate in obj)) return candidate;
  }
}

// Insert `value` (with optional `key` for objects) into the parent at `parentSegs`,
// at position `insertIndex` (0 = first child, parent.length = end). Returns the new root data.
function insertIntoParent(
  data: JsonValue,
  parentSegs: (string | number)[],
  insertIndex: number,
  value: JsonValue,
  key?: string,
): JsonValue {
  const parent = getAtPath(data, parentSegs);
  if (Array.isArray(parent)) {
    const next = [...parent];
    const idx = Math.max(0, Math.min(insertIndex, next.length));
    next.splice(idx, 0, value);
    return setAtPath(data, parentSegs, next);
  }
  if (parent !== null && typeof parent === "object") {
    const obj = parent as Record<string, JsonValue>;
    const finalKey = key ?? uniqueNewItemKey(obj);
    const entries = Object.entries(obj);
    const idx = Math.max(0, Math.min(insertIndex, entries.length));
    // Re-build preserving insertion order with the new entry spliced in.
    const next: Record<string, JsonValue> = {};
    for (let i = 0; i < idx; i++) next[entries[i][0]] = entries[i][1];
    next[finalKey] = value;
    for (let i = idx; i < entries.length; i++) {
      // Skip a stale duplicate of finalKey if it somehow already existed (defensive)
      if (entries[i][0] === finalKey) continue;
      next[entries[i][0]] = entries[i][1];
    }
    return setAtPath(data, parentSegs, next);
  }
  // Parent is a primitive — nothing sensible to do.
  return data;
}

// ── getAllBranchIds ───────────────────────────────────────────────────────────

function getAllBranchIds(node: JsonTreeNode): string[] {
  if (node.valueType !== "object" && node.valueType !== "array") return [];
  const ids = [node.id];
  node.children?.forEach((c) => ids.push(...getAllBranchIds(c)));
  return ids;
}

// ── Tree filter (for search) ──────────────────────────────────────────────────
//
// Recursively keeps nodes whose label or display-value matches `query`.
// Branch nodes survive if their label matches OR any descendant matches —
// ensuring the tree structure around every hit stays visible.

function filterJsonNode(
  node: JsonTreeNode,
  query: string,
  contains: (s: string, q: string) => boolean,
): JsonTreeNode | null {
  // Root container is always kept; only filter its children.
  if (node.labelType === "root") {
    const kids = (node.children ?? [])
      .map((c) => filterJsonNode(c, query, contains))
      .filter((c): c is JsonTreeNode => c !== null);
    return { ...node, children: kids, childCount: kids.length };
  }

  const isBranch = node.valueType === "object" || node.valueType === "array";

  if (isBranch) {
    const labelMatch = contains(node.label, query);
    const kids = (node.children ?? [])
      .map((c) => filterJsonNode(c, query, contains))
      .filter((c): c is JsonTreeNode => c !== null);
    if (!labelMatch && kids.length === 0) return null;
    return { ...node, children: kids, childCount: kids.length };
  }

  // Leaf — match label (key name / index) or display value.
  const displayVal =
    node.valueType === "string" ? (node.rawValue as string) : node.valueStr;
  return contains(node.label, query) || contains(displayVal, query)
    ? node
    : null;
}

// ── Logical-line accounting (line-number gutter) ─────────────────────────────
//
// The gutter shows *logical* line numbers — the line a row would occupy if
// the document were fully expanded — rather than a 1..N visible-row index.
// Concretely:
//
//   • Each leaf occupies exactly one logical line.
//   • Each branch occupies one logical line for its opening `key: {` row.
//     If non-empty, it additionally consumes one logical line per child
//     subtree, plus one for its closing `}` / `]` row.
//   • Empty branches occupy a single logical line (`{}` / `[]`).
//
// When a branch is COLLAPSED, none of its inner lines are rendered, but the
// gutter still reserves their indices so the next visible row resumes at the
// correct logical line number. This makes the gutter behave like a code
// editor's gutter where folding does not renumber the surrounding lines.

// Total number of logical lines the subtree at `node` occupies if fully
// expanded. Independent of the current expansion state.
function logicalLineCount(node: JsonTreeNode): number {
  const isBranch = node.valueType === "object" || node.valueType === "array";
  if (!isBranch) return 1;
  const children = node.children ?? [];
  if (children.length === 0) return 1; // `{}` / `[]`
  let total = 1; // opening row
  for (const c of children) total += logicalLineCount(c);
  total += 1; // closing-brace row
  return total;
}

// Walks the subtree in render order and emits the *logical* line number of
// each visible row. Uses a closure-bound counter that advances over hidden
// content too, so collapsed subtrees correctly skip their indices.
function collectVisibleLineNumbers(
  rootNode: JsonTreeNode,
  expanded: ReadonlySet<string>,
): number[] {
  const out: number[] = [];
  let line = 1;

  const walk = (n: JsonTreeNode): void => {
    const isBranch = n.valueType === "object" || n.valueType === "array";
    if (!isBranch) {
      out.push(line);
      line += 1;
      return;
    }
    const hasChildren = (n.children?.length ?? 0) > 0;
    const isOpen = hasChildren && expanded.has(n.id);

    // Opening row is always rendered.
    out.push(line);
    line += 1;

    if (!isOpen) {
      // Branch is collapsed (or empty). For an empty branch there are no
      // hidden lines to skip. For a collapsed non-empty branch we advance
      // `line` past every hidden child + the closing-brace line, so that the
      // *next* visible row resumes at the correct logical line number.
      if (hasChildren) {
        let hidden = 0;
        for (const c of n.children!) hidden += logicalLineCount(c);
        hidden += 1; // closing brace
        line += hidden;
      }
      return;
    }

    for (const c of n.children!) walk(c);

    // Closing-brace row is rendered too.
    out.push(line);
    line += 1;
  };

  walk(rootNode);
  return out;
}

// ── Colour helpers ────────────────────────────────────────────────────────────

function valueColor(type: ValueType): Record<string, string> {
  switch (type) {
    case "string":
      return { base: "green.700", _dark: "green.300" };
    case "number":
      return { base: "blue.700", _dark: "blue.300" };
    case "boolean":
      return { base: "orange.700", _dark: "orange.300" };
    case "null":
      return { base: "gray.500", _dark: "gray.400" };
    default:
      return { base: "fg", _dark: "fg" };
  }
}

const KEY_COLOR = { base: "red.800", _dark: "red.400" };
const INDEX_COLOR = { base: "gray.500", _dark: "gray.500" };
const COLON_COLOR = { base: "gray.500", _dark: "gray.600" };
const BRACKET_COLOR = { base: "gray.700", _dark: "gray.300" };
const META_COLOR = { base: "gray.400", _dark: "gray.600" };

// ── Type dot ──────────────────────────────────────────────────────────────────

const TypeDot: React.FC<{ type: ValueType; size?: string }> = ({
  type,
  size = "8px",
}) => (
  <Box
    display="inline-block"
    w={size}
    h={size}
    borderRadius="full"
    bg={TYPE_BG[type]}
    flexShrink={0}
    alignSelf="center"
  />
);

// ── Type legend ───────────────────────────────────────────────────────────────

const LEGEND_ENTRIES = Object.entries(TYPE_LABEL) as [ValueType, string][];

const TypeLegend: React.FC = () => (
  <Box borderWidth="1px" borderRadius="md" p={3}>
    <Text fontWeight="semibold" fontSize="sm" mb={2}>
      {"Type Legend"}
    </Text>
    <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap={2}>
      {LEGEND_ENTRIES.map(([type, label]) => (
        <HStack key={type} gap={2}>
          <TypeDot type={type} />
          <Text fontSize="xs">{label}</Text>
        </HStack>
      ))}
    </Box>
  </Box>
);

// ── Selected node details ─────────────────────────────────────────────────────

// ── Selected node row ─────────────────────────────────────────────────────

const NodeRow: React.FC<{ child: JsonTreeNode }> = ({ child }) => {
  let displayValue: string;
  if (child.valueType === "array" && child.childCount > 0)
    displayValue = `[${child.childCount} ${child.childCount === 1 ? "item" : "items"}]`;
  else if (child.valueType === "object" && child.childCount > 0)
    displayValue = `{ ${child.childCount} ${child.childCount === 1 ? "key" : "keys"} }`;
  else if (child.valueType === "string")
    displayValue = child.rawValue as string;
  else displayValue = child.valueStr;

  const copyValue =
    child.valueType === "string"
      ? (child.rawValue as string)
      : typeof child.rawValue === "object"
        ? JSON.stringify(child.rawValue, null, 2)
        : String(child.rawValue);

  const keyClipboard = useClipboard({ value: child.label });
  const valueClipboard = useClipboard({ value: copyValue });

  return (
    <Table.Row key={child.id}>
      <Table.Cell>
        <HStack gap={2}>
          <TypeDot type={child.valueType} />
          <Text fontSize="xs">{TYPE_LABEL[child.valueType]}</Text>
        </HStack>
      </Table.Cell>
      <Table.Cell>
        <HStack gap={1}>
          <IconButton
            variant="ghost"
            size="xs"
            aria-label="Copy key"
            onClick={keyClipboard.copy}
          >
            {keyClipboard.copied ? <LuCheck /> : <LuCopy />}
          </IconButton>
          <Text fontFamily="mono" fontSize="xs">
            {child.label}
          </Text>
        </HStack>
      </Table.Cell>
      <Table.Cell>
        <HStack gap={1}>
          <IconButton
            variant="ghost"
            size="xs"
            aria-label="Copy value"
            onClick={valueClipboard.copy}
          >
            {valueClipboard.copied ? <LuCheck /> : <LuCopy />}
          </IconButton>
          <Text
            fontFamily="mono"
            fontSize="xs"
            color={valueColor(child.valueType)}
          >
            {displayValue}
          </Text>
        </HStack>
      </Table.Cell>
    </Table.Row>
  );
};

// ── Selected node details ─────────────────────────────────────────────────────

const SelectedNodeDetails: React.FC<{ node: JsonTreeNode }> = ({ node }) => {
  const path = nodeIdToPath(node.id);
  const rows: JsonTreeNode[] = node.children ?? [node];

  return (
    <Box borderWidth="1px" borderRadius="md" p={3}>
      <Text fontWeight="semibold" fontSize="sm" mb={1}>
        {"Selected Node Details"}
      </Text>
      <Text fontSize="xs" color="fg.muted" mb={3}>{`Path: ${path}`}</Text>
      <Box overflowX="auto">
        <Table.Root size="sm" variant="outline">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>{"Type"}</Table.ColumnHeader>
              <Table.ColumnHeader>{"Keys"}</Table.ColumnHeader>
              <Table.ColumnHeader>{"Values"}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows.map((child) => (
              <NodeRow key={child.id} child={child} />
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
};

// ── Edit context ──────────────────────────────────────────────────────────────

type EditState = {
  nodeId: string;
  draft: string;
  target: "value" | "key";
  // When true, the edit input selects all of its text on mount. Used when
  // the edit was initiated by the user adding a new entry (so they can just
  // start typing to overwrite the auto-generated placeholder), and not when
  // they double-click an existing value (where preserving the caret avoids
  // accidental clobbering).
  autoSelect?: boolean;
} | null;

// Kind chosen from the "+" menu: a JSON object, array, or scalar value (null).
type AddKind = "object" | "array" | "value";

type DropTarget = { nodeId: string; position: "before" | "after" } | null;

interface EditCtxValue {
  editState: EditState;
  palette: string;
  expandedValue: string[];
  startEditValue: (nodeId: string, current: string) => void;
  startEditKey: (nodeId: string, currentKey: string) => void;
  /**
   * Commits the active edit. If `advanceToValue` is true and the active edit
   * targets a key whose corresponding value is a primitive leaf (string /
   * number / boolean / null), the editor immediately advances into the
   * value field — this is what powers "press Tab while editing a key to
   * jump straight to the value".
   */
  commitEdit: (advanceToValue?: boolean) => void;
  cancelEdit: () => void;
  setEditDraft: (val: string) => void;
  doDelete: (nodeId: string) => void;
  // Insert a new entry adjacent to the targeted node (root → first child;
  // non-root → next sibling under the same parent).
  addAdjacent: (nodeId: string, kind: AddKind) => void;
  searchQuery: string;
  dragNodeId: string | null;
  dropTarget: DropTarget;
  onDragStart: (nodeId: string, e: React.DragEvent) => void;
  onDragEnd: () => void;
  onDragOver: (nodeId: string, e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

const EditCtx = React.createContext<EditCtxValue | null>(null);
const useEditCtx = () => React.useContext(EditCtx)!;

// ── Shared inline input styles ────────────────────────────────────────────────

const BASE_INPUT: React.CSSProperties = {
  fontFamily: "monospace",
  // Inherit the tree's font size (driven by Settings → Font Size). The
  // wrapping `.json-tree-root` element sets `--json-font-size` so the input
  // resizes in lock-step with the surrounding rows.
  fontSize: "inherit",
  padding: "1px 6px",
  borderRadius: "4px",
  border: "1px solid var(--chakra-colors-border)",
  background: "var(--chakra-colors-bg)",
  color: "inherit",
  outline: "none",
};

// ── Platform detection ────────────────────────────────────────────────────────
// Used to render the right modifier label in the AddMenu shortcuts.
// The check is intentionally defensive: `navigator` is unavailable during
// SSR, and the user-agent string is the most portable way to detect Mac
// (`navigator.platform` is being deprecated in favour of UA-CH).

function isMacPlatform(): boolean {
  if (typeof navigator === "undefined") return false;
  return /\b(Mac|iPhone|iPad|iPod)\b/.test(navigator.userAgent);
}

// Resolved shortcut tokens. We keep this as data (rather than hard-coded
// strings inside JSX) so the same map drives both the visible Kbd labels
// in the menu and the keyboard-event handler that fires the corresponding
// action.
//
// The key combinations are:
//   Cmd/Ctrl + Shift + O → insert Object
//   Cmd/Ctrl + Shift + A → insert Array
//   Cmd/Ctrl + Shift + E → insert Value (scalar)
const ADD_SHORTCUTS: Record<AddKind, { code: string; key: string }> = {
  object: { code: "KeyO", key: "O" },
  array: { code: "KeyA", key: "A" },
  value: { code: "KeyE", key: "E" },
};

// Render a Cmd/Ctrl + Shift + X chord using Chakra `Kbd`. The platform is
// resolved at render time (cheap; no state needed) so SSR consistently
// shows the Ctrl form and the client swaps in `⌘` on Mac after hydration.
const ShortcutKbd: React.FC<{ letter: string }> = ({ letter }) => {
  const isMac = isMacPlatform();
  return (
    <HStack gap="2px">
      <Kbd size="sm">{isMac ? "⌘" : "Ctrl"}</Kbd>
      <Kbd size="sm">{isMac ? "⇧" : "Shift"}</Kbd>
      <Kbd size="sm">{letter}</Kbd>
    </HStack>
  );
};

// ── AddMenu — Chakra Menu offering Object / Array / Value options ─────────────
//
// Visibility model
// ────────────────
// The `+` button is a *positioning anchor* for the dropdown menu (Chakra's
// Menu uses the trigger element's bounding box to place the popper). If we
// hide the trigger via `display: none` while the menu is open — which is
// exactly what would happen when the user's cursor crosses from the row
// onto the menu and `mouseleave` fires on the row — the trigger loses its
// bounding box. Chakra then re-positions the popper at (0, 0) of the
// viewport, producing the "menu flies to the top-left corner and flickers"
// bug.
//
// We fix this two ways:
//   1. While the menu is open, the trigger is force-visible regardless of
//      the parent row's hover state (`isOpen || visible`).
//   2. Hidden state uses `visibility: hidden` (preserves layout / anchor
//      box) instead of `display: none`. We additionally set
//      `pointerEvents: none` so a hidden icon can't intercept clicks or
//      poison the row's hover bookkeeping.

const AddMenu: React.FC<{
  nodeId: string;
  visible: boolean;
  palette: string;
  onAfterSelect?: () => void;
}> = ({ nodeId, visible, palette, onAfterSelect }) => {
  const { addAdjacent } = useEditCtx();
  const [isOpen, setIsOpen] = React.useState(false);
  const shouldShow = visible || isOpen;

  return (
    <Menu.Root
      open={isOpen}
      onOpenChange={(d) => setIsOpen(d.open)}
      positioning={{ placement: "bottom-start" }}
      onSelect={(d) => {
        addAdjacent(nodeId, d.value as AddKind);
        // After a mutation the row layout shifts (a new child appears below
        // the opening brace, pushing the cursor off the originating row).
        // The browser does NOT re-fire `mouseleave` in that scenario, so
        // we eagerly clear the hover state to ensure the +/trash icons
        // disappear in sync with the structural change.
        onAfterSelect?.();
      }}
    >
      <Menu.Trigger asChild>
        <IconButton
          size="xs"
          variant="plain"
          colorPalette={palette}
          aria-label="Add adjacent node"
          style={{
            // `visibility: hidden` (not `display: none`) keeps the trigger's
            // bounding box intact for the popper to anchor against, even
            // while the row is not hovered. See block comment above.
            visibility: shouldShow ? "visible" : "hidden",
            pointerEvents: shouldShow ? "auto" : "none",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <LuPlus />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="14rem">
            <Menu.Item value="object">
              <Text>{"Object"}</Text>
              <Spacer />
              <ShortcutKbd letter={ADD_SHORTCUTS.object.key} />
            </Menu.Item>
            <Menu.Item value="array">
              <Text>{"Array"}</Text>
              <Spacer />
              <ShortcutKbd letter={ADD_SHORTCUTS.array.key} />
            </Menu.Item>
            <Menu.Item value="value">
              <Text>{"Value"}</Text>
              <Spacer />
              <ShortcutKbd letter={ADD_SHORTCUTS.value.key} />
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

// ── EditableInput — inline input used for both key and value editing ───────────
//
// A single free-text input is used for every value type. The Dynamic Type
// Inference Engine (`parseTypedValue`) handles casting on commit, so there
// is no need for a separate boolean dropdown.
//
// Password-manager hardening
// ──────────────────────────
// JSON values frequently look like credentials to extension heuristics
// (LastPass, 1Password, Dashlane, Bitwarden, Apple Passwords, …). When that
// happens the extension overlays its own UI on top of the input — covering
// the row, intercepting keystrokes, and sometimes auto-filling unrelated
// content. We declare this field as a plain editor in every dialect each
// extension respects:
//
//   • `autoComplete="off"` + `name`/`id` containing the substring "search"
//     (Chrome ignores `autoComplete=off` on text inputs UNLESS the field
//     is recognised as a search input, hence the naming).
//   • `data-form-type="other"` — Dashlane explicit opt-out.
//   • `data-lpignore="true"` — LastPass explicit opt-out.
//   • `data-1p-ignore="true"` / `data-1p-ignore=""` — 1Password opt-out.
//   • `data-bwignore="true"` — Bitwarden opt-out.
//   • `data-protonpass-ignore="true"` — Proton Pass opt-out.
//   • `autoCorrect`/`autoCapitalize`/`spellCheck` off — keep the editor raw.
//   • The input is NOT wrapped in a `<form>` (already true) and never has
//     `type="password"` / `name="password"` / autoComplete tokens that
//     resemble credential roles.

const EditableInput: React.FC<{
  draft: string;
  onChange: (v: string) => void;
  onCommit: () => void;
  onCancel: () => void;
  /** Optional callback for Tab — if provided, the input swallows Tab and
   *  delegates to this handler (used to advance from key-edit → value-edit
   *  on a freshly-added object entry). When not provided, Tab falls back to
   *  the default browser behaviour (focus the next form element). */
  onTab?: () => void;
  width?: string;
  /** When true, all text is selected the moment the input mounts/focuses,
   *  so a typing user immediately overwrites the placeholder content. */
  autoSelect?: boolean;
}> = ({
  draft,
  onChange,
  onCommit,
  onCancel,
  onTab,
  width = "130px",
  autoSelect,
}) => {
  const handle = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onCommit();
    } else if (e.key === "Tab" && onTab) {
      // Swallow the default focus-traversal so we can route the Tab into a
      // dedicated transition (key → value). Shift+Tab is left to the
      // browser, which is the conventional reverse-traversal direction.
      if (!e.shiftKey) {
        e.preventDefault();
        onTab();
      }
    } else if (e.key === "Escape") {
      onCancel();
    }
    e.stopPropagation();
  };
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (autoSelect) {
      // When a new node is added inside a branch that expands in the same
      // frame, Ark/Chakra's roving-tabindex handler fires after React's
      // useEffect and steals focus before select() lands. Two nested rAFs
      // push our focus+select past that expansion handler so the selection
      // is always reliable, regardless of nesting depth.
      let inner: number;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => {
          el.focus();
          el.select();
        });
      });
      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }

    // Normal double-click edit: focus immediately, no selection needed.
    el.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <input
      ref={ref}
      type="text"
      // Naming the field "search" is a documented workaround that makes
      // Chromium honour `autoComplete="off"` for text inputs — without it
      // Chrome will still surface saved-credential suggestions. Combined
      // with `role="textbox"` (instead of the default), this keeps password
      // managers from treating the field as an account/login control.
      name="json-tree-search-value"
      id="json-tree-search-value"
      role="textbox"
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck={false}
      // Per-vendor opt-outs (each extension reads its own attribute).
      data-form-type="other"
      data-lpignore="true"
      data-1p-ignore="true"
      data-bwignore="true"
      data-protonpass-ignore="true"
      aria-autocomplete="none"
      value={draft}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onCommit}
      onKeyDown={handle}
      style={{ ...BASE_INPUT, width }}
      onClick={stop}
    />
  );
};

// ── RenderNode — recursive tree node renderer with inline editing ─────────────

const RenderNode: React.FC<{ node: JsonTreeNode; indexPath: number[] }> = ({
  node,
  indexPath,
}) => {
  const {
    editState,
    palette,
    expandedValue,
    startEditValue,
    startEditKey,
    commitEdit,
    cancelEdit,
    setEditDraft,
    doDelete,
    searchQuery,
    dragNodeId,
    dropTarget,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDrop,
  } = useEditCtx();

  const hl = (text: string): React.ReactNode =>
    searchQuery ? (
      <Highlight
        query={[searchQuery]}
        styles={{ bg: "yellow.subtle", color: "yellow.fg", rounded: "sm", px: "0.5" }}
      >
        {text}
      </Highlight>
    ) : text;

  const [hovered, setHovered] = React.useState(false);

  const isBranch = node.valueType === "object" || node.valueType === "array";
  const isRoot = node.labelType === "root";
  const hasChildren = (node.children?.length ?? 0) > 0;
  const isEditKey = editState?.nodeId === node.id && editState.target === "key";
  const isEditVal =
    editState?.nodeId === node.id && editState.target === "value";

  // ── key segment ────────────────────────────────────────────────────────────

  const keySegment = !isRoot && (
    <>
      {isEditKey ? (
        <EditableInput
          draft={editState!.draft}
          onChange={setEditDraft}
          onCommit={() => commitEdit()}
          onCancel={cancelEdit}
          // Tab → commit key + advance to value edit. Only meaningful for a
          // primitive value; commitEdit will silently no-op the advance for
          // a branch (object/array) value.
          onTab={() => commitEdit(true)}
          width="100px"
          autoSelect={editState!.autoSelect}
        />
      ) : node.labelType === "index" ? (
        <Text as="span" fontFamily="mono" fontSize="1em" color={INDEX_COLOR}>
          {hl(node.label)}
        </Text>
      ) : (
        // Single click selects the row (handled by TreeView). Double click
        // enters key-rename mode. We deliberately don't `stopPropagation` on
        // the single-click path so the TreeView can register selection.
        <Text
          as="span"
          fontFamily="mono"
          fontSize="1em"
          color={KEY_COLOR}
          cursor="text"
          title="Double-click to rename key"
          onDoubleClick={(e) => {
            e.stopPropagation();
            startEditKey(node.id, node.label);
          }}
        >
          {hl(node.label)}
        </Text>
      )}
      <Text as="span" fontFamily="mono" fontSize="1em" color={COLON_COLOR}>
        {": "}
      </Text>
    </>
  );

  // ── branch ─────────────────────────────────────────────────────────────────

  if (isBranch) {
    const openB = node.valueType === "array" ? "[" : "{";
    const closeB = node.valueType === "array" ? "]" : "}";
    const countWord =
      node.valueType === "array"
        ? node.childCount === 1
          ? "item"
          : "items"
        : node.childCount === 1
          ? "key"
          : "keys";
    // Always-visible structural placeholder. Showing the count on BOTH the
    // collapsed and expanded forms preserves structural context (the user
    // can see at a glance how many keys/items live inside the container)
    // and makes empty containers (`0 items`/`0 keys`) discoverable rather
    // than presenting an empty `{}`/`[]` that hides the placeholder.
    const metaText = `${node.childCount} ${countWord}`;

    // closing brace rendered as a Fragment sibling OUTSIDE BranchContent so it
    // receives explicit padding rather than ARK's depth-based CSS (which only
    // applies to Branch/Item elements, not plain Box siblings).
    const closingBracePs = `${indexPath.length * 20}px`;

    // The branch is "open" (children visible) iff it has children AND is in the
    // expandedValue set. In every other case (empty, or collapsed-with-children)
    // the closing brace must appear inline next to the opening brace, otherwise
    // the rendered tree looks syntactically incomplete (missing `}` / `]`).
    const isOpenInline = hasChildren && expandedValue.includes(node.id);

    // Imperative hover-reset used after a mutation. The browser does not
    // re-emit mouseleave when the row layout shifts beneath the cursor
    // (e.g. a new child pushes the row down), which would otherwise leave
    // the +/trash icons stranded in their visible state. See AddMenu and
    // the delete button below.
    const clearHover = () => setHovered(false);

    return (
      <React.Fragment>
        <TreeView.NodeProvider node={node} indexPath={indexPath}>
          <TreeView.Branch>
            <TreeView.BranchControl
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              draggable={!searchQuery && !isRoot}
              onDragStart={(e) => { if (!isRoot) onDragStart(node.id, e); }}
              onDragEnd={onDragEnd}
              onDragOver={(e) => { if (!isRoot) onDragOver(node.id, e); }}
              onDrop={onDrop}
              data-drop-before={dropTarget?.nodeId === node.id && dropTarget.position === "before" ? "true" : undefined}
              data-drop-after={dropTarget?.nodeId === node.id && dropTarget.position === "after" ? "true" : undefined}
              data-dragging={dragNodeId === node.id ? "true" : undefined}
            >
              {hasChildren ? (
                <TreeView.BranchTrigger>
                  <TreeView.BranchIndicator asChild>
                    {/* Slightly oversized chevron — bumped from the default
                        ~14px up to 18px so the click target reads as a
                        proper interactive control rather than a decorative
                        glyph. The CSS rule on `.json-tree-root [data-part=
                        "branch-indicator"] svg` reinforces this for icons
                        rendered without an explicit `size` prop. */}
                    <LuChevronRight size={18} strokeWidth={2.25} />
                  </TreeView.BranchIndicator>
                </TreeView.BranchTrigger>
              ) : (
                <Box w="5" h="5" flexShrink={0} />
              )}

              <TypeDot type={node.valueType} />
              {keySegment}
              <Text
                as="span"
                fontFamily="mono"
                fontSize="1em"
                color={BRACKET_COLOR}
              >
                {openB}
              </Text>

              {/* Structural placeholder. Always rendered so users can see the
                  child count whether the branch is expanded or collapsed.
                  When expanded, the closing brace lives on its own row below
                  the children, so we omit it here. The meta text uses an
                  em-relative size so it scales with Settings → Font Size. */}
              <Text
                as="span"
                fontFamily="mono"
                fontSize="0.85em"
                color={META_COLOR}
                ms={1}
                data-json-tree-meta=""
              >
                {metaText}
              </Text>
              {!isOpenInline && (
                <Text
                  as="span"
                  fontFamily="mono"
                  fontSize="1em"
                  color={BRACKET_COLOR}
                  ms={1}
                >
                  {closeB}
                </Text>
              )}

              {/* Inline action icons — hidden while search is active. */}
              {!searchQuery && (
                <HStack gap="2px" ms={1}>
                  {!isRoot && (
                    <Box
                      as="span"
                      className="json-tree-grip"
                      display="flex"
                      alignItems="center"
                      color="fg.subtle"
                      style={{
                        visibility: hovered ? "visible" : "hidden",
                        pointerEvents: hovered ? "auto" : "none",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <LuGripVertical size={14} />
                    </Box>
                  )}
                  <AddMenu
                    nodeId={node.id}
                    visible={hovered}
                    palette={palette}
                    onAfterSelect={clearHover}
                  />
                  {!isRoot && (
                    <IconButton
                      size="xs"
                      variant="plain"
                      colorPalette="red"
                      aria-label="Delete"
                      style={{
                        visibility: hovered ? "visible" : "hidden",
                        pointerEvents: hovered ? "auto" : "none",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        clearHover();
                        doDelete(node.id);
                      }}
                    >
                      <LuTrash2 />
                    </IconButton>
                  )}
                </HStack>
              )}
            </TreeView.BranchControl>

            <TreeView.BranchContent>
              <TreeView.BranchIndentGuide />
              {node.children?.map((child, i) => (
                <RenderNode
                  key={child.id}
                  node={child}
                  indexPath={[...indexPath, i]}
                />
              ))}
            </TreeView.BranchContent>
          </TreeView.Branch>
        </TreeView.NodeProvider>

        {isOpenInline && (
          <Box
            style={{ paddingInlineStart: closingBracePs }}
            py="1px"
            data-json-tree-row="close"
            data-json-tree-node-id={node.id}
          >
            <Text
              as="span"
              fontFamily="mono"
              fontSize="1em"
              color={BRACKET_COLOR}
            >
              {closeB}
            </Text>
          </Box>
        )}
      </React.Fragment>
    );
  }

  // ── leaf ───────────────────────────────────────────────────────────────────

  const displayValue =
    node.valueType === "string" ? (node.rawValue as string) : node.valueStr;

  return (
    <TreeView.NodeProvider node={node} indexPath={indexPath}>
      <TreeView.Item
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        draggable={!searchQuery}
        onDragStart={(e) => onDragStart(node.id, e)}
        onDragEnd={onDragEnd}
        onDragOver={(e) => onDragOver(node.id, e)}
        onDrop={onDrop}
        data-drop-before={dropTarget?.nodeId === node.id && dropTarget.position === "before" ? "true" : undefined}
        data-drop-after={dropTarget?.nodeId === node.id && dropTarget.position === "after" ? "true" : undefined}
        data-dragging={dragNodeId === node.id ? "true" : undefined}
      >
        <TypeDot type={node.valueType} />
        {keySegment}

        {isEditVal ? (
          <EditableInput
            draft={editState!.draft}
            onChange={setEditDraft}
            onCommit={commitEdit}
            onCancel={cancelEdit}
            autoSelect={editState!.autoSelect}
          />
        ) : (
          // Single click is reserved for selecting the leaf (TreeView handles
          // that on the row). Double-click drops the user into value-edit mode.
          <Text
            as="span"
            fontFamily="mono"
            fontSize="1em"
            color={valueColor(node.valueType)}
            cursor="text"
            title="Double-click to edit value"
            onDoubleClick={(e) => {
              e.stopPropagation();
              // Seed the edit input with a representation that survives the
              // parseTypedValue round-trip. For strings whose content looks
              // like another type (`"1"`, `"true"`, …) we feed the input
              // the JSON-encoded, quoted form so the user can see — and
              // commit back — the explicit string typing.
              const seed =
                node.valueType === "string"
                  ? stringEditSeed(node.rawValue as string)
                  : displayValue;
              startEditValue(node.id, seed);
            }}
          >
            {displayValue !== "" ? (
              hl(displayValue)
            ) : (
              <Text
                as="span"
                color="fg.subtle"
                fontSize="0.85em"
                fontStyle="italic"
              >
                empty
              </Text>
            )}
          </Text>
        )}

        {/* Inline action icons next to the value — hidden while search is active. */}
        {!searchQuery && (
          <HStack gap="2px" ms={1}>
            <Box
              as="span"
              className="json-tree-grip"
              display="flex"
              alignItems="center"
              color="fg.subtle"
              style={{
                visibility: hovered ? "visible" : "hidden",
                pointerEvents: hovered ? "auto" : "none",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <LuGripVertical size={14} />
            </Box>
            <AddMenu
              nodeId={node.id}
              visible={hovered}
              palette={palette}
              onAfterSelect={() => setHovered(false)}
            />
            <IconButton
              size="xs"
              variant="plain"
              colorPalette="red"
              aria-label="Delete"
              style={{
                visibility: hovered ? "visible" : "hidden",
                pointerEvents: hovered ? "auto" : "none",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setHovered(false);
                doDelete(node.id);
              }}
            >
              <LuTrash2 />
            </IconButton>
          </HStack>
        )}
      </TreeView.Item>
    </TreeView.NodeProvider>
  );
};

// ── Breadcrumb helpers ────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  label: string;
  nodeId: string;
}

export function nodeIdToBreadcrumbs(id: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [{ label: "$", nodeId: "root" }];
  if (id === "root") return items;
  let current = "root";
  const tokens = id.slice(4).match(/\.[^.[[\]]+|\[\d+\]/g) ?? [];
  for (const tok of tokens) {
    current += tok;
    items.push({
      label: tok.startsWith(".")
        ? tok.slice(1).replace(/·/g, ".")
        : tok.slice(1, -1),
      nodeId: current,
    });
  }
  return items;
}

// ── Handle / Props ────────────────────────────────────────────────────────────

export interface JsonTreeViewHandle {
  collapseAll: () => void;
  expandAll: () => void;
  selectNode: (nodeId: string) => void;
  /** Insert a new entry. Targets the currently-selected node, or the root
   *  if no node is selected. Mirrors the keyboard-shortcut behaviour. */
  addEntry: (kind: AddKind) => void;
  /** Undo / redo the most recent tree-level mutation. No-op if there is
   *  nothing to undo/redo respectively. */
  undo: () => void;
  redo: () => void;
  /** Stack-depth probes for the toolbar to disable the buttons when
   *  appropriate. */
  canUndo: () => boolean;
  canRedo: () => boolean;
}

export interface JsonTreeViewProps {
  value: string;
  colorMode: "light" | "dark";
  showLineNumbers: boolean;
  searchQuery?: string;
  /**
   * Base font size (px) for the tree. Drives both the rendered text and the
   * fixed row height so the gutter and tree rows stay visually aligned.
   * Defaults to 13 if not provided. */
  fontSize?: number;
  treeRef?: React.Ref<JsonTreeViewHandle>;
  onSelectionChange?: (breadcrumbs: BreadcrumbItem[] | null) => void;
  onChange?: (newJson: string) => void;
}

// ── Empty collection sentinel ─────────────────────────────────────────────────

const EMPTY_COLLECTION = createTreeCollection<JsonTreeNode>({
  nodeToValue: (n) => n.id,
  nodeToString: (n) => n.label,
  rootNode: {
    id: "__root__",
    label: "",
    labelType: "root",
    valueStr: "",
    valueType: "null",
    childCount: 0,
    rawValue: null,
  },
});

// ── Main component ────────────────────────────────────────────────────────────

const JsonTreeView: React.FC<JsonTreeViewProps> = ({
  value,
  showLineNumbers,
  fontSize = 13,
  treeRef,
  onSelectionChange,
  onChange,
  searchQuery = "",
}) => {
  const { palette } = useColorPalette();
  const { contains } = useFilter({ sensitivity: "base" });
  const trimmedQuery = searchQuery.trim();
  const isInternalRef = React.useRef(false);

  // ── sidebar resize ────────────────────────────────────────────────────────
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const [sidebarWidth, setSidebarWidth] = React.useState(450);

  const handleResizeStart = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      const startX = e.clientX;
      const startWidth = sidebarRef.current?.offsetWidth ?? sidebarWidth;

      const onMove = (ev: PointerEvent) => {
        const newWidth = Math.max(200, Math.min(800, startWidth + (startX - ev.clientX)));
        if (sidebarRef.current) {
          sidebarRef.current.style.width = `${newWidth}px`;
          sidebarRef.current.style.minWidth = `${newWidth}px`;
        }
      };

      const onUp = (ev: PointerEvent) => {
        const newWidth = Math.max(200, Math.min(800, startWidth + (startX - ev.clientX)));
        setSidebarWidth(newWidth);
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup", onUp);
      };

      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp);
    },
    [sidebarWidth],
  );

  // ── parse ──────────────────────────────────────────────────────────────────

  const parsed = React.useMemo(() => {
    if (!value.trim()) return { data: null, error: null, empty: true };
    try {
      const data = JSON.parse(value);
      return { data: data as JsonValue, error: null, empty: false };
    } catch (e) {
      return { data: null, error: (e as Error).message, empty: false };
    }
  }, [value]);

  // ── build tree ────────────────────────────────────────────────────────────

  const { collection, nodesById, rootNode } = React.useMemo(() => {
    if (parsed.empty || parsed.error !== null)
      return {
        collection: EMPTY_COLLECTION,
        nodesById: new Map<string, JsonTreeNode>(),
        rootNode: null,
      };

    const rn = buildNode(parsed.data!, "", "root", "root");
    const map = new Map<string, JsonTreeNode>();
    indexNodes(rn, map);
    return {
      collection: createTreeCollection<JsonTreeNode>({
        nodeToValue: (n) => n.id,
        nodeToString: (n) => n.label,
        rootNode: {
          id: "__root__",
          label: "",
          labelType: "root",
          valueStr: "",
          valueType: "null",
          childCount: 1,
          rawValue: null,
          children: [rn],
        },
      }),
      nodesById: map,
      rootNode: rn,
    };
  }, [parsed]);

  // ── filter (tree search) ──────────────────────────────────────────────────

  const filteredRootNode = React.useMemo(() => {
    if (!trimmedQuery || !rootNode) return rootNode;
    return filterJsonNode(rootNode, trimmedQuery, contains);
  }, [rootNode, trimmedQuery, contains]);

  const filteredCollection = React.useMemo(() => {
    if (!trimmedQuery || !filteredRootNode) return collection;
    return createTreeCollection<JsonTreeNode>({
      nodeToValue: (n) => n.id,
      nodeToString: (n) => n.label,
      rootNode: {
        id: "__root__",
        label: "",
        labelType: "root",
        valueStr: "",
        valueType: "null",
        childCount: 1,
        rawValue: null,
        children: [filteredRootNode],
      },
    });
  }, [trimmedQuery, filteredRootNode, collection]);

  // When filtering, auto-expand every branch that survived the filter so all
  // matches are immediately visible. When not filtering, use normal state.
  const filteredExpandedIds = React.useMemo(
    () => (trimmedQuery && filteredRootNode ? getAllBranchIds(filteredRootNode) : null),
    [trimmedQuery, filteredRootNode],
  );

  // ── state ──────────────────────────────────────────────────────────────────

  // Lazy-init avoids a collapsed→expanded flash on first paint
  const [expandedValue, setExpandedValue] = React.useState<string[]>(() =>
    rootNode ? getAllBranchIds(rootNode) : [],
  );
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [editState, setEditState] = React.useState<EditState>(null);
  const [dragNodeId, setDragNodeId] = React.useState<string | null>(null);
  const [dropTarget, setDropTarget] = React.useState<DropTarget>(null);

  const parsedDataRef = React.useRef(parsed.data);
  React.useEffect(() => { parsedDataRef.current = parsed.data; }, [parsed.data]);

  // ── undo / redo history ────────────────────────────────────────────────────
  //
  // The tree maintains its own snapshot history of the JSON `value` string,
  // independent of the CodeMirror text editor's history. Each tree-driven
  // mutation pushes the *prior* value onto `past` and clears `future`;
  // undo pops `past` and pushes the current value onto `future`; redo
  // mirrors that in reverse.
  //
  // External `value` changes (CodeMirror typing, file load, format/sort,
  // etc.) reset the history — that's the only sensible behaviour, since
  // undoing past an external edit would silently revert work the user
  // performed in another mode.
  //
  // We use `useRef` (not `useState`) because the stacks are mutated inside
  // imperative handlers (undo/redo, applyMutation) and don't themselves
  // need to trigger re-renders. A separate counter triggers re-evaluation
  // of `canUndo/canRedo` for the toolbar.
  const pastRef = React.useRef<string[]>([]);
  const futureRef = React.useRef<string[]>([]);
  const [historyVersion, setHistoryVersion] = React.useState(0);
  const bumpHistoryVersion = React.useCallback(
    () => setHistoryVersion((v) => v + 1),
    [],
  );

  // Track the latest value prop in a ref so handlers always read the
  // up-to-date string without needing it as a dep.
  const valueRef = React.useRef(value);
  React.useEffect(() => {
    valueRef.current = value;
  }, [value]);

  // Skip first fire (already handled by the lazy initializer above)
  const firstEffectRef = React.useRef(true);

  // Reset on external value change; skip reset after internal mutations.
  // External resets also discard the tree-local undo/redo stacks.
  React.useEffect(() => {
    if (firstEffectRef.current) {
      firstEffectRef.current = false;
      return;
    }
    if (isInternalRef.current) {
      isInternalRef.current = false;
      return;
    }
    setExpandedValue(rootNode ? getAllBranchIds(rootNode) : []);
    setSelectedId(null);
    setEditState(null);
    pastRef.current = [];
    futureRef.current = [];
    bumpHistoryVersion();
  }, [rootNode, bumpHistoryVersion]);

  // Imperative handle is finalised AFTER `ctx` is built so `addEntry` can
  // delegate to `ctx.addAdjacent`. See definition below the ctx declaration.

  const selectedNode = selectedId ? (nodesById.get(selectedId) ?? null) : null;

  // Keep the latest onSelectionChange in a ref so the effect below only fires
  // when the selection actually changes (callers often pass a fresh inline
  // function on every render, which would otherwise cause an infinite loop).
  const onSelectionChangeRef = React.useRef(onSelectionChange);
  React.useEffect(() => {
    onSelectionChangeRef.current = onSelectionChange;
  }, [onSelectionChange]);

  React.useEffect(() => {
    onSelectionChangeRef.current?.(
      selectedId ? nodeIdToBreadcrumbs(selectedId) : null,
    );
  }, [selectedId]);

  // ── mutation helper ───────────────────────────────────────────────────────
  //
  // Every tree-driven edit funnels through `applyMutation`. We snapshot the
  // *prior* JSON string onto `past` and clear `future` so the new edit
  // becomes the latest history entry (standard editor history semantics).

  const applyMutation = React.useCallback(
    (newData: JsonValue) => {
      const next = JSON.stringify(newData, null, 2);
      pastRef.current = [...pastRef.current, valueRef.current];
      futureRef.current = [];
      bumpHistoryVersion();
      isInternalRef.current = true;
      onChange?.(next);
    },
    [onChange, bumpHistoryVersion],
  );

  // ── drag-and-drop move ────────────────────────────────────────────────────

  const doMove = React.useCallback(
    (srcId: string, tgtId: string, position: "before" | "after") => {
      const data = parsedDataRef.current;
      if (!data || srcId === tgtId || isDescendantOrSelf(srcId, tgtId)) return;

      const srcSegs = idToSegments(srcId);
      const tgtSegs = idToSegments(tgtId);
      if (tgtSegs.length === 0) return;

      const srcValue = getAtPath(data, srcSegs);
      const tgtParentSegs = tgtSegs.slice(0, -1);
      const tgtParent = getAtPath(data, tgtParentSegs);
      const tgtParentIsArray = Array.isArray(tgtParent);
      const tgtParentIsObject =
        !tgtParentIsArray && tgtParent !== null && typeof tgtParent === "object";
      if (!tgtParentIsArray && !tgtParentIsObject) return;

      const srcParentSegs = srcSegs.slice(0, -1);
      const srcParentIsArray = Array.isArray(getAtPath(data, srcParentSegs));
      const sameParent =
        srcParentSegs.length === tgtParentSegs.length &&
        srcParentSegs.every((s, i) => s === tgtParentSegs[i]);

      // Compute raw insertion index in target parent
      let insertIndex: number;
      if (tgtParentIsArray) {
        const tgtIdx = tgtSegs[tgtSegs.length - 1] as number;
        insertIndex = position === "before" ? tgtIdx : tgtIdx + 1;
      } else {
        const tgtKey = String(tgtSegs[tgtSegs.length - 1]);
        const keys = Object.keys(tgtParent as Record<string, JsonValue>);
        const ki = keys.indexOf(tgtKey);
        insertIndex = position === "before" ? ki : ki + 1;
      }

      // Delete source, then adjust index for same-parent array reindex
      let newData = deleteAtPath(data, srcSegs);
      if (sameParent && tgtParentIsArray) {
        const srcIdx = srcSegs[srcSegs.length - 1] as number;
        if (srcIdx < insertIndex) insertIndex -= 1;
      } else if (sameParent && tgtParentIsObject) {
        const keys = Object.keys(tgtParent as Record<string, JsonValue>);
        const srcKeyIdx = keys.indexOf(String(srcSegs[srcSegs.length - 1]));
        if (srcKeyIdx < insertIndex) insertIndex -= 1;
      }

      // Determine the key to use when inserting into an object parent
      let newKey: string | undefined;
      let needsKeyEdit = false;
      if (tgtParentIsObject) {
        const parentAfterDelete = getAtPath(newData, tgtParentSegs) as Record<string, JsonValue>;
        if (!srcParentIsArray) {
          const origKey = String(srcSegs[srcSegs.length - 1]).replace(/·/g, ".");
          if (!(origKey in parentAfterDelete)) {
            newKey = origKey;
          } else {
            newKey = uniqueNewItemKey(parentAfterDelete);
            needsKeyEdit = true;
          }
        } else {
          newKey = uniqueNewItemKey(parentAfterDelete);
          needsKeyEdit = true;
        }
      }

      newData = insertIntoParent(newData, tgtParentSegs, insertIndex, srcValue, newKey);
      applyMutation(newData);

      if (needsKeyEdit && newKey) {
        const parentNodeId = segsToNodeId(tgtParentSegs);
        const newNodeId = `${parentNodeId}.${newKey.replace(/\./g, "·")}`;
        setEditState({ nodeId: newNodeId, target: "key", draft: newKey, autoSelect: true });
      }
    },
    [applyMutation],
  );

  // ── undo / redo handlers ──────────────────────────────────────────────────

  const undo = React.useCallback(() => {
    if (pastRef.current.length === 0) return;
    const prev = pastRef.current[pastRef.current.length - 1];
    pastRef.current = pastRef.current.slice(0, -1);
    futureRef.current = [...futureRef.current, valueRef.current];
    bumpHistoryVersion();
    // Drop any in-flight edit so it can't commit against a stale snapshot.
    setEditState(null);
    isInternalRef.current = true;
    onChange?.(prev);
  }, [onChange, bumpHistoryVersion]);

  const redo = React.useCallback(() => {
    if (futureRef.current.length === 0) return;
    const next = futureRef.current[futureRef.current.length - 1];
    futureRef.current = futureRef.current.slice(0, -1);
    pastRef.current = [...pastRef.current, valueRef.current];
    bumpHistoryVersion();
    setEditState(null);
    isInternalRef.current = true;
    onChange?.(next);
  }, [onChange, bumpHistoryVersion]);

  // ── context value ─────────────────────────────────────────────────────────

  const dragNodeIdRef = React.useRef(dragNodeId);
  dragNodeIdRef.current = dragNodeId;
  const dropTargetRef = React.useRef(dropTarget);
  dropTargetRef.current = dropTarget;

  const ctx: EditCtxValue = {
    editState,
    palette,
    expandedValue: filteredExpandedIds ?? expandedValue,
    searchQuery: trimmedQuery,
    dragNodeId,
    dropTarget,

    onDragStart: (nodeId, e) => {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", nodeId);
      setDragNodeId(nodeId);
    },

    onDragEnd: () => {
      setDragNodeId(null);
      setDropTarget(null);
    },

    onDragOver: (nodeId, e) => {
      e.preventDefault();
      const src = dragNodeIdRef.current;
      if (!src || src === nodeId || isDescendantOrSelf(src, nodeId)) {
        e.dataTransfer.dropEffect = "none";
        return;
      }
      e.dataTransfer.dropEffect = "move";
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const position: "before" | "after" = e.clientY < rect.top + rect.height / 2 ? "before" : "after";
      const cur = dropTargetRef.current;
      if (cur?.nodeId !== nodeId || cur?.position !== position)
        setDropTarget({ nodeId, position });
    },

    onDrop: (e) => {
      e.preventDefault();
      const src = dragNodeIdRef.current;
      const tgt = dropTargetRef.current;
      if (src && tgt) doMove(src, tgt.nodeId, tgt.position);
      setDragNodeId(null);
      setDropTarget(null);
    },

    startEditValue: (nodeId, current) =>
      setEditState({ nodeId, draft: current, target: "value" }),

    startEditKey: (nodeId, currentKey) =>
      setEditState({ nodeId, draft: currentKey, target: "key" }),

    commitEdit: (advanceToValue?: boolean) => {
      if (!editState || !parsed.data) {
        setEditState(null);
        return;
      }
      const segs = idToSegments(editState.nodeId);

      if (editState.target === "key") {
        // Keys are always strings; just trim the draft and rename. Reject
        // empty keys and silently ignore renames to a key that already exists
        // in the same parent (avoids accidentally clobbering a sibling).
        const newKey = editState.draft.trim();
        const origKey = String(segs[segs.length - 1]);
        let effectiveKey = origKey; // the key we end up with (may be new or old)
        if (newKey && newKey !== origKey) {
          const parentSegs = segs.slice(0, -1);
          const parent = getAtPath(parsed.data, parentSegs);
          const exists =
            parent !== null &&
            typeof parent === "object" &&
            !Array.isArray(parent) &&
            newKey in (parent as Record<string, JsonValue>);
          if (!exists) {
            applyMutation(renameKeyAtPath(parsed.data, segs, newKey));
            effectiveKey = newKey;
          }
        }

        // Tab-advance: jump straight from key-edit into value-edit on the
        // same entry. Only makes sense for primitive (leaf) values — for
        // an object/array branch there is no inline value to type.
        if (advanceToValue) {
          // Recompute the node id with the (possibly renamed) key, mirroring
          // `buildNode`'s dot-escape transform so it matches the next render.
          const lastTokenMatch = editState.nodeId.match(
            /(\.[^.[\]]+|\[\d+\])$/,
          );
          const parentNodeId = lastTokenMatch
            ? editState.nodeId.slice(
                0,
                editState.nodeId.length - lastTokenMatch[0].length,
              )
            : "root";
          const newNodeId = `${parentNodeId}.${effectiveKey.replace(/\./g, "·")}`;

          // Inspect the value at the entry's path. We read from the OLD
          // closure-captured `parsed.data` (the rename mutation has only
          // been *requested* via applyMutation; the new render with the new
          // parse hasn't happened yet). Reading at `origKey` works because
          // the value itself is preserved across rename — only the key
          // changes.
          const currentValue = getAtPath(parsed.data, segs);
          const isLeaf =
            currentValue === null || typeof currentValue !== "object";
          if (isLeaf) {
            const seed =
              typeof currentValue === "string"
                ? stringEditSeed(currentValue)
                : currentValue === null
                  ? "null"
                  : String(currentValue);
            setEditState({
              nodeId: newNodeId,
              target: "value",
              draft: seed,
              autoSelect: true,
            });
            return;
          }
        }
      } else {
        applyMutation(
          setAtPath(parsed.data, segs, parseTypedValue(editState.draft)),
        );
      }
      setEditState(null);
    },

    cancelEdit: () => setEditState(null),

    setEditDraft: (val) =>
      setEditState((prev) => (prev ? { ...prev, draft: val } : null)),

    doDelete: (nodeId) => {
      if (!parsed.data || nodeId === "root") return;
      applyMutation(deleteAtPath(parsed.data, idToSegments(nodeId)));
    },

    addAdjacent: (nodeId, kind) => {
      if (!parsed.data && nodeId !== "root") return;
      const newVal: JsonValue =
        kind === "object" ? {} : kind === "array" ? [] : null;

      // Targeting a branch (object/array, including root): the user expects
      // the new entry to live INSIDE the container — i.e. be its first child.
      // This mirrors the visual: clicking "+" right next to an opening
      // `{` / `[` should drop the new node within that brace, not after it.
      const targetNode = nodeId === "root" ? rootNode : nodesById.get(nodeId);
      const targetIsBranch =
        !!targetNode &&
        (targetNode.valueType === "object" || targetNode.valueType === "array");

      // Resolve the *parent container* under which the new entry will live,
      // along with the segments to that parent and the insertion index. For
      // a branch target the parent IS the target; for a leaf target the
      // parent is one level up.
      let parentNodeId: string;
      let parentSegs: (string | number)[];
      let insertIndex: number;

      if (targetIsBranch) {
        parentNodeId = nodeId;
        parentSegs = nodeId === "root" ? [] : idToSegments(nodeId);
        insertIndex = 0;
      } else {
        const site = parentInsertSiteAfter(parsed.data!, nodeId);
        if (!site) return;
        parentSegs = site.parentSegs;
        insertIndex = site.insertIndex;
        // Reconstruct the parent's node id by stripping the last segment from
        // the leaf's id. The leaf id has the form `root....<lastSeg>` where
        // <lastSeg> is either `.<key>` or `[<index>]`.
        const lastTokenMatch = nodeId.match(/(\.[^.[\]]+|\[\d+\])$/);
        parentNodeId = lastTokenMatch
          ? nodeId.slice(0, nodeId.length - lastTokenMatch[0].length)
          : "root";
      }

      const parentValue = getAtPath(parsed.data!, parentSegs);
      const parentIsArray = Array.isArray(parentValue);
      const parentIsObject =
        !parentIsArray &&
        parentValue !== null &&
        typeof parentValue === "object";
      if (!parentIsArray && !parentIsObject) return;

      // Pre-compute the new entry's key (objects) or index (arrays) so we
      // can derive the new node's tree id deterministically — needed to
      // immediately enter edit mode on it after the mutation.
      let newKey: string | undefined;
      let newId: string;
      if (parentIsArray) {
        newId = `${parentNodeId}[${insertIndex}]`;
      } else {
        newKey = uniqueNewItemKey(parentValue as Record<string, JsonValue>);
        // `buildNode` escapes literal dots in keys to `·` when constructing
        // ids; mirror that exact transform so the id matches what the next
        // render will generate.
        newId = `${parentNodeId}.${newKey.replace(/\./g, "·")}`;
      }

      applyMutation(
        insertIntoParent(parsed.data!, parentSegs, insertIndex, newVal, newKey),
      );

      // Keep the parent expanded so the new entry is visible.
      if (targetIsBranch) {
        setExpandedValue((prev) =>
          prev.includes(parentNodeId) ? prev : [...prev, parentNodeId],
        );
      }

      // Auto-edit the new node:
      //   • Object parent → focus the auto-generated key for renaming.
      //   • Array parent + Value kind → focus the value (`null`) so the
      //     user can immediately type the desired primitive.
      //   • Array parent + Object/Array kind → no editable text, skip.
      // The `isInternalRef` flag (set by `applyMutation`) prevents the
      // rootNode-change effect from clearing this editState on the next
      // render.
      if (parentIsObject) {
        setEditState({
          nodeId: newId,
          target: "key",
          draft: newKey!,
          autoSelect: true,
        });
      } else if (parentIsArray && kind === "value") {
        setEditState({
          nodeId: newId,
          target: "value",
          draft: "null",
          autoSelect: true,
        });
      }
    },
  };

  // ── imperative handle ─────────────────────────────────────────────────────
  //
  // `addEntry` defers to `ctx.addAdjacent`, picking the currently-selected
  // node as the target (or `root` when nothing is selected). We pass the
  // selectedId through a ref so the handler captures the live value rather
  // than a stale closure.
  const ctxRef = React.useRef(ctx);
  ctxRef.current = ctx;
  const selectedIdRef = React.useRef<string | null>(selectedId);
  selectedIdRef.current = selectedId;

  const addEntry = React.useCallback((kind: AddKind) => {
    const target = selectedIdRef.current ?? "root";
    ctxRef.current.addAdjacent(target, kind);
  }, []);

  React.useImperativeHandle(
    treeRef,
    () => ({
      collapseAll: () => setExpandedValue([]),
      expandAll: () =>
        setExpandedValue(rootNode ? getAllBranchIds(rootNode) : []),
      selectNode: (nodeId: string) => setSelectedId(nodeId),
      addEntry,
      undo,
      redo,
      canUndo: () => pastRef.current.length > 0,
      canRedo: () => futureRef.current.length > 0,
    }),
    // `historyVersion` is intentionally listed: callers reading `canUndo()` /
    // `canRedo()` re-evaluate as the stacks change. The handle object identity
    // also rotates so React re-binds the ref.
    [rootNode, addEntry, undo, redo, historyVersion],
  );

  // ── keyboard shortcuts ────────────────────────────────────────────────────
  //
  // Insert shortcuts:  Cmd/Ctrl + Shift + O / A / E
  // Undo / redo:       Cmd/Ctrl + Z   /   Cmd/Ctrl + Shift + Z   /   Ctrl + Y
  //
  // The listener attaches to the document so the shortcuts fire whenever
  // the tree is mounted (the parent only renders this component in tree
  // mode, which is what "tree view is active" means in the spec). We only
  // suppress the shortcut when focus is in a text-entry control:
  //   • our own inline `<input>` for value/key editing,
  //   • CodeMirror's search panel or a Settings text field that happens to
  //     have focus while the tree is visible,
  //   • any contenteditable element.
  // This preserves normal typing behaviour everywhere while still exposing
  // the shortcuts globally for keyboard users.

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;

      const target = e.target as HTMLElement | null;
      const isInputLike =
        !!target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          (target as HTMLElement).isContentEditable);

      // Insert shortcuts: Cmd/Ctrl + Shift + (O | A | E).
      // These are also blocked while editing so users can type letters
      // without triggering insertions.
      if (e.shiftKey && !isInputLike) {
        const code = e.code;
        const match = (Object.entries(ADD_SHORTCUTS) as [
          AddKind,
          { code: string; key: string },
        ][]).find(([, v]) => v.code === code);
        if (match) {
          e.preventDefault();
          addEntry(match[0]);
          return;
        }
        // Cmd/Ctrl + Shift + Z → redo (Mac convention).
        if (code === "KeyZ") {
          e.preventDefault();
          redo();
          return;
        }
      } else if (!isInputLike) {
        // Cmd/Ctrl + Z → undo.
        if (e.code === "KeyZ") {
          e.preventDefault();
          undo();
          return;
        }
        // Ctrl + Y → redo (Windows convention).
        if (e.code === "KeyY") {
          e.preventDefault();
          redo();
          return;
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [addEntry, undo, redo]);

  // ── line-number gutter ────────────────────────────────────────────────────
  //
  // These useMemo calls must stay before any early returns to satisfy the
  // Rules of Hooks (hooks must be called unconditionally on every render).
  const expandedSet = React.useMemo(
    () => new Set(expandedValue),
    [expandedValue],
  );
  const visibleLineNumbers = React.useMemo(
    () => (rootNode ? collectVisibleLineNumbers(rootNode, expandedSet) : []),
    [rootNode, expandedSet],
  );

  // ── render ────────────────────────────────────────────────────────────────

  if (parsed.empty) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        h="100%"
        minH="320px"
        p={8}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          gap={5}
          maxW="320px"
        >
          {/* Icon badge */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="72px"
            h="72px"
            borderRadius="2xl"
            bg={{ base: `${palette}.50`, _dark: `${palette}.950` }}
            borderWidth="1px"
            borderColor={{ base: `${palette}.200`, _dark: `${palette}.800` }}
            color={{ base: `${palette}.500`, _dark: `${palette}.400` }}
          >
            <LuBraces size={32} strokeWidth={1.5} />
          </Box>

          {/* Title + description */}
          <Box display="flex" flexDirection="column" gap={2}>
            <Text fontWeight="semibold" fontSize="lg">
              {"No JSON content"}
            </Text>
            <Text fontSize="sm" color="fg.muted" lineHeight="1.6">
              {"Paste or type valid JSON in the editor, or start fresh with an empty object and build your structure interactively."}
            </Text>
          </Box>

          {/* CTA */}
          <Button
            colorPalette={palette}
            size="sm"
            onClick={() => onChange?.("{}")}
            px={5}
          >
            <LuPlus />
            {"Start with { }"}
          </Button>
        </Box>
      </Box>
    );
  }

  if (parsed.error) {
    return (
      <Box p={4}>
        <Text color="fg.error" fontSize="sm" fontFamily="mono">
          {parsed.error}
        </Text>
      </Box>
    );
  }

  if (trimmedQuery && filteredRootNode?.childCount === 0) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        h="100%"
        minH="200px"
        p={8}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          gap={3}
        >
          <Text fontWeight="semibold" fontSize="sm">
            {"No matches"}
          </Text>
          <Text fontSize="sm" color="fg.muted">
            {`No nodes match "${trimmedQuery}"`}
          </Text>
        </Box>
      </Box>
    );
  }

  // Fixed row metrics — both the gutter lines and the rendered tree rows must
  // share the same height for the numbers to align. We pin BranchControl /
  // Item / closing-brace rows to `--json-row-h` via the className-scoped CSS
  // below. Row height scales with the user's font size (Settings → Font Size),
  // using a 1.7× multiplier so descenders stay clear of the next row.
  const ROW_HEIGHT = Math.max(20, Math.round(fontSize * 1.7));

  // Compute gutter width based on the largest line number it has to display
  // (a 4-digit number needs more space than a 2-digit one). Using `ch` keeps
  // the column tight regardless of font size while remaining digit-aware.
  const maxLine = visibleLineNumbers.length
    ? visibleLineNumbers[visibleLineNumbers.length - 1]
    : 0;
  const gutterDigits = Math.max(2, String(maxLine).length);

  return (
    <EditCtx.Provider value={ctx}>
      {/* Scoped CSS: enforce a single, consistent row height across every
          renderable row (branch headers, leaf items, and the standalone
          closing-brace rows) so the gutter stays aligned. The typography
          (font-size, line-height) is also pinned here so the Settings →
          Font Size value flows through the entire tree.

          Children (`<Text>` instances inside the rows) intentionally use
          `em`-relative font sizes — see `RenderNode` — so they all scale
          together when the user changes the font-size setting. */}
      <style>{`
        .json-tree-root {
          --json-row-h: ${ROW_HEIGHT}px;
          --json-font-size: ${fontSize}px;
          font-size: var(--json-font-size);
        }
        .json-tree-root [data-part="branch-control"],
        .json-tree-root [data-part="item"] {
          min-height: var(--json-row-h);
          height: var(--json-row-h);
          line-height: var(--json-row-h);
          padding-top: 0;
          padding-bottom: 0;
          font-size: var(--json-font-size);
        }
        .json-tree-root [data-json-tree-row="close"] {
          height: var(--json-row-h);
          line-height: var(--json-row-h);
          padding-top: 0;
          padding-bottom: 0;
          font-size: var(--json-font-size);
        }
        /* Larger, more clickable chevron on branch triggers — also enforced
           via the explicit size prop on the icon component for browsers
           that don't honour intrinsic SVG sizing through CSS. */
        .json-tree-root [data-part="branch-indicator"] svg {
          width: 1.25em;
          height: 1.25em;
        }
        /* Drop-line indicators — 2px inset shadow at top/bottom of row. */
        .json-tree-root [data-drop-before="true"] {
          box-shadow: inset 0 2px 0 0 var(--chakra-colors-color-palette-solid);
        }
        .json-tree-root [data-drop-after="true"] {
          box-shadow: inset 0 -2px 0 0 var(--chakra-colors-color-palette-solid);
        }
        /* Dim the row being dragged so the cursor leaves a clear ghost. */
        .json-tree-root [data-dragging="true"] {
          opacity: 0.4;
        }
        /* Show grab cursor on the grip handle. */
        .json-tree-grip {
          cursor: grab;
          touch-action: none;
        }
        .json-tree-grip:active {
          cursor: grabbing;
        }
      `}</style>

      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        h={{ base: "auto", md: "100%" }}
        overflow={{ base: "visible", md: "hidden" }}
      >
        {/* ── Tree (with optional gutter) ── */}
        <Box
          flex={{ base: "none", md: "1" }}
          overflow={{ base: "visible", md: "auto" }}
          minW="0"
        >
          <Box display="flex" alignItems="flex-start" minW="min-content">
            {/* ── Line-number gutter ── */}
            {showLineNumbers && (
              <Box
                as="div"
                aria-hidden="true"
                userSelect="none"
                position="sticky"
                left={0}
                zIndex={1}
                flexShrink={0}
                bg="bg"
                borderRightWidth="1px"
                borderColor="border"
                fontFamily="mono"
                color="fg.subtle"
                textAlign="right"
                py={3}
                pl={2}
                pr={2}
                style={{
                  minWidth: `calc(${gutterDigits}ch + 1rem)`,
                  fontSize: `${Math.max(10, fontSize - 2)}px`,
                }}
              >
                {visibleLineNumbers.map((ln, i) => (
                  <Box
                    key={i}
                    style={{
                      height: `${ROW_HEIGHT}px`,
                      lineHeight: `${ROW_HEIGHT}px`,
                    }}
                  >
                    {ln}
                  </Box>
                ))}
              </Box>
            )}

            {/* ── Tree body ── */}
            <Box flex="1" minW="0" p={3} className="json-tree-root">
              <TreeView.Root
                collection={filteredCollection}
                expandedValue={filteredExpandedIds ?? expandedValue}
                onExpandedChange={(e) => {
                  if (!trimmedQuery) setExpandedValue(e.expandedValue);
                }}
                selectedValue={selectedId ? [selectedId] : []}
                onSelectionChange={(e) =>
                  setSelectedId(e.selectedValue[0] ?? null)
                }
                colorPalette={palette}
                size="sm"
                expandOnClick={false}
              >
                <TreeView.Tree>
                  {filteredRootNode && (
                    <RenderNode node={filteredRootNode} indexPath={[0]} />
                  )}
                </TreeView.Tree>
              </TreeView.Root>
            </Box>
          </Box>
        </Box>

        {/* ── Resize handle — desktop only ── */}
        <Box
          display={{ base: "none", md: "block" }}
          w="5px"
          flexShrink={0}
          cursor="col-resize"
          borderLeftWidth="1px"
          borderColor="border"
          userSelect="none"
          onPointerDown={handleResizeStart}
          _hover={{ bg: "bg.emphasized" }}
          transition="background 0.15s"
        />

        {/* ── Sidebar ── */}
        <Box
          ref={sidebarRef}
          w={{ base: "full", md: `${sidebarWidth}px` }}
          minW={{ md: `${sidebarWidth}px` }}
          minH="450px"
          flexShrink={0}
          borderTopWidth={{ base: "1px", md: "0" }}
          overflow="auto"
          display="flex"
          flexDirection="column"
          gap={3}
          p={3}
        >
          <TypeLegend />
          {selectedNode && <SelectedNodeDetails node={selectedNode} />}
        </Box>
      </Box>
    </EditCtx.Provider>
  );
};

export default JsonTreeView;
