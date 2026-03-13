import { ChakraProvider } from "@chakra-ui/react";

import system from "./chakraTheme";
import { ColorModeProvider } from "../src/components/ui/color-mode";
import { ReactElement } from "react";

type ProviderProps = {
  children: ReactElement | ReactElement[];
};

export function Provider(props: ProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
