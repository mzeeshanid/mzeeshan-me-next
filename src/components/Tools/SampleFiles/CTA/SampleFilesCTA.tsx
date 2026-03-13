import React from "react";
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useColorPalette } from "@/contexts/useColorPalette";

type Props = {};

const SampleFilesCTA: React.FC<Props> = (props: Props) => {
  const { palette } = useColorPalette();

  const handleExplore = () => {
    // Scroll to hero section
    const heroElement = document.querySelector("[data-sample-files-hero]");
    heroElement?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box as="section">
      <Box borderRadius="lg" p={{ base: 6, md: 12 }} textAlign="center">
        <VStack gap={4}>
          <Heading as="h2" size={{ base: "2xl", md: "4xl" }}>
            {"Trusted by developers from all over the world"}
          </Heading>
          <Text fontSize="lg" color="fg.muted" maxW="2xl">
            {
              "Free, safe and easy way to download sample files for testing and other purposes."
            }
          </Text>
          <Button colorPalette={palette} onClick={handleExplore} mt={2}>
            {"Explore Now"}
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default SampleFilesCTA;
