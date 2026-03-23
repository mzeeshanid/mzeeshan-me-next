import { jsonValidatorFormatterHeroData } from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import { Box, HStack, Icon, Spacer, Table, Text } from "@chakra-ui/react";
import React from "react";
import { FaCircle } from "react-icons/fa6";

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

type DisplayType = {
  label: "Array" | "Boolean" | "Float" | "Int" | "Null" | "Object" | "String";
  color: string;
};

type SelectedNodeDetailRow = {
  key: string;
  value: JsonValue;
};

type Props = {
  getDisplayType: (value: JsonValue) => DisplayType;
  getSelectedNodeValueDisplay: (value: JsonValue) => string;
  path: string | null;
  rows: SelectedNodeDetailRow[];
};

const JsonSelectedNodeDetails: React.FC<Props> = ({
  getDisplayType,
  getSelectedNodeValueDisplay,
  path,
  rows,
}) => {
  const heroData = jsonValidatorFormatterHeroData;

  return (
    <Box borderWidth="1px" borderRadius="xl" p={4}>
      <Text fontWeight="bold">{heroData.selectedNodeTitle}</Text>
      <Text color="fg.muted" mt={1}>
        {path
          ? `${heroData.selectedNodePathPrefix} ${path}`
          : heroData.selectedNodePrompt}
      </Text>
      <Spacer p={2} />
      {path ? (
        <Table.Root size="sm" variant="outline">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>{"Type"}</Table.ColumnHeader>
              <Table.ColumnHeader>{"Keys"}</Table.ColumnHeader>
              <Table.ColumnHeader>{"Values"}</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows.map((row) => {
              const rowType = getDisplayType(row.value);

              return (
                <Table.Row key={`${path}-${row.key}`}>
                  <Table.Cell>
                    <HStack>
                      <Icon as={FaCircle} color={`${rowType.color}.solid`} />
                      <Text color="fg.subtle">{rowType.label}</Text>
                    </HStack>
                  </Table.Cell>
                  <Table.Cell>{row.key}</Table.Cell>
                  <Table.Cell>
                    <Text
                      whiteSpace="pre-wrap"
                      fontFamily="mono"
                      fontSize="sm"
                      color="fg.muted"
                    >
                      {getSelectedNodeValueDisplay(row.value)}
                    </Text>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      ) : (
        <Text color="fg.muted">
          {heroData.selectedNodeEmpty}
        </Text>
      )}
    </Box>
  );
};

export default JsonSelectedNodeDetails;
