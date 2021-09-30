import { Heading, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import useHeadingBPValue from "../../hooks/useHeadingBPValue";
import useTextBPValue from "../../hooks/useTextBPValue";
import SampleFileRequestForm from "./SampleFileRequestForm";

function SampleFileRequest() {
  const headingBPValue = useHeadingBPValue();
  const textBPValue = useTextBPValue();

  return (
    <VStack bg="gray.700">
      <Heading textColor="white" size="lg">
        Request File
      </Heading>
      <VStack spacing={0}>
        {[
          "Didn't find your desired file format?\n",
          "Enter the file extension below to request it.",
        ].map((text, idx) => {
          return (
            <Text key={idx} color="white" fontSize={textBPValue}>
              {text}
            </Text>
          );
        })}
      </VStack>
      <SampleFileRequestForm />
    </VStack>
  );
}

export default SampleFileRequest;
