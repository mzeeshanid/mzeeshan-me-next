import { ExtensionUseCasesData as UseCasesSectionType } from "@/data/tools/sampleFiles/sampleFilesExtensionDetails";
import {
  Box,
  Card,
  GridItem,
  SimpleGrid,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";

interface Props {
  data: UseCasesSectionType;
}

const ExtensionUseCases: React.FC<Props> = ({ data }) => {
  return (
    <Box as="section">
      <SectionHeader
        tagline={"Use Cases"}
        headline={data.title}
        description={"Here are the use cases for this file extension"}
      />
      <Spacer p={4} />
      <SimpleGrid minChildWidth={{ base: "100%", md: "300px" }} gap={4}>
        {data.cards.map((card, idx) => (
          <GridItem key={idx} h={"full"}>
            <Card.Root key={idx} variant="outline" h={"full"}>
              <Card.Body gap={3}>
                <Text fontWeight="medium" fontSize="lg">
                  {card.title}
                </Text>
                <Text color="fg.muted">{card.description}</Text>
              </Card.Body>
            </Card.Root>
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ExtensionUseCases;
