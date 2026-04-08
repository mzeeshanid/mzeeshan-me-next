import React from "react";
import JSZip from "jszip";
import { triggerDownload } from "../helpers/imageConverterHelpers";
import type { BatchItem } from "./useImageConverterBatch";

interface UseImageConverterDownloadOptions {
  targetFormat: string;
  onProgress?: (message: string) => void;
}

interface UseImageConverterDownloadReturn {
  isDownloadingZip: boolean;
  downloadSingle: (item: BatchItem) => void;
  downloadSelected: (items: BatchItem[]) => Promise<void>;
  downloadAll: (items: BatchItem[]) => Promise<void>;
}

export const useImageConverterDownload = (
  options: UseImageConverterDownloadOptions,
): UseImageConverterDownloadReturn => {
  const [isDownloadingZip, setIsDownloadingZip] = React.useState(false);

  const getDownloadableItems = (
    items: BatchItem[],
    mode: "selected" | "all",
  ): BatchItem[] => {
    return items.filter((item) => {
      if (item.status !== "done" || !item.convertedBlob || !item.outputFileName) {
        return false;
      }
      if (mode === "selected") {
        return item.selected;
      }
      return true;
    });
  };

  const downloadSingle = (item: BatchItem) => {
    if (!item.convertedBlob || !item.outputFileName) {
      return;
    }
    const downloadUrl = URL.createObjectURL(item.convertedBlob);
    triggerDownload(downloadUrl, item.outputFileName);
    URL.revokeObjectURL(downloadUrl);
  };

  const downloadSelected = async (items: BatchItem[]) => {
    const downloadableItems = getDownloadableItems(items, "selected");

    if (downloadableItems.length === 0) {
      options.onProgress?.("Select at least one converted image to download as a bundle.");
      return;
    }

    setIsDownloadingZip(true);
    const zip = new JSZip();

    downloadableItems.forEach((item) => {
      zip.file(item.outputFileName!, item.convertedBlob!);
    });

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const zipUrl = URL.createObjectURL(zipBlob);
    const zipFileName = `${options.targetFormat || "converted"}-selected-images.zip`;

    triggerDownload(zipUrl, zipFileName);
    URL.revokeObjectURL(zipUrl);
    setIsDownloadingZip(false);
  };

  const downloadAll = async (items: BatchItem[]) => {
    const downloadableItems = getDownloadableItems(items, "all");

    if (downloadableItems.length === 0) {
      options.onProgress?.("There are no converted images ready to download yet.");
      return;
    }

    setIsDownloadingZip(true);
    const zip = new JSZip();

    downloadableItems.forEach((item) => {
      zip.file(item.outputFileName!, item.convertedBlob!);
    });

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const zipUrl = URL.createObjectURL(zipBlob);
    const zipFileName = `${options.targetFormat || "converted"}-all-images.zip`;

    triggerDownload(zipUrl, zipFileName);
    URL.revokeObjectURL(zipUrl);
    setIsDownloadingZip(false);
  };

  return {
    isDownloadingZip,
    downloadSingle,
    downloadSelected,
    downloadAll,
  };
};