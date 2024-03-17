import { LightMode } from "@chakra-ui/system";
import React, { useState } from "react";
import AppNavBar from "../../src/components/AppNavBar";
import myNavItems from "../../src/data/myNavItems";
import AppFooter from "../../src/components/AppFooter";
import stringMetricAppIcon from "../../public/assets/string_metric_app_icon.png";
import { FaFilter } from "react-icons/fa";
import {
  Center,
  Heading,
  Text,
  VStack,
  theme,
  Box,
  useBreakpointValue,
  SimpleGrid,
  GridItem,
  Icon,
  HStack,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverBody,
  Checkbox,
  CheckboxGroup,
  PopoverHeader,
  Link,
} from "@chakra-ui/react";
import Image from "next/image";
import AppForm from "../../src/components/AppForm";
import AppFormField from "../../src/components/AppFormField";
import AppFormButton from "../../src/components/AppFormButton";
import * as Yup from "yup";
import { MdCheckCircle } from "react-icons/md";
import {
  Damerau,
  JaroWinkler,
  Levenshtein,
  LongestCommonSubsequence,
  MetricLCS,
  NormalizedLevenshtein,
  OptimalStringAlignment,
  WeightedLevenshtein,
} from "string-metric";
import AppStats from "../../src/components/AppStats";
import { NextSeo } from "next-seo";

function index() {
  const paddingBPValue = useBreakpointValue({
    base: 2,
    md: 4,
  });

  const appIconImageBPValue = useBreakpointValue({
    base: 75,
    md: 90,
    lg: 120,
  });

  const simpleGridBPValue = useBreakpointValue({
    base: 1,
    md: 2,
    lg: 3,
  });

  const [isSelectedAll, setIsSelectedAll] = useState(true);
  const [canShowResults, setCanShowResults] = useState(false);
  const [algosInfo, setAlgosInfo] = useState([
    {
      name: "Jaro-Winkler",
      details:
        "The Jaro-Winkler distance is a string metric measuring similarity between two strings. It was developed by Matthew A. Jaro and William E. Winkler. The Jaro-Winkler distance measures the similarity between two strings by comparing the number of matching characters and the transpositions of characters. It is especially effective for comparing short strings, such as names, and is widely used in record linkage.",
      isSelected: true,
      link: "https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance",
    },
    {
      name: "Levenshtein",
      details:
        "The Levenshtein distance is a string metric for measuring the difference between two sequences. The Levenshtein distance between two strings is defined as the minimum number of single-character edits (insertions, deletions, or substitutions) required to change one string into the other. It is used in fields like computer science, bioinformatics, and linguistics for tasks such as spell checking and DNA sequence analysis.",
      isSelected: true,
      link: "https://en.wikipedia.org/wiki/Levenshtein_distance",
    },
    {
      name: "Normalized-Levenshtein",
      details:
        "Normalized Levenshtein distance is a variation of the Levenshtein distance where the result is normalized to a value between 0 and 1. This normalization is achieved by dividing the Levenshtein distance by the maximum length of the two strings. Normalized Levenshtein distance provides a measure of similarity that is independent of the length of the strings being compared.",
      isSelected: true,
      link: "https://ieeexplore.ieee.org/document/4160958",
    },
    {
      name: "Damerau",
      details:
        "The Damerau-Levenshtein distance is a string metric similar to the Levenshtein distance but also allows transpositions of adjacent characters. In addition to insertions, deletions, and substitutions, it includes the transposition of two adjacent characters as an elementary operation. This makes it particularly useful for spell-checking and DNA analysis.",
      isSelected: true,
      link: "https://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance",
    },
    {
      name: "Optimal-String-Alignment",
      details:
        "The Optimal String Alignment distance is a variant of the Damerau-Levenshtein distance that considers transpositions of adjacent characters as one operation. It measures the minimum number of edit operations (insertions, deletions, substitutions, or transpositions) required to transform one string into another. This metric is particularly useful for applications where transpositions are common, such as OCR (optical character recognition) and DNA sequence analysis.",
      isSelected: true,
      link: "https://search.r-project.org/CRAN/refmans/comparator/html/OSA.html",
    },
    {
      name: "Longest-Common-Subsequence",
      details:
        "The Longest Common Subsequence (LCS) algorithm is a dynamic programming approach used to find the longest subsequence common to two sequences. A subsequence is a sequence that appears in the same relative order but not necessarily contiguous. The LCS algorithm finds the longest sequence of elements that are common to both sequences, allowing for gaps between elements.",
      isSelected: true,
      link: "https://en.wikipedia.org/wiki/Longest_common_subsequence",
    },
    {
      name: "Metric-Longest-Common-Subsequence",
      details:
        "The Metric Longest Common Subsequence algorithm extends the Longest Common Subsequence problem by assigning weights or costs to the operations of inserting, deleting, or substituting characters. By incorporating these costs, the algorithm can find the longest common subsequence that minimizes the total cost of transforming one sequence into another. This variant is particularly useful in applications where different edit operations have different costs or weights.",
      isSelected: true,
      link: "",
    },
  ]);

  const validationSchema = Yup.object().shape({
    source: Yup.string().required("Enter source text to compare"),
    target: Yup.string().required("Enter target text to compare"),
  });

  const stats = [
    {
      title: "Registration",
      detail: "No Registration",
    },
    {
      title: "Logging",
      detail: "No Logging",
    },
    {
      title: "Algorithms",
      detail: `${algosInfo.length - 1}+`,
    },
  ];

  const calculate = (source, target) => {
    setAlgosInfo(
      algosInfo.map((item, idx) => {
        if (item.name === "Jaro-Winkler") {
          const instance = new JaroWinkler();
          const similarity = instance.similarity(source, target) * 100.0;

          return {
            ...item,
            similarity: `${parseFloat(similarity.toFixed(2))}%`,
          };
        } else if (item.name === "Levenshtein") {
          const instance = new Levenshtein();
          const distance = instance.distance(source, target);

          return {
            ...item,
            distance: `${distance}`,
          };
        } else if (item.name === "Normalized-Levenshtein") {
          const instance = new NormalizedLevenshtein();
          const distance = instance.distance(source, target);

          return {
            ...item,
            distance: `${distance}`,
          };
        } else if (item.name === "Weighted-Levenshtein") {
          const instance = new WeightedLevenshtein();
          const distance = instance.distance(source, target);

          return {
            ...item,
            distance: `${distance}`,
          };
        } else if (item.name === "Damerau") {
          const instance = new Damerau();
          const distance = instance.distance(source, target);

          return {
            ...item,
            distance: `${distance}`,
          };
        } else if (item.name === "Optimal-String-Alignment") {
          const instance = new OptimalStringAlignment();
          const distance = instance.distance(source, target);

          return {
            ...item,
            distance: `${distance}`,
          };
        } else if (item.name === "Longest-Common-Subsequence") {
          const instance = new LongestCommonSubsequence();
          const distance = instance.distance(source, target);

          return {
            ...item,
            distance: `${distance}`,
          };
        } else if (item.name === "Metric-Longest-Common-Subsequence") {
          const instance = new MetricLCS();
          const distance = instance.distance(source, target);

          return {
            ...item,
            distance: `${distance}`,
          };
        }
        return info;
      })
    );
  };

  const seoTitle =
    "String Metrics - Jaro-Winkler|Levenshtein|Damerau and 4 more.";
  const seoDetail =
    "Explore various string distance algorithms including Jaro-Winkler, Levenshtein, Damerau-Levenshtein, Optimal String Alignment, Longest Common Subsequence, Normalized Levenshtein, and Metric Longest Common Subsequence.";
  return (
    <LightMode>
      <NextSeo
        title={seoTitle}
        description={seoDetail}
        openGraph={{
          title: seoTitle,
          description: seoDetail,
          url: "https://www.mzeeshan.me/string-metrics",
          images: [
            {
              url: "https://www.mzeeshan.me/assets/string_metric_app_icon.png",
              width: 300,
              height: 300,
              alt: "String Metrics Web App Icon",
              type: "image/png",
            },
          ],
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            property: "keywords",
            content:
              "string metrics, string distance, string comparision, string comparsion algorithms, string distance algorithms, Text similarity metrics, Text analysis algorithms, String similarity measurement, String edit operations, Text comparison",
          },
        ]}
      />
      <AppNavBar navItems={myNavItems()} />
      <Center bg={theme.colors.orange}>
        <Box maxW={1200}>
          <VStack p={paddingBPValue}>
            <Image
              src={stringMetricAppIcon}
              placeholder={"blur"}
              alt="String Metrics App Icon"
              width={appIconImageBPValue}
              height={appIconImageBPValue}
            />
            <VStack>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color={theme.colors.gray[500]}
                as={"b"}
                textAlign="center"
              >
                String Metrics
              </Text>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color={theme.colors.gray[500]}
                textAlign="center"
              >
                Calculate It!
              </Text>
            </VStack>
            <VStack>
              <Heading textAlign="center">
                String Similarity and Distance
              </Heading>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                as={"h2"}
                textAlign="center"
              >
                This tool allows you to calculate distance and similarity
                between strings based on different algorithms
              </Text>
            </VStack>
          </VStack>
          <VStack p={paddingBPValue}>
            <AppForm
              initialValues={{ source: "Elon Musk", target: "Colon Musk" }}
              onSubmit={(values) => {
                calculate(values["source"], values["target"]);
                setCanShowResults(true);
              }}
              validationSchema={validationSchema}
            >
              <Text as="b" fontSize={{ base: "md", md: "lg" }}>
                {"Source".toUpperCase()}
              </Text>
              <AppFormField
                placeholder="Enter text to compare"
                name={"source"}
                textColor={theme.colors.black}
              />
              <Text as="b" fontSize={{ base: "md", md: "lg" }}>
                {"Target".toUpperCase()}
              </Text>
              <AppFormField
                placeholder="Enter text to compare"
                name={"target"}
                textColor={theme.colors.black}
              />
              <Box p={1} />
              <AppFormButton title="Compare" />
            </AppForm>
          </VStack>
          {canShowResults && (
            <VStack>
              <Flex
                w="full"
                alignItems={"center"}
                justifyContent={"flex-end"}
                p={4}
              >
                <Popover>
                  <PopoverTrigger>
                    <IconButton
                      position={"absolute"}
                      icon={<Icon as={FaFilter} />}
                    ></IconButton>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverCloseButton />
                    <PopoverHeader>
                      <VStack align={"flex-start"}>
                        <Checkbox
                          size={"md"}
                          colorScheme="teal"
                          isChecked={isSelectedAll}
                          onChange={(e) => {
                            setIsSelectedAll(e.target.checked);
                            setAlgosInfo(
                              algosInfo.map((item, idx) => {
                                return {
                                  ...item,
                                  isSelected: e.target.checked,
                                };
                              })
                            );
                          }}
                        >
                          Select All
                        </Checkbox>
                      </VStack>
                    </PopoverHeader>
                    <PopoverBody>
                      <VStack align={"flex-start"}>
                        <CheckboxGroup>
                          {algosInfo.map((item, index) => {
                            return (
                              <Checkbox
                                onChange={(e) => {
                                  const info = algosInfo.map((item, idx) => {
                                    if (idx === index) {
                                      return {
                                        ...item,
                                        isSelected: e.target.checked,
                                      };
                                    }
                                    return item;
                                  });
                                  setAlgosInfo(info);
                                  setIsSelectedAll(
                                    !info.filter((item) => {
                                      return item.isSelected == false;
                                    }).length > 0
                                  );
                                }}
                                size={"md"}
                                colorScheme={"teal"}
                                key={index}
                                isChecked={item.isSelected}
                              >
                                {item.name}
                              </Checkbox>
                            );
                          })}
                        </CheckboxGroup>
                      </VStack>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
                <Box w={"full"}>
                  <Center>
                    <Heading textAlign="center">Results</Heading>
                  </Center>
                </Box>
              </Flex>
              <TableContainer>
                <Table variant="simple">
                  <TableCaption>
                    String metrics based on similarity and distance
                  </TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Algorithm</Th>
                      <Th isNumeric>Similarity</Th>
                      <Th isNumeric>Distance</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {algosInfo
                      .filter((item) => {
                        return item.isSelected;
                      })
                      .map((item, idx) => {
                        return (
                          <Tr key={idx}>
                            <Td>{item.name}</Td>
                            <Td isNumeric>{item.similarity}</Td>
                            <Td isNumeric>
                              {item.distance != undefined
                                ? parseFloat(item.distance)
                                    .toFixed(2)
                                    .replace(/[.,]00$/, "")
                                : ""}
                            </Td>
                          </Tr>
                        );
                      })}
                  </Tbody>
                </Table>
              </TableContainer>
            </VStack>
          )}
          <VStack p={paddingBPValue}>
            <Heading textAlign="center">Supported Algorithms</Heading>
            <SimpleGrid columns={simpleGridBPValue} spacing={2}>
              {algosInfo.map((item, idx) => (
                <GridItem key={idx}>
                  <HStack>
                    <Icon as={MdCheckCircle} color="teal"></Icon>
                    <Text fontSize={{ base: "md", md: "lg" }}>{item.name}</Text>
                  </HStack>
                </GridItem>
              ))}
            </SimpleGrid>
          </VStack>
        </Box>
      </Center>
      <AppStats stats={stats}></AppStats>
      <Center display={"flex"} flexDirection={"column"} spacing={4}>
        {algosInfo.map((item, idx) => {
          return (
            <VStack maxW={1200} key={idx} p={4}>
              <Link href={item.link} isExternal={true}>
                <Heading textAlign="center">{item.name}</Heading>
              </Link>
              <Text textAlign={"center"} fontSize={{ base: "md", md: "lg" }}>
                {item.details}
              </Text>
            </VStack>
          );
        })}
      </Center>
      <Center p={4}>
        <HStack>
          <Text as="b">Note:</Text>
          <Text>String metric is based on</Text>
          <Text as="b">
            {" "}
            <Link
              isExternal
              color="teal.500"
              href={"https://www.npmjs.com/package/string-metric"}
            >
              this project
            </Link>
          </Text>
        </HStack>
      </Center>
      <AppFooter />
    </LightMode>
  );
}

export default index;
