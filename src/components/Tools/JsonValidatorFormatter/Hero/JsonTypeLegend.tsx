import { jsonValidatorFormatterHeroData } from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import { Box, HStack, Icon, SimpleGrid, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { FaCircle } from "react-icons/fa6";

type Props = {
  typeColors: Record<string, string>;
};

const JsonTypeLegend: React.FC<Props> = ({ typeColors }) => {
  const heroData = jsonValidatorFormatterHeroData;

  return (
    <Box borderWidth="1px" borderRadius="xl" p={4}>
      <Text fontWeight="bold">{heroData.typeLegendTitle}</Text>
      <Spacer p={2} />
      <SimpleGrid columns={{ base: 2, md: 3 }} gap={3}>
        {Object.entries(typeColors).map(([type, color]) => (
          <HStack key={type}>
            <Icon as={FaCircle} color={`${color}.solid`} />
            <Text color={"fg.subtle"} textTransform="capitalize">
              {type}
            </Text>
          </HStack>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default JsonTypeLegend;
