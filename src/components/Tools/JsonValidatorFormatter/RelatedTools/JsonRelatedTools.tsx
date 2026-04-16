import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { useColorPalette } from "@/contexts/useColorPalette";
import {
  JsonConverterTabId,
  jsonRelatedToolsData,
} from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import {
  Box,
  GridItem,
  Icon,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

type Props = {
  /** The id of the tool currently being viewed — it will be excluded from the list. */
  currentToolId: JsonConverterTabId;
};

/**
 * Displays cards for all JSON tools except the one currently open.
 * Each card links to its standalone page.
 */
const JsonRelatedTools: React.FC<Props> = ({ currentToolId }) => {
  const { palette } = useColorPalette();
  const tools = jsonRelatedToolsData.filter((t) => t.id !== currentToolId);

  return (
    <Box as="section">
      <SectionHeader
        tagline="Related Tools"
        headline="More JSON tools"
        description="All tools run entirely in your browser — no uploads, no sign-up required."
      />
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={4} mt={6}>
        {tools.map((tool) => (
          <GridItem key={tool.id}>
            <Link asChild _hover={{ textDecoration: "none" }}>
              <NextLink href={tool.path}>
                <Box
                  borderWidth="1px"
                  borderRadius="xl"
                  p={5}
                  h="full"
                  _hover={{ borderColor: `${palette}.emphasized`, bg: "bg.subtle" }}
                  transition="border-color 0.15s, background 0.15s"
                >
                  <VStack align="start" gap={3}>
                    <Text fontWeight="bold" fontSize="sm">
                      {tool.label}
                    </Text>
                    <Text color="fg.muted" fontSize="sm" flex={1}>
                      {tool.description}
                    </Text>
                    <Icon as={FaArrowRight} color={`${palette}.fg`} boxSize={3} />
                  </VStack>
                </Box>
              </NextLink>
            </Link>
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default JsonRelatedTools;
