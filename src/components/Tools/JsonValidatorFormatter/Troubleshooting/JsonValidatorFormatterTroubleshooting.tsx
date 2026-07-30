import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { jsonValidatorCardStyle } from "@/components/Tools/JsonValidatorFormatter/Shared/jsonValidatorCardStyle";
import { jsonValidatorFormatterTroubleshootingData } from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import type { JsonValidatorFormatterTroubleshootItem } from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import { Badge, Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React from "react";

const TroubleshootCard: React.FC<{ item: JsonValidatorFormatterTroubleshootItem }> = ({
  item,
}) => (
  <Box {...jsonValidatorCardStyle} p={4} h="full">
    <VStack align="flex-start" gap={3}>
      <Badge
        bg="red.subtle"
        color="red.fg"
        fontFamily="mono"
        fontSize={{ base: "xs", md: "sm" }}
        px={3}
        py={1.5}
        borderRadius="md"
        whiteSpace="normal"
        textAlign="start"
      >
        {item.error}
      </Badge>
      <Text color="fg.muted" fontSize="sm">
        {item.description}{" "}
        <Text as="span" fontWeight="bold" color="fg">
          {"Fix:"}
        </Text>{" "}
        {item.fix}
      </Text>
    </VStack>
  </Box>
);

type Props = {
  data?: typeof jsonValidatorFormatterTroubleshootingData;
};

const JsonValidatorFormatterTroubleshooting: React.FC<Props> = ({ data }) => {
  const troubleshootingData = data ?? jsonValidatorFormatterTroubleshootingData;

  return (
    <Box as="section">
      <VStack gap={4} align="flex-start">
        <SectionHeader
          tagline={troubleshootingData.header.badge}
          headline={troubleshootingData.header.title}
          description={troubleshootingData.header.description}
        />
        <SimpleGrid w="full" columns={{ base: 1, md: 2 }} gap={4}>
          {troubleshootingData.items.map((item) => (
            <TroubleshootCard key={item.error} item={item} />
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default JsonValidatorFormatterTroubleshooting;
