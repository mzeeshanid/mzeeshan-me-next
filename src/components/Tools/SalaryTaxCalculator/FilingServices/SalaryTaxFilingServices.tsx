import DeferredIcon from "@/components/DeferredIcon/DeferredIcon";
import React from "react";
import { useColorPalette } from "@/contexts/useColorPalette";
import {
  Box,
  Card,
  GridItem,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";
import { FaInfoCircle } from "react-icons/fa";

type FilingService = {
  name: string;
  tagline: string;
  description: string;
  url: string;
};

const services: FilingService[] = [
  {
    name: "Befiler",
    tagline: "befiler.com",
    description:
      "An online platform that helps salaried individuals and freelancers file their income tax returns in Pakistan with step-by-step guidance.",
    url: "https://www.befiler.com",
  },
  {
    name: "PakTaxCalculator",
    tagline: "paktaxcalculator.pk",
    description:
      "A Pakistan-focused tax calculation and filing assistance service covering salary, freelance, and business income tax returns.",
    url: "https://paktaxcalculator.pk",
  },
];

const SalaryTaxFilingServices: React.FC = () => {
  const { palette } = useColorPalette();

  return (
    <Box as="section">
      <VStack align="stretch" gap={6}>
        <VStack align="flex-start" gap={3}>
          <Tag.Root variant="surface" colorPalette={palette} size={{ base: "lg", md: "xl" }}>
            <Tag.Label>File Your Tax Return</Tag.Label>
          </Tag.Root>
          <Heading
            as="h2"
            fontWeight="bold"
            fontSize={{ base: "2xl", md: "4xl" }}
            lineHeight="normal"
          >
            Want to File Your Income Tax Return?
          </Heading>
          <Text color="fg.muted" maxW="2xl">
            Now that you know your tax liability, the next step is filing your annual income tax
            return with FBR to become (or stay) an Active Taxpayer. These third-party services can
            help.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
          {services.map((service, idx) => (
            <GridItem key={idx}>
              <Card.Root h="full" borderWidth="1px" borderColor="border">
                <Card.Body>
                  <VStack align="flex-start" gap={3} h="full">
                    <VStack align="flex-start" gap={1}>
                      <Heading as="h3" fontSize="xl" fontWeight="bold">
                        {service.name}
                      </Heading>
                      <Text fontSize="sm" color={`${palette}.fg`} fontWeight="medium">
                        {service.tagline}
                      </Text>
                    </VStack>
                    <Text color="fg.muted" fontSize="sm" flex={1}>
                      {service.description}
                    </Text>
                    <Link
                      href={service.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      display="block"
                      w="full"
                      px={4}
                      py={2}
                      borderRadius="md"
                      borderWidth="1px"
                      borderColor={`${palette}.emphasized`}
                      color={`${palette}.fg`}
                      _hover={{ bg: `${palette}.subtle`, textDecoration: "none" }}
                      textAlign="center"
                      fontSize="sm"
                      fontWeight="medium"
                      transition="background 0.15s"
                    >
                      <HStack gap={2} justify="center">
                        <Text>Visit {service.name}</Text>
                        <DeferredIcon icon={FiExternalLink} boxSize={3.5} />
                      </HStack>
                    </Link>
                  </VStack>
                </Card.Body>
              </Card.Root>
            </GridItem>
          ))}
        </SimpleGrid>

        <Box
          p={4}
          borderRadius="lg"
          borderWidth="1px"
          borderColor="border"
          bg="bg.panel"
        >
          <HStack align="flex-start" gap={3}>
            <DeferredIcon icon={FaInfoCircle} color="fg.muted" boxSize={4} mt={0.5} flexShrink={0} />
            <Text fontSize="sm" color="fg.muted">
              <strong>Disclaimer:</strong> We are not affiliated with, endorsed by, or in
              partnership with any of the services listed above. These links are provided for
              informational convenience only. Please evaluate any third-party service independently
              before sharing personal or financial information.
            </Text>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default SalaryTaxFilingServices;
