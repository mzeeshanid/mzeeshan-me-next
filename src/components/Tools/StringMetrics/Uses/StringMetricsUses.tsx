import React from "react";
import { useColorPalette } from "@/contexts/useColorPalette";
import { stringMetricsUseCasesData } from "@/data/tools/stringMetrics/stringMetricsStats";
import {
  Badge,
  Box,
  Card,
  GridItem,
  Icon,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";

type Props = {};

const UseCaseCard: React.FC<{
  useCase: {
    title: string;
    description: string;
    icon: IconType;
    algorithms: string[];
  };
  palette: string;
}> = ({ useCase, palette }) => {
  return (
    <Card.Root variant="outline" h="full" bg={"bg.subtle"}>
      <Card.Header>
        <Icon
          as={useCase.icon}
          boxSize={{ base: 8, md: 12 }}
          color={`${palette}.fg`}
        />
      </Card.Header>
      <Card.Body>
        <VStack gap={1} align="flex-start">
          <Text fontWeight="bold" fontSize={{ base: "xl", md: "2xl" }}>
            {useCase.title}
          </Text>
          <Text color="fg.muted">{useCase.description}</Text>
        </VStack>
      </Card.Body>

      <Card.Footer>
        <Box>
          <Text fontSize="xs" fontWeight="semibold" color="fg.muted">
            {"Best algorithms:"}
          </Text>
          <Stack direction="row" gap={1} flexWrap="wrap" mt={1}>
            {useCase.algorithms.map((algo, idx) => (
              <Badge key={idx} colorPalette={palette} variant={"outline"}>
                {algo}
              </Badge>
            ))}
          </Stack>
        </Box>
      </Card.Footer>
    </Card.Root>
  );
};

const StringMetricsUses: React.FC<Props> = () => {
  const { palette } = useColorPalette();
  const useCasesData = stringMetricsUseCasesData;

  return (
    <VStack gap={4} align="flex-start">
      <SectionHeader
        tagline={useCasesData.header.badge}
        headline={useCasesData.header.title}
        description={useCasesData.header.description}
      />
      <Spacer p={1} />
      <SimpleGrid w="full" minChildWidth={{ base: "none", md: "sm" }} gap={4}>
        {useCasesData.useCases.map((useCase, idx) => (
          <GridItem key={idx}>
            <UseCaseCard useCase={useCase} palette={palette} />
          </GridItem>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default StringMetricsUses;
