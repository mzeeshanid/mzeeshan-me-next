import React from "react";
import {
  chakra,
  Box,
  Flex,
  Link,
  Text,
  Stack,
  SimpleGrid,
  Icon,
  Button,
  theme,
} from "@chakra-ui/react";

export default function AppClone({ cloneData }) {
  const topBg = theme.colors.gray[100];
  const bottomBg = theme.colors.white;
  const Feature = (props) => {
    return (
      <Flex align="center">
        <Flex shrink={0}>
          <Icon
            boxSize={5}
            mt={1}
            mr={2}
            color={theme.colors.teal[600]}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </Icon>
        </Flex>
        <Box ml={4}>
          <chakra.span mt={2} color={theme.colors.gray[500]}>
            {props.children}
          </chakra.span>
        </Box>
      </Flex>
    );
  };
  return (
    <Flex
      boxSize="full"
      bg={theme.colors.gray[50]}
      p={10}
      alignItems="center"
      justifyContent="center"
    >
      <Box
        mx="auto"
        textAlign={{ base: "left", md: "center" }}
        rounded="md"
        shadow="base"
        w="full"
        bg={bottomBg}
      >
        <Box pt={20} rounded="md" bg={topBg}>
          <Box w="full" px={[10, , 4]} mx="auto">
            <Text
              mb={2}
              fontSize="5xl"
              fontWeight="bold"
              lineHeight="tight"
              bgGradient="linear(to-r, teal.300, teal.800)"
              bgClip="text"
            >
              {cloneData.heading}
            </Text>
            <chakra.p
              mb={6}
              fontSize={["lg", , "xl"]}
              color={theme.colors.gray[600]}
            >
              {cloneData.subheading}
            </chakra.p>
          </Box>
          <Box bgGradient={`linear(to-b, ${topBg} 50%, ${bottomBg} 50%)`}>
            <Flex
              rounded="md"
              mx={10}
              bg={bottomBg}
              shadow="xl"
              mb="100px"
              textAlign="left"
              direction={{ base: "column", lg: "row" }}
            >
              <Stack spacing={8} p="45px" flex="0.7">
                <Text
                  fontSize="3xl"
                  fontWeight="bold"
                  lineHeight="tight"
                  color={theme.colors.teal[600]}
                >
                  {cloneData.title}
                </Text>
                <chakra.p
                  fontSize={["sm", , "md"]}
                  color={theme.colors.gray[600]}
                >
                  {cloneData.subtitle}
                </chakra.p>
                <Flex align="center">
                  <Text
                    fontFamily="body"
                    whiteSpace="nowrap"
                    fontWeight="semibold"
                    textTransform="uppercase"
                    color={theme.colors.teal[600]}
                  >
                    What's included
                  </Text>
                  <Flex
                    ml="15px"
                    w="full"
                    borderTopWidth="1px"
                    h="3px"
                    borderTopColor={topBg}
                  />
                </Flex>
                <SimpleGrid columns={[1, , 2, 1, 2]} spacingY={4}>
                  {cloneData.features.map((feature, idx) => {
                    return <Feature key={idx}>{feature}</Feature>;
                  })}
                </SimpleGrid>
              </Stack>
              <Stack
                p="45px"
                flex="0.3"
                justify="center"
                align="center"
                bg={theme.colors.gray[50]}
                borderRightRadius="md"
              >
                <Text
                  color={theme.colors.black}
                  fontSize="xl"
                  fontWeight="semibold"
                >
                  {cloneData.tagLine}
                </Text>
                <Flex
                  align="center"
                  fontSize="5xl"
                  fontWeight={["bold", , "extrabold"]}
                  lineHeight="tight"
                  color={theme.colors.teal[700]}
                >
                  {cloneData.price}
                  <chakra.span
                    ml={2}
                    fontSize="2xl"
                    fontWeight="medium"
                    color={theme.colors.gray[500]}
                  >
                    {" "}
                    {cloneData.currency}
                  </chakra.span>
                </Flex>
                <Stack spacing={6}>
                  <Link
                    color={theme.colors.gray[600]}
                    href={cloneData.appstoreurl}
                    textDecor="underline"
                  >
                    {cloneData.appstorelinkText}
                  </Link>
                  <Link href={"mailto:mzeeshanid@yahoo.com"}>
                    <Button w="300px" colorScheme="teal" py={6}>
                      Contact
                    </Button>
                  </Link>
                  <Text
                    align="center"
                    fontWeight="semibold"
                    color={theme.colors.black}
                  >
                    {cloneData.projectSize}
                  </Text>
                </Stack>
              </Stack>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
