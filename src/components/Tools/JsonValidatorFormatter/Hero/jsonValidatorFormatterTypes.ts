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
