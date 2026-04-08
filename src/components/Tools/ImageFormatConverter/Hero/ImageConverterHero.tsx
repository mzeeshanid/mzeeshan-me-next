import { Box, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";

import { useColorPalette } from "@/contexts/useColorPalette";
import type {
  HeroContent,
  ImageFormat,
} from "@/data/tools/imageFormatConverter/types";
import {
  ImageConverterControls,
  ImageConverterSettings,
} from "./components/ImageConverterControls";
import { ImageConverterUploadArea } from "./components/ImageConverterUploadArea";
import {
  ImageConverterBatchGrid,
  ImageConverterBatchProgress,
  ImageConverterBatchActions,
} from "./components/ImageConverterBatchGrid";
import { useImageConverterBatch } from "./hooks/useImageConverterBatch";
import { useImageConverterFormatSelection } from "./hooks/useImageConverterFormatSelection";
import { useImageConverterConversion } from "./hooks/useImageConverterConversion";
import { useImageConverterDownload } from "./hooks/useImageConverterDownload";

type ResizeMode = "width" | "height";

type Props = {
  content: HeroContent;
  currentRoute?:
    | { sourceFormat: string; targetFormat: string; path: string }
    | undefined;
};

const ImageConverterHero: React.FC<Props> = ({ content, currentRoute }) => {
  const { palette } = useColorPalette();

  const [quality, setQuality] = React.useState(0.8);
  const [optimizeOutput, setOptimizeOutput] = React.useState(false);
  const [resizeEnabled, setResizeEnabled] = React.useState(false);
  const [resizeMode, setResizeMode] = React.useState<ResizeMode>("width");
  const [resizeValue, setResizeValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = React.useState("");

  const formatSelection = useImageConverterFormatSelection({
    initialRoute: currentRoute
      ? {
          sourceFormat: currentRoute.sourceFormat as ImageFormat,
          targetFormat: currentRoute.targetFormat as ImageFormat,
        }
      : undefined,
    choosePairMessage: content.choosePairMessage,
    unavailablePairMessage: content.unavailablePairMessage,
    comingSoonMessage: content.comingSoonMessage,
    onRouteChange: (route) => {
      if (!route) {
        setFeedbackMessage("");
      }
    },
  });

  const batch = useImageConverterBatch({
    onError: setErrorMessage,
  });

  const conversion = useImageConverterConversion({
    targetFormat: formatSelection.targetFormat as ImageFormat,
    quality,
    optimizeOutput,
    resizeEnabled,
    resizeMode,
    resizeValue,
    onProgress: setFeedbackMessage,
  });

  const download = useImageConverterDownload({
    targetFormat: formatSelection.targetFormat,
    onProgress: setFeedbackMessage,
  });

  React.useEffect(() => {
    if (currentRoute) {
      formatSelection.setFormats(
        currentRoute.sourceFormat,
        currentRoute.targetFormat,
      );
    }
  }, [currentRoute]);

  React.useEffect(() => {
    if (!currentRoute) {
      setFeedbackMessage(content.choosePairMessage);
    }
  }, [content.choosePairMessage, currentRoute]);

  const handleFilesAccepted = async (files: File[]) => {
    setErrorMessage(null);

    const inferredFormat = files
      .map((file) => {
        const mimeType = file.type.toLowerCase();
        const name = file.name.toLowerCase();
        if (mimeType === "image/png" || name.endsWith(".png")) return "png";
        if (
          mimeType === "image/jpeg" ||
          mimeType === "image/jpg" ||
          name.endsWith(".jpg") ||
          name.endsWith(".jpeg")
        )
          return "jpg";
        if (mimeType === "image/webp" || name.endsWith(".webp")) return "webp";
        if (
          mimeType === "image/tiff" ||
          name.endsWith(".tiff") ||
          name.endsWith(".tif")
        )
          return "tiff";
        if (mimeType === "image/bmp" || name.endsWith(".bmp")) return "bmp";
        if (mimeType === "image/gif" || name.endsWith(".gif")) return "gif";
        if (mimeType === "image/heic" || mimeType === "image/heif" || name.endsWith(".heic") || name.endsWith(".heif")) return "heic";
        if (mimeType === "image/avif" || name.endsWith(".avif")) return "avif";
        if (mimeType === "image/x-icon" || mimeType === "image/vnd.microsoft.icon" || name.endsWith(".ico")) return "ico";
        return null;
      })
      .find(Boolean);

    if (inferredFormat && inferredFormat !== formatSelection.sourceFormat) {
      formatSelection.setFormats(inferredFormat, formatSelection.targetFormat);
    }

    await batch.addFiles(files, inferredFormat as ImageFormat | undefined);
  };

  const handleConvert = async () => {
    await conversion.convertItems(batch.items, batch.updateItem);
  };

  const handleToggleSelected = (id: string, checked: boolean) => {
    batch.updateItem(id, (item) => ({ ...item, selected: checked }));
  };

  const firstResizableItem =
    batch.items.find(
      (item) => !item.error && item.originalWidth && item.originalHeight,
    ) ?? null;

  const hasSameFormatSelection =
    !!formatSelection.sourceFormat &&
    !!formatSelection.targetFormat &&
    formatSelection.sourceFormat === formatSelection.targetFormat;

  const sameFormatMessage = hasSameFormatSelection
    ? `${formatSelection.sourceFormat.toUpperCase()} to ${formatSelection.targetFormat.toUpperCase()} isn't available. Select a different format.`
    : "";

  const selectedSuccessfulItems = batch.getSelectedItems();
  const successfulItems = batch.getSuccessfulItems();

  const overallProgress =
    batch.items.length > 0
      ? Math.round(
          batch.items.reduce((sum, item) => {
            if (item.status === "error") return sum + 100;
            return sum + item.progress;
          }, 0) / batch.items.length,
        )
      : 0;

  return (
    <Box as="section">
      <VStack align="stretch" gap={6} p={{ base: 5, md: 8 }}>
        <Stack gap={3}>
          <Text color={`${palette}.solid`} fontWeight="medium">
            {content.badge}
          </Text>
          <Heading as="h1" size={{ base: "2xl", md: "4xl" }}>
            {content.title}
          </Heading>
          <Text color="fg.muted" maxW="2xl">
            {content.description}
          </Text>
        </Stack>

        <VStack
          align="stretch"
          gap={5}
          bg="bg.subtle"
          p={{ base: 5, md: 6 }}
          borderRadius="2xl"
          border="1px solid"
          borderColor="border"
        >
          <ImageConverterControls
            sourceFormat={formatSelection.sourceFormat}
            targetFormat={formatSelection.targetFormat}
            content={content}
            onSourceFormatChange={(format) =>
              formatSelection.setFormats(format, formatSelection.targetFormat)
            }
            onTargetFormatChange={(format) =>
              formatSelection.setFormats(formatSelection.sourceFormat, format)
            }
            sameFormatMessage={sameFormatMessage}
          />

          <ImageConverterUploadArea
            fileCount={batch.items.length}
            accept="image/heic,image/heif,image/*"
            disabled={conversion.isConverting}
            error={errorMessage}
            onFilesAccepted={handleFilesAccepted}
            onFilesRemoved={batch.clearItems}
          />

          <ImageConverterSettings
            targetFormat={formatSelection.targetFormat}
            quality={quality}
            optimizeOutput={optimizeOutput}
            resizeEnabled={resizeEnabled}
            resizeMode={resizeMode}
            resizeValue={resizeValue}
            firstResizableItem={
              firstResizableItem
                ? {
                    originalWidth: firstResizableItem.originalWidth!,
                    originalHeight: firstResizableItem.originalHeight!,
                  }
                : null
            }
            content={content}
            onQualityChange={setQuality}
            onOptimizeOutputChange={setOptimizeOutput}
            onResizeEnabledChange={setResizeEnabled}
            onResizeModeChange={setResizeMode}
            onResizeValueChange={setResizeValue}
          />

          {formatSelection.targetFormat === "jpg" && (
            <Text fontSize="sm" color="fg.warning">
              {content.transparencyNote}
            </Text>
          )}

          {batch.items.length > 0 && (
            <ImageConverterBatchProgress
              totalItems={batch.items.length}
              successfulCount={successfulItems.length}
              errorCount={batch.getErrorCount()}
              activeCount={batch.getActiveCount()}
              overallProgress={overallProgress}
            />
          )}

          <ImageConverterBatchActions
            hasItems={batch.items.length > 0}
            hasTargetFormat={!!formatSelection.targetFormat}
            isConverting={conversion.isConverting}
            isDownloadingZip={download.isDownloadingZip}
            hasSameFormatSelection={hasSameFormatSelection}
            successfulCount={successfulItems.length}
            selectedCount={selectedSuccessfulItems.length}
            onConvert={handleConvert}
            onDownloadSelected={() => download.downloadSelected(batch.items)}
            onDownloadAll={() => download.downloadAll(batch.items)}
            onReset={batch.clearItems}
          />

          {feedbackMessage && <Text color="fg.muted">{feedbackMessage}</Text>}
        </VStack>

        <ImageConverterBatchGrid
          items={batch.items.map((item) => ({
            id: item.id,
            fileName: item.fileName,
            previewUrl: item.previewUrl,
            sourceFormat: item.sourceFormat,
            progress: item.progress,
            status: item.status,
            error: item.error,
            selected: item.selected,
            outputFileName: item.outputFileName,
            convertedUrl: item.convertedUrl,
            convertedSizeLabel: item.convertedSizeLabel,
            sizeComparisonLabel: item.sizeComparisonLabel,
            originalSizeLabel: item.originalSizeLabel,
            isLoadingPreview: item.isLoadingPreview,
          }))}
          onToggleSelected={handleToggleSelected}
          onDownload={(id) => {
            const item = batch.items.find((i) => i.id === id);
            if (item) download.downloadSingle(item);
          }}
          onRemove={batch.removeItem}
        />
      </VStack>
    </Box>
  );
};

export default ImageConverterHero;