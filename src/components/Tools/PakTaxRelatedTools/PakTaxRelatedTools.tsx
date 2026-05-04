import React from "react";
import { useColorPalette } from "@/contexts/useColorPalette";
import {
  PakTaxToolId,
  pakTaxRelatedToolsData,
} from "@/data/tools/pakTaxRelatedTools/pakTaxRelatedToolsData";
import {
  Box,
  GridItem,
  Heading,
  Icon,
  Link,
  SimpleGrid,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FaArrowRight } from "react-icons/fa6";

type Props = {
  currentToolId: PakTaxToolId;
};

const PakTaxRelatedTools: React.FC<Props> = ({ currentToolId }) => {
  const { palette } = useColorPalette();
  const tools = pakTaxRelatedToolsData.filter((t) => t.id !== currentToolId);

  return (
    <Box as="section">
      <VStack align="flex-start" gap={3} mb={6}>
        <Tag.Root variant="surface" colorPalette={palette} size={{ base: "lg", md: "xl" }}>
          <Tag.Label>Related Tools</Tag.Label>
        </Tag.Root>
        <Heading
          as="h2"
          fontWeight="bold"
          fontSize={{ base: "2xl", md: "4xl" }}
          lineHeight="normal"
        >
          More Pakistan Tax Tools
        </Heading>
        <Text color="fg.muted">
          All calculations run entirely in your browser — no uploads, no sign-up required.
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
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

export default PakTaxRelatedTools;
