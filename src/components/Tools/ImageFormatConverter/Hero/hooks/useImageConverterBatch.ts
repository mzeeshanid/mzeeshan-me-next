import React from "react";
import { inferImageFormat as inferFormat, MAX_IMAGE_CONVERTER_FILES, isHeicFile } from "@/services/imageFormatConverter";
import {
  validateImageFile,
  type ImageValidationResult,
} from "../validations/imageConverterValidation";
import { buildItemId, buildUniqueItemId, formatBytes } from "../helpers/imageConverterHelpers";
import type { ImageFormat } from "@/data/tools/imageFormatConverter/types";

export type BatchItemStatus = "pending" | "queued" | "converting" | "done" | "error";

export type BatchItem = {
  id: string;
  file: File;
  fileName: string;
  previewUrl: string;
  sourceFormat: ImageFormat | null;
  progress: number;
  status: BatchItemStatus;
  error: string | null;
  selected: boolean;
  outputFileName: string | null;
  convertedUrl: string | null;
  convertedBlob: Blob | null;
  convertedSizeLabel: string | null;
  sizeComparisonLabel: string | null;
  originalSizeLabel: string;
  originalWidth: number | null;
  originalHeight: number | null;
  isLoadingPreview: boolean;
};

interface UseImageConverterBatchOptions {
  onError?: (message: string) => void;
}

interface UseImageConverterBatchReturn {
  items: BatchItem[];
  addFiles: (files: File[], expectedFormat?: ImageFormat) => Promise<void>;
  updateItem: (id: string, updater: (item: BatchItem) => BatchItem) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;
  getSelectedItems: () => BatchItem[];
  getSuccessfulItems: () => BatchItem[];
  getErrorCount: () => number;
  getActiveCount: () => number;
}

export const useImageConverterBatch = (
  options: UseImageConverterBatchOptions = {},
): UseImageConverterBatchReturn => {
  const [items, setItems] = React.useState<BatchItem[]>([]);

  React.useEffect(() => {
    return () => {
      items.forEach((item) => {
        URL.revokeObjectURL(item.previewUrl);
        if (item.convertedUrl) {
          URL.revokeObjectURL(item.convertedUrl);
        }
      });
    };
  }, [items]);

  const createPreviewUrl = async (file: File): Promise<string> => {
    if (isHeicFile(file)) {
      const { heicTo } = await import("heic-to");
      const blob = await heicTo({
        blob: file,
        type: "image/png",
      });
      return URL.createObjectURL(blob);
    }
    return URL.createObjectURL(file);
  };

  const createBatchItems = async (
    files: File[],
    expectedFormat?: ImageFormat,
  ): Promise<BatchItem[]> => {
    const existingCount = items.length;
    const newItems: BatchItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const tempPreviewUrl = URL.createObjectURL(file);
      const itemId = buildUniqueItemId(file, i, existingCount);

      newItems.push({
        id: itemId,
        file,
        fileName: file.name,
        previewUrl: tempPreviewUrl,
        sourceFormat: null,
        progress: 0,
        status: "pending",
        error: null,
        selected: false,
        outputFileName: null,
        convertedUrl: null,
        convertedBlob: null,
        convertedSizeLabel: null,
        sizeComparisonLabel: null,
        originalSizeLabel: formatBytes(file.size),
        originalWidth: null,
        originalHeight: null,
        isLoadingPreview: true,
      });
    }

    setItems((current) => [...current, ...newItems]);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const itemId = buildUniqueItemId(file, i, existingCount);

      try {
        const validation = await validateImageFile(file, expectedFormat);
        const previewUrl = await createPreviewUrl(file);
        const sourceFormat = inferFormat(file);

        setItems((current) =>
          current.map((item) => {
            if (item.id !== itemId) return item;
            return {
              ...item,
              previewUrl,
              sourceFormat: validation.valid ? sourceFormat : null,
              status: validation.valid ? "pending" : "error",
              error: validation.error,
              originalWidth: validation.dimensions?.width ?? null,
              originalHeight: validation.dimensions?.height ?? null,
              isLoadingPreview: false,
            };
          }),
        );
      } catch {
        setItems((current) =>
          current.map((item) => {
            if (item.id !== itemId) return item;
            return {
              ...item,
              status: "error",
              error: "Failed to process image",
              isLoadingPreview: false,
            };
          }),
        );
      }
    }

    return newItems;
  };

  const addFiles = async (files: File[], expectedFormat?: ImageFormat) => {
    const remainingSlots = MAX_IMAGE_CONVERTER_FILES - items.length;

    if (remainingSlots <= 0) {
      options.onError?.("You can select up to 20 images at a time.");
      return;
    }

    const acceptedFiles = files.slice(0, remainingSlots);
    if (files.length > acceptedFiles.length) {
      options.onError?.("Only the first 20 images are kept in the batch.");
    }

    await createBatchItems(acceptedFiles, expectedFormat);
  };

  const updateItem = React.useCallback(
    (id: string, updater: (item: BatchItem) => BatchItem) => {
      setItems((current) =>
        current.map((item) => {
          if (item.id !== id) return item;
          return updater(item);
        }),
      );
    },
    [],
  );

  const removeItem = (id: string) => {
    setItems((current) => {
      const itemToRemove = current.find((item) => item.id === id);
      if (itemToRemove) {
        URL.revokeObjectURL(itemToRemove.previewUrl);
        if (itemToRemove.convertedUrl) {
          URL.revokeObjectURL(itemToRemove.convertedUrl);
        }
      }
      return current.filter((item) => item.id !== id);
    });
  };

  const clearItems = () => {
    setItems((current) => {
      current.forEach((item) => {
        URL.revokeObjectURL(item.previewUrl);
        if (item.convertedUrl) {
          URL.revokeObjectURL(item.convertedUrl);
        }
      });
      return [];
    });
  };

  const getSelectedItems = () =>
    items.filter((item) => item.selected && item.status === "done");

  const getSuccessfulItems = () =>
    items.filter((item) => item.status === "done");

  const getErrorCount = () =>
    items.filter((item) => item.status === "error").length;

  const getActiveCount = () =>
    items.filter(
      (item) => item.status === "queued" || item.status === "converting",
    ).length;

  return {
    items,
    addFiles,
    updateItem,
    removeItem,
    clearItems,
    getSelectedItems,
    getSuccessfulItems,
    getErrorCount,
    getActiveCount,
  };
};