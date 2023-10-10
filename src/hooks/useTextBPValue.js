import { useBreakpointValue } from "@chakra-ui/media-query";

function useTextBPValue() {
  return useBreakpointValue({
    base: "md",
    lg: "lg",
  });
}

export default useTextBPValue;
