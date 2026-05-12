import DeferredIcon from "@/components/DeferredIcon/DeferredIcon";
import React from "react";
import { useColorPalette } from "@/contexts/useColorPalette";
import { base64UseCasesData } from "@/data/tools/base64EncoderDecoder";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import {
  Box,
  Card,
  GridItem,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IconType } from "react-icons";

const UseCaseCard: React.FC<{
  useCase: { icon: IconType; title: string; description: string };
  palette: string;
}> = ({ useCase, palette }) => (
  <Card.Root variant="outline" h="full" bg="bg.subtle">
    <Card.Header>
      <DeferredIcon icon={useCase.icon} boxSize={{ base: 8, md: 10 }} color={`${palette}.fg`} />
    </Card.Header>
    <Card.Body>
      <VStack gap={1} align="flex-start">
        <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>
          {useCase.title}
        </Text>
        <Text color="fg.muted">{useCase.description}</Text>
      </VStack>
    </Card.Body>
  </Card.Root>
);

const Base64UseCases: React.FC = () => {
  const { palette } = useColorPalette();
  const data = base64UseCasesData;

  return (
    <Box as="section">
      <VStack gap={4} align="flex-start">
        <SectionHeader
          tagline={data.header.badge}
          headline={data.header.title}
          description={data.header.description}
        />
        <Spacer p={1} />
        <SimpleGrid w="full" minChildWidth={{ base: "none", md: "sm" }} gap={4}>
          {data.useCases.map((useCase, idx) => (
            <GridItem key={idx}>
              <UseCaseCard useCase={useCase} palette={palette} />
            </GridItem>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default Base64UseCases;
