import DeferredIcon from "@/components/DeferredIcon/DeferredIcon";
import React from "react";
import { useColorPalette } from "@/contexts/useColorPalette";
import { taxYears } from "@/data/tools/salaryTaxCalculator";
import {
  Box,
  GridItem,
  Heading,
  Link,
  SimpleGrid,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FaArrowRight } from "react-icons/fa6";

type Props = {
  currentYear: string;
};

const SalaryTaxRelatedYears: React.FC<Props> = ({ currentYear }) => {
  const { palette } = useColorPalette();
  const otherYears = taxYears.filter((y) => y.year !== currentYear);

  if (otherYears.length === 0) return null;

  return (
    <Box as="section">
      <VStack align="flex-start" gap={3} mb={6}>
        <Tag.Root variant="surface" colorPalette={palette} size={{ base: "lg", md: "xl" }}>
          <Tag.Label>Related</Tag.Label>
        </Tag.Root>
        <Heading
          as="h2"
          fontWeight="bold"
          fontSize={{ base: "2xl", md: "4xl" }}
          lineHeight="normal"
        >
          Salary Tax Calculator for Other Years
        </Heading>
        <Text color="fg.muted">
          Compare take-home pay and tax slabs across fiscal years.
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={4}>
        {otherYears.map((yearData) => (
          <GridItem key={yearData.year}>
            <Link asChild _hover={{ textDecoration: "none" }}>
              <NextLink href={`/tools/${yearData.urlSlug}`}>
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
                      {yearData.label}
                    </Text>
                    <Text color="fg.muted" fontSize="sm" flex={1}>
                      {yearData.effectiveFrom} – {yearData.effectiveTo}
                    </Text>
                    <DeferredIcon icon={FaArrowRight} color={`${palette}.fg`} boxSize={3} />
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

export default SalaryTaxRelatedYears;
