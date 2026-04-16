import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { useColorPalette } from "@/contexts/useColorPalette";
import { jsonValidatorFormatterComparisonData } from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import { Box, HStack, Icon, Link, Spacer, Table, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  data?: typeof jsonValidatorFormatterComparisonData;
};

const JsonValidatorFormatterComparison: React.FC<Props> = ({ data }) => {
  const { palette } = useColorPalette();
  const comparison = data ?? jsonValidatorFormatterComparisonData;

  return (
    <Box as="section">
      <SectionHeader
        tagline={comparison.header.badge}
        headline={comparison.header.title}
        description={comparison.header.desc}
      />
      <Spacer p={4} />
      <Table.ScrollArea>
        <Table.Root
          size="md"
          variant="outline"
          borderRadius="md"
          showColumnBorder
        >
          <Table.Header>
            <Table.Row>
              {comparison.columns.map((column) => (
                <Table.ColumnHeader key={column.key}>
                  {column.link ? (
                    <Link href={column.link} target="_blank" rel="noreferrer">
                      {column.title}
                    </Link>
                  ) : (
                    column.title
                  )}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {comparison.rows.map((row, rowIndex) => (
              <Table.Row key={rowIndex}>
                {comparison.columns.map((column) => {
                  const cell = row[column.key as keyof typeof row];

                  return (
                    <Table.Cell key={column.key}>
                      <HStack colorPalette={palette}>
                        {cell.icon && (
                          <Icon as={cell.icon} size="sm" color={cell.color} />
                        )}
                        <Text>{cell.text}</Text>
                      </HStack>
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Box>
  );
};

export default JsonValidatorFormatterComparison;
