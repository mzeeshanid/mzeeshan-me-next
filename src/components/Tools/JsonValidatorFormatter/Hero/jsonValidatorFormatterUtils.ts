import { JsonValue, JsonTypeName, SearchMatch, SelectedNode, SelectedNodeDetailRow, ValidationErrorDetails, ValidationState } from "./jsonValidatorFormatterTypes";

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

export const validateJson = (text: string): ValidationState => {
  if (!text.trim()) {
    return {
      error: {
        message: "Paste JSON into the Text tab to validate and inspect it.",
      },
    };
  }

  try {
    const value = JSON.parse(text) as JsonValue;

    return {
      value,
      formatted: JSON.stringify(value, null, 2),
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid JSON content";

    return {
      error: parsePositionFromError(message, text),
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
