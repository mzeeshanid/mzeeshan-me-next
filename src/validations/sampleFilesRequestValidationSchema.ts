import * as Yup from "yup";

export const sampleFilesRequestValidationSchema = Yup.object().shape({
  extension: Yup.string()
    .required("File extension is required")
    .min(2, "Extension must be at least 2 characters")
    .max(20, "Extension must not exceed 20 characters")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Extension can only contain letters and numbers",
    ),
  email: Yup.string().email("Please enter a valid email address").optional(),
});
