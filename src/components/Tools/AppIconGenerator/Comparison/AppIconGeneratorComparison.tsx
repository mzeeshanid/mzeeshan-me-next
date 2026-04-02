import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { appIconGeneratorComparisonData } from "@/data/tools/appIconGenerator/appIconGeneratorData";
import { Box, Link, Table, Text } from "@chakra-ui/react";
import React from "react";

const AppIconGeneratorComparison: React.FC = () => {
  const data = appIconGeneratorComparisonData;

  return (
    <Box as="section">
      <SectionHeader
        tagline={data.header.badge}
        headline={data.header.title}
        description={data.header.desc}
      />
      <Box h={6} />
      <Box borderWidth="1px" borderRadius="2xl" overflow="hidden">
        <Table.ScrollArea>
          <Table.Root variant="outline" showColumnBorder>
          <Table.Header>
            <Table.Row>
              {data.columns.map((col) => (
                <Table.ColumnHeader key={col.key}>
                  {col.link ? (
                    <Link href={col.link} target="_blank" rel="noreferrer">
                      {col.title}
                    </Link>
                  ) : (
                    col.title
                  )}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.rows.map((row) => (
              <Table.Row key={row.feature.text}>
                {data.columns.map((col) => (
                  <Table.Cell key={col.key}>
                    <Text>{row[col.key as keyof typeof row].text}</Text>
                  </Table.Cell>
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

export default AppIconGeneratorComparison;
