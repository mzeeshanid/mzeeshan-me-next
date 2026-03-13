import {
  SampleFilesExtensionDetailModel,
  SampleFileVariantModel,
} from "@/apis/sampleFiles/sampleFilesExtensionDetails";
import { incrementVariantDownloadCount } from "@/apis/sampleFiles/sampleFilesVariant";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { useColorPalette } from "@/contexts/useColorPalette";
import {
  Box,
  Button,
  Link,
  Spacer,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  extension: SampleFilesExtensionDetailModel;
}

const ExtensionVariants: React.FC<Props> = (props) => {
  const { extension } = props;
  const variants = extension.variants || [];
  const { palette } = useColorPalette();
  const [downloadingId, setDownloadingId] = React.useState<string | null>(null);

  const handleDownload = async (variant: SampleFileVariantModel) => {
    try {
      if (!variant.url) {
        console.error("Download URL not available");
        return;
      }

      setDownloadingId(variant.documentId);

      // Update download count
      await incrementVariantDownloadCount(variant.documentId);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setDownloadingId(null);
    }
  };

  if (!variants || variants.length === 0) {
    return (
      <VStack gap={4}>
        <Text color="fg.muted">
          {"No variants available for this extension."}
        </Text>
      </VStack>
    );
  }

  return (
    <Box as="section">
      <SectionHeader
        tagline="Details"
        headline={extension.name}
        description={extension.info}
      />
      <Spacer p={4} />
      <Box style={{ overflowX: "auto", width: "100%" }}>
        <Table.Root size="sm" variant="outline" interactive>
          <Table.Caption>
            <Text color={"fg.muted"} mt={4} textAlign="center">
              {"Available File Extensions"}
            </Text>
          </Table.Caption>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader fontWeight={"bold"}>
                {"Title"}
              </Table.ColumnHeader>
              <Table.ColumnHeader fontWeight={"bold"}>
                {"Size"}
              </Table.ColumnHeader>
              <Table.ColumnHeader fontWeight={"bold"}>
                {"Downloads"}
              </Table.ColumnHeader>
              <Table.ColumnHeader fontWeight={"bold"} textAlign="end">
                {"Action"}
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {variants.map((variant) => (
              <Table.Row key={variant.documentId}>
                <Table.Cell fontWeight="medium">{variant.name}</Table.Cell>
                <Table.Cell color="fg.muted">{variant.size}</Table.Cell>
                <Table.Cell color="fg.muted">
                  {variant.downloads || 0}
                </Table.Cell>
                <Table.Cell textAlign="end">
                  <Link href={variant.url}>
                    <Button
                      variant="surface"
                      loading={downloadingId === variant.documentId}
                      size="sm"
                      colorPalette={palette}
                      onClick={() => handleDownload(variant)}
                      disabled={downloadingId !== null}
                    >
                      {"Download"}
                    </Button>
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
};

export default ExtensionVariants;
