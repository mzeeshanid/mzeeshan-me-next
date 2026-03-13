import { RelatedExtensionData as RelatedExtensionsSectionType } from "@/data/tools/sampleFiles/sampleFilesExtensionDetails";
import {
  Box,
  Card,
  GridItem,
  SimpleGrid,
  Spacer,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";

interface Props {
  data: RelatedExtensionsSectionType;
}

const RelatedExtensions: React.FC<Props> = ({ data }) => {
  return (
    <Box as="section">
      <SectionHeader
        tagline={"Related"}
        headline={data.title}
        description={"Here are some related extensions"}
      />
      <Spacer p={4} />
      <SimpleGrid minChildWidth={{ base: "100%", md: "300px" }} gap={4}>
        {data.related.map((ext, idx) => (
          <GridItem key={idx} h={"full"}>
            <Card.Root variant="subtle" h={"full"}>
              <Card.Body gap={2}>
                <Link
                  key={idx}
                  href={`/tools/sample-files/extensions/${ext.extension.toLowerCase()}`}
                >
                  <Text
                    fontWeight="bold"
                    fontSize="lg"
                    textTransform="uppercase"
                  >
                    {ext.extension}
                  </Text>
                  <Text color="fg.muted">{ext.description}</Text>
                </Link>
              </Card.Body>
            </Card.Root>
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default RelatedExtensions;
