import { describe, expect, it } from "vitest";
import { jsonValidatorFormatterDefaultJson } from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import {
  collectSearchMatches,
  computeViewerLineNumbers,
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

  // ─── computeViewerLineNumbers ───────────────────────────────────────────────

  it("assigns line 1 to the root of a flat object", () => {
    const map = computeViewerLineNumbers({ a: 1, b: 2 });

    expect(map.get("$")).toBe(1);
    expect(map.get("$.a")).toBe(2);
    expect(map.get("$.b")).toBe(3);
  });

  it("numbers every node in a nested object regardless of collapse state", () => {
    // { "a": 1, "b": { "c": 2, "d": 3 } }
    // fully-expanded line layout:
    //   1  root  $
    //   2  a     $.a
    //   3  b     $.b
    //   4  c     $.b.c
    //   5  d     $.b.d
    const map = computeViewerLineNumbers({ a: 1, b: { c: 2, d: 3 } });

    expect(map.get("$")).toBe(1);
    expect(map.get("$.a")).toBe(2);
    expect(map.get("$.b")).toBe(3);
    expect(map.get("$.b.c")).toBe(4);
    expect(map.get("$.b.d")).toBe(5);
    expect(map.size).toBe(5);
  });

  it("numbers array items sequentially", () => {
    // { "tags": ["x", "y", "z"] }
    //   1  root   $
    //   2  tags   $.tags
    //   3  0      $.tags.0
    //   4  1      $.tags.1
    //   5  2      $.tags.2
    const map = computeViewerLineNumbers({ tags: ["x", "y", "z"] });

    expect(map.get("$")).toBe(1);
    expect(map.get("$.tags")).toBe(2);
    expect(map.get("$.tags.0")).toBe(3);
    expect(map.get("$.tags.1")).toBe(4);
    expect(map.get("$.tags.2")).toBe(5);
  });

  it("collapsed nodes do not change sibling line numbers — map is identical regardless of expandedPaths", () => {
    // The function no longer accepts expandedPaths; calling it twice with the
    // same value must always return the same map.
    const value = { a: 1, b: { c: 2, d: 3 }, e: 4 };

    const map1 = computeViewerLineNumbers(value);
    const map2 = computeViewerLineNumbers(value);

    expect(map1).toEqual(map2);

    // $.e must be line 6 regardless of whether $.b is collapsed/expanded,
    // because $.b contributes 3 lines ($.b, $.b.c, $.b.d).
    expect(map1.get("$.e")).toBe(6);
  });

  it("line numbers remain consistent after an edit that adds a sibling", () => {
    const before = computeViewerLineNumbers({ a: 1, b: 2 });
    const after  = computeViewerLineNumbers({ a: 1, x: 99, b: 2 });

    // original $.b was line 3; after inserting $.x it shifts to line 4
    expect(before.get("$.b")).toBe(3);
    expect(after.get("$.b")).toBe(4);
    expect(after.get("$.x")).toBe(3);
  });

  it("line numbers remain consistent after an edit that removes a nested node", () => {
    // before: $=1, $.a=2, $.a.p=3, $.a.q=4, $.b=5
    const before = computeViewerLineNumbers({ a: { p: 1, q: 2 }, b: 3 });
    // after:  $=1, $.a=2, $.a.p=3, $.b=4
    const after  = computeViewerLineNumbers({ a: { p: 1 }, b: 3 });

    // $.b shifts from line 5 to line 4 when $.a.q is removed
    expect(before.get("$.b")).toBe(5);
    expect(after.get("$.b")).toBe(4);
  });

  it("numbers a deeply nested structure correctly", () => {
    const value = { outer: { middle: { inner: 42 } } };
    const map = computeViewerLineNumbers(value);

    expect(map.get("$")).toBe(1);
    expect(map.get("$.outer")).toBe(2);
    expect(map.get("$.outer.middle")).toBe(3);
    expect(map.get("$.outer.middle.inner")).toBe(4);
    expect(map.size).toBe(4);
  });

  it("handles an array of objects and numbers every leaf", () => {
    const value = { list: [{ id: 1 }, { id: 2 }] };
    const map = computeViewerLineNumbers(value);

    // $=1, $.list=2, $.list.0=3, $.list.0.id=4, $.list.1=5, $.list.1.id=6
    expect(map.get("$")).toBe(1);
    expect(map.get("$.list")).toBe(2);
    expect(map.get("$.list.0")).toBe(3);
    expect(map.get("$.list.0.id")).toBe(4);
    expect(map.get("$.list.1")).toBe(5);
    expect(map.get("$.list.1.id")).toBe(6);
    expect(map.size).toBe(6);
  });

  it("assigns line 1 to a primitive root value", () => {
    const map = computeViewerLineNumbers(42);

    expect(map.get("$")).toBe(1);
    expect(map.size).toBe(1);
  });

  it("assigns line 1 to a null root value", () => {
    const map = computeViewerLineNumbers(null);

    expect(map.get("$")).toBe(1);
    expect(map.size).toBe(1);
  });

  it("assigns line 1 to an empty object", () => {
    const map = computeViewerLineNumbers({});

    expect(map.get("$")).toBe(1);
    expect(map.size).toBe(1);
  });

  it("assigns line 1 to an empty array", () => {
    const map = computeViewerLineNumbers([]);

    expect(map.get("$")).toBe(1);
    expect(map.size).toBe(1);
  });
});
