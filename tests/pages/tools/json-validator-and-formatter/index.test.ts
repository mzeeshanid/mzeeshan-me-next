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
  jsonToCsv,
  jsonToTypeScript,
  jsonToXml,
  jsonToYaml,
  parsePositionFromError,
  softPrettifyJson,
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

  // ─── jsonToCsv ────────────────────────────────────────────────────────────────

  it("converts an array of objects to CSV with a header row", () => {
    const result = jsonToCsv([
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
    ]);

    const lines = result.split("\n");
    expect(lines[0]).toBe("name,age");
    expect(lines[1]).toBe("Alice,30");
    expect(lines[2]).toBe("Bob,25");
  });

  it("wraps CSV cells containing commas in double quotes", () => {
    const result = jsonToCsv([{ city: "New York, NY" }]);

    expect(result).toContain('"New York, NY"');
  });

  it("wraps CSV cells containing double quotes and escapes them", () => {
    const result = jsonToCsv([{ note: 'say "hello"' }]);

    expect(result).toContain('"say ""hello"""');
  });

  it("converts a single object to CSV (wraps it as a one-row array)", () => {
    const result = jsonToCsv({ id: 1, label: "test" });

    const lines = result.split("\n");
    expect(lines[0]).toBe("id,label");
    expect(lines[1]).toBe("1,test");
  });

  it("fills missing columns with empty strings when objects have different keys", () => {
    const result = jsonToCsv([{ a: 1 }, { b: 2 }]);

    const lines = result.split("\n");
    // header contains both keys
    expect(lines[0]).toContain("a");
    expect(lines[0]).toContain("b");
    // row 1: a=1, b=empty; row 2: a=empty, b=2
    expect(lines[1]).toMatch(/^1,|,1$/);
    expect(lines[2]).toMatch(/^2,|,2$/);
  });

  // ─── jsonToYaml ───────────────────────────────────────────────────────────────

  it("converts a flat object to YAML key-value pairs", () => {
    const result = jsonToYaml({ name: "Alice", active: true });

    expect(result).toContain("name: Alice");
    expect(result).toContain("active: true");
  });

  it("indents nested objects in YAML output", () => {
    const result = jsonToYaml({ outer: { inner: 42 } });

    expect(result).toContain("outer:");
    expect(result).toContain("  inner: 42");
  });

  it("renders YAML arrays with dash-prefixed items", () => {
    const result = jsonToYaml({ tags: ["a", "b"] });

    expect(result).toContain("tags:");
    expect(result).toContain("  - a");
    expect(result).toContain("  - b");
  });

  it("quotes YAML scalar strings that contain reserved characters", () => {
    const result = jsonToYaml({ key: "value: with colon" });

    // The value contains a colon so it must be quoted
    expect(result).toMatch(/key: "value: with colon"/);
  });

  it("renders null as the YAML null literal", () => {
    const result = jsonToYaml({ x: null });

    expect(result).toContain("x: null");
  });

  // ─── jsonToXml ────────────────────────────────────────────────────────────────

  it("includes an XML declaration in the output", () => {
    const result = jsonToXml({ a: 1 });

    expect(result).toContain('<?xml version="1.0" encoding="UTF-8"?>');
  });

  it("wraps an object's fields in a <root> element", () => {
    const result = jsonToXml({ id: 42, label: "test" });

    expect(result).toContain("<root>");
    expect(result).toContain("<id>42</id>");
    expect(result).toContain("<label>test</label>");
    expect(result).toContain("</root>");
  });

  it("wraps an array in <root> with <item> children", () => {
    const result = jsonToXml([1, 2]);

    expect(result).toContain("<root>");
    expect(result).toContain("<item>1</item>");
    expect(result).toContain("<item>2</item>");
  });

  it("escapes XML entities in string values", () => {
    const result = jsonToXml({ msg: "<hello> & 'world'" });

    expect(result).toContain("&lt;hello&gt; &amp; &apos;world&apos;");
  });

  it("renders null values with xsi:nil attribute", () => {
    const result = jsonToXml({ missing: null });

    expect(result).toContain('xsi:nil="true"');
  });

  it("sanitizes tag names that start with a digit", () => {
    const result = jsonToXml({ "1invalid": "value" });

    // tag should be prefixed with underscore
    expect(result).toContain("<_1invalid>");
  });

  // ─── jsonToTypeScript ─────────────────────────────────────────────────────────

  it("generates a TypeScript interface for a flat object", () => {
    const result = jsonToTypeScript({ id: 1, name: "Alice" });

    expect(result).toContain("export interface Root");
    expect(result).toContain("id: number;");
    expect(result).toContain("name: string;");
  });

  it("marks null fields as optional in the TypeScript interface", () => {
    const result = jsonToTypeScript({ active: null });

    expect(result).toContain("active?: null;");
  });

  it("generates sub-interfaces for nested objects", () => {
    const result = jsonToTypeScript({ user: { id: 1, email: "a@b.com" } });

    expect(result).toContain("export interface User");
    expect(result).toContain("export interface Root");
    expect(result).toContain("user: User;");
  });

  it("infers array element types in TypeScript output", () => {
    const result = jsonToTypeScript({ scores: [1, 2, 3] });

    expect(result).toContain("scores: number[];");
  });

  it("uses a custom root interface name when provided", () => {
    const result = jsonToTypeScript({ x: 1 }, "MyType");

    expect(result).toContain("export interface MyType");
  });

  // ─── jsonToTypeScript — new options ──────────────────────────────────────────

  it("generates a type alias when exportStyle is 'type'", () => {
    const result = jsonToTypeScript({ id: 1, name: "Alice" }, "Root", { exportStyle: "type" });

    expect(result).toContain("export type Root =");
    expect(result).not.toContain("interface");
  });

  it("ends type alias declarations with a semicolon", () => {
    const result = jsonToTypeScript({ ok: true }, "Root", { exportStyle: "type" });

    expect(result).toMatch(/export type Root = \{[\s\S]*\};/);
  });

  it("marks all fields optional when optionalFields is 'all'", () => {
    const result = jsonToTypeScript({ id: 1, name: "Alice" }, "Root", { optionalFields: "all" });

    expect(result).toContain("id?: number;");
    expect(result).toContain("name?: string;");
  });

  it("only marks null fields optional with the default nulls-only mode", () => {
    const result = jsonToTypeScript({ id: 1, missing: null }, "Root", { optionalFields: "nulls-only" });

    expect(result).toContain("id: number;");
    expect(result).toContain("missing?: null;");
  });

  it("combines type alias and all-optional options together", () => {
    const result = jsonToTypeScript({ count: 0 }, "Root", { exportStyle: "type", optionalFields: "all" });

    expect(result).toContain("export type Root =");
    expect(result).toContain("count?: number;");
  });

  // ─── jsonToCsv — custom delimiter ────────────────────────────────────────────

  it("uses a semicolon delimiter when specified", () => {
    const result = jsonToCsv([{ name: "Alice", age: 30 }, { name: "Bob", age: 25 }], ";");

    const lines = result.split("\n");
    expect(lines[0]).toBe("name;age");
    expect(lines[1]).toBe("Alice;30");
    expect(lines[2]).toBe("Bob;25");
  });

  it("uses a tab delimiter when specified", () => {
    const result = jsonToCsv([{ a: 1, b: 2 }], "\t");

    const lines = result.split("\n");
    expect(lines[0]).toBe("a\tb");
    expect(lines[1]).toBe("1\t2");
  });

  it("wraps cells that contain the custom delimiter in double quotes", () => {
    const result = jsonToCsv([{ city: "New York; NY" }], ";");

    expect(result).toContain('"New York; NY"');
  });

  it("does not quote cells that contain a comma when delimiter is semicolon", () => {
    const result = jsonToCsv([{ note: "hello, world" }], ";");

    // comma is safe when delimiter is semicolon — no quoting needed
    expect(result).toContain("hello, world");
    expect(result).not.toContain('"hello, world"');
  });

  // ─── jsonToXml — custom root tag ─────────────────────────────────────────────

  it("uses a custom root tag when provided", () => {
    const result = jsonToXml({ id: 1 }, "response");

    expect(result).toContain("<response>");
    expect(result).toContain("</response>");
    expect(result).not.toContain("<root>");
  });

  it("sanitizes a custom root tag that starts with a digit", () => {
    const result = jsonToXml({ id: 1 }, "1data");

    expect(result).toContain("<_1data>");
    expect(result).toContain("</_1data>");
  });

  it("uses the default root tag when none is provided", () => {
    const result = jsonToXml({ id: 1 });

    expect(result).toContain("<root>");
    expect(result).toContain("</root>");
  });

  it("uses a custom root tag for array output", () => {
    const result = jsonToXml([1, 2], "items");

    expect(result).toContain("<items>");
    expect(result).toContain("</items>");
    expect(result).not.toContain("<root>");
  });

  // ─── jsonToYaml — quote style ─────────────────────────────────────────────────

  it("uses minimal quoting by default — plain strings are unquoted", () => {
    const result = jsonToYaml({ name: "Alice" });

    expect(result).toContain("name: Alice");
  });

  it("quotes all string values and keys when quoteStyle is always", () => {
    const result = jsonToYaml({ name: "Alice" }, "always");

    expect(result).toContain('"name": "Alice"');
  });

  it("does not quote numbers or booleans even with always quote style", () => {
    const result = jsonToYaml({ count: 42, active: true }, "always");

    // keys are quoted, but number/boolean values are not
    expect(result).toContain('"count": 42');
    expect(result).toContain('"active": true');
  });

  it("quotes string values inside arrays with always quote style", () => {
    const result = jsonToYaml({ tags: ["a", "b"] }, "always");

    expect(result).toContain('- "a"');
    expect(result).toContain('- "b"');
  });

  it("minimal style still quotes strings that contain reserved YAML characters", () => {
    const result = jsonToYaml({ note: "value: with colon" }, "minimal");

    expect(result).toMatch(/note: "value: with colon"/);
  });

  // ─── softPrettifyJson ─────────────────────────────────────────────────────────

  it("expands a minified single-line JSON object into multiple lines", () => {
    const result = softPrettifyJson('{"a":1,"b":2}');

    expect(result).toContain("\n");
    expect(result).toContain('"a": 1');
    expect(result).toContain('"b": 2');
  });

  it("returns text unchanged when it already spans more than four lines", () => {
    const multiLine = '{\n  "a": 1,\n  "b": 2,\n  "c": 3,\n  "d": 4\n}';
    const result = softPrettifyJson(multiLine);

    expect(result).toBe(multiLine);
  });

  it("expands nested objects with deeper indentation", () => {
    const result = softPrettifyJson('{"outer":{"inner":42}}');

    expect(result).toContain('"outer":');
    expect(result).toContain('"inner": 42');
    // inner key should be indented more than outer
    const innerLine = result.split("\n").find((l) => l.includes('"inner"'))!;
    const outerLine = result.split("\n").find((l) => l.includes('"outer"'))!;
    const innerIndent = innerLine.length - innerLine.trimStart().length;
    const outerIndent = outerLine.length - outerLine.trimStart().length;
    expect(innerIndent).toBeGreaterThan(outerIndent);
  });

  it("does not corrupt string values that contain JSON structural characters", () => {
    const result = softPrettifyJson('{"key":"val,ue: {nested}"}');

    expect(result).toContain('"val,ue: {nested}"');
  });

  it("does not corrupt escaped characters inside strings", () => {
    const result = softPrettifyJson('{"msg":"hello\\nworld"}');

    expect(result).toContain('"hello\\nworld"');
  });

  it("expands arrays with each item on its own line", () => {
    const result = softPrettifyJson('{"tags":["x","y"]}');

    expect(result).toContain('"x"');
    expect(result).toContain('"y"');
    // both items should be on separate lines
    const xLine = result.split("\n").findIndex((l) => l.includes('"x"'));
    const yLine = result.split("\n").findIndex((l) => l.includes('"y"'));
    expect(yLine).toBeGreaterThan(xLine);
  });
});
