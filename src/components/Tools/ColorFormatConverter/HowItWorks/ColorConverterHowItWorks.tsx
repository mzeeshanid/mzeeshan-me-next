import React from "react";
import { useColorPalette } from "@/contexts/useColorPalette";
import { colorConverterHowItWorksData } from "@/data/tools/colorFormatConverter";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import {
  Box,
  Heading,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const ColorConverterHowItWorks: React.FC = () => {
  const { palette } = useColorPalette();
  const data = colorConverterHowItWorksData;

  return (
    <Box as="section">
      <VStack align="flex-start" gap={8}>
        <SectionHeader
          tagline={data.header.badge}
          headline={data.header.title}
          description={data.header.description}
        />

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} w="full">
          {data.items.map((item, idx) => (
            <Box
              key={idx}
              borderWidth="1px"
              borderRadius="lg"
              p={5}
              bg="bg.subtle"
            >
              <VStack align="flex-start" gap={3}>
                <Heading as="h3" fontSize="lg" fontWeight="semibold">
                  {item.title}
                </Heading>
                <Text color="fg.muted" fontSize="sm">
                  {item.body}
                </Text>
                {item.formula && (
                  <Box
                    as="pre"
                    bg="bg.muted"
                    borderRadius="md"
                    px={3}
                    py={2}
                    fontSize="xs"
                    fontFamily="mono"
                    w="full"
                    overflowX="auto"
                    whiteSpace="pre-wrap"
                    wordBreak="break-all"
                  >
                    {item.formula}
                  </Box>
                )}
                {item.link && (
                  <Link
                    href={item.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    color={`${palette}.fg`}
                    fontSize="xs"
                    display="flex"
                    alignItems="center"
                    gap={1}
                  >
                    {item.link.label}
                    <FaArrowUpRightFromSquare size={10} />
                  </Link>
                )}
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default ColorConverterHowItWorks;
