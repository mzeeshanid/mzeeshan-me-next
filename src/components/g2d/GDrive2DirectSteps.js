import { Box } from "@chakra-ui/layout";
import { VStack, Center } from "@chakra-ui/layout";
import React from "react";
import gDrive2DirectSteps from "../../data/gDrive2DirectSteps";
import { Spacer, theme, useBreakpointValue } from "@chakra-ui/react";

import Image from "next/image";

function GDrive2DirectSteps() {
  const steps = gDrive2DirectSteps();
  const padding = useBreakpointValue({ base: 4, md: 6, lg: 8 });
  return (
    <Center>
      <VStack
        maxW={1200}
        spacing={4}
        pl={padding}
        pr={padding}
        bg={theme.colors.white}
      >
        {steps.map((step, idx) => {
          return (
            <VStack key={idx} s={2} justify="center" align="center">
              <Box maxW={600}>
                {step.text}
                {step.image && (
                  <Image
                    placeholder={"blur"}
                    src={step.image}
                    alt={`Step ${idx} to make shareable link`}
                  />
                )}
              </Box>
            </VStack>
          );
        })}
        <Spacer />
      </VStack>
    </Center>
  );
}

export default GDrive2DirectSteps;
