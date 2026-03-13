import React from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import SampleFilesRequestForm from "./SampleFilesRequestForm";

type Props = {};

const SampleFilesRequestFile: React.FC<Props> = (props: Props) => {
  return (
    <Box as="section">
      <VStack gap={4} maxW="xl" align={"center"} mx="auto">
        <VStack gap={2} textAlign="center">
          <Heading as="h3" size={{ base: "2xl", md: "4xl" }}>
            {"Didn't find your desired file format?"}
          </Heading>
          <Text fontSize="lg" color="fg.muted">
            {"Enter the file extension below to request it."}
          </Text>
        </VStack>

        <SampleFilesRequestForm />
      </VStack>
    </Box>
  );
};

export default SampleFilesRequestFile;
