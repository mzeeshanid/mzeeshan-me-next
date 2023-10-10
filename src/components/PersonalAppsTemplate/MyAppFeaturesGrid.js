import {
  Box,
  Circle,
  Flex,
  Stack,
  chakra,
  theme,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

export default function MyAppFeaturesGrid({ features }) {
  const Feature = (props) => {
    return (
      <Flex>
        <Flex shrink={0}>
          <Flex
            alignItems="center"
            justifyContent="center"
            h={12}
            w={12}
            rounded="md"
            bg={useColorModeValue("brand.500")}
            color="white"
          >
            <Circle size="60px" p={4} bg={theme.colors.teal[600]}>
              {props.icon}
            </Circle>
          </Flex>
        </Flex>
        <Box ml={4}>
          <chakra.dt
            fontSize="lg"
            fontWeight="medium"
            lineHeight="6"
            color={useColorModeValue("gray.900")}
          >
            {props.title}
          </chakra.dt>
          <chakra.dd mt={2} color={useColorModeValue("gray.500", "gray.400")}>
            {props.children}
          </chakra.dd>
        </Box>
      </Flex>
    );
  };
  return (
    <Flex
      bg={theme.colors.gray[50]}
      p={20}
      w="auto"
      justifyContent="center"
      alignItems="center"
    >
      <Box py={12} bg={theme.colors.white} rounded="xl">
        <Box maxW="7xl" mx="auto" px={{ base: 4, lg: 8 }}>
          <Box textAlign={{ lg: "center" }}>
            <chakra.h2
              color={theme.colors.teal[800]}
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              MZFileManager
            </chakra.h2>
            <chakra.p
              mt={2}
              fontSize={{ base: "3xl", sm: "4xl" }}
              lineHeight="8"
              fontWeight="extrabold"
              letterSpacing="tight"
              color={theme.colors.gray[900]}
            >
              {features.title}
            </chakra.p>
            <chakra.p
              mt={4}
              maxW="2xl"
              fontSize="xl"
              mx={{ lg: "auto" }}
              color={theme.colors.gray[500]}
            >
              {features.subtitle}
            </chakra.p>
          </Box>

          <Box mt={10}>
            <Stack
              spacing={{ base: 10, md: 0 }}
              display={{ md: "grid" }}
              gridTemplateColumns={{ md: "repeat(2,1fr)" }}
              gridColumnGap={{ md: 8 }}
              gridRowGap={{ md: 10 }}
            >
              {features.data.map((data, idx) => {
                return (
                  <Feature key={idx} title={data.title} icon={data.icon}>
                    {data.bullets}
                  </Feature>
                );
              })}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
