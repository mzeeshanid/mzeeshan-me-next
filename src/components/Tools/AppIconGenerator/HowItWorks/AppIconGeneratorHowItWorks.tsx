import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { useColorPalette } from "@/contexts/useColorPalette";
import { appIconGeneratorHowItWorksData } from "@/data/tools/appIconGenerator/appIconGeneratorData";
import { Box, Icon, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React from "react";

const AppIconGeneratorHowItWorks: React.FC = () => {
  const data = appIconGeneratorHowItWorksData;
  const { palette } = useColorPalette();

  return (
    <Box as="section">
      <SectionHeader
        tagline={data.header.badge}
        headline={data.header.title}
        description={data.header.desc}
      />
      <Box h={6} />
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
        {data.items.map((item) => (
          <VStack
            key={item.title}
            align="flex-start"
            gap={4}
            borderWidth="1px"
            borderRadius="2xl"
            p={5}
            bg="bg.panel"
          >
            <Icon as={item.icon} boxSize={12} color={`${palette}.fg`} />
            <Text fontWeight="bold" fontSize="lg" color={`${palette}.fg`}>
              {item.title}
            </Text>
            <Text color="fg.muted">{item.desc}</Text>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AppIconGeneratorHowItWorks;
