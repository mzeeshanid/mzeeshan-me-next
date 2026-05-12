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
import { FaInfoCircle } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

const steps = [
  "Visit pseb.org.pk and click on Freelancer Registration",
  "Create an account with your CNIC and personal details",
  "Submit your skill category, portfolio, and payment platform details",
  "PSEB reviews and approves your application (typically within a few weeks)",
  "Receive your PSEB registration certificate and start benefiting from the 0.25% rate",
];

const FreelanceTaxWhatIsPSEB: React.FC = () => {
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
            <Tag.Label>About PSEB</Tag.Label>
          </Tag.Root>
          <Heading
            as="h2"
            fontWeight="bold"
            fontSize={{ base: "2xl", md: "4xl" }}
            lineHeight="normal"
          >
            What is PSEB and How Can It Save You Tax?
          </Heading>
          <Text color="fg.muted" maxW="2xl">
            PSEB (Pakistan Software Export Board) is a government body under the
            Ministry of IT &amp; Telecom that promotes Pakistan&apos;s IT and
            software exports. Registering with PSEB reduces your Section 154A
            withholding tax from 1% to just 0.25% — a 75% reduction on every
            rupee you earn.
          </Text>
        </VStack>

        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap={8}
          alignItems="flex-start"
        >
          <VStack align="stretch" gap={5}>
            <Box
              p={5}
              borderRadius="xl"
              borderWidth="1px"
              borderColor="border"
              bg="bg.panel"
            >
              <VStack align="flex-start" gap={3}>
                <Text fontWeight="bold" fontSize="lg">
                  Concrete Savings Example
                </Text>
                <Text color="fg.muted" fontSize="sm">
                  On a monthly income of PKR 100,000 (annual PKR 1,200,000):
                </Text>
                <VStack align="stretch" gap={2} w="full">
                  <HStack
                    justify="space-between"
                    p={3}
                    borderRadius="md"
                    bg="red.subtle"
                  >
                    <Text fontSize="sm" fontWeight="medium">
                      Without PSEB (1%)
                    </Text>
                    <Text fontSize="sm" fontWeight="bold" color="red.fg">
                      PKR 12,000 / year
                    </Text>
                  </HStack>
                  <HStack
                    justify="space-between"
                    p={3}
                    borderRadius="md"
                    bg="green.subtle"
                  >
                    <Text fontSize="sm" fontWeight="medium">
                      With PSEB (0.25%)
                    </Text>
                    <Text fontSize="sm" fontWeight="bold" color="green.fg">
                      PKR 3,000 / year
                    </Text>
                  </HStack>
                  <HStack
                    justify="space-between"
                    p={3}
                    borderRadius="md"
                    bg={`${palette}.subtle`}
                    borderWidth="1px"
                    borderColor={`${palette}.emphasized`}
                  >
                    <Text fontSize="sm" fontWeight="semibold">
                      Annual Savings
                    </Text>
                    <Text
                      fontSize="sm"
                      fontWeight="bold"
                      color={`${palette}.fg`}
                    >
                      PKR 9,000 / year
                    </Text>
                  </HStack>
                </VStack>
                <Text fontSize="xs" color="fg.muted">
                  Use the calculator above to see your exact savings based on
                  your actual income.
                </Text>
              </VStack>
            </Box>

            <Box
              p={4}
              borderRadius="lg"
              borderWidth="1px"
              borderColor="border"
              bg="bg.panel"
            >
              <HStack align="flex-start" gap={3}>
                <DeferredIcon
                  icon={FaInfoCircle}
                  color="fg.muted"
                  boxSize={4}
                  mt={0.5}
                  flexShrink={0}
                />
                <Text fontSize="sm" color="fg.muted">
                  <strong>Disclaimer:</strong> PSEB registration requirements
                  and processes may change. Always verify current eligibility
                  criteria at pseb.org.pk before applying. This tool is for
                  estimation only.
                </Text>
              </HStack>
            </Box>
          </VStack>

          <VStack align="stretch" gap={4}>
            <Box
              p={5}
              borderRadius="xl"
              borderWidth="1px"
              borderColor="border"
              bg="bg.panel"
            >
              <VStack align="flex-start" gap={4}>
                <Text fontWeight="bold" fontSize="lg">
                  How to Register with PSEB
                </Text>
                <VStack align="flex-start" gap={3} w="full">
                  {steps.map((step, idx) => (
                    <HStack key={idx} align="flex-start" gap={3}>
                      <Box
                        minW="24px"
                        h="24px"
                        borderRadius="full"
                        bg={`${palette}.subtle`}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontWeight="bold"
                        color={`${palette}.fg`}
                        fontSize="xs"
                        flexShrink={0}
                      >
                        {idx + 1}
                      </Box>
                      <Text fontSize="sm" color="fg.muted">
                        {step}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
                <Link
                  href="https://www.pseb.org.pk"
                  target="_blank"
                  rel="noopener noreferrer"
                  display="flex"
                  alignItems="center"
                  gap={2}
                  px={4}
                  py={2}
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor={`${palette}.emphasized`}
                  color={`${palette}.fg`}
                  _hover={{ bg: `${palette}.subtle`, textDecoration: "none" }}
                  fontSize="sm"
                  fontWeight="medium"
                  w="full"
                  justifyContent="center"
                >
                  Visit PSEB Registration Portal
                  <DeferredIcon icon={FiExternalLink} boxSize={3.5} />
                </Link>
              </VStack>
            </Box>

            <Box
              p={4}
              borderRadius="lg"
              bg={`${palette}.subtle`}
              borderWidth="1px"
              borderColor={`${palette}.emphasized`}
            >
              <Text fontSize="sm" fontWeight="medium">
                Who qualifies for PSEB registration?
              </Text>
              <Text fontSize="sm" color="fg.muted" mt={1}>
                Individual freelancers, software houses, and IT service
                exporters providing services to foreign clients. Your primary
                business must be IT or IT-enabled services (ITES) export.
              </Text>
            </Box>
          </VStack>
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default FreelanceTaxWhatIsPSEB;
