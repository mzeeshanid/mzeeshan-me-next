import { useColorPalette } from "@/contexts/useColorPalette";
import { MyToolFeature } from "@/data/tools/myTools/myToolsFeatures";
import { Box, Card, Icon, Text, VStack } from "@chakra-ui/react";
import React from "react";

type Props = {
  feature: MyToolFeature;
};

const MyToolFeatureItem: React.FC<Props> = (props: Props) => {
  const { palette } = useColorPalette();
  const { feature } = props;

  return (
    <Card.Root w="full" h="full" bg="bg.subtle">
      <Card.Body gap={4}>
        <VStack alignItems="flex-start" gap={2}>
          <Icon as={feature.icon} colorPalette={palette} boxSize={8} />
          <Text fontWeight="bold" fontSize="lg">
            {feature.title}
          </Text>
          <Text color="fg.muted">{feature.description}</Text>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

export default MyToolFeatureItem;
