import React from "react";
import {
  Box,
  VStack,
  Spinner,
  Button,
  Table,
  Center,
  Text,
  Link,
} from "@chakra-ui/react";
import {
  fetchSampleFilesExtensionsNextJs,
  SampleFilesExtensionModel,
} from "@/apis/sampleFiles/sampleFilesExtension";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { useColorPalette } from "@/contexts/useColorPalette";
import { SampleFilesCategoryModel } from "@/apis/sampleFiles/sampleFilesCategories";

type HeaderProps = {
  badge?: string;
  title: string;
  detail?: string;
};

type Props = {
  initialExtensions?: SampleFilesExtensionModel[];
  initialTotal?: number;
  headerProps: HeaderProps;
  categorySlug?: string;
};

const SampleFilesExtensions: React.FC<Props> = (props: Props) => {
  const ITEMS_PER_PAGE = 10;
  const { palette } = useColorPalette();

  const [extensions, setExtensions] = React.useState<
    SampleFilesExtensionModel[]
  >(props.initialExtensions || []);
  const [isLoading, setIsLoading] = React.useState(false);
  const [totalItems, setTotalItems] = React.useState(props.initialTotal || 0);
  const [currentPage, setCurrentPage] = React.useState(1);

  // Set total items from initial props
  React.useEffect(() => {
    if (props.initialTotal) {
      setTotalItems(props.initialTotal);
    }
  }, [props.initialTotal]);

  const loadMore = async () => {
    try {
      setIsLoading(true);
      const nextPage = currentPage + 1;
      const response = await fetchSampleFilesExtensionsNextJs(
        undefined,
        ITEMS_PER_PAGE,
        nextPage,
        props.categorySlug,
      );

      // Append new results to existing ones
      setExtensions((prev) => [...prev, ...(response.data || [])]);
      setTotalItems(response.meta?.pagination?.total || totalItems);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Failed to load more extensions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const hasMorePages = currentPage < totalPages;

  // Get category name from extension if not provided in header
  const getCategoryName = (extension: SampleFilesExtensionModel) => {
    const type = extension.type as SampleFilesCategoryModel;
    return type?.name || "Unknown";
  };

  return (
    <Box as="section" py={8} px={{ base: 4, md: 8 }}>
      <VStack gap={8} alignItems="start" w="full">
        <SectionHeader
          tagline={props.headerProps.badge}
          headline={props.headerProps.title}
          description={props.headerProps.detail}
        />

        {extensions.length > 0 ? (
          <>
            <Box w="full" overflowX="auto">
              <Table.Root size="md" variant="outline" interactive striped>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>{"Extension"}</Table.ColumnHeader>
                    <Table.ColumnHeader>{"Category"}</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="right">
                      {"Action"}
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {extensions.map((extension, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>
                        <VStack alignItems="flex-start" gap={0}>
                          <Text fontWeight="bold">{extension.name}</Text>
                          <Text fontSize="sm" color="fg.muted">
                            {extension.info}
                          </Text>
                        </VStack>
                      </Table.Cell>
                      <Table.Cell color="fg.muted">
                        {getCategoryName(extension)}
                      </Table.Cell>
                      <Table.Cell textAlign="right">
                        <Link
                          href={`/tools/sample-files/extensions/${extension.slug}`}
                        >
                          <Button
                            size="sm"
                            colorPalette={palette}
                            variant="surface"
                          >
                            {"Size"}
                          </Button>
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Box>

            {hasMorePages && (
              <Center w="full" mt={2}>
                {isLoading ? (
                  <Spinner size="md" />
                ) : (
                  <Button
                    onClick={loadMore}
                    colorPalette={palette}
                    variant="solid"
                  >
                    {"Load More"}
                  </Button>
                )}
              </Center>
            )}
          </>
        ) : (
          <Center w="full" py={12}>
            <Text>{"No extensions found"}</Text>
          </Center>
        )}
      </VStack>
    </Box>
  );
};

export default SampleFilesExtensions;
