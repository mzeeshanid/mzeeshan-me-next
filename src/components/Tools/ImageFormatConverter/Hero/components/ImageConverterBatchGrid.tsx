import {
  Box,
  Button,
  HStack,
  Progress,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import ImageConverterBatchItem, {
  type ImageConverterBatchItemModel,
} from "../ImageConverterBatchItem";
import { ImageGalleryProvider } from "@/components/ImageGallery/ImageGalleryContext";
import { useColorPalette } from "@/contexts/useColorPalette";

interface ImageConverterBatchGridProps {
  items: ImageConverterBatchItemModel[];
  onToggleSelected: (id: string, checked: boolean) => void;
  onDownload: (id: string) => void;
  onRemove: (id: string) => void;
}

export const ImageConverterBatchGrid: React.FC<
  ImageConverterBatchGridProps
> = ({ items, onToggleSelected, onDownload, onRemove }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <ImageGalleryProvider
      images={items.map((item) => ({
        src: item.convertedUrl ?? item.previewUrl,
        alt: item.fileName,
      }))}
    >
      <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} gap={4}>
        {items.map((item, index) => (
          <ImageConverterBatchItem
            key={item.id}
            item={item}
            index={index}
            onToggleSelected={onToggleSelected}
            onDownload={onDownload}
            onRemove={onRemove}
          />
        ))}
      </SimpleGrid>
    </ImageGalleryProvider>
  );
};

interface ImageConverterBatchProgressProps {
  totalItems: number;
  successfulCount: number;
  errorCount: number;
  activeCount: number;
  overallProgress: number;
}

export const ImageConverterBatchProgress: React.FC<
  ImageConverterBatchProgressProps
> = ({
  totalItems,
  successfulCount,
  errorCount,
  activeCount,
  overallProgress,
}) => {
  const { palette } = useColorPalette();

  return (
    <Box borderWidth="1px" borderRadius="2xl" bg="bg" p={4}>
      <VStack align="stretch" gap={3}>
        <HStack justify="space-between" flexWrap="wrap">
          <Text fontWeight="semibold">{"Batch progress"}</Text>
          <Text color="fg.muted" fontSize="sm">
            {`${successfulCount}/${totalItems} converted • ${errorCount} errors • ${activeCount} active`}
          </Text>
        </HStack>
        <Progress.Root
          w="full"
          value={overallProgress}
          animated
          colorPalette={palette}
        >
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
        <Text color="fg.muted" fontSize="sm">
          {totalItems > 0
            ? `Overall progress: ${overallProgress}%`
            : "Add images to start a batch."}
        </Text>
      </VStack>
    </Box>
  );
};

interface ImageConverterBatchActionsProps {
  hasItems: boolean;
  hasTargetFormat: boolean;
  isConverting: boolean;
  isDownloadingZip: boolean;
  hasSameFormatSelection: boolean;
  successfulCount: number;
  selectedCount: number;
  onConvert: () => void;
  onDownloadSelected: () => void;
  onDownloadAll: () => void;
  onReset: () => void;
}

export const ImageConverterBatchActions: React.FC<
  ImageConverterBatchActionsProps
> = ({
  hasItems,
  hasTargetFormat,
  isConverting,
  isDownloadingZip,
  hasSameFormatSelection,
  successfulCount,
  selectedCount,
  onConvert,
  onDownloadSelected,
  onDownloadAll,
  onReset,
}) => {
  const { palette } = useColorPalette();

  if (!hasItems) {
    return null;
  }

  return (
    <HStack flexWrap="wrap" gap={3}>
      <Button
        colorPalette={palette}
        onClick={onConvert}
        loading={isConverting}
        disabled={
          !hasTargetFormat || isDownloadingZip || hasSameFormatSelection
        }
      >
        {isConverting ? "Converting..." : "Convert Images"}
      </Button>
      <Button
        colorPalette={palette}
        variant="surface"
        onClick={onDownloadSelected}
        disabled={selectedCount === 0 || isConverting || isDownloadingZip}
      >
        {"Download Selected"}
      </Button>
      <Button
        colorPalette={palette}
        variant="surface"
        onClick={onDownloadAll}
        disabled={successfulCount === 0 || isConverting || isDownloadingZip}
      >
        {"Download All"}
      </Button>
      <Button
        colorPalette={palette}
        variant="ghost"
        onClick={onReset}
        disabled={isConverting || isDownloadingZip}
      >
        {"Reset"}
      </Button>
    </HStack>
  );
};
