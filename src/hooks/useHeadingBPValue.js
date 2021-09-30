import { useBreakpointValue } from "@chakra-ui/media-query";
import React from "react";

function useHeadingBPValue() {
  return useBreakpointValue({
    base: "xl",
    lg: "2xl",
  });
}

export default useHeadingBPValue;
