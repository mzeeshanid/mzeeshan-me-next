import { Button } from "@chakra-ui/button";
import { LightMode } from "@chakra-ui/color-mode";
import {
  Box,
  Center,
  Heading,
  Link,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/react";
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
import { fetchAPI } from "../../../lib/api";
import apiClient from "../../apis/client";
import API from "../../config/API";

export default function SampleFileVariant({ extension }) {
  const updateDownloads = async (id) => {
    apiClient
      .put(API.updateDownloads + `/${id}`)
      .then((response) => {
        // if (response.ok) {
        //   console.log("response received: ", response);
        // } else {
        //   console.log("not ok: ", response);
        // }
      })
      .catch((error) => {
        // console.log("error received: ", error);
      });
  };

  return (
    <LightMode>
      <Center bg={theme.colors.white}>
        <VStack>
          <VStack p={4} maxW="800px">
            <Heading color={theme.colors.black}>{extension.name}</Heading>
            <Text align="center" color={theme.colors.gray[500]}>
              {extension.details}
            </Text>
          </VStack>
          <Box maxW="800px" pb={4}>
            <Table variant="striped">
              <TableCaption>Available File Extensions</TableCaption>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Size</Th>
                  <Th isNumeric>Downloads</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody color={theme.colors.gray[800]}>
                {extension.variants.map((variant, idx) => {
                  return (
                    <Tr key={idx}>
                      <Td>{variant.name}</Td>
                      <Td>{variant.size}</Td>
                      <Td isNumeric>{variant.downloads}</Td>
                      <Td>
                        <Button
                          bg="teal"
                          textColor="white"
                          _hover={{ bg: "teal.500" }}
                          primary
                          onClick={() => {
                            console.log("on click");
                            updateDownloads(variant.id);
                          }}
                        >
                          <Link
                            href={variant.url}
                            isExternal={true}
                            _hover={{ textDecor: "none" }}
                          >
                            Download
                          </Link>
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </Center>
    </LightMode>
  );
}