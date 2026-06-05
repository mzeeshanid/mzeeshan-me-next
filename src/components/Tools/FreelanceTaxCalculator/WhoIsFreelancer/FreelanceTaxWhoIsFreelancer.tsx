import DeferredIcon from "@/components/DeferredIcon/DeferredIcon";
import React from "react";
import { useColorPalette } from "@/contexts/useColorPalette";
import {
  Box,
  GridItem,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaCheckCircle, FaTimesCircle, FaArrowRight } from "react-icons/fa";

const qualifies = [
  "You provide IT, software development, web development, or digital services",
  "Your clients are based outside Pakistan",
  "You receive payment in foreign currency via bank transfer (Payoneer, Wise, wire)",
  "You work on platforms like Upwork, Fiverr, Toptal, or directly with foreign companies",
];

const doesNotQualify = [
  "You serve Pakistani clients only",
  "You receive payment in PKR locally",
  "You are a salaried employee of a Pakistani company",
];

const FreelanceTaxWhoIsFreelancer: React.FC = () => {
  const { palette } = useColorPalette();

  return (
    <Box as="section">
      <VStack align="stretch" gap={6}>
        <VStack align="flex-start" gap={3}>
          <Tag.Root
            variant="surface"
            colorPalette={palette}
            size={{ base: "lg", md: "xl" }}
          >
            <Tag.Label>Who This Applies To</Tag.Label>
          </Tag.Root>
          <Heading
            as="h2"
            fontWeight="bold"
            fontSize={{ base: "2xl", md: "4xl" }}
            lineHeight="normal"
          >
            Is This Calculator For You?
          </Heading>
          <Text color="fg.muted" maxW="2xl">
            This tool covers only the Section 154A withholding tax on foreign
            remittances — not general business income tax. Make sure you fall in
            the right category before calculating.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
          <GridItem>
            <Box
              p={6}
              borderRadius="xl"
              borderWidth="1px"
              borderColor={`${palette}.emphasized`}
              bg={`${palette}.subtle`}
              h="full"
            >
              <VStack align="flex-start" gap={4}>
                <HStack gap={2}>
                  <DeferredIcon icon={FaCheckCircle} color="fg.success" boxSize={5} />
                  <Text fontWeight="bold" fontSize="lg">
                    This calculator IS for you if:
                  </Text>
                </HStack>
                <VStack align="flex-start" gap={3}>
                  {qualifies.map((item, idx) => (
                    <HStack key={idx} align="flex-start" gap={3}>
                      <DeferredIcon
                        icon={FaCheckCircle}
                        color="fg.success"
                        boxSize={4}
                        flexShrink={0}
                        mt={0.5}
                      />
                      <Text fontSize="sm">{item}</Text>
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            </Box>
          </GridItem>

          <GridItem>
            <Box
              p={6}
              borderRadius="xl"
              borderWidth="1px"
              borderColor="border"
              bg="bg.panel"
              h="full"
            >
              <VStack align="flex-start" gap={4}>
                <HStack gap={2}>
                  <DeferredIcon icon={FaTimesCircle} color="fg.error" boxSize={5} />
                  <Text fontWeight="bold" fontSize="lg">
                    This calculator is NOT for you if:
                  </Text>
                </HStack>
                <VStack align="flex-start" gap={3}>
                  {doesNotQualify.map((item, idx) => (
                    <HStack key={idx} align="flex-start" gap={3}>
                      <DeferredIcon
                        icon={FaTimesCircle}
                        color="fg.error"
                        boxSize={4}
                        flexShrink={0}
                        mt={0.5}
                      />
                      <Text fontSize="sm" color="fg.muted">
                        {item}
                      </Text>
                    </HStack>
                  ))}
                </VStack>

                <Box
                  p={4}
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor={`${palette}.emphasized`}
                  bg={`${palette}.subtle`}
                  w="full"
                >
                  <VStack align="flex-start" gap={2}>
                    <Text fontWeight="semibold" fontSize="sm">
                      Use the Salary Tax Calculator instead
                    </Text>
                    <Text fontSize="sm" color="fg.muted">
                      If you serve Pakistani clients, use FBR&apos;s standard
                      progressive slab calculator for salaried or business
                      income.
                    </Text>
                    <Link
                      href="/tools/salary-tax-calculator-2026-2027-pakistan"
                      color={`${palette}.fg`}
                      fontWeight="semibold"
                      fontSize="sm"
                      display="flex"
                      alignItems="center"
                      gap={1}
                      _hover={{ textDecoration: "underline" }}
                    >
                      Go to Salary Tax Calculator
                      <DeferredIcon icon={FaArrowRight} boxSize={3} />
                    </Link>
                  </VStack>
                </Box>
              </VStack>
            </Box>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default FreelanceTaxWhoIsFreelancer;
