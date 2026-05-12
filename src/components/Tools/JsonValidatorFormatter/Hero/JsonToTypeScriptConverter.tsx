import JsonConverterHeroBase from "./JsonConverterHeroBase";
import { jsonConverterHeroDataByTab } from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import React from "react";

// ── Conversion logic ──────────────────────────────────────────────────────────

function isValidIdentifier(key: string): boolean {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key);
}

function formatKey(key: string): string {
  return isValidIdentifier(key) ? key : `"${key}"`;
}

// Collect all interface definitions, keyed by interface name.
type InterfaceMap = Map<string, string[]>;

function nameFor(parentName: string, key: string): string {
  return parentName + key.charAt(0).toUpperCase() + key.slice(1);
}

function inferType(
  val: unknown,
  name: string,
  interfaces: InterfaceMap,
  optional: boolean,
): string {
  if (val === null) return "null";
  if (typeof val === "string")  return "string";
  if (typeof val === "boolean") return "boolean";
  if (typeof val === "number")
    return Number.isInteger(val) ? "number" : "number";

  if (Array.isArray(val)) {
    if (val.length === 0) return "unknown[]";
    const firstNonNull = val.find((v) => v !== null);
    if (firstNonNull === undefined) return "null[]";
    const elemType = inferType(firstNonNull, `${name}Item`, interfaces, false);
    return `${elemType}[]`;
  }

  if (typeof val === "object") {
    buildInterface(val as Record<string, unknown>, name, interfaces);
    return name;
  }

  return "unknown";
}

function buildInterface(
  obj: Record<string, unknown>,
  name: string,
  interfaces: InterfaceMap,
): void {
  if (interfaces.has(name)) return;

  // Reserve the slot to prevent infinite recursion on circular-looking names
  interfaces.set(name, []);

  const lines: string[] = [];
  for (const [key, val] of Object.entries(obj)) {
    const optional = val === null;
    const childName = nameFor(name, key);
    const type = inferType(val, childName, interfaces, optional);
    const optMark = optional ? "?" : "";
    lines.push(`  ${formatKey(key)}${optMark}: ${type};`);
  }

  interfaces.set(name, lines);
}

function jsonToTypeScript(jsonStr: string): string {
  const data: unknown = JSON.parse(jsonStr);
  const interfaces: InterfaceMap = new Map();

  let rootType: string;

  if (data === null) {
    return "type Root = null;";
  }

  if (Array.isArray(data)) {
    const first = data.find((v) => v !== null && typeof v === "object");
    if (first) {
      buildInterface(first as Record<string, unknown>, "RootItem", interfaces);
      rootType = "RootItem[]";
    } else {
      const elem = data[0] ?? null;
      rootType = `${inferType(elem, "RootItem", interfaces, false)}[]`;
    }
  } else if (typeof data === "object") {
    buildInterface(data as Record<string, unknown>, "Root", interfaces);
    rootType = "Root";
  } else {
    return `type Root = ${typeof data};`;
  }

  const blocks: string[] = [];

  // Emit interfaces in definition order (deepest first via Map insertion order
  // of recursive calls), then reverse so parent appears first in output.
  const entries = Array.from(interfaces.entries()).reverse();
  for (const [name, lines] of entries) {
    if (lines.length === 0) {
      blocks.push(`export interface ${name} {}`);
    } else {
      blocks.push(`export interface ${name} {\n${lines.join("\n")}\n}`);
    }
  }

  // If root is an array alias, append it
  if (Array.isArray(data)) {
    blocks.push(`export type Root = ${rootType};`);
  }

  return blocks.join("\n\n");
}

// ── Component ─────────────────────────────────────────────────────────────────

const heroData = jsonConverterHeroDataByTab.typescript;

const JsonToTypeScriptConverter: React.FC = () => (
  <JsonConverterHeroBase
    heroData={heroData}
    outputLanguage="typescript"
    convert={jsonToTypeScript}
  />
);

export default JsonToTypeScriptConverter;
