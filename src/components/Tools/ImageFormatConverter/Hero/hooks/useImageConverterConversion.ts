import React from "react";
import {
  convertImageInBrowser,
  MAX_IMAGE_CONVERTER_CONCURRENCY,
} from "@/services/imageFormatConverter";
import { getImageConversionRouteByPair } from "@/data/tools/imageFormatConverter/imageConversionRoutes";
import type { ImageFormat } from "@/data/tools/imageFormatConverter/types";
import { buildConvertedFilename, getSizeComparisonLabel, formatBytes } from "../helpers/imageConverterHelpers";
import type { BatchItem } from "./useImageConverterBatch";

type ResizeMode = "width" | "height";

interface UseImageConverterConversionOptions {
  targetFormat: ImageFormat | "";
  quality: number;
  optimizeOutput: boolean;
  resizeEnabled: boolean;
  resizeMode: ResizeMode;
  resizeValue: string;
  onProgress?: (message: string) => void;
}

interface ResizeDimensions {
  width: number;
  height: number;
}

interface UseImageConverterConversionReturn {
  isConverting: boolean;
  overallProgress: number;
  convertItems: (items: BatchItem[], updateItem: (id: string, updater: (item: BatchItem) => BatchItem) => void) => Promise<void>;
}

export const useImageConverterConversion = (
  options: UseImageConverterConversionOptions,
): UseImageConverterConversionReturn => {
  const [isConverting, setIsConverting] = React.useState(false);
  const [overallProgress, setOverallProgress] = React.useState(0);

  const getResizeDimensions = React.useCallback(
    (item: BatchItem): ResizeDimensions | undefined => {
      if (!options.resizeEnabled) {
        return undefined;
      }

      const parsedValue = Number(options.resizeValue);
      if (!Number.isFinite(parsedValue) || parsedValue <= 0) {
        return undefined;
      }

      if (!item.originalWidth || !item.originalHeight) {
        return undefined;
      }

      if (options.resizeMode === "width") {
        const width = Math.max(1, Math.round(parsedValue));
        const height = Math.max(
          1,
          Math.round((item.originalHeight * width) / item.originalWidth),
        );
        return { width, height };
      }

      const height = Math.max(1, Math.round(parsedValue));
      const width = Math.max(
        1,
        Math.round((item.originalWidth * height) / item.originalHeight),
      );
      return { width, height };
    },
    [options.resizeEnabled, options.resizeMode, options.resizeValue],
  );

  const convertItems = async (
    items: BatchItem[],
    updateItem: (id: string, updater: (item: BatchItem) => BatchItem) => void,
  ) => {
    if (!options.targetFormat) {
      options.onProgress?.("Please select a target format.");
      return;
    }

    const conversionCandidates = items.filter((item) => !item.error);
    if (conversionCandidates.length === 0) {
      options.onProgress?.("Add at least one supported image to start conversion.");
      return;
    }

    setIsConverting(true);
    options.onProgress?.("Batch conversion started.");

    const eligibleItems = conversionCandidates.filter((item) => item.sourceFormat);

    items.forEach((item) => {
      if (item.convertedUrl) {
        URL.revokeObjectURL(item.convertedUrl);
      }

      if (!item.sourceFormat) {
        updateItem(item.id, (currentItem) => ({
          ...currentItem,
          status: "error",
          error: item.error ?? "This image format is not supported for conversion.",
          progress: 0,
          convertedBlob: null,
          convertedUrl: null,
          convertedSizeLabel: null,
          sizeComparisonLabel: null,
          outputFileName: null,
          selected: false,
        }));
        return;
      }

      updateItem(item.id, (currentItem) => ({
        ...currentItem,
        status: "queued",
        error: null,
        progress: 0,
        convertedBlob: null,
        convertedUrl: null,
        convertedSizeLabel: null,
        sizeComparisonLabel: null,
        outputFileName: null,
        selected: false,
      }));
    });

    let cursor = 0;
    const workerCount = Math.min(
      MAX_IMAGE_CONVERTER_CONCURRENCY,
      eligibleItems.length,
    );

    const workers = Array.from({ length: workerCount }, async () => {
      while (cursor < eligibleItems.length) {
        const currentIndex = cursor;
        cursor += 1;
        const item = eligibleItems[currentIndex];

        if (!item.sourceFormat) {
          continue;
        }

        const sourceFormat = item.sourceFormat;
        const route = getImageConversionRouteByPair(sourceFormat, options.targetFormat as ImageFormat);

        if (
          !route ||
          route.status !== "active" ||
          !route.outputMimeType ||
          !route.outputExtension
        ) {
          updateItem(item.id, (currentItem) => ({
            ...currentItem,
            status: "error",
            error: `${sourceFormat.toUpperCase()} to ${options.targetFormat.toUpperCase()} is not available yet.`,
            progress: 0,
          }));
          continue;
        }

        updateItem(item.id, (currentItem) => ({
          ...currentItem,
          status: "converting",
          progress: 5,
        }));

        try {
          const resizeDimensions = getResizeDimensions(item);
          const blob = await convertImageInBrowser({
            file: item.file,
            outputMimeType: route.outputMimeType,
            quality: route.supportsQuality && options.optimizeOutput ? options.quality : undefined,
            optimizeOutput: options.optimizeOutput,
            resizeWidth: resizeDimensions?.width,
            resizeHeight: resizeDimensions?.height,
            onProgress: (progress) => {
              updateItem(item.id, (currentItem) => ({
                ...currentItem,
                progress,
                status: progress >= 100 ? currentItem.status : "converting",
              }));
            },
          });

          const previewBlob =
            route.outputMimeType === "image/tiff"
              ? await convertImageInBrowser({
                  file: item.file,
                  outputMimeType: "image/png",
                  optimizeOutput: options.optimizeOutput,
                  resizeWidth: resizeDimensions?.width,
                  resizeHeight: resizeDimensions?.height,
                })
              : blob;

          const convertedUrl = URL.createObjectURL(previewBlob);
          const outputFileName = buildConvertedFilename(
            item.file.name,
            route.outputExtension,
          );

          updateItem(item.id, (currentItem) => ({
            ...currentItem,
            status: "done",
            progress: 100,
            convertedBlob: blob,
            convertedUrl,
            outputFileName,
            convertedSizeLabel: formatBytes(blob.size),
            sizeComparisonLabel: getSizeComparisonLabel(
              item.file.size,
              blob.size,
            ),
          }));
        } catch (error) {
          updateItem(item.id, (currentItem) => ({
            ...currentItem,
            status: "error",
            progress: 100,
            error: error instanceof Error
              ? error.message
              : "This image could not be converted.",
            selected: false,
          }));
        }
      }
    });

    await Promise.all(workers);
    setIsConverting(false);
    options.onProgress?.("Batch conversion finished. Download the results individually or as a bundle.");

    const updatedItems = items.map((item) => {
      const candidate = eligibleItems.find((el) => el.id === item.id);
      return candidate ? item : item;
    });

    const newOverallProgress = updatedItems.length > 0
      ? Math.round(
          updatedItems.reduce((sum, item) => {
            if (item.status === "error") {
              return sum + 100;
            }
            return sum + item.progress;
          }, 0) / updatedItems.length,
        )
      : 0;
    setOverallProgress(newOverallProgress);
  };

  return {
    isConverting,
    overallProgress,
    convertItems,
  };
};