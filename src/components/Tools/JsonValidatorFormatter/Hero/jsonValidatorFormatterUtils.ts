import type {
  JsonTypeName,
  JsonValue,
  JsonPrimitive,
  StoredDocument,
  ValidationState,
} from "./jsonValidatorFormatterTypes";

// ── Type detection ────────────────────────────────────────────────────────────

export const TYPE_COLORS: Record<JsonTypeName, string> = {
  object: "orange",
  array: "pink",
  string: "green",
  number: "blue",
  boolean: "purple",
  null: "red",
};

export const detectJsonType = (value: JsonValue): JsonTypeName => {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  switch (typeof value) {
    case "string":  return "string";
    case "number":  return "number";
    case "boolean": return "boolean";
    default:        return "object";
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
    case "array":   return { label: "Array",   color: TYPE_COLORS.array };
    case "boolean": return { label: "Boolean", color: TYPE_COLORS.boolean };
    case "null":    return { label: "Null",     color: TYPE_COLORS.null };
    case "number":
      return {
        label: Number.isInteger(value) ? "Int" : "Float",
        color: TYPE_COLORS.number,
      };
    case "object":  return { label: "Object",  color: TYPE_COLORS.object };
    default:        return { label: "String",  color: TYPE_COLORS.string };
  }
};

export const getNodeSummary = (value: JsonValue): string => {
  const type = detectJsonType(value);
  if (type === "object")
    return `{${Object.keys(value as Record<string, JsonValue>).length} keys}`;
  if (type === "array") return `[${(value as JsonValue[]).length} items]`;
  if (type === "string") return `"${String(value)}"`;
  return String(value);
};

export const getNodePrefix = (type: JsonTypeName): string | null => {
  if (type === "object") return "{}";
  if (type === "array")  return "[]";
  return null;
};

// ── Validation ────────────────────────────────────────────────────────────────

export const validateJson = (text: string, indent = 2): ValidationState => {
  if (!text.trim()) {
    return {
      error: {
        message: "Paste JSON into the Text tab to validate and inspect it.",
      },
    };
  }
  try {
    const value = JSON.parse(text) as JsonValue;
    return { value, formatted: JSON.stringify(value, null, indent) };
  } catch (error) {
    const raw = error instanceof Error ? error.message : "Invalid JSON content";
    return { error: { message: `${raw} — not valid JSON` } };
  }
};

// ── Key sorting ───────────────────────────────────────────────────────────────

export const sortJsonKeys = (
  value: JsonValue,
  dir: "asc" | "desc" = "asc",
): JsonValue => {
  if (Array.isArray(value)) return value.map((v) => sortJsonKeys(v, dir));
  if (value !== null && typeof value === "object") {
    const keys = Object.keys(value as Record<string, JsonValue>).sort(
      dir === "desc"
        ? (a, b) => b.localeCompare(a)
        : (a, b) => a.localeCompare(b),
    );
    const out: Record<string, JsonValue> = {};
    for (const k of keys)
      out[k] = sortJsonKeys((value as Record<string, JsonValue>)[k], dir);
    return out;
  }
  return value;
};

// ── Escape characters ─────────────────────────────────────────────────────────

export const tryRemoveEscapeCharacters = (text: string): string => {
  const trimmed = text.trim();
  if (!trimmed) return "";
  try {
    const parsed = JSON.parse(trimmed);
    if (typeof parsed === "string") {
      try {
        return JSON.stringify(JSON.parse(parsed), null, 2);
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

// ── Soft prettify ─────────────────────────────────────────────────────────────

export const softPrettifyJson = (text: string, indentSize = 2): string => {
  if (text.split("\n").length > 4) return text;

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
        i++;
        if (i < text.length) result += text[i];
      } else if (ch === '"') {
        inString = false;
      }
      i++;
      continue;
    }
    if (ch === " " || ch === "\t" || ch === "\r" || ch === "\n") { i++; continue; }
    if (ch === '"') { inString = true; result += ch; i++; continue; }
    if (ch === "{" || ch === "[") {
      result += ch;
      depth++;
      let j = i + 1;
      while (j < text.length && (text[j] === " " || text[j] === "\t")) j++;
      if (j < text.length && text[j] !== (ch === "{" ? "}" : "]")) {
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
    if (ch === ",") { result += ch + "\n" + pad(depth); i++; continue; }
    if (ch === ":") { result += ": "; i++; continue; }
    result += ch;
    i++;
  }
  return result;
};

// ── Document management ───────────────────────────────────────────────────────

export const nextDocName = (
  docs: Pick<StoredDocument, "name">[],
  base = "New Document",
): string => {
  const names = new Set(docs.map((d) => d.name));
  if (!names.has(base)) return base;
  for (let i = 2; i <= 999; i++) {
    const candidate = `${base} ${i}`;
    if (!names.has(candidate)) return candidate;
  }
  return `${base} ${Date.now()}`;
};

// Re-export types consumed by callers of this module.
export type { JsonValue, JsonPrimitive, JsonTypeName, StoredDocument, ValidationState };
