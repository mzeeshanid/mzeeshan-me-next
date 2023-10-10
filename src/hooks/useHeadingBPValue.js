import { useBreakpointValue } from "@chakra-ui/media-query";

function useHeadingBPValue() {
  return useBreakpointValue({
    base: "xl",
    lg: "2xl",
  });
}

export default useHeadingBPValue;
