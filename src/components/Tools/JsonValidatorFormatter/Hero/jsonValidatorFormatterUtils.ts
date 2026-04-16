import { JsonPrimitive, JsonValue, JsonTypeName, SearchMatch, SelectedNode, SelectedNodeDetailRow, ValidationErrorDetails, ValidationState } from "./jsonValidatorFormatterTypes";

export const TYPE_COLORS: Record<JsonTypeName, string> = {
  object: "orange",
  array: "pink",
  string: "green",
  number: "blue",
  boolean: "purple",
  null: "red",
};

export const detectJsonType = (value: JsonValue): JsonTypeName => {
  if (value === null) {
    return "null";
  }

  if (Array.isArray(value)) {
    return "array";
  }

  switch (typeof value) {
    case "string":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    default:
      return "object";
  }
};

export const getDisplayType = (
  value: JsonValue,
): {
  label: "Array" | "Boolean" | "Float" | "Int" | "Null" | "Object" | "String";
  color: string;
} => {
  const type = detectJsonType(value);

  switch (type) {
    case "array":
      return { label: "Array", color: TYPE_COLORS.array };
    case "boolean":
      return { label: "Boolean", color: TYPE_COLORS.boolean };
    case "null":
      return { label: "Null", color: TYPE_COLORS.null };
    case "number":
      return {
        label: Number.isInteger(value) ? "Int" : "Float",
        color: TYPE_COLORS.number,
      };
    case "object":
      return { label: "Object", color: TYPE_COLORS.object };
    default:
      return { label: "String", color: TYPE_COLORS.string };
  }
};

export const getNodeSummary = (value: JsonValue): string => {
  const type = detectJsonType(value);

  if (type === "object") {
    return `{${Object.keys(value as Record<string, JsonValue>).length} keys}`;
  }

  if (type === "array") {
    return `[${(value as JsonValue[]).length} items]`;
  }

  if (type === "string") {
    return `"${String(value)}"`;
  }

  return String(value);
};

export const getNodePrefix = (type: JsonTypeName): string | null => {
  if (type === "object") {
    return "{}";
  }

  if (type === "array") {
    return "[]";
  }

  return null;
};

export const getSelectedNodeValueDisplay = (value: JsonValue): string => {
  const type = detectJsonType(value);

  if (type === "object") {
    return "{...}";
  }

  if (type === "array") {
    return "[...]";
  }

  if (type === "string") {
    return `"${value}"`;
  }

  return String(value);
};

export const getSelectedNodeDetailRows = (
  selectedNode: SelectedNode,
): SelectedNodeDetailRow[] => {
  const type = detectJsonType(selectedNode.value);

  if (type === "object") {
    return Object.entries(selectedNode.value as Record<string, JsonValue>).map(
      ([key, value]) => ({
        key,
        value,
      }),
    );
  }

  if (type === "array") {
    return (selectedNode.value as JsonValue[]).map((value, index) => ({
      key: String(index),
      value,
    }));
  }

  return [
    {
      key: selectedNode.key,
      value: selectedNode.value,
    },
  ];
};

export const getPathSegments = (path: string): string[] => {
  if (path === "$") {
    return ["$"];
  }

  return path.split(".");
};

export const getAncestorPaths = (path: string): string[] => {
  const segments = getPathSegments(path);
  const ancestors: string[] = [];

  for (let index = 0; index < segments.length - 1; index += 1) {
    ancestors.push(segments.slice(0, index + 1).join("."));
  }

  return ancestors;
};

export const parsePositionFromError = (
  message: string,
  text: string,
): ValidationErrorDetails => {
  const lineColumnMatch = message.match(/line\s+(\d+)\s+column\s+(\d+)/i);

  if (lineColumnMatch) {
    const line = Number(lineColumnMatch[1]);
    const column = Number(lineColumnMatch[2]);

    return { message, line, column };
  }

  const positionMatch = message.match(/position\s+(\d+)/i);

  if (!positionMatch) {
    return { message };
  }

  const index = Number(positionMatch[1]);
  const safeIndex = Number.isNaN(index) ? 0 : index;
  const textUntilError = text.slice(0, safeIndex);
  const lines = textUntilError.split("\n");
  const line = lines.length;
  const column = lines[lines.length - 1].length + 1;

  return { message, index: safeIndex, line, column };
};

export type ValidateJsonOptions = {
  indent?: number;
  indentStyle?: "spaces" | "tabs";
  sortKeys?: boolean;
  sortOrder?: "asc" | "desc";
  trailingCommas?: boolean;
  allowComments?: boolean;
};

export const stripTrailingCommas = (text: string): string =>
  text.replace(/,(\s*[}\]])/g, "$1");

export const stripComments = (text: string): string => {
  let result = "";
  let i = 0;
  while (i < text.length) {
    if (text[i] === '"') {
      result += text[i++];
      while (i < text.length) {
        if (text[i] === "\\") {
          result += text[i++];
          if (i < text.length) result += text[i++];
        } else if (text[i] === '"') {
          result += text[i++];
          break;
        } else {
          result += text[i++];
        }
      }
    } else if (text[i] === "/" && text[i + 1] === "/") {
      while (i < text.length && text[i] !== "\n") i++;
    } else if (text[i] === "/" && text[i + 1] === "*") {
      i += 2;
      while (i < text.length && !(text[i] === "*" && text[i + 1] === "/")) i++;
      i += 2;
    } else {
      result += text[i++];
    }
  }
  return result;
};

const sortObjectKeys = (value: JsonValue, order: "asc" | "desc" = "asc"): JsonValue => {
  if (Array.isArray(value)) return value.map((v) => sortObjectKeys(v, order));
  if (value !== null && typeof value === "object") {
    return Object.keys(value as Record<string, JsonValue>)
      .sort(order === "desc" ? (a, b) => b.localeCompare(a) : undefined)
      .reduce<Record<string, JsonValue>>((acc, k) => {
        acc[k] = sortObjectKeys((value as Record<string, JsonValue>)[k], order);
        return acc;
      }, {});
  }
  return value;
};

export const validateJson = (
  text: string,
  options: ValidateJsonOptions = {},
): ValidationState => {
  const { indent = 2, indentStyle = "spaces", sortKeys = false, sortOrder = "asc", trailingCommas = false, allowComments = false } = options;

  let processedText = text;
  if (allowComments) processedText = stripComments(processedText);
  if (trailingCommas) processedText = stripTrailingCommas(processedText);

  if (!processedText.trim()) {
    return {
      error: {
        message: "Paste JSON into the Text tab to validate and inspect it.",
      },
    };
  }

  try {
    let value = JSON.parse(processedText) as JsonValue;
    if (sortKeys) value = sortObjectKeys(value, sortOrder);

    const indentValue: string | number = indentStyle === "tabs" ? "\t" : indent;

    return {
      value,
      formatted: JSON.stringify(value, null, indentValue),
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid JSON content";

    return {
      error: parsePositionFromError(message, processedText),
    };
  }
};

export const collectSearchMatches = (
  value: JsonValue,
  query: string,
  currentPath = "$",
  nodeKey = "root",
): SearchMatch[] => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  const matches: SearchMatch[] = [];
  const normalizedNodeKey = nodeKey.toLowerCase();
  const shouldMatchPath =
    normalizedQuery.startsWith("$") || normalizedQuery.includes(".");
  const normalizedPath = currentPath.toLowerCase();
  const primitiveValue =
    value === null || typeof value === "object"
      ? null
      : String(value).toLowerCase();

  const isCurrentNodeMatch =
    normalizedNodeKey.includes(normalizedQuery) ||
    (shouldMatchPath && normalizedPath === normalizedQuery) ||
    (primitiveValue !== null && primitiveValue.includes(normalizedQuery));

  if (isCurrentNodeMatch) {
    matches.push({
      path: currentPath,
      key: nodeKey,
      value,
    });
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      matches.push(
        ...collectSearchMatches(item, query, `${currentPath}.${index}`, String(index)),
      );
    });
  } else if (value !== null && typeof value === "object") {
    Object.entries(value).forEach(([key, childValue]) => {
      matches.push(
        ...collectSearchMatches(childValue, query, `${currentPath}.${key}`, key),
      );
    });
  }

  return matches;
};

/**
 * Assigns a stable line number to every node in the JSON tree, mirroring the
 * line positions in the fully-formatted (fully-expanded) JSON text.
 *
 * Collapse/expand state is intentionally ignored: a collapsed object node
 * still consumes the same number of lines as when it is expanded, so sibling
 * nodes always share the same line numbers regardless of what the user has
 * opened or closed. The tree renderer is responsible for showing only the
 * line number of visible nodes; the numbers themselves never change.
 *
 * @param value   - The JSON value to number.
 * @param path    - JSONPath of this node (default: "$" for the root).
 * @param counter - Shared mutable counter threaded through the recursion.
 * @returns A Map<path, lineNumber> covering every node in the subtree.
 */
export const computeViewerLineNumbers = (
  value: JsonValue,
  path = "$",
  counter = { n: 1 },
): Map<string, number> => {
  const map = new Map<string, number>();
  map.set(path, counter.n++);

  const type = detectJsonType(value);
  if (type === "object" || type === "array") {
    const children =
      type === "array"
        ? (value as JsonValue[]).map((item, index) => ({
            childValue: item,
            childPath: `${path}.${index}`,
          }))
        : Object.entries(value as Record<string, JsonValue>).map(
            ([k, child]) => ({
              childValue: child,
              childPath: `${path}.${k}`,
            }),
          );

    for (const { childValue, childPath } of children) {
      computeViewerLineNumbers(childValue, childPath, counter).forEach(
        (v, k) => map.set(k, v),
      );
    }
  }

  return map;
};

/**
 * Best-effort pretty-printer for potentially-invalid JSON.
 *
 * When JSON is minified (no newlines) and invalid, the error position points
 * to "line 1, column N" which is unhelpful. This expands it into a
 * multi-line form so the error can be pinpointed to a specific line.
 * It operates at the character level and handles strings correctly, so it
 * won't corrupt escape sequences inside string values.
 */
export const softPrettifyJson = (text: string, indentSize = 2): string => {
  // Only run if text is essentially single-line
  const lines = text.split("\n");
  if (lines.length > 4) return text; // already multi-line, leave it alone

  const pad = (depth: number) => " ".repeat(depth * indentSize);
  let result = "";
  let depth = 0;
  let inString = false;
  let i = 0;

  while (i < text.length) {
    const ch = text[i];

    if (inString) {
      result += ch;
      if (ch === "\\") {
        // consume escaped character verbatim
        i++;
        if (i < text.length) result += text[i];
      } else if (ch === '"') {
        inString = false;
      }
      i++;
      continue;
    }

    // Skip whitespace outside strings (we'll add our own)
    if (ch === " " || ch === "\t" || ch === "\r" || ch === "\n") {
      i++;
      continue;
    }

    if (ch === '"') {
      inString = true;
      result += ch;
      i++;
      continue;
    }

    if (ch === "{" || ch === "[") {
      result += ch;
      depth++;
      // Peek ahead: if closing bracket immediately follows, keep inline
      let j = i + 1;
      while (j < text.length && (text[j] === " " || text[j] === "\t")) j++;
      const closing = ch === "{" ? "}" : "]";
      if (j < text.length && text[j] === closing) {
        // empty container — keep as {} or []
      } else {
        result += "\n" + pad(depth);
      }
      i++;
      continue;
    }

    if (ch === "}" || ch === "]") {
      depth = Math.max(0, depth - 1);
      result += "\n" + pad(depth) + ch;
      i++;
      continue;
    }

    if (ch === ",") {
      result += ch + "\n" + pad(depth);
      i++;
      continue;
    }

    if (ch === ":") {
      result += ": ";
      i++;
      continue;
    }

    result += ch;
    i++;
  }

  return result;
};

export const tryRemoveEscapeCharacters = (text: string): string => {
  const trimmed = text.trim();

  if (!trimmed) {
    return "";
  }

  try {
    const parsed = JSON.parse(trimmed);

    if (typeof parsed === "string") {
      try {
        const nestedJson = JSON.parse(parsed);

        return JSON.stringify(nestedJson, null, 2);
      } catch {
        return parsed;
      }
    }

    return JSON.stringify(parsed, null, 2);
  } catch {
    return trimmed
      .replace(/\\"/g, '"')
      .replace(/\\n/g, "\n")
      .replace(/\\r/g, "\r")
      .replace(/\\t/g, "\t")
      .replace(/\\\\/g, "\\");
  }
};

// ─── JSON → CSV ──────────────────────────────────────────────────────────────

const csvCell = (value: JsonValue, delimiter = ","): string => {
  if (value === null || value === undefined) return "";
  if (typeof value === "object") {
    const str = JSON.stringify(value);
    return `"${str.replace(/"/g, '""')}"`;
  }
  const str = String(value);
  if (str.includes(delimiter) || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

export const jsonToCsv = (value: JsonValue, delimiter = ","): string => {
  let rows: JsonValue[] = Array.isArray(value)
    ? value
    : typeof value === "object" && value !== null
      ? [value]
      : [];

  if (rows.length === 0) {
    return typeof value !== "object" ? String(value) : "";
  }

  const allKeys = new Set<string>();
  let hasObjects = false;

  for (const item of rows) {
    if (typeof item === "object" && item !== null && !Array.isArray(item)) {
      hasObjects = true;
      Object.keys(item as Record<string, JsonValue>).forEach((k) =>
        allKeys.add(k),
      );
    }
  }

  if (!hasObjects) {
    return (rows as JsonPrimitive[]).map((v) => csvCell(v, delimiter)).join("\n");
  }

  const headers = Array.from(allKeys);
  const headerRow = headers.map((h) => csvCell(h, delimiter)).join(delimiter);
  const dataRows = rows.map((item) => {
    if (typeof item === "object" && item !== null && !Array.isArray(item)) {
      return headers
        .map((h) => {
          const v = (item as Record<string, JsonValue>)[h];
          return csvCell(v !== undefined ? v : null, delimiter);
        })
        .join(delimiter);
    }
    return csvCell(item, delimiter);
  });

  return [headerRow, ...dataRows].join("\n");
};

// ─── JSON → YAML ─────────────────────────────────────────────────────────────

const YAML_INDENT = "  ";

const yamlScalar = (value: JsonPrimitive): string => {
  if (value === null) return "null";
  if (typeof value === "boolean" || typeof value === "number")
    return String(value);
  const s = value as string;
  if (s === "") return '""';
  const needsQuotes =
    /[\n\r\t:#\[\]{}|>&*!%@`"']/.test(s) ||
    /^[\s\-?|>!]/.test(s) ||
    /^(true|false|null|yes|no|on|off)$/i.test(s) ||
    /^\d/.test(s) ||
    /\s$/.test(s);
  if (needsQuotes) {
    return `"${s
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t")}"`;
  }
  return s;
};

const yamlObject = (
  obj: Record<string, JsonValue>,
  depth: number,
): string => {
  const pad = YAML_INDENT.repeat(depth);
  const entries = Object.entries(obj);
  if (entries.length === 0) return `${pad}{}`;
  return entries
    .map(([k, v]) => {
      const key = /[:#\[\]{}|>&*!%@`,\n\r\t"']/.test(k) ? `"${k}"` : k;
      if (v !== null && typeof v === "object") {
        if (Array.isArray(v) && v.length === 0) return `${pad}${key}: []`;
        if (!Array.isArray(v) && Object.keys(v).length === 0)
          return `${pad}${key}: {}`;
        return `${pad}${key}:\n${yamlNode(v, depth + 1)}`;
      }
      return `${pad}${key}: ${yamlScalar(v as JsonPrimitive)}`;
    })
    .join("\n");
};

const yamlNode = (value: JsonValue, depth: number): string => {
  const pad = YAML_INDENT.repeat(depth);
  if (value === null || typeof value !== "object")
    return yamlScalar(value as JsonPrimitive);

  if (Array.isArray(value)) {
    if (value.length === 0) return `${pad}[]`;
    return value
      .map((item) => {
        if (item !== null && typeof item === "object") {
          const childStr = yamlObject(
            item as Record<string, JsonValue>,
            depth + 1,
          );
          const lines = childStr.split("\n");
          const firstContent = lines[0].trimStart();
          const rest = lines.slice(1).join("\n");
          return `${pad}- ${firstContent}${rest ? "\n" + rest : ""}`;
        }
        return `${pad}- ${yamlScalar(item as JsonPrimitive)}`;
      })
      .join("\n");
  }

  return yamlObject(value as Record<string, JsonValue>, depth);
};

export const jsonToYaml = (value: JsonValue, quoteStyle: "minimal" | "always" = "minimal"): string => {
  if (quoteStyle === "always") {
    // Override yamlScalar to always quote strings
    const alwaysQuoteScalar = (v: JsonPrimitive): string => {
      if (v === null) return "null";
      if (typeof v === "boolean" || typeof v === "number") return String(v);
      const s = v as string;
      return `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t")}"`;
    };

    const alwaysQuoteObject = (obj: Record<string, JsonValue>, depth: number): string => {
      const pad = YAML_INDENT.repeat(depth);
      const entries = Object.entries(obj);
      if (entries.length === 0) return `${pad}{}`;
      return entries
        .map(([k, v]) => {
          const key = `"${k.replace(/"/g, '\\"')}"`;
          if (v !== null && typeof v === "object") {
            if (Array.isArray(v) && v.length === 0) return `${pad}${key}: []`;
            if (!Array.isArray(v) && Object.keys(v).length === 0) return `${pad}${key}: {}`;
            return `${pad}${key}:\n${alwaysQuoteNode(v, depth + 1)}`;
          }
          return `${pad}${key}: ${alwaysQuoteScalar(v as JsonPrimitive)}`;
        })
        .join("\n");
    };

    const alwaysQuoteNode = (v: JsonValue, depth: number): string => {
      const pad = YAML_INDENT.repeat(depth);
      if (v === null || typeof v !== "object") return alwaysQuoteScalar(v as JsonPrimitive);
      if (Array.isArray(v)) {
        if (v.length === 0) return `${pad}[]`;
        return v
          .map((item) => {
            if (item !== null && typeof item === "object") {
              const childStr = alwaysQuoteObject(item as Record<string, JsonValue>, depth + 1);
              const lines = childStr.split("\n");
              const firstContent = lines[0].trimStart();
              const rest = lines.slice(1).join("\n");
              return `${pad}- ${firstContent}${rest ? "\n" + rest : ""}`;
            }
            return `${pad}- ${alwaysQuoteScalar(item as JsonPrimitive)}`;
          })
          .join("\n");
      }
      return alwaysQuoteObject(v as Record<string, JsonValue>, depth);
    };

    return alwaysQuoteNode(value, 0);
  }

  return yamlNode(value, 0);
};

// ─── JSON → XML ──────────────────────────────────────────────────────────────

const sanitizeXmlTag = (key: string): string => {
  const safe = key.replace(/[^a-zA-Z0-9_.-]/g, "_");
  return /^[a-zA-Z_]/.test(safe) ? safe : `_${safe}`;
};

const xmlEscape = (str: string): string =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const xmlNode = (value: JsonValue, tag: string, depth: number): string => {
  const pad = "  ".repeat(depth);
  const safeTag = sanitizeXmlTag(tag);

  if (value === null) return `${pad}<${safeTag} xsi:nil="true"/>`;
  if (typeof value !== "object") {
    return `${pad}<${safeTag}>${xmlEscape(String(value))}</${safeTag}>`;
  }

  if (Array.isArray(value)) {
    return value.map((item) => xmlNode(item, tag, depth)).join("\n");
  }

  const children = Object.entries(value as Record<string, JsonValue>)
    .map(([k, v]) =>
      Array.isArray(v)
        ? v.map((item) => xmlNode(item, k, depth + 1)).join("\n")
        : xmlNode(v, k, depth + 1),
    )
    .join("\n");

  return `${pad}<${safeTag}>\n${children}\n${pad}</${safeTag}>`;
};

export const jsonToXml = (value: JsonValue, rootTag = "root"): string => {
  const declaration = '<?xml version="1.0" encoding="UTF-8"?>';
  const safeRoot = sanitizeXmlTag(rootTag) || "root";

  if (Array.isArray(value)) {
    const items = value.map((item) => xmlNode(item, "item", 1)).join("\n");
    return `${declaration}\n<${safeRoot}>\n${items}\n</${safeRoot}>`;
  }

  if (typeof value !== "object" || value === null) {
    return `${declaration}\n<${safeRoot}>${xmlEscape(String(value))}</${safeRoot}>`;
  }

  const children = Object.entries(value as Record<string, JsonValue>)
    .map(([k, v]) =>
      Array.isArray(v)
        ? v.map((item) => xmlNode(item, k, 1)).join("\n")
        : xmlNode(v, k, 1),
    )
    .join("\n");

  return `${declaration}\n<${safeRoot}>\n${children}\n</${safeRoot}>`;
};

// ─── JSON → TypeScript ───────────────────────────────────────────────────────

const toInterfaceName = (str: string): string => {
  const cleaned = str.replace(/[^a-zA-Z0-9]/g, " ").trim();
  return cleaned
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
};

export type TsOptions = {
  exportStyle?: "interface" | "type";
  optionalFields?: "all" | "nulls-only";
};

const inferTsType = (
  value: JsonValue,
  name: string,
  interfaces: Map<string, string>,
  opts: TsOptions = {},
): string => {
  if (value === null) return "null";
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number") return "number";
  if (typeof value === "string") return "string";

  if (Array.isArray(value)) {
    if (value.length === 0) return "unknown[]";
    const itemName = name.endsWith("s") ? name.slice(0, -1) : `${name}Item`;
    const elementType = inferTsType(value[0], toInterfaceName(itemName), interfaces, opts);
    return `${elementType}[]`;
  }

  const obj = value as Record<string, JsonValue>;
  const typeName = toInterfaceName(name) || "Root";
  const { exportStyle = "interface", optionalFields = "nulls-only" } = opts;

  const fields = Object.entries(obj)
    .map(([k, v]) => {
      const childName = toInterfaceName(k) || "Unknown";
      const type = inferTsType(v, childName, interfaces, opts);
      const isOptional = optionalFields === "all" || (optionalFields === "nulls-only" && v === null);
      const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : `"${k}"`;
      return `  ${safeKey}${isOptional ? "?" : ""}: ${type};`;
    })
    .join("\n");

  if (exportStyle === "type") {
    interfaces.set(typeName, `export type ${typeName} = {\n${fields}\n};`);
  } else {
    interfaces.set(typeName, `export interface ${typeName} {\n${fields}\n}`);
  }
  return typeName;
};

export const jsonToTypeScript = (
  value: JsonValue,
  rootName = "Root",
  opts: TsOptions = {},
): string => {
  const interfaces = new Map<string, string>();
  inferTsType(value, rootName, interfaces, opts);
  return Array.from(interfaces.values()).reverse().join("\n\n");
};
