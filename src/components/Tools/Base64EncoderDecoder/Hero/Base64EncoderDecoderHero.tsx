import React from "react";
import { useColorPalette } from "@/contexts/useColorPalette";
import { Box, Card, Heading, Tabs, Text, VStack } from "@chakra-ui/react";
import Base64TextTab from "./Base64TextTab";
import Base64ImageTab from "./Base64ImageTab";
import Base64FileTab from "./Base64FileTab";

const Base64EncoderDecoderHero: React.FC = () => {
  const { palette } = useColorPalette();

  return (
    <Box as="section">
      <VStack align="stretch" gap={6}>
        <VStack align="flex-start" gap={2}>
          <Heading as="h1" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold">
            Base64 Encoder & Decoder
          </Heading>
          <Text color="fg.muted">
            Encode or decode plain text, images, and files to Base64 — entirely in your browser.
          </Text>
        </VStack>

        <Card.Root variant="outline">
          <Card.Body p={{ base: 4, md: 6 }}>
            <Tabs.Root defaultValue="text" colorPalette={palette}>
              <Tabs.List mb={6}>
                <Tabs.Trigger value="text">Text</Tabs.Trigger>
                <Tabs.Trigger value="image">Image</Tabs.Trigger>
                <Tabs.Trigger value="file">File</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="text">
                <Base64TextTab />
              </Tabs.Content>
              <Tabs.Content value="image">
                <Base64ImageTab />
              </Tabs.Content>
              <Tabs.Content value="file">
                <Base64FileTab />
              </Tabs.Content>
            </Tabs.Root>
          </Card.Body>
        </Card.Root>
      </VStack>
    </Box>
  );
};

export default Base64EncoderDecoderHero;
