import { useBreakpointValue } from "@chakra-ui/media-query";
import React from "react";

function useTextBPValue() {
  return useBreakpointValue({
    base: "md",
    lg: "lg",
  });
}

export default useTextBPValue;
