import React from "react";
import { useColorPalette } from "@/contexts/useColorPalette";
import {
  Badge,
  Box,
  GridItem,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

type FilerRow = {
  category: string;
  filer: string;
  nonFiler: string;
};

const rows: FilerRow[] = [
  {
    category: "Vehicle Token Tax",
    filer: "Standard rate",
    nonFiler: "Higher rate (often 2×)",
  },
  {
    category: "Property Purchase Withholding Tax",
    filer: "1% (on value above 5m)",
    nonFiler: "2% (double the filer rate)",
  },
  {
    category: "Property Sale Withholding Tax",
    filer: "4%",
    nonFiler: "6%",
  },
  {
    category: "Bank Cash Withdrawal (above PKR 50k)",
    filer: "0.6%",
    nonFiler: "0.6% (same, but no refund eligibility)",
  },
  {
    category: "Dividend Income Tax",
    filer: "15%",
    nonFiler: "30% (double)",
  },
  {
    category: "Import of Goods",
    filer: "5.5%",
    nonFiler: "8% (higher withholding)",
  },
  {
    category: "Active Taxpayer List (ATL) Status",
    filer: "Eligible — access all ATL benefits",
    nonFiler: "Ineligible for ATL benefits",
  },
];

const FreelanceTaxFilerBenefits: React.FC = () => {
  const { palette } = useColorPalette();

  return (
    <Box as="section">
      <VStack align="stretch" gap={6}>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap={6}
          alignItems="flex-start"
        >
          <VStack align="flex-start" gap={4}>
            <Tag.Root
              variant="surface"
              colorPalette={palette}
              size={{ base: "lg", md: "xl" }}
            >
              <Tag.Label>Filer vs Non-Filer</Tag.Label>
            </Tag.Root>
            <Heading
              as="h2"
              fontWeight="bold"
              fontSize={{ base: "2xl", md: "4xl" }}
              lineHeight="normal"
            >
              Why Filing Your Tax Return Matters
            </Heading>
            <Text color="fg.muted">
              Even though Section 154A withholding tax is a final tax deducted
              at source, you must still file an annual income tax return with
              FBR to stay on the Active Taxpayer List (ATL). Being an ATL filer
              saves you significant money on everyday transactions.
            </Text>
            <Box
              p={4}
              borderRadius="lg"
              bg={`${palette}.subtle`}
              borderWidth="1px"
              borderColor={`${palette}.emphasized`}
            >
              <Text fontSize="sm" fontWeight="medium">
                Filing your return is free via FBR&apos;s IRIS portal. The ATL
                status is updated annually — file by September 30 each year to
                maintain your active taxpayer status.
              </Text>
            </Box>
          </VStack>

          <GridItem>
            <VStack align="stretch" gap={3}>
              <HStack gap={4} justify="flex-end">
                <HStack gap={1}>
                  <Icon as={FaCheckCircle} color="fg.success" boxSize={4} />
                  <Text fontSize="sm" fontWeight="semibold">
                    Filer
                  </Text>
                </HStack>
                <HStack gap={1}>
                  <Icon as={FaTimesCircle} color="fg.error" boxSize={4} />
                  <Text fontSize="sm" fontWeight="semibold">
                    Non-Filer
                  </Text>
                </HStack>
              </HStack>

              {rows.map((row, idx) => (
                <Box
                  key={idx}
                  p={4}
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor="border"
                  bg="bg.panel"
                >
                  <Text fontWeight="semibold" fontSize="sm" mb={2}>
                    {row.category}
                  </Text>
                  <HStack gap={4} wrap="wrap">
                    <HStack gap={2}>
                      <Icon
                        as={FaCheckCircle}
                        color="fg.success"
                        boxSize={3.5}
                        flexShrink={0}
                      />
                      <Badge color="fg.success" variant="surface" size="sm">
                        {row.filer}
                      </Badge>
                    </HStack>
                    <HStack gap={2}>
                      <Icon
                        as={FaTimesCircle}
                        color="fg.error"
                        boxSize={3.5}
                        flexShrink={0}
                      />
                      <Badge color="fg.error" variant="surface" size="sm">
                        {row.nonFiler}
                      </Badge>
                    </HStack>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default FreelanceTaxFilerBenefits;
