import React from "react";
import AppForm from "../AppForm";
import * as Yup from "yup";
import AppFormField from "../AppFormField";
import theme from "@chakra-ui/theme";

const validationSchema = Yup.object().shape({
  originalWidth: Yup.number()
    .required("Enter original width")
    .positive("Enter a positive number")
    .typeError("Enter a valid number"),
  originalHeight: Yup.number()
    .required("Enter original height")
    .positive("Enter a positive number")
    .typeError("Enter a valid number"),
  desiredWidth: Yup.number()
    .optional("Enter desired width")
    .positive("Enter a positive number")
    .typeError("Enter a valid number"),
  desiredHeight: Yup.number()
    .optional("Enter desired height")
    .positive("Enter a positive number")
    .typeError("Enter a valid number"),
});

export default function AspectRatioForm() {
  return (
    <AppForm
      initialValues={{
        originalWidth: "",
        originalHeight: "",
        desiredWidth: "",
        desiredHeight: "",
      }}
      onSubmit={(values, { resetForm }) => {}}
      validationSchema={validationSchema}
    >
      <AppFormField
        label="Original Width"
        placeholder="Enter original width"
        name={"originalWidth"}
        size="md"
        textColor={theme.colors.black}
      />
      <AppFormField
        label="Original Height"
        placeholder="Enter original height"
        name={"originalHeight"}
        size="md"
        textColor={theme.colors.black}
      />
    </AppForm>
  );
}
