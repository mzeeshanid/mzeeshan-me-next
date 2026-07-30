import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { jsonValidatorCardStyle } from "@/components/Tools/JsonValidatorFormatter/Shared/jsonValidatorCardStyle";
import { jsonValidatorFormatterCheatSheetData } from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import {
  Box,
  GridItem,
  SimpleGrid,
  Spacer,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  data?: typeof jsonValidatorFormatterCheatSheetData;
};

const JsonValidatorFormatterCheatSheet: React.FC<Props> = ({ data }) => {
  const cheatSheet = data ?? jsonValidatorFormatterCheatSheetData;

  return (
    <Box as="section">
      <SectionHeader
        tagline={cheatSheet.header.badge}
        headline={cheatSheet.header.title}
        description={cheatSheet.header.description}
      />
      <Spacer p={4} />

      <Box {...jsonValidatorCardStyle}>
        <Table.ScrollArea>
          <Table.Root size="md" variant="line" minW="2xl">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader
                  fontSize="xs"
                  color="fg.muted"
                  textTransform="uppercase"
                  letterSpacing="wide"
                >
                  {"Rule"}
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontSize="xs"
                  color="fg.muted"
                  textTransform="uppercase"
                  letterSpacing="wide"
                >
                  {"Valid"}
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontSize="xs"
                  color="fg.muted"
                  textTransform="uppercase"
                  letterSpacing="wide"
                >
                  {"Invalid"}
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {cheatSheet.rules.map((row) => (
                <Table.Row key={row.rule}>
                  <Table.Cell color="fg.muted" whiteSpace="normal">
                    {row.rule}
                  </Table.Cell>
                  <Table.Cell color="fg.success" fontFamily="mono" fontSize="sm">
                    {row.valid}
                  </Table.Cell>
                  <Table.Cell color="fg.muted" fontFamily="mono" fontSize="sm">
                    {row.invalid}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mt={4}>
        {cheatSheet.facts.map((fact) => (
          <GridItem key={fact.label}>
            <Box {...jsonValidatorCardStyle} p={4} h="full">
              <VStack align="start" gap={2}>
                <Text
                  fontSize="xs"
                  color="fg.muted"
                  textTransform="uppercase"
                  letterSpacing="wide"
                >
                  {fact.label}
                </Text>
                <Text fontWeight="medium">{fact.value}</Text>
              </VStack>
            </Box>
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default JsonValidatorFormatterCheatSheet;
