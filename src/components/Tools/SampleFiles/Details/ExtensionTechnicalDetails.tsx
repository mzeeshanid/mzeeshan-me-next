import { ExtensionTechnicalDetailsData } from "@/data/tools/sampleFiles/sampleFilesExtensionDetails";
import {
  Box,
  GridItem,
  Separator,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";

interface Props {
  data: ExtensionTechnicalDetailsData;
}

const ExtensionTechnicalDetails: React.FC<Props> = (props) => {
  const { data } = props;
  return (
    <Box as="section">
      <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} gap={8}>
        <GridItem>
          <VStack align={"flex-start"}>
            <SectionHeader
              tagline={"More Details"}
              headline={"Technical Specs"}
              description={
                "Here are some technical details about this extension"
              }
            />
          </VStack>
        </GridItem>
        <Box>
          <SimpleGrid columns={2} gap={8}>
            {data.specifications.map((spec, index) => (
              <GridItem key={index} h={"full"}>
                <VStack align={"flex-start"} gap={4} h={"full"}>
                  <VStack align={"flex-start"} gap={0} h={"full"}>
                    <Text textStyle={{ base: "lg", md: "xl" }}>
                      {spec.title}
                    </Text>
                    <Text color={"fg.muted"} fontWeight={"light"}>
                      {spec.detail}
                    </Text>
                  </VStack>
                  <Separator w={"full"} />
                </VStack>
              </GridItem>
            ))}
          </SimpleGrid>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default ExtensionTechnicalDetails;
