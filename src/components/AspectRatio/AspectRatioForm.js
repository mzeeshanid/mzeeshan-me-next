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
  const fieldValueChanged = (context, isEditing, name) => {
    const { values, errors } = context;

    if (
      !errors.originalWidth &&
      !errors.originalHeight &&
      values.originalWidth.length > 0 &&
      values.originalHeight.length > 0
    ) {
      if (
        (name === "desiredWidth" &&
          isEditing &&
          !errors.desiredWidth &&
          values.desiredWidth.length > 0) ||
        (name === "originalHeight" && isEditing)
      ) {
        const newHeight =
          (parseFloat(values.originalHeight) /
            parseFloat(values.originalWidth)) *
          parseFloat(values.desiredWidth);
        context.setFieldValue("desiredHeight", `${newHeight}`);
      } else if (
        (name === "desiredHeight" &&
          isEditing &&
          !errors.desiredHeight &&
          values.desiredHeight.length > 0) ||
        (name === "originalWidth" && isEditing)
      ) {
        const newWidth =
          (values.desiredHeight * values.originalWidth) / values.originalHeight;
        context.setFieldValue("desiredWidth", `${newWidth}`);
      } else {
      }
    }
  };

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
        valueChanged={fieldValueChanged}
      />
      <AppFormField
        label="Original Height"
        placeholder="Enter original height"
        name={"originalHeight"}
        size="md"
        textColor={theme.colors.black}
        valueChanged={fieldValueChanged}
      />
      <AppFormField
        label="Desired Width"
        placeholder="Enter desired width"
        name={"desiredWidth"}
        size="md"
        textColor={theme.colors.black}
        valueChanged={fieldValueChanged}
      />
      <AppFormField
        label="Desired Height"
        placeholder="Enter desired height"
        name={"desiredHeight"}
        size="md"
        textColor={theme.colors.black}
        valueChanged={fieldValueChanged}
      />
    </AppForm>
  );
}
