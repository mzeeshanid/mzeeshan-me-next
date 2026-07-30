import { ExtensionFactData } from "@/data/tools/sampleFiles/sampleFilesExtensionDetails";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { useColorPalette } from "@/contexts/useColorPalette";
import { Box, Container, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { LuLightbulb } from "react-icons/lu";

interface Props {
  data: ExtensionFactData;
}

const ExtensionFact: React.FC<Props> = ({ data }) => {
  const { palette } = useColorPalette();

  return (
    <Box as="section">
      <Container maxW={"3xl"}>
        <SectionHeader
          tagline={"Observations"}
          headline={"Facts"}
          textAlign={"center"}
        />
        <Spacer p={4} />
        <Box
          borderRadius="2xl"
          borderWidth="1px"
          borderColor={`${palette}.subtle`}
          bg={`${palette}.subtle`}
          p={5}
        >
          <HStack align="flex-start" gap={3}>
            <Box
              flexShrink={0}
              borderRadius="lg"
              bg={`${palette}.emphasized`}
              color={`${palette}.fg`}
              p={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <LuLightbulb size={18} />
            </Box>
            <VStack align="flex-start" gap={1}>
              <Text
                fontSize="xs"
                fontWeight="semibold"
                color={`${palette}.fg`}
                textTransform="uppercase"
                letterSpacing="wider"
              >
                {data.title}
              </Text>
              <Text color="fg.muted">{data.info}</Text>
            </VStack>
          </HStack>
        </Box>
      </Container>
    </Box>
  );
};

export default ExtensionFact;
