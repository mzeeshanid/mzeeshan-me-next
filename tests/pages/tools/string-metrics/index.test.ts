import { describe, expect, it } from "vitest";
import {
  calculateStringMetricResults,
  damerau,
  jaroWinkler,
  lcs,
  lcsSimilarity,
  levenshtein,
  metricLcs,
  normalizedLevenshtein,
  optimalStringAlignment,
} from "@/utils/stringMetrics";

describe("/tools/string-metrics logic", () => {
  it("returns perfect scores for identical strings", () => {
    expect(jaroWinkler("json", "json")).toBe(1);
    expect(levenshtein("json", "json")).toBe(0);
    expect(normalizedLevenshtein("json", "json")).toBe(1);
    expect(lcs("json", "json")).toBe(4);
    expect(metricLcs("json", "json")).toBe(0);
  });

  it("calculates standard edit-distance examples", () => {
    expect(levenshtein("kitten", "sitting")).toBe(3);
    expect(damerau("ca", "ac")).toBe(1);
    expect(optimalStringAlignment("ca", "ac")).toBe(1);
  });

  it("computes expected LCS values", () => {
    expect(lcs("abcdef", "azced")).toBe(3);
    expect(lcsSimilarity("abcdef", "azced")).toBe(0.5);
  });

  it("keeps normalized similarity in range", () => {
    const score = normalizedLevenshtein("payment", "payments");

    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThanOrEqual(1);
  });

  it("returns all supported algorithm results", () => {
    const results = calculateStringMetricResults("muhammad", "mohammad");

    expect(results).toHaveLength(7);
    expect(results.map((result) => result.algorithm)).toEqual([
      "Jaro-Winkler",
      "Levenshtein",
      "Normalized-Levenshtein",
      "Damerau",
      "Optimal-String-Alignment",
      "Longest-Common-Subsequence",
      "Metric-LCS",
    ]);
  });

  it("reports intuitive similarity ordering for close matches", () => {
    const results = calculateStringMetricResults("json", "jsno");
    const jaro = results.find((result) => result.algorithm === "Jaro-Winkler");
    const levenshteinResult = results.find(
      (result) => result.algorithm === "Levenshtein",
    );

    expect(jaro?.similarity).toBeGreaterThan(0.8);
    expect(levenshteinResult?.distance).toBe(2);
  });
});
