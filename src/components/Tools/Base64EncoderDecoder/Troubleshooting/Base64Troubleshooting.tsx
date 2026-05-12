import DeferredIcon from "@/components/DeferredIcon/DeferredIcon";
import React from "react";
import { useColorPalette } from "@/contexts/useColorPalette";
import { base64TroubleshootingData } from "@/data/tools/base64EncoderDecoder";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import {
  Blockquote,
  Box,
  Card,
  GridItem,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IconType } from "react-icons";

const TroubleshootCard: React.FC<{
  item: { icon: IconType; title: string; problem: string; solution: string };
  palette: string;
}> = ({ item, palette }) => (
  <Card.Root variant="outline" bg="bg.subtle" h="full">
    <Card.Header>
      <DeferredIcon icon={item.icon} boxSize={{ base: 7, md: 8 }} color={`${palette}.fg`} />
    </Card.Header>
    <Card.Body>
      <VStack align="flex-start" gap={3}>
        <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>
          {item.title}
        </Text>
        <Blockquote.Root variant="subtle">
          <Blockquote.Content fontSize="sm" fontStyle="italic">
            {item.problem}
          </Blockquote.Content>
        </Blockquote.Root>
        <Text color="fg.muted" fontSize="sm">
          {item.solution}
        </Text>
      </VStack>
    </Card.Body>
  </Card.Root>
);

const Base64Troubleshooting: React.FC = () => {
  const { palette } = useColorPalette();
  const data = base64TroubleshootingData;

  return (
    <Box as="section">
      <VStack gap={4} align="flex-start">
        <SectionHeader
          tagline={data.header.badge}
          headline={data.header.title}
          description={data.header.description}
        />
        <Spacer p={1} />
        <SimpleGrid w="full" minChildWidth={{ base: "none", md: "xs" }} gap={4}>
          {data.items.map((item, idx) => (
            <GridItem key={idx}>
              <TroubleshootCard item={item} palette={palette} />
            </GridItem>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default Base64Troubleshooting;
