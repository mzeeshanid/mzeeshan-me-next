import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/button";
import { Box, Flex, HStack, VStack } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { GrFormAdd, GrMore, GrTrash, GrUpdate } from "react-icons/gr";
import { IconButton } from "@chakra-ui/button";
import useSubcategories from "../../hooks/SampleFiles/useSubcategories";
import AppEmptyData from "../AppEmptyData";
import { Spinner } from "@chakra-ui/spinner";

const SampleFileResults = ({ categoryId, extension }) => {
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const shouldShowAdminOptions = useState(false);

  const { loading, results, hasMore, error } = useSubcategories(
    categoryId ?? "",
    extension ?? "",
    page
  );

  const loadMore = () => {
    if (hasMore) setPage(page + 1);
  };

  useEffect(() => {
    setPage(1);
  }, [categoryId, extension]);

  const shouldShowEmptyData = () => {
    return !loading && !error && results && results.length === 0;
  };
  return (
    <>
      {shouldShowEmptyData() ? (
        <AppEmptyData />
      ) : (
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="center"
        >
          <Flex
            w="100%"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>
                    <strong>Extension</strong>
                  </Th>
                  <Th>
                    <strong>Info</strong>
                  </Th>
                  <Th>
                    <strong>Action</strong>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {results.map((item, idx) => {
                  return (
                    <Tr key={idx}>
                      <Td>
                        <strong>{item.name}</strong>
                      </Td>
                      <Td>{item.info}</Td>
                      <Td>
                        {shouldShowAdminOptions === true ? (
                          <HStack>
                            <IconButton icon={<GrFormAdd />} />
                            <IconButton icon={<GrUpdate />} />
                            <IconButton icon={<GrTrash />} />
                            <IconButton
                              icon={<GrMore />}
                              onClick={() => {
                                setSelectedItem(item);
                                setShow(true);
                              }}
                            />
                          </HStack>
                        ) : (
                          <Button
                            bg="teal"
                            textColor="white"
                            _hover={{ bg: "teal.500" }}
                            primary
                            onClick={() => {
                              setSelectedItem(item);
                              setShow(true);
                            }}
                          >
                            Size
                          </Button>
                        )}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
            {loading ? (
              <Box p={8}>
                <Spinner />
              </Box>
            ) : null}
          </Flex>
          <Flex p={8} w="auto" alignItems="flex-start" justifyContent="center">
            <Box w="336px" h="280px" bg="red"></Box>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default SampleFileResults;
