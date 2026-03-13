import { useColorPalette } from "@/contexts/useColorPalette";
import { SampleFileFeature } from "@/data/tools/sampleFiles/statsData";
import { Card, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { FaFile } from "react-icons/fa6";

type Props = {
  feature: SampleFileFeature;
};

const SampleFilesFeatureItem: React.FC<Props> = ({ feature }) => {
  const { palette } = useColorPalette();
  return (
    <Card.Root bg="bg.subtle" borderWidth={0}>
      <Card.Header>
        <HStack justify={"space-between"}>
          <Text
            fontSize={{ base: "xl", md: "2xl" }}
            color={`${palette}.fg`}
            fontWeight={{ base: "bold", md: "extrabold" }}
          >
            {feature.title}
          </Text>
          <Icon as={feature.icon} color={`${palette}.fg`} size="md" />
        </HStack>
      </Card.Header>
      <Card.Body>
        <Text>{feature.description}</Text>
      </Card.Body>
    </Card.Root>
  );
};

export default SampleFilesFeatureItem;
