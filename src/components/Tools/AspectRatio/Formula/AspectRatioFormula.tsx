import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { aspectRatioFormulaData } from "@/data/tools/aspectRatio/aspectRatioFormulaData";
import {
  Blockquote,
  Box,
  Center,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

type Props = {};

const AspectRatioFormula: React.FC<Props> = (props: Props) => {
  const formulaData = aspectRatioFormulaData;

  return (
    <Box as="section">
      <VStack align={"start"} gap={4}>
        <SectionHeader
          tagline={formulaData.header.badge}
          headline={formulaData.header.title}
          description={formulaData.header.desc}
        />
        <Stack w="full" direction={{ base: "column", md: "row" }}>
          {formulaData.formulas.map((formula, idx) => (
            <Center key={idx} w="full" bg="bg.subtle" p={8} borderRadius="lg">
              <VStack>
                <Heading>{formula.heading}</Heading>
                <Text fontSize={{ base: "md", md: "lg" }}>{formula.text}</Text>
              </VStack>
            </Center>
          ))}
        </Stack>
        <Center w="full">
          <Blockquote.Root>
            <Blockquote.Content>{formulaData.blockquote}</Blockquote.Content>
          </Blockquote.Root>
        </Center>
      </VStack>
    </Box>
  );
};

export default AspectRatioFormula;
