import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { useColorPalette } from "@/contexts/useColorPalette";
import { aspectRatioComparisonData } from "@/data/tools/aspectRatio/aspectRatioComparisonData";
import { Box, HStack, Icon, Link, Spacer, Table, Text } from "@chakra-ui/react";
import React from "react";

type Props = {};

const AspectRatioComparison: React.FC<Props> = (props: Props) => {
  const comparison = aspectRatioComparisonData;
  const { palette } = useColorPalette();
  return (
    <Box as="section">
      <SectionHeader
        tagline={comparison.header.badge}
        headline={comparison.header.title}
        description={comparison.header.desc}
      />
      <Spacer p={4} />
      <Table.Root
        size="md"
        variant={"outline"}
        borderRadius={"md"}
        showColumnBorder
      >
        <Table.Header>
          <Table.Row>
            {comparison.columns.map((col, idx) => {
              return (
                <Table.ColumnHeader key={idx}>
                  {col.link ? (
                    <Link href={col.link}>{col.title}</Link>
                  ) : (
                    col.title
                  )}
                </Table.ColumnHeader>
              );
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {comparison.rows.map((row, rowIdx) => {
            return (
              <Table.Row key={rowIdx}>
                {comparison.columns.map((col, colIdx) => {
                  return (
                    <Table.Cell key={colIdx}>
                      <HStack colorPalette={palette}>
                        {row[col.key as keyof typeof row].icon && (
                          <Icon
                            color={row[col.key as keyof typeof row].color}
                            as={row[col.key as keyof typeof row].icon}
                            size={"sm"}
                          />
                        )}
                        <Text>{row[col.key as keyof typeof row].text}</Text>
                      </HStack>
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default AspectRatioComparison;
