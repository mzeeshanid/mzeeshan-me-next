import React from "react";
import { useColorPalette } from "@/contexts/useColorPalette";
import {
  calculateStringMetricResults,
  type AlgorithmResult,
} from "@/utils/stringMetrics";
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

const StringMetricsResult: React.FC<Props> = (props: Props) => {
  const { source, target } = props;
  const { palette } = useColorPalette();

  // Calculate all algorithm results
  const results: AlgorithmResult[] = React.useMemo(() => {
    return calculateStringMetricResults(source, target);
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
