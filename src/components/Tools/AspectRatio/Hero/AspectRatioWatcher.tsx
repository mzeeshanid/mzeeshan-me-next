import { useFormikContext } from "formik";
import { useEffect } from "react";
import {
  calculateMissingAspectRatioDimension,
  type AspectRatioFormValues,
} from "@/utils/aspectRatio";

type AspectRatioWatcherProps = {
  lastEdited?: "desiredWidth" | "desiredHeight";
  roundValues: boolean;
  onFormValuesChange: (values: AspectRatioFormValues) => void;
};

const AspectRatioWatcher: React.FC<AspectRatioWatcherProps> = (
  props: AspectRatioWatcherProps,
) => {
  const { lastEdited, roundValues, onFormValuesChange } = props;
  const { values, errors, setFieldValue } =
    useFormikContext<AspectRatioFormValues>();

  const { originalWidth, originalHeight, desiredWidth, desiredHeight } = values;
  const errorOriginalWidth = errors.originalWidth;
  const errorOriginalHeight = errors.originalHeight;
  const errorDesiredWidth = errors.desiredWidth;
  const errorDesiredHeight = errors.desiredHeight;

  useEffect(() => {
    if (
      errorOriginalWidth ||
      errorOriginalHeight ||
      !originalWidth ||
      !originalHeight ||
      !lastEdited
    ) {
      onFormValuesChange({
        originalWidth: `${originalWidth}`,
        originalHeight: `${originalHeight}`,
        desiredWidth: ``,
        desiredHeight: ``,
      });
      return;
    }

    const ow = Number(originalWidth);
    const oh = Number(originalHeight);

    if (lastEdited === "desiredWidth" && desiredWidth && !errorDesiredWidth) {
      const dw = Number(desiredWidth);
      const { desiredHeight: dh } = calculateMissingAspectRatioDimension({
        originalWidth: ow,
        originalHeight: oh,
        desiredWidth: dw,
        roundValues,
        lastEdited: "desiredWidth",
      });
      setFieldValue("desiredHeight", dh, true);

      onFormValuesChange({
        originalWidth: `${ow}`,
        originalHeight: `${oh}`,
        desiredWidth: `${dw}`,
        desiredHeight: `${dh}`,
      });
    }

    if (lastEdited === "desiredHeight" && desiredHeight && !errorDesiredHeight) {
      const dh = Number(desiredHeight);
      const { desiredWidth: dw } = calculateMissingAspectRatioDimension({
        originalWidth: ow,
        originalHeight: oh,
        desiredHeight: dh,
        roundValues,
        lastEdited: "desiredHeight",
      });

      setFieldValue("desiredWidth", dw, true);

      onFormValuesChange({
        originalWidth: `${ow}`,
        originalHeight: `${oh}`,
        desiredWidth: `${dw}`,
        desiredHeight: `${dh}`,
      });
    }
  }, [
    originalWidth,
    originalHeight,
    desiredWidth,
    desiredHeight,
    errorOriginalWidth,
    errorOriginalHeight,
    errorDesiredWidth,
    errorDesiredHeight,
    lastEdited,
    setFieldValue,
  ]);

  return null;
};

export default AspectRatioWatcher;
