import { SampleFilesExtensionModel } from "@/apis/sampleFiles/sampleFilesExtension";
import { useColorPalette } from "@/contexts/useColorPalette";
import { sampleFilesCategoriesData } from "@/data/tools/sampleFiles/sampleFilesCategoriesData";
import {
  Box,
  Heading,
  HStack,
  Icon,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import {
  LuArchive,
  LuFiles,
  LuFileStack,
  LuLayoutGrid,
  LuMusic,
  LuVideo,
} from "react-icons/lu";

type Props = {
  currentSlug: string;
  allExtensions: SampleFilesExtensionModel[];
};

const categoryIcons: Record<string, IconType> = {
  videos: LuVideo,
  audios: LuMusic,
  docs: LuFileStack,
  images: LuLayoutGrid,
  archives: LuArchive,
  others: LuFiles,
};

const PREVIEW_COUNT = 3;

// Ranks each category's extensions by real download counts and previews the
// top 3 — the most-used formats in that category, not an arbitrary pick.
function buildPreview(
  extensions: SampleFilesExtensionModel[],
  categorySlug: string,
): string {
  const names = extensions
    .filter((ext) => ext.type?.slug === categorySlug)
    .sort((a, b) => (b.downloads ?? 0) - (a.downloads ?? 0))
    .map((ext) => ext.name);

  const shown = names.slice(0, PREVIEW_COUNT).join(", ");
  const remaining = names.length - PREVIEW_COUNT;

  return remaining > 0 ? `${shown} +${remaining} More` : shown;
}

// Others is always last in the canonical category order, so filtering the
// current category and taking the first 4 naturally keeps this to the most
// relevant alternates and excludes the catch-all "Others" bucket.
const SampleFilesOtherCategories: React.FC<Props> = ({
  currentSlug,
  allExtensions,
}) => {
  const { palette } = useColorPalette();
  const otherCategories = sampleFilesCategoriesData.categories
    .filter((category) => category.slug !== currentSlug)
    .slice(0, 4);

  if (otherCategories.length === 0) return null;

  return (
    <Box as="section">
      <Heading
        as="h3"
        fontSize={{ base: "lg", md: "xl" }}
        fontWeight="bold"
        mb={4}
      >
        Need a Different File Type?
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4}>
        {otherCategories.map((category) => {
          const CategoryIcon = categoryIcons[category.slug] ?? LuFiles;
          const preview = buildPreview(allExtensions, category.slug);

          return (
            <Link
              key={category.slug}
              href={category.path}
              display="block"
              _hover={{ textDecoration: "none" }}
            >
              <HStack
                gap={3}
                p={4}
                h="full"
                align="center"
                borderWidth="1px"
                borderColor="border.subtle"
                borderRadius="xl"
                bg="bg.muted"
                _dark={{ bg: "whiteAlpha.50" }}
                transition="all 0.15s ease"
                _hover={{
                  borderColor: `${palette}.400`,
                  transform: "translateY(-2px)",
                }}
              >
                <Box
                  w={10}
                  h={10}
                  borderRadius="lg"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg={`${palette}.subtle`}
                  color={`${palette}.fg`}
                  flexShrink={0}
                >
                  <Icon as={CategoryIcon} boxSize={5} />
                </Box>
                <VStack align="start" gap={0}>
                  <Text fontWeight="semibold">{category.name}</Text>
                  <Text fontSize="xs" color="fg.muted">
                    {preview || category.details}
                  </Text>
                </VStack>
              </HStack>
            </Link>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default SampleFilesOtherCategories;
