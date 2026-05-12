import JsonConverterHeroBase from "./JsonConverterHeroBase";
import { jsonConverterHeroDataByTab } from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import React from "react";

// ── Conversion logic ──────────────────────────────────────────────────────────

type Row = Record<string, unknown>;

function collectKeys(rows: Row[]): string[] {
  const seen = new Set<string>();
  const keys: string[] = [];
  for (const row of rows) {
    if (row !== null && typeof row === "object" && !Array.isArray(row)) {
      for (const k of Object.keys(row)) {
        if (!seen.has(k)) { seen.add(k); keys.push(k); }
      }
    }
  }
  return keys;
}

function escapeCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  const s = typeof value === "object" ? JSON.stringify(value) : String(value);
  if (s.includes(",") || s.includes('"') || s.includes("\n") || s.includes("\r")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function jsonToCsv(jsonStr: string): string {
  const data: unknown = JSON.parse(jsonStr);

  // Wrap a single object in an array
  const rows: unknown[] = Array.isArray(data) ? data : [data];

  // Primitive-only array → single-column CSV
  const allPrimitive = rows.every(
    (r) => r === null || typeof r !== "object",
  );
  if (allPrimitive) {
    return ["value", ...rows.map((r) => escapeCell(r))].join("\n");
  }

  const objectRows = rows.filter(
    (r): r is Row => r !== null && typeof r === "object" && !Array.isArray(r),
  );
  const headers = collectKeys(objectRows);
  if (headers.length === 0) throw new Error("No object keys found to convert.");

  const csvRows = [
    headers.map(escapeCell).join(","),
    ...objectRows.map((row) =>
      headers.map((h) => escapeCell(row[h])).join(","),
    ),
  ];
  return csvRows.join("\n");
}

// ── Component ─────────────────────────────────────────────────────────────────

const heroData = jsonConverterHeroDataByTab.csv;

const JsonToCsvConverter: React.FC = () => (
  <JsonConverterHeroBase
    heroData={heroData}
    outputLanguage="csv"
    convert={jsonToCsv}
  />
);

export default JsonToCsvConverter;
