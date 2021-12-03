import { Button } from "@chakra-ui/button";
import { Box, Center, Link } from "@chakra-ui/layout";
import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/table";
import theme from "@chakra-ui/theme";
import React from "react";

export default function SampleFileExtensions({ extensions }) {
  return (
    <Center bg={theme.colors.white}>
      <Box maxW="800px" w="full" pb={4}>
        <Table variant="striped">
          <TableCaption>Available File Extensions</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Info</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody color={theme.colors.gray[800]}>
            {extensions.map((extension, idx) => {
              return (
                <Tr key={idx}>
                  <Td>{extension.name}</Td>
                  <Td>{extension.info}</Td>
                  <Td>
                    <Button
                      bg="teal"
                      textColor="white"
                      _hover={{ bg: "teal.500" }}
                      primary
                    >
                      <Link
                        href={`/samplefiles/results/${extension.slug.toLowerCase()}`}
                        _hover={{}}
                      >
                        Size
                      </Link>
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Center>
  );
}
