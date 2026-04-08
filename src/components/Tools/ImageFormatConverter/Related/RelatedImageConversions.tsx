import { Box, GridItem, LinkBox, LinkOverlay, SimpleGrid, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { getRelatedImageConversionRoutes } from "@/data/tools/imageFormatConverter/imageConversionRoutes";
import type { SectionHeaderData } from "@/data/tools/imageFormatConverter/types";

type Props = {
  currentSlug: string;
  header: SectionHeaderData;
};

const RelatedImageConversions: React.FC<Props> = ({ currentSlug, header }) => {
  const routes = getRelatedImageConversionRoutes(currentSlug);

  if (!routes.length) {
    return null;
  }

  return (
    <Box as="section">
      <SectionHeader
        tagline={header.badge}
        headline={header.title}
        description={header.description}
      />
      <SimpleGrid mt={8} minChildWidth="xs" gap={4}>
        {routes.map((route) => (
          <GridItem key={route.slug}>
            <LinkBox
              p={5}
              h="100%"
              borderRadius="2xl"
              border="1px solid"
              borderColor="border"
              bg="bg.subtle"
            >
              <Text fontWeight="semibold" mb={2}>
                <LinkOverlay asChild>
                  <NextLink href={route.path}>{route.label}</NextLink>
                </LinkOverlay>
              </Text>
              <Text color="fg.muted">
                Convert {route.sourceFormat.toUpperCase()} into {route.targetFormat.toUpperCase()} from the same image conversion cluster.
              </Text>
            </LinkBox>
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default RelatedImageConversions;
