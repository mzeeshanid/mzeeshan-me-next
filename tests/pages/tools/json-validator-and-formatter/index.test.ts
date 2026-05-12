import { describe, expect, it } from "vitest";
import {
  detectJsonType,
  getDisplayType,
  getNodePrefix,
  getNodeSummary,
  nextDocName,
  softPrettifyJson,
  sortJsonKeys,
  tryRemoveEscapeCharacters,
  validateJson,
} from "@/components/Tools/JsonValidatorFormatter/Hero/jsonValidatorFormatterUtils";
import type { JsonValue } from "@/components/Tools/JsonValidatorFormatter/Hero/jsonValidatorFormatterTypes";

describe("/tools/json-validator-and-formatter logic", () => {
  // ─── validateJson ───────────────────────────────────────────────────────────

  it("formats valid JSON with 2-space indent by default", () => {
    const result = validateJson('{"name":"M Zeeshan","limits":{"retry":3}}');

    expect(result.error).toBeUndefined();
    expect(result.value).toEqual({ name: "M Zeeshan", limits: { retry: 3 } });
    expect(result.formatted).toBe(
      '{\n  "name": "M Zeeshan",\n  "limits": {\n    "retry": 3\n  }\n}',
    );
  });

  it("returns the empty-state message for blank input", () => {
    const result = validateJson("   ");

    expect(result.value).toBeUndefined();
    expect(result.formatted).toBeUndefined();
    expect(result.error).toEqual({
      message: "Paste JSON into the Text tab to validate and inspect it.",
    });
  });

  it("returns an error containing 'not valid JSON' for malformed input", () => {
    const result = validateJson(
      '{\n  "name": "Ali",\n  "tags": [1,2,],\n  "active": true\n}',
    );

    expect(result.value).toBeUndefined();
    expect(result.error).toBeDefined();
    expect(result.error?.message).toContain("not valid JSON");
  });

  it("respects a custom indent depth", () => {
    const result = validateJson('{"a":1}', 4);

    expect(result.formatted).toBe('{\n    "a": 1\n}');
  });

  it("parses JSON arrays at the root level", () => {
    const result = validateJson("[1, 2, 3]");

    expect(result.value).toEqual([1, 2, 3]);
    expect(result.error).toBeUndefined();
  });

  // ─── detectJsonType / getDisplayType ───────────────────────────────────────

  it("derives display metadata for numbers, arrays, objects, and null", () => {
    expect(detectJsonType(null)).toBe("null");
    expect(detectJsonType(["a"])).toBe("array");
    expect(getDisplayType(12)).toEqual({ label: "Int", color: "blue" });
    expect(getDisplayType(12.5)).toEqual({ label: "Float", color: "blue" });
    expect(getDisplayType({ ok: true })).toEqual({
      label: "Object",
      color: "orange",
    });
  });

  it("detects all primitive JSON types", () => {
    expect(detectJsonType("hello")).toBe("string");
    expect(detectJsonType(true)).toBe("boolean");
    expect(detectJsonType(42)).toBe("number");
  });

  // ─── getNodePrefix / getNodeSummary ────────────────────────────────────────

  it("returns tree prefixes and summaries for structured values", () => {
    expect(getNodePrefix("object")).toBe("{}");
    expect(getNodePrefix("array")).toBe("[]");
    expect(getNodePrefix("string")).toBeNull();
    expect(getNodeSummary({ retry: 3, timeoutMs: 1200 })).toBe("{2 keys}");
    expect(getNodeSummary(["json", "tree"])).toBe("[2 items]");
    expect(getNodeSummary("validator")).toBe('"validator"');
  });

  it("returns null prefix for primitive types", () => {
    expect(getNodePrefix("number")).toBeNull();
    expect(getNodePrefix("boolean")).toBeNull();
    expect(getNodePrefix("null")).toBeNull();
  });

  it("summarises numbers and booleans as their string representation", () => {
    expect(getNodeSummary(42)).toBe("42");
    expect(getNodeSummary(false)).toBe("false");
    expect(getNodeSummary(null)).toBe("null");
  });

  // ─── tryRemoveEscapeCharacters ─────────────────────────────────────────────

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

  it("returns an empty string for blank input", () => {
    expect(tryRemoveEscapeCharacters("   ")).toBe("");
  });

  it("returns already-clean JSON formatted at 2 spaces", () => {
    const result = tryRemoveEscapeCharacters('{"a":1}');
    expect(result).toBe('{\n  "a": 1\n}');
  });

  // ─── sortJsonKeys ──────────────────────────────────────────────────────────

  it("sorts flat object keys in ascending order", () => {
    const result = sortJsonKeys({ c: 3, a: 1, b: 2 } as JsonValue, "asc");

    expect(Object.keys(result as object)).toEqual(["a", "b", "c"]);
  });

  it("sorts flat object keys in descending order", () => {
    const result = sortJsonKeys({ c: 3, a: 1, b: 2 } as JsonValue, "desc");

    expect(Object.keys(result as object)).toEqual(["c", "b", "a"]);
  });

  it("recursively sorts nested object keys", () => {
    const result = sortJsonKeys(
      { z: { b: 2, a: 1 }, a: 0 } as JsonValue,
      "asc",
    ) as Record<string, unknown>;

    expect(Object.keys(result)).toEqual(["a", "z"]);
    expect(Object.keys(result.z as object)).toEqual(["a", "b"]);
  });

  it("preserves array item order — arrays are not sorted", () => {
    const input = [3, 1, 2] as JsonValue;
    expect(sortJsonKeys(input, "asc")).toEqual([3, 1, 2]);
  });

  it("sorts objects inside arrays recursively", () => {
    const result = sortJsonKeys(
      [{ b: 2, a: 1 }, { d: 4, c: 3 }] as JsonValue,
      "asc",
    ) as object[];

    expect(Object.keys(result[0])).toEqual(["a", "b"]);
    expect(Object.keys(result[1])).toEqual(["c", "d"]);
  });

  it("returns primitives unchanged", () => {
    expect(sortJsonKeys(42 as unknown as JsonValue, "asc")).toBe(42);
    expect(sortJsonKeys(null as JsonValue, "asc")).toBeNull();
    expect(sortJsonKeys("hello" as JsonValue, "asc")).toBe("hello");
  });

  // ─── softPrettifyJson ──────────────────────────────────────────────────────

  it("expands a minified single-line JSON object into multiple lines", () => {
    const result = softPrettifyJson('{"a":1,"b":2}');

    expect(result).toContain("\n");
    expect(result).toContain('"a": 1');
    expect(result).toContain('"b": 2');
  });

  it("returns text unchanged when it already spans more than four lines", () => {
    const multiLine = '{\n  "a": 1,\n  "b": 2,\n  "c": 3,\n  "d": 4\n}';

    expect(softPrettifyJson(multiLine)).toBe(multiLine);
  });

  it("expands nested objects with deeper indentation", () => {
    const result = softPrettifyJson('{"outer":{"inner":42}}');

    expect(result).toContain('"outer":');
    expect(result).toContain('"inner": 42');
    const innerLine = result.split("\n").find((l) => l.includes('"inner"'))!;
    const outerLine = result.split("\n").find((l) => l.includes('"outer"'))!;
    expect(innerLine.length - innerLine.trimStart().length).toBeGreaterThan(
      outerLine.length - outerLine.trimStart().length,
    );
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

    const lines = result.split("\n");
    const xLine = lines.findIndex((l) => l.includes('"x"'));
    const yLine = lines.findIndex((l) => l.includes('"y"'));
    expect(yLine).toBeGreaterThan(xLine);
  });

  // ─── nextDocName ───────────────────────────────────────────────────────────

  it("returns 'New Document' when no documents exist", () => {
    expect(nextDocName([])).toBe("New Document");
  });

  it("returns 'New Document 2' when 'New Document' is already taken", () => {
    const docs = [{ name: "New Document" }];

    expect(nextDocName(docs)).toBe("New Document 2");
  });

  it("increments to the next available number when multiple names are taken", () => {
    const docs = [
      { name: "New Document" },
      { name: "New Document 2" },
      { name: "New Document 3" },
    ];

    expect(nextDocName(docs)).toBe("New Document 4");
  });

  it("finds a gap when non-consecutive numbers exist", () => {
    const docs = [{ name: "New Document" }, { name: "New Document 3" }];

    expect(nextDocName(docs)).toBe("New Document 2");
  });

  it("accepts a custom base name", () => {
    expect(nextDocName([], "My File")).toBe("My File");
    expect(nextDocName([{ name: "My File" }], "My File")).toBe("My File 2");
  });
});
