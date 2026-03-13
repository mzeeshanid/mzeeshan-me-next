import { useFormikContext } from "formik";
import { useEffect } from "react";
import { AspectRatioFormValues } from "./AspectRatioForm";

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

  useEffect(() => {
    if (
      errors.originalWidth ||
      errors.originalHeight ||
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

    if (lastEdited === "desiredWidth" && desiredWidth && !errors.desiredWidth) {
      const dw = Number(desiredWidth);
      const newHeight = (oh / ow) * dw;

      const dh = roundValues ? Math.round(newHeight) : newHeight.toFixed(2);
      setFieldValue("desiredHeight", dh, true);

      onFormValuesChange({
        originalWidth: `${ow}`,
        originalHeight: `${oh}`,
        desiredWidth: `${dw}`,
        desiredHeight: `${dh}`,
      });
    }

    if (
      lastEdited === "desiredHeight" &&
      desiredHeight &&
      !errors.desiredHeight
    ) {
      const dh = Number(desiredHeight);
      const newWidth = (dh * ow) / oh;
      const dw = roundValues ? Math.round(newWidth) : newWidth.toFixed(2);

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
    errors,
    lastEdited,
    setFieldValue,
  ]);

  return null;
};

export default AspectRatioWatcher;
