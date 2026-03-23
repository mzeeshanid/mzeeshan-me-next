import { describe, expect, it } from "vitest";
import { jsonValidatorFormatterDefaultJson } from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import {
  collectSearchMatches,
  detectJsonType,
  getAncestorPaths,
  getDisplayType,
  getNodePrefix,
  getNodeSummary,
  getSelectedNodeDetailRows,
  getSelectedNodeValueDisplay,
  parsePositionFromError,
  tryRemoveEscapeCharacters,
  validateJson,
} from "@/components/Tools/JsonValidatorFormatter/Hero/jsonValidatorFormatterUtils";
import type {
  JsonValue,
  SelectedNode,
} from "@/components/Tools/JsonValidatorFormatter/Hero/jsonValidatorFormatterTypes";

describe("/tools/json-validator-and-formatter logic", () => {
  it("formats valid JSON for the text viewer workflow", () => {
    const result = validateJson('{"name":"M Zeeshan","limits":{"retry":3}}');

    expect(result.error).toBeUndefined();
    expect(result.value).toEqual({
      name: "M Zeeshan",
      limits: { retry: 3 },
    });
    expect(result.formatted).toBe(
      '{\n  "name": "M Zeeshan",\n  "limits": {\n    "retry": 3\n  }\n}',
    );
  });

  it("returns the empty-state validation message for blank input", () => {
    const result = validateJson("   ");

    expect(result.value).toBeUndefined();
    expect(result.formatted).toBeUndefined();
    expect(result.error).toEqual({
      message: "Paste JSON into the Text tab to validate and inspect it.",
    });
  });

  it("parses line and column details from JSON parser errors", () => {
    const result = validateJson(
      '{\n  "name": "Ali",\n  "tags": [1,2,],\n  "active": true\n}',
    );

    expect(result.value).toBeUndefined();
    expect(result.error).toBeDefined();
    expect(result.error?.message).toContain("not valid JSON");
  });

  it("supports exact path matching without including descendant nodes", () => {
    const value = validateJson(jsonValidatorFormatterDefaultJson)
      .value as JsonValue;

    const matches = collectSearchMatches(value, "$.limits");

    expect(matches).toHaveLength(1);
    expect(matches[0]).toMatchObject({
      key: "limits",
      path: "$.limits",
    });
  });

  it("matches only the requested node key instead of an entire subtree", () => {
    const value = validateJson(jsonValidatorFormatterDefaultJson)
      .value as JsonValue;

    const matches = collectSearchMatches(value, "tags");

    expect(matches).toHaveLength(1);
    expect(matches[0]).toMatchObject({
      key: "tags",
      path: "$.tags",
    });
  });

  it("matches primitive values without matching unrelated parent nodes", () => {
    const value = validateJson(jsonValidatorFormatterDefaultJson)
      .value as JsonValue;

    const matches = collectSearchMatches(value, "true");

    expect(matches).toHaveLength(1);
    expect(matches[0]).toMatchObject({
      key: "healthy",
      path: "$.healthy",
      value: true,
    });
  });

  it("returns no matches for empty search terms", () => {
    const value = validateJson(jsonValidatorFormatterDefaultJson)
      .value as JsonValue;

    expect(collectSearchMatches(value, "   ")).toEqual([]);
  });

  it("returns child rows for selected object nodes", () => {
    const selectedNode: SelectedNode = {
      key: "limits",
      path: "$.limits",
      value: {
        retry: 3,
        timeoutMs: 1200,
      },
    };

    expect(getSelectedNodeDetailRows(selectedNode)).toEqual([
      { key: "retry", value: 3 },
      { key: "timeoutMs", value: 1200 },
    ]);
  });

  it("returns indexed rows for selected array nodes", () => {
    const selectedNode: SelectedNode = {
      key: "tags",
      path: "$.tags",
      value: ["json", "validator", "formatter"],
    };

    expect(getSelectedNodeDetailRows(selectedNode)).toEqual([
      { key: "0", value: "json" },
      { key: "1", value: "validator" },
      { key: "2", value: "formatter" },
    ]);
  });

  it("returns a single row for selected primitive nodes", () => {
    const selectedNode: SelectedNode = {
      key: "active",
      path: "$.active",
      value: true,
    };

    expect(getSelectedNodeDetailRows(selectedNode)).toEqual([
      { key: "active", value: true },
    ]);
  });

  it("unwraps escaped JSON strings into formatted JSON", () => {
    const escapedJson = '"{\\"name\\":\\"Ali\\",\\"active\\":true}"';

    expect(tryRemoveEscapeCharacters(escapedJson)).toBe(
      '{\n  "name": "Ali",\n  "active": true\n}',
    );
  });

  it("falls back to plain escape cleanup when the text is not valid JSON", () => {
    expect(tryRemoveEscapeCharacters('\\"hello\\nworld\\"')).toBe(
      '"hello\nworld"',
    );
  });

  it("can derive a line and column from position-based errors", () => {
    const details = parsePositionFromError(
      "Unexpected token ] in JSON at position 29",
      '{\n  "name": "Ali",\n  "tags": [1,2,]\n}',
    );

    expect(details).toMatchObject({
      index: 29,
      line: 3,
      column: 11,
    });
  });

  it("supports direct line and column error messages", () => {
    const details = parsePositionFromError(
      "Unexpected token on line 4 column 9",
      '{"unused":true}',
    );

    expect(details).toEqual({
      message: "Unexpected token on line 4 column 9",
      line: 4,
      column: 9,
    });
  });

  it("derives display metadata for numbers, arrays, and objects", () => {
    expect(detectJsonType(null)).toBe("null");
    expect(detectJsonType(["a"])).toBe("array");
    expect(getDisplayType(12)).toEqual({ label: "Int", color: "blue" });
    expect(getDisplayType(12.5)).toEqual({ label: "Float", color: "blue" });
    expect(getDisplayType({ ok: true })).toEqual({
      label: "Object",
      color: "orange",
    });
  });

  it("returns tree prefixes and summaries for structured values", () => {
    expect(getNodePrefix("object")).toBe("{}");
    expect(getNodePrefix("array")).toBe("[]");
    expect(getNodePrefix("string")).toBeNull();
    expect(getNodeSummary({ retry: 3, timeoutMs: 1200 })).toBe("{2 keys}");
    expect(getNodeSummary(["json", "tree"])).toBe("[2 items]");
    expect(getNodeSummary("validator")).toBe('"validator"');
  });

  it("formats selected node value display for structured and primitive values", () => {
    expect(getSelectedNodeValueDisplay({ ok: true })).toBe("{...}");
    expect(getSelectedNodeValueDisplay([1, 2])).toBe("[...]");
    expect(getSelectedNodeValueDisplay("json")).toBe('"json"');
    expect(getSelectedNodeValueDisplay(false)).toBe("false");
  });

  it("returns ancestor paths for nested matches", () => {
    expect(getAncestorPaths("$.limits.retry.max")).toEqual([
      "$",
      "$.limits",
      "$.limits.retry",
    ]);
  });
});
