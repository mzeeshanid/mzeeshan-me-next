import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Box, Heading, Text, VStack } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import React, { useRef, useState } from "react";
import useSearchSuggestions from "../../hooks/SampleFiles/useSearchSuggestions";
import { useRouter } from "next/router";
import theme from "@chakra-ui/theme";

function SampleFilesHero() {
  const router = useRouter();
  const headingBPValue = useBreakpointValue({
    base: "2xl",
    lg: "4xl",
  });

  const textBPValue = useBreakpointValue({
    base: "lg",
    md: "xl",
    lg: "2xl",
  });

  const inputField = useRef();

  const [fieldFocused, setFieldFocused] = useState(false);

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
  const handleUserQuery = (query) => {
    router.push(`/samplefiles/results/${query.toLowerCase()}`);
  };

  return (
    <Box w="100%" h={"calc(100vh - 80px)"} pos="relative">
      <Image
        w="100%"
        h="100%"
        pos="absolute"
        top={0}
        objectFit="cover"
        objectPosition="bottom"
        w="100%"
        h="100%"
        src="/assets/mzeeshan_me_hero.jpeg"
        alt="Hero Image"
        placeholder={"blur"}
      />
      <VStack
        bg="blackAlpha.700"
        pos="absolute"
        w="100%"
        h="100%"
        p={4}
        top={0}
        spacing={2}
        justify="center"
      >
        <Heading textColor="white" size={headingBPValue} textAlign="center">
          Looking for sample files?
        </Heading>
        <Text fontSize={textBPValue} textColor="white" textAlign="center">
          To download, enter the extension name in the field below.
        </Text>
        <Box maxW="280px" p={2}>
          <Input
            textColor={theme.colors.black}
            onFocus={() => setFieldFocused(true)}
            onBlur={() => setFieldFocused(false)}
            onChange={onChangeText}
            value={keyword}
            ref={inputField}
            bg="white"
            placeholder="Enter the file extension"
            size="lg"
          />
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
                  {results.map((item, idx) => {
                    return (
                      <Box
                        key={idx}
                        w={"100%"}
                        cursor={"pointer"}
                        _hover={{ background: "gray.200" }}
                        pt={2}
                        pb={2}
                        pl={4}
                        pr={4}
                        onMouseDown={() => onSuggestionSelect(item.name)}
                      >
                        <Text color={theme.colors.black} w="100%">
                          {item.name}
                        </Text>
                      </Box>
                    );
                  })}
                </VStack>
              </Box>
            </Box>
          )}
        </Box>
        {/* <Button
          colorScheme="teal"
          size="lg"
          onClick={() => {
            handleUserQuery(keyword);
          }}
        >
          Search
        </Button> */}
      </VStack>
    </Box>
  );
}

export default SampleFilesHero;
