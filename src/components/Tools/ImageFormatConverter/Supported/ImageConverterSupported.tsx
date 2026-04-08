import {
  Box,
  Flex,
  GridItem,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Tag,
  Text,
  Wrap,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { useColorPalette } from "@/contexts/useColorPalette";
import {
  getImageFormatLabel,
  imageConversionRoutes,
  imageFormatOptions,
} from "@/data/tools/imageFormatConverter/imageConversionRoutes";
import type { ImageFormat, SectionHeaderData } from "@/data/tools/imageFormatConverter/types";

type Props = {
  header: SectionHeaderData;
};

const ImageConverterSupported: React.FC<Props> = ({ header }) => {
  const { palette } = useColorPalette();
  const activeRoutes = imageConversionRoutes.filter((route) => route.status === "active");

  const groupedBySource = imageFormatOptions.reduce<
    Record<ImageFormat, typeof activeRoutes>
  >((acc, option) => {
    acc[option.value] = activeRoutes.filter(
      (route) => route.sourceFormat === option.value,
    );
    return acc;
  }, {} as Record<ImageFormat, typeof activeRoutes>);

  return (
    <Box as="section">
      <SectionHeader
        tagline={header.badge}
        headline={header.title}
        description={header.description}
      />
      <SimpleGrid mt={8} columns={{ base: 1, md: 2 }} gap={5}>
        {imageFormatOptions.map((option) => {
          const routes = groupedBySource[option.value];
          if (!routes || routes.length === 0) return null;

          return (
            <GridItem key={option.value}>
              <Box
                p={5}
                borderRadius="2xl"
                border="1px solid"
                borderColor="border"
                bg="bg.subtle"
                h="100%"
              >
                <Flex align="center" gap={3} mb={4}>
                  <Tag.Root colorPalette={palette} variant="solid" size="lg">
                    <Tag.Label fontWeight="bold">
                      {getImageFormatLabel(option.value)}
                    </Tag.Label>
                  </Tag.Root>
                  <Text fontSize="sm" color="fg.muted">
                    Convert from {getImageFormatLabel(option.value)}
                  </Text>
                </Flex>

                <Wrap gap={2}>
                  {routes.map((route) => (
                    <LinkBox key={route.slug}>
                      <HStack
                        gap={1.5}
                        px={3}
                        py={1.5}
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="border"
                        bg="bg"
                        fontSize="sm"
                        fontWeight="medium"
                        cursor="pointer"
                        _hover={{ borderColor: `${palette}.solid`, color: `${palette}.solid` }}
                        transition="all 0.15s ease"
                      >
                        <FaArrowRight size={10} />
                        <LinkOverlay asChild>
                          <NextLink href={route.path}>
                            {getImageFormatLabel(route.targetFormat)}
                          </NextLink>
                        </LinkOverlay>
                      </HStack>
                    </LinkBox>
                  ))}
                </Wrap>
              </Box>
            </GridItem>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default ImageConverterSupported;
