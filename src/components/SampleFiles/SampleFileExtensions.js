import { Button } from "@chakra-ui/button";
import { Box, Center } from "@chakra-ui/layout";
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
import { useRouter } from "next/router";
import React from "react";

export default function SampleFileExtensions({ extensions }) {
  const router = useRouter();
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
                      onClick={() => {
                        router.push({
                          pathname: "/samplefiles/results/[slug]",
                          query: { slug: extension.slug.toLowerCase() },
                        });
                      }}
                    >
                      Size
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
