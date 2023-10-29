import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const chakraTheme = extendTheme({ config });

export default chakraTheme;
