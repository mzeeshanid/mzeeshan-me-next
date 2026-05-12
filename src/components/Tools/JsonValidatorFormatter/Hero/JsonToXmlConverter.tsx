import JsonConverterHeroBase from "./JsonConverterHeroBase";
import { jsonConverterHeroDataByTab } from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import React from "react";

// ── Conversion logic ──────────────────────────────────────────────────────────

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// XML tag names must start with a letter or underscore and contain only
// letters, digits, hyphens, underscores, and periods.
function sanitizeTagName(key: string): string {
  let name = key.replace(/[^a-zA-Z0-9_\-.]/g, "_");
  if (/^[^a-zA-Z_]/.test(name)) name = `_${name}`;
  return name || "_";
}

function valueToXml(val: unknown, tag: string, depth: number): string {
  const pad = "  ".repeat(depth);
  const t = sanitizeTagName(tag);

  if (val === null) return `${pad}<${t} xsi:nil="true"/>`;

  if (typeof val !== "object") {
    return `${pad}<${t}>${escapeXml(String(val))}</${t}>`;
  }

  if (Array.isArray(val)) {
    if (val.length === 0) return `${pad}<${t}/>`;
    return val
      .map((item) => valueToXml(item, tag, depth))
      .join("\n");
  }

  const obj = val as Record<string, unknown>;
  const keys = Object.keys(obj);
  if (keys.length === 0) return `${pad}<${t}/>`;

  const children = keys
    .map((k) => valueToXml(obj[k], k, depth + 1))
    .join("\n");
  return `${pad}<${t}>\n${children}\n${pad}</${t}>`;
}

function jsonToXml(jsonStr: string): string {
  const data: unknown = JSON.parse(jsonStr);

  const header = '<?xml version="1.0" encoding="UTF-8"?>';

  if (Array.isArray(data)) {
    const items = data.map((item) => valueToXml(item, "item", 1)).join("\n");
    return `${header}\n<root>\n${items}\n</root>`;
  }

  if (data !== null && typeof data === "object") {
    const children = Object.entries(data as Record<string, unknown>)
      .map(([k, v]) => valueToXml(v, k, 1))
      .join("\n");
    return `${header}\n<root>\n${children}\n</root>`;
  }

  // Primitive root
  return `${header}\n<root>${escapeXml(String(data))}</root>`;
}

// ── Component ─────────────────────────────────────────────────────────────────

const heroData = jsonConverterHeroDataByTab.xml;

const JsonToXmlConverter: React.FC = () => (
  <JsonConverterHeroBase
    heroData={heroData}
    outputLanguage="xml"
    convert={jsonToXml}
  />
);

export default JsonToXmlConverter;
