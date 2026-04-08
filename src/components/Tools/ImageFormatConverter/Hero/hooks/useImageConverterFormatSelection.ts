import React from "react";
import {
  getImageConversionRouteByPair,
} from "@/data/tools/imageFormatConverter/imageConversionRoutes";
import type { ImageConversionRoute, ImageFormat } from "@/data/tools/imageFormatConverter/types";

interface InitialRouteInput {
  sourceFormat: ImageFormat;
  targetFormat: ImageFormat;
  path?: string;
  label?: string;
  status?: "active" | "coming_soon";
}

interface UseImageConverterFormatSelectionOptions {
  initialRoute?: InitialRouteInput;
  choosePairMessage: string;
  unavailablePairMessage: string;
  comingSoonMessage: string;
  onRouteChange?: (route: ImageConversionRoute | null) => void;
}

interface UseImageConverterFormatSelectionReturn {
  sourceFormat: string;
  targetFormat: string;
  setSourceFormat: (format: string) => void;
  setTargetFormat: (format: string) => void;
  setFormats: (source: string, target: string) => void;
  route: ImageConversionRoute | null;
  isValid: boolean;
  feedbackMessage: string;
}

export const useImageConverterFormatSelection = (
  options: UseImageConverterFormatSelectionOptions,
): UseImageConverterFormatSelectionReturn => {
  const [sourceFormat, setSourceFormat] = React.useState(
    options.initialRoute?.sourceFormat ?? "",
  );
  const [targetFormat, setTargetFormat] = React.useState(
    options.initialRoute?.targetFormat ?? "",
  );
  const [feedbackMessage, setFeedbackMessage] = React.useState(
    options.initialRoute ? "" : options.choosePairMessage,
  );

  const setFormats = React.useCallback(
    (nextSourceFormat: string, nextTargetFormat: string) => {
      setSourceFormat(nextSourceFormat);
      setTargetFormat(nextTargetFormat);

      if (!nextSourceFormat || !nextTargetFormat) {
        setFeedbackMessage(options.choosePairMessage);
        options.onRouteChange?.(null);
        return;
      }

      if (nextSourceFormat === nextTargetFormat) {
        setFeedbackMessage(options.unavailablePairMessage);
        options.onRouteChange?.(null);
        return;
      }

      const nextRoute = getImageConversionRouteByPair(
        nextSourceFormat as ImageFormat,
        nextTargetFormat as ImageFormat,
      );

      if (!nextRoute) {
        setFeedbackMessage(options.unavailablePairMessage);
        options.onRouteChange?.(null);
        return;
      }

      if (nextRoute.status === "coming_soon") {
        setFeedbackMessage(options.comingSoonMessage);
        options.onRouteChange?.(null);
        return;
      }

      setFeedbackMessage(nextRoute.label);
      options.onRouteChange?.(nextRoute ?? null);
    },
    [options],
  );

  const route = sourceFormat && targetFormat
    ? getImageConversionRouteByPair(
        sourceFormat as ImageFormat,
        targetFormat as ImageFormat,
      ) ?? null
    : null;

  const isValid =
    !!route &&
    route.status === "active" &&
    !!route.outputMimeType &&
    !!route.outputExtension;

  return {
    sourceFormat,
    targetFormat,
    setSourceFormat,
    setTargetFormat,
    setFormats,
    route,
    isValid,
    feedbackMessage,
  };
};