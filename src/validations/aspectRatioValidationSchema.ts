import * as Yup from "yup";
import type { AspectRatioFormValues } from "@/utils/aspectRatio";

export const aspectRatioValidationSchema: Yup.ObjectSchema<AspectRatioFormValues> =
  Yup.object({
    originalWidth: Yup.string()
      .required("Enter original width")
      .test("is-positive-number", "Enter a valid positive number", (value) => {
        if (!value) return false;
        const num = Number(value);
        return !isNaN(num) && num > 0;
      }),
    originalHeight: Yup.string()
      .required("Enter original height")
      .test("is-positive-number", "Enter a valid positive number", (value) => {
        if (!value) return false;
        const num = Number(value);
        return !isNaN(num) && num > 0;
      }),
    desiredWidth: Yup.string()
      .optional()
      .test("is-positive-number", "Enter a valid positive number", (value) => {
        if (!value) return true;
        const num = Number(value);
        return !isNaN(num) && num > 0;
      }),
    desiredHeight: Yup.string()
      .optional()
      .test("is-positive-number", "Enter a valid positive number", (value) => {
        if (!value) return true;
        const num = Number(value);
        return !isNaN(num) && num > 0;
      }),
  }).test(
    "one-dimension-required",
    "Enter either desired width or desired height",
    (values) => !!values?.desiredWidth?.trim() || !!values?.desiredHeight?.trim(),
  );
