import { useColorPalette } from "@/contexts/useColorPalette";
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

type Props = {};

const MyToolsCTA: React.FC<Props> = (props: Props) => {
  const { palette } = useColorPalette();

  const handleExplore = () => {
    // Scroll to tools listing
    const listingElement = document.querySelector("[data-tools-listing]");
    listingElement?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box as="section">
      <Box
        bg={`bg.subtle`}
        borderRadius="lg"
        p={{ base: 6, md: 12 }}
        textAlign="center"
      >
        <VStack gap={4}>
          <Heading as="h2" size="2xl">
            {"Ready to Simplify Your Workflow?"}
          </Heading>
          <Text fontSize="lg" color="fg.muted" maxW="2xl">
            {
              "Start using our free tools today and boost your productivity. No registration needed - just pick a tool and get started instantly."
            }
          </Text>
          <Button colorPalette={palette} size="lg" onClick={handleExplore}>
            {"Explore All Tools"}
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default MyToolsCTA;
