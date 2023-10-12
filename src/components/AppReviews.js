import {
  Avatar,
  Box,
  Card,
  CardBody,
  Center,
  Circle,
  Divider,
  HStack,
  Text,
  VStack,
  Wrap,
  WrapItem,
  theme,
  useBreakpointValue,
} from "@chakra-ui/react";

import React from "react";

import { StarIcon } from "@chakra-ui/icons";
import AppHeadingText from "./AppHeadingText";
import myTestimonials from "../data/myTestimonials";

function AppReviews() {
  const testimonials = myTestimonials();
  const textBPValue = useBreakpointValue({
    base: "lg",
    md: "xl",
  });

  return (
    <Box>
      <VStack>
        <AppHeadingText
          heading={"My Testimonials"}
          text={"Feedback given by clients over the time"}
          bg="white"
        />
      </VStack>
      <Box p={4} />
      <Wrap justify={"center"}>
        {testimonials.map((value, idx) => {
          return (
            <WrapItem key={idx}>
              <Card p={2}>
                <CardBody>
                  <Box maxW={420}>
                    <VStack align={"flex-start"} spacing={4}>
                      <Box display="flex" mt="1" alignItems="center">
                        {Array(5)
                          .fill("")
                          .map((_, i) => (
                            <StarIcon
                              key={i}
                              color={i < value.rating ? "teal.500" : "gray.300"}
                            />
                          ))}
                      </Box>
                      <Box>
                        <Text fontSize={textBPValue}>{value.text}</Text>
                      </Box>
                      <HStack spacing={4}>
                        <Circle overflow="hidden">
                          <Avatar name={value.name} />
                        </Circle>
                        <VStack spacing={0} align={"flex-start"}>
                          <Text as={"b"} fontSize={"sm"} textAlign="center">
                            {value.name}
                          </Text>
                          <Text
                            fontSize={"sm"}
                            textAlign="center"
                            color={theme.colors.gray[500]}
                          >
                            Client
                          </Text>
                        </VStack>
                        <Center height="50px">
                          <Divider orientation="vertical" />
                        </Center>
                        {value.icon}
                      </HStack>
                    </VStack>
                  </Box>
                </CardBody>
              </Card>
            </WrapItem>
          );
        })}
      </Wrap>
    </Box>
  );
}

export default AppReviews;
