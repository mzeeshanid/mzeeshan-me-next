import { SearchIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { useBreakpointValue } from "@chakra-ui/media-query";
import {
  Box,
  Heading,
  InputGroup,
  InputLeftElement,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
  theme,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import sampleFilesAppIcon from "../../../public/assets/mzfilemanage_appicon.png";
import useSearchSuggestions from "../../hooks/SampleFiles/useSearchSuggestions";

function SampleFilesHero() {
  const router = useRouter();
  const headingBPValue = useBreakpointValue({
    base: "xl",
    lg: "2xl",
  });

  const textBPValue = useBreakpointValue({
    base: "lg",
    lg: "xl",
  });

  const inputField = useRef();

  const [fieldFocused, setFieldFocused] = useState(false);
  const [isPushingRouter, setIsPushingRouter] = useState(false);

  const [keyword, setKeyword] = useState("");

  const { loading, error, results } = useSearchSuggestions(keyword);

  const onChangeText = (e) => {
    setKeyword(e.target.value);
  };

  const onSuggestionSelect = (suggestion) => {
    inputField.current.blur();
    setKeyword(suggestion);
    handleUserQuery(suggestion);
  };
  const handleUserQuery = async (query) => {
    setIsPushingRouter(true);
    await router.push(`/samplefiles/results/${query.toLowerCase()}`);
    setIsPushingRouter(false);
  };

  const paddingBPValue = useBreakpointValue({
    base: 2,
    md: 4,
    lg: 8,
  });

  const spacingBPValue = useBreakpointValue({
    base: 1,
    md: 2,
    lg: 4,
  });

  const appIconImageBPValue = useBreakpointValue({
    base: 75,
    md: 90,
    lg: 120,
  });

  return (
    <Box py={paddingBPValue} bg={theme.colors.gray[50]}>
      <VStack spacing={spacingBPValue}>
        <Image
          src={sampleFilesAppIcon}
          alt="Sample files app icon image"
          width={appIconImageBPValue}
          height={appIconImageBPValue}
        />
        <Text
          color={theme.colors.gray[500]}
          as={"b"}
          fontSize={textBPValue}
          textAlign="center"
        >
          SAMPLE FILES
        </Text>
        <Heading size={headingBPValue} textAlign="center">
          Looking for sample files?
        </Heading>
        <Text as={"h2"} fontSize={textBPValue} textAlign="center">
          To download, enter the extension name in the field below.
        </Text>
        <Box maxW="280px">
          <VStack spacing={4}>
            <InputGroup>
              <InputLeftElement pointerEvents={"none"} h={"100%"}>
                <SearchIcon color={theme.colors.gray[500]} />
              </InputLeftElement>
              <Input
                bg={theme.colors.gray[200]}
                textColor={theme.colors.black}
                onFocus={() => setFieldFocused(true)}
                onBlur={() => setFieldFocused(false)}
                onChange={onChangeText}
                value={keyword}
                ref={inputField}
                placeholder="Enter the file extension"
                size="lg"
              />
            </InputGroup>
            {isPushingRouter && <Spinner size={"lg"} />}
          </VStack>
          {fieldFocused && results && results.length > 0 && (
            <Box position={"relative"} top={2}>
              <Box w="100%" position={"absolute"} zIndex={2}>
                <VStack
                  w={"100%"}
                  bg={"white"}
                  spacing={0}
                  pt={2}
                  pb={2}
                  borderRadius="lg"
                  overflow="hidden"
                  shadow="md"
                >
                  <TableContainer width={"100%"}>
                    <Table colorScheme={"gray"}>
                      <Tbody>
                        {results.map((res, idx) => {
                          const item = res.attributes;
                          return (
                            <Tr
                              cursor={"pointer"}
                              _hover={{ background: "gray.200" }}
                            >
                              <Td
                                onMouseDown={() =>
                                  onSuggestionSelect(item.name)
                                }
                              >
                                <Text color={theme.colors.black} w="100%">
                                  {item.name}
                                </Text>
                              </Td>
                            </Tr>
                          );
                        })}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </VStack>
              </Box>
            </Box>
          )}
        </Box>
      </VStack>
    </Box>
  );
}

export default SampleFilesHero;
