import { useColorPalette } from "@/contexts/useColorPalette";
import myPricingData from "@/data/home/myPricingData";
import {
  Box,
  Button,
  GridItem,
  Heading,
  HStack,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FiCheckCircle } from "react-icons/fi";

type MyPricingProps = {};

const MyPricing: React.FC<MyPricingProps> = (props: MyPricingProps) => {
  const { palette } = useColorPalette();
  const {
    tagline,
    highlitedTitle,
    normalTitle,
    detail,
    featureTitle,
    features,
  } = myPricingData();

  return (
    <SimpleGrid gap={{ base: 4, md: 8 }} columns={{ base: 1, md: 2 }}>
      <GridItem flex={0.5} pt={4} pb={4}>
        <Stack gap={{ base: 2, md: 4 }} align={"flex-start"}>
          <Text
            textStyle={{ base: "sm", md: "md" }}
            fontWeight="medium"
            color={`${palette}.solid`}
          >
            {tagline}
          </Text>
          <Text>
            <Heading
              as="span"
              textStyle={{ base: "3xl", md: "5xl" }}
              color={`${palette}.fg`}
              fontWeight={"extrabold"}
            >
              {highlitedTitle}
            </Heading>
            <Heading as="span" textStyle={{ base: "lg", md: "xl" }}>
              {normalTitle}
            </Heading>
          </Text>
          <Text
            color="fg.muted"
            textStyle={{ base: "md", md: "lg" }}
            maxW="3xl"
          >
            {detail}
          </Text>
        </Stack>
      </GridItem>
      <GridItem flex={0.5}>
        <Box
          w={"full"}
          h={"full"}
          bg={`bg.muted`}
          rounded={{ base: "xl", md: "2xl" }}
          p={8}
        >
          <Stack>
            <Text
              as="h3"
              color={`${palette}.fg`}
              textStyle={{ base: "xl", md: "2xl" }}
              fontWeight={"bold"}
            >
              {featureTitle}
            </Text>
            <Box as="ul">
              {features.map((feature, idx) => (
                <Box as="li" key={idx} mb={2}>
                  <HStack>
                    <Icon as={FiCheckCircle} color={"fg.muted"} />
                    <Text color="fg.muted" textStyle={{ base: "md", md: "lg" }}>
                      {feature}
                    </Text>
                  </HStack>
                </Box>
              ))}
            </Box>
            <Link href="/contact" w="full">
              <Button
                colorPalette={palette}
                variant={"solid"}
                size={"lg"}
                w="full"
              >
                {"Contact Me"}
              </Button>
            </Link>
          </Stack>
        </Box>
      </GridItem>
    </SimpleGrid>
  );
};

export default MyPricing;
