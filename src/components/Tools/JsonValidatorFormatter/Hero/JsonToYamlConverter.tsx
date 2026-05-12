import JsonConverterHeroBase from "./JsonConverterHeroBase";
import { jsonConverterHeroDataByTab } from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import React from "react";

// ── Conversion logic ──────────────────────────────────────────────────────────

// Characters / patterns that require YAML scalar quoting.
const YAML_SPECIAL_START = /^[:{}\[\]#&*!|>'"%@`,?~^]/;
const YAML_RESERVED = /^(true|false|null|yes|no|on|off|y|n)$/i;
const YAML_LOOKS_NUMERIC = /^[-+]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/;

function needsQuoting(s: string): boolean {
  if (s === "") return true;
  if (YAML_SPECIAL_START.test(s)) return true;
  if (YAML_RESERVED.test(s)) return true;
  if (YAML_LOOKS_NUMERIC.test(s)) return true;
  if (/[:\n\r\t]/.test(s)) return true;
  if (s.startsWith(" ") || s.endsWith(" ")) return true;
  return false;
}

function quoteYamlString(s: string): string {
  return `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t")}"`;
}

function scalarToYaml(val: unknown): string {
  if (val === null) return "null";
  if (typeof val === "boolean") return val.toString();
  if (typeof val === "number") return val.toString();
  if (typeof val === "string") {
    return needsQuoting(val) ? quoteYamlString(val) : val;
  }
  return String(val);
}

function valueToYaml(val: unknown, depth: number): string {
  const pad = "  ".repeat(depth);

  if (val === null || typeof val !== "object") {
    return scalarToYaml(val);
  }

  if (Array.isArray(val)) {
    if (val.length === 0) return "[]";
    return val
      .map((item) => {
        if (item !== null && typeof item === "object" && !Array.isArray(item)) {
          // Object item — first key on same line as dash
          const entries = Object.entries(item as Record<string, unknown>);
          if (entries.length === 0) return `${pad}- {}`;
          const [fk, fv] = entries[0];
          const fkStr = needsQuoting(fk) ? quoteYamlString(fk) : fk;
          const isComplex =
            fv !== null && typeof fv === "object";
          const firstLine = isComplex
            ? `${pad}- ${fkStr}:\n${valueToYaml(fv, depth + 2)}`
            : `${pad}- ${fkStr}: ${scalarToYaml(fv)}`;
          const rest = entries.slice(1).map(([k, v]) => {
            const kStr = needsQuoting(k) ? quoteYamlString(k) : k;
            if (v !== null && typeof v === "object") {
              return `${"  ".repeat(depth + 1)}${kStr}:\n${valueToYaml(v, depth + 2)}`;
            }
            return `${"  ".repeat(depth + 1)}${kStr}: ${scalarToYaml(v)}`;
          });
          return [firstLine, ...rest].join("\n");
        }
        // Scalar or array item
        const rendered = valueToYaml(item, depth + 1);
        if (Array.isArray(item) && item.length > 0) {
          return `${pad}-\n${rendered}`;
        }
        return `${pad}- ${rendered}`;
      })
      .join("\n");
  }

  // Object
  const obj = val as Record<string, unknown>;
  const keys = Object.keys(obj);
  if (keys.length === 0) return "{}";

  return keys
    .map((k) => {
      const v = obj[k];
      const kStr = needsQuoting(k) ? quoteYamlString(k) : k;
      if (v !== null && typeof v === "object") {
        if (Array.isArray(v) && v.length === 0) return `${pad}${kStr}: []`;
        if (!Array.isArray(v) && Object.keys(v).length === 0)
          return `${pad}${kStr}: {}`;
        return `${pad}${kStr}:\n${valueToYaml(v, depth + 1)}`;
      }
      return `${pad}${kStr}: ${scalarToYaml(v)}`;
    })
    .join("\n");
}

function jsonToYaml(jsonStr: string): string {
  const data: unknown = JSON.parse(jsonStr);
  return valueToYaml(data, 0);
}

// ── Component ─────────────────────────────────────────────────────────────────

const heroData = jsonConverterHeroDataByTab.yaml;

const JsonToYamlConverter: React.FC = () => (
  <JsonConverterHeroBase
    heroData={heroData}
    outputLanguage="yaml"
    convert={jsonToYaml}
  />
);

export default JsonToYamlConverter;
