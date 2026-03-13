import React from "react";
import { useColorPalette } from "@/contexts/useColorPalette";
import {
  Blockquote,
  Box,
  Heading,
  SimpleGrid,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";

type Props = {
  source: string;
  target: string;
};

export interface AlgorithmResult {
  algorithm: string;
  similarity: number;
  distance: number;
}

// Jaro-Winkler Similarity
function jaroWinkler(s1: string, s2: string): number {
  if (s1 === s2) return 1;
  const len1 = s1.length;
  const len2 = s2.length;
  if (len1 === 0 || len2 === 0) return 0;

  const matchDistance = Math.floor(Math.max(len1, len2) / 2) - 1;
  const s1Matches = new Array(len1).fill(false);
  const s2Matches = new Array(len2).fill(false);

  let matches = 0;
  let transpositions = 0;

  for (let i = 0; i < len1; i++) {
    const start = Math.max(0, i - matchDistance);
    const end = Math.min(i + matchDistance + 1, len2);

    for (let j = start; j < end; j++) {
      if (s2Matches[j] || s1[i] !== s2[j]) continue;
      s1Matches[i] = true;
      s2Matches[j] = true;
      matches++;
      break;
    }
  }

  if (matches === 0) return 0;

  let k = 0;
  for (let i = 0; i < len1; i++) {
    if (!s1Matches[i]) continue;
    while (!s2Matches[k]) k++;
    if (s1[i] !== s2[k]) transpositions++;
    k++;
  }

  const jaro =
    (matches / len1 +
      matches / len2 +
      (matches - transpositions / 2) / matches) /
    3;

  // Winkler modification - bonus for common prefix
  let prefix = 0;
  for (let i = 0; i < Math.min(4, Math.min(len1, len2)); i++) {
    if (s1[i] === s2[i]) prefix++;
    else break;
  }

  return jaro + prefix * 0.1 * (1 - jaro);
}

// Levenshtein Distance
function levenshtein(s1: string, s2: string): number {
  if (s1 === s2) return 0;
  const len1 = s1.length;
  const len2 = s2.length;

  if (len1 === 0) return len2;
  if (len2 === 0) return len1;

  const matrix: number[][] = [];

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );
    }
  }

  return matrix[len1][len2];
}

// Normalized Levenshtein
function normalizedLevenshtein(s1: string, s2: string): number {
  const maxLen = Math.max(s1.length, s2.length);
  if (maxLen === 0) return 0;
  return 1 - levenshtein(s1, s2) / maxLen;
}

// Damerau Distance (with transposition)
function damerau(s1: string, s2: string): number {
  if (s1 === s2) return 0;
  const len1 = s1.length;
  const len2 = s2.length;

  if (len1 === 0) return len2;
  if (len2 === 0) return len1;

  const matrix: number[][] = [];

  for (let i = 0; i <= len1; i++) {
    matrix[i] = new Array(len2 + 1);
    matrix[i][0] = i;
  }

  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );

      if (
        i > 1 &&
        j > 1 &&
        s1[i - 1] === s2[j - 2] &&
        s1[i - 2] === s2[j - 1]
      ) {
        matrix[i][j] = Math.min(matrix[i][j], matrix[i - 2][j - 2] + cost);
      }
    }
  }

  return matrix[len1][len2];
}

// Optimal String Alignment Distance
function optimalStringAlignment(s1: string, s2: string): number {
  if (s1 === s2) return 0;
  const len1 = s1.length;
  const len2 = s2.length;

  if (len1 === 0) return len2;
  if (len2 === 0) return len1;

  const matrix: number[][] = [];

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );

      // No overlapping transpositions in OSA
      if (
        i > 1 &&
        j > 1 &&
        s1[i - 1] === s2[j - 2] &&
        s1[i - 2] === s2[j - 1]
      ) {
        matrix[i][j] = Math.min(matrix[i][j], matrix[i - 2][j - 2] + cost);
      }
    }
  }

  return matrix[len1][len2];
}

// Longest Common Subsequence
function lcs(s1: string, s2: string): number {
  const len1 = s1.length;
  const len2 = s2.length;

  if (len1 === 0 || len2 === 0) return 0;

  const matrix: number[][] = [];

  for (let i = 0; i <= len1; i++) {
    matrix[i] = new Array(len2 + 1).fill(0);
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1] + 1;
      } else {
        matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);
      }
    }
  }

  return matrix[len1][len2];
}

// LCS-based similarity (1 - normalized distance)
function lcsSimilarity(s1: string, s2: string): number {
  const maxLen = Math.max(s1.length, s2.length);
  if (maxLen === 0) return 1;
  return lcs(s1, s2) / maxLen;
}

// Metric LCS (true distance metric version)
function metricLcs(s1: string, s2: string): number {
  // Metric LCS distance = 2 * (1 - similarity)
  // This satisfies triangle inequality
  return 2 * (1 - lcsSimilarity(s1, s2));
}

const StringMetricsResult: React.FC<Props> = (props: Props) => {
  const { source, target } = props;
  const { palette } = useColorPalette();

  // Calculate all algorithm results
  const results: AlgorithmResult[] = React.useMemo(() => {
    const jaroWinklerSim = jaroWinkler(source, target);
    const levDistance = levenshtein(source, target);
    const normLevSim = normalizedLevenshtein(source, target);
    const damerauDist = damerau(source, target);
    const osaDist = optimalStringAlignment(source, target);
    const lcsLength = lcs(source, target);
    const mlcsDist = metricLcs(source, target);

    return [
      {
        algorithm: "Jaro-Winkler",
        similarity: jaroWinklerSim,
        distance: 1 - jaroWinklerSim,
      },
      {
        algorithm: "Levenshtein",
        similarity: Math.max(
          0,
          1 - levDistance / Math.max(source.length, target.length, 1),
        ),
        distance: levDistance,
      },
      {
        algorithm: "Normalized-Levenshtein",
        similarity: normLevSim,
        distance: 1 - normLevSim,
      },
      {
        algorithm: "Damerau",
        similarity: Math.max(
          0,
          1 - damerauDist / Math.max(source.length, target.length, 1),
        ),
        distance: damerauDist,
      },
      {
        algorithm: "Optimal-String-Alignment",
        similarity: Math.max(
          0,
          1 - osaDist / Math.max(source.length, target.length, 1),
        ),
        distance: osaDist,
      },
      {
        algorithm: "Longest-Common-Subsequence",
        similarity: lcsSimilarity(source, target),
        distance: Math.max(source.length, target.length) - lcsLength,
      },
      {
        algorithm: "Metric-LCS",
        similarity: 1 - mlcsDist / 2,
        distance: mlcsDist,
      },
    ];
  }, [source, target]);

  return (
    <Box
      bg="bg.subtle"
      p={6}
      borderRadius={"xl"}
      border="1px solid"
      borderColor="border"
    >
      <VStack gap={4} align="stretch">
        <Heading as="h3" size="lg">
          Comparison Results
        </Heading>

        <Box overflowX="auto">
          <Table.Root size="sm" variant="outline">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader fontWeight="bold">
                  Algorithm
                </Table.ColumnHeader>
                <Table.ColumnHeader fontWeight="bold">
                  Similarity
                </Table.ColumnHeader>
                <Table.ColumnHeader fontWeight="bold">
                  Distance
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {results.map((result, idx) => (
                <Table.Row key={idx}>
                  <Table.Cell fontWeight="medium">
                    {result.algorithm}
                  </Table.Cell>
                  <Table.Cell>
                    <Text
                      color={
                        result.similarity >= 0.8
                          ? "fg.success"
                          : result.similarity >= 0.5
                            ? "fg.warning"
                            : "fg.error"
                      }
                      fontWeight="semibold"
                    >
                      {(result.similarity * 100).toFixed(2)}%
                    </Text>
                  </Table.Cell>
                  <Table.Cell>{result.distance.toFixed(2)}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>

        {/* Legend */}
        <Box mt={4} p={4} bg="bg" borderRadius="md">
          <Text fontSize="sm" fontWeight="semibold" mb={2}>
            Similarity Legend:
          </Text>
          <SimpleGrid columns={3} gap={2} fontSize="xs">
            <Text color="fg.success">80-100%: High match</Text>
            <Text color="fg.warning">50-79%: Partial match</Text>
            <Text color="fg.error">0-49%: Low match</Text>
          </SimpleGrid>
        </Box>
        <Blockquote.Root>
          <Blockquote.Content>
            <Text fontSize="sm" color="fg.muted">
              Note: For Jaro-Winkler, distance 0 means identical and 1 means
              completely different. For Levenshtein and Damerau, distance
              represents the number of edits needed to transform one string into
              the other. Normalized Levenshtein and LCS-based similarity are
              scaled between 0 and 1 for easier comparison.
            </Text>
          </Blockquote.Content>
        </Blockquote.Root>
      </VStack>
    </Box>
  );
};

export default StringMetricsResult;
