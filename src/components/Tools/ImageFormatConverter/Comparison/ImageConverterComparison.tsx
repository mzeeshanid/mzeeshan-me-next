import { Box, Link, Table } from "@chakra-ui/react";
import React from "react";

import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import type { ComparisonColumn, ComparisonRow, SectionHeaderData } from "@/data/tools/imageFormatConverter/types";

type Props = {
  header: SectionHeaderData;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
};

const ImageConverterComparison: React.FC<Props> = ({ header, columns, rows }) => {
  return (
    <Box as="section">
      <SectionHeader
        tagline={header.badge}
        headline={header.title}
        description={header.description}
      />
      <Box mt={8} borderWidth="1px" borderRadius="2xl" overflow="hidden">
        <Table.ScrollArea>
          <Table.Root variant="outline" showColumnBorder>
            <Table.Header>
              <Table.Row>
                {columns.map((column) => (
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
              {rows.map((row, rowIndex) => (
                <Table.Row key={rowIndex}>
                  {columns.map((column) => (
                    <Table.Cell key={column.key}>{row[column.key]?.text ?? ""}</Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Box>
    </Box>
  );
};

export default ImageConverterComparison;
