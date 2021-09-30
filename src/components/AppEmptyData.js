import { Heading, VStack } from "@chakra-ui/layout";
import React from "react";

function AppEmptyData({ title = "No Results Found", detail }) {
  return (
    <VStack>
      <Heading>{title}</Heading>
      {detail && <Text>{detail}</Text>}
    </VStack>
  );
}

export default AppEmptyData;
