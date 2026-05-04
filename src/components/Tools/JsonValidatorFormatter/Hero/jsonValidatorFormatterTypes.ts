export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };
export type JsonTypeName =
  | "object"
  | "array"
  | "string"
  | "number"
  | "boolean"
  | "null";

export type ValidationErrorDetails = {
  message: string;
  index?: number;
  line?: number;
  column?: number;
};

export type ValidationState = {
  value?: JsonValue;
  formatted?: string;
  error?: ValidationErrorDetails;
};

export type SearchMatch = {
  path: string;
  key: string;
  value: JsonValue;
};

export type SelectedNode = {
  path: string;
  key: string;
  value: JsonValue;
};

export type SelectedNodeDetailRow = {
  key: string;
  value: JsonValue;
};

export type DiffType = "added" | "removed" | "changed" | "unchanged" | "nested";

export interface DiffNode {
  type: DiffType;
  key: string;
  oldValue: JsonValue | undefined;
  newValue: JsonValue | undefined;
  children?: DiffNode[];
}

export interface DiffStats {
  added: number;
  removed: number;
  changed: number;
}
