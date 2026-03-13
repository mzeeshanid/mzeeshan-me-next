import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { stringMetricsComplexityData } from "@/data/tools/stringMetrics/stringMetricsStats";
import { Box, Table } from "@chakra-ui/react";
import React from "react";

type Props = {};

const ComplexityTable: React.FC = () => {
  return (
    <Box overflowX="auto" borderRadius={"md"}>
      <Table.Root striped interactive variant={"outline"}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>{"Algorithm".toUpperCase()}</Table.ColumnHeader>
            <Table.ColumnHeader>
              {"Time Complexity".toUpperCase()}
            </Table.ColumnHeader>
            <Table.ColumnHeader>
              {"Space Complexity".toUpperCase()}
            </Table.ColumnHeader>
            <Table.ColumnHeader>
              {"Description".toUpperCase()}
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {stringMetricsComplexityData.complexities.map((item, idx) => (
            <Table.Row key={idx}>
              <Table.Cell p={4}>{item.algorithm}</Table.Cell>
              <Table.Cell p={4} fontFamily={"mono"}>
                {item.timeComplexity}
              </Table.Cell>
              <Table.Cell p={4} fontFamily={"mono"}>
                {item.spaceComplexity}
              </Table.Cell>
              <Table.Cell p={4} fontSize="sm" color="fg.muted">
                {item.description}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

const StringMetricsComplexity: React.FC<Props> = (props: Props) => {
  const { header } = stringMetricsComplexityData;

  return (
    <Box as="section">
      <SectionHeader
        tagline={header.badge}
        headline={header.title}
        description={header.description}
      >
        <ComplexityTable />
      </SectionHeader>
    </Box>
  );
};

export default StringMetricsComplexity;
