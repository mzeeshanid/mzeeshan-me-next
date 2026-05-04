import React from "react";
import { useColorPalette } from "@/contexts/useColorPalette";
import { freelanceTaxFeaturesData } from "@/data/tools/freelanceTaxCalculator";
import {
  Box,
  GridItem,
  Heading,
  Icon,
  SimpleGrid,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";

const FreelanceTaxFeatures: React.FC = () => {
  const { palette } = useColorPalette();
  const { header, features } = freelanceTaxFeaturesData;

  return (
    <Box as="section">
      <VStack align="stretch" gap={8}>
        <VStack align="flex-start" gap={3}>
          <Tag.Root variant="surface" colorPalette={palette} size={{ base: "lg", md: "xl" }}>
            <Tag.Label>{header.badge}</Tag.Label>
          </Tag.Root>
          <Heading
            as="h2"
            fontWeight="bold"
            fontSize={{ base: "2xl", md: "4xl" }}
            lineHeight="normal"
          >
            {header.title}
          </Heading>
          <Text color="fg.muted" maxW="2xl">
            {header.description}
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={6}>
          {features.map((feature, idx) => (
            <GridItem key={idx}>
              <Box
                p={5}
                borderRadius="xl"
                borderWidth="1px"
                borderColor="border"
                bg="bg.panel"
                h="full"
              >
                <VStack align="flex-start" gap={3}>
                  <Box
                    p={2}
                    borderRadius="lg"
                    bg={`${palette}.subtle`}
                    display="inline-flex"
                  >
                    <Icon as={feature.icon} color={`${palette}.fg`} boxSize={5} />
                  </Box>
                  <Text fontWeight="bold" fontSize="md">
                    {feature.title}
                  </Text>
                  <Text color="fg.muted" fontSize="sm">
                    {feature.description}
                  </Text>
                </VStack>
              </Box>
            </GridItem>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default FreelanceTaxFeatures;
