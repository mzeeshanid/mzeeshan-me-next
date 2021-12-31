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
            {extensions.map((item, idx) => {
              const extension = item.attributes;
              return (
                <Tr key={idx}>
                  <Td>{extension.name}</Td>
                  <Td>{extension.info}</Td>
                  <Td>
                    <Link
                      href={`/samplefiles/results/${extension.slug.toLowerCase()}`}
                      _hover={{}}
                    >
                      <Button
                        bg="teal"
                        textColor="white"
                        _hover={{ bg: "teal.500" }}
                        primary
                      >
                        Size
                      </Button>
                    </Link>
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
