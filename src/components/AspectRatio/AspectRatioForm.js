import React from "react";
import AppForm from "../AppForm";
import * as Yup from "yup";
import AppFormField from "../AppFormField";
import theme from "@chakra-ui/theme";
import AppFormButton from "../AppFormButton";
import { LightMode } from "@chakra-ui/color-mode";
import { Center, VStack, Box, SimpleGrid, Divider } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";

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

export default function AspectRatioForm({ onAspectRatioChange }) {
  const columnBPValue = useBreakpointValue({ base: 1, md: 2 });

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
        (name === "originalHeight" &&
          isEditing &&
          !errors.desiredWidth &&
          values.desiredWidth.length > 0)
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
        (name === "originalWidth" &&
          isEditing &&
          !errors.desiredHeight &&
          values.desiredHeight.length > 0)
      ) {
        const newWidth =
          (values.desiredHeight * values.originalWidth) / values.originalHeight;
        context.setFieldValue("desiredWidth", `${newWidth}`);
      } else {
      }

      onAspectRatioChange(values.originalWidth, values.originalHeight);
    }
  };

  const formButtonOnClick = (context) => {
    const { resetForm } = context;
    resetForm();
  };

  return (
    <LightMode>
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
        <Center bg={theme.colors.white}>
          <Box w="full" maxW={"1024px"} pl={4} pr={4}>
            <SimpleGrid columns={columnBPValue} spacing={4}>
              <VStack>
                <AppFormField
                  label="Original Width"
                  placeholder="Enter original width"
                  name={"originalWidth"}
                  size="md"
                  textColor={theme.colors.black}
                  valueChanged={fieldValueChanged}
                />
                <Box p={1} />
                <Divider bgColor={theme.colors.gray[300]} />
                <AppFormField
                  label="Original Height"
                  placeholder="Enter original height"
                  name={"originalHeight"}
                  size="md"
                  textColor={theme.colors.black}
                  valueChanged={fieldValueChanged}
                />
              </VStack>
              <VStack>
                <AppFormField
                  label="Desired Width"
                  placeholder="Enter desired width"
                  name={"desiredWidth"}
                  size="md"
                  textColor={theme.colors.black}
                  valueChanged={fieldValueChanged}
                />
                <Box p={1} />
                <Divider bgColor={theme.colors.gray[300]} />
                <AppFormField
                  label="Desired Height"
                  placeholder="Enter desired height"
                  name={"desiredHeight"}
                  size="md"
                  textColor={theme.colors.black}
                  valueChanged={fieldValueChanged}
                />
              </VStack>
            </SimpleGrid>
            <Center>
              <VStack>
                <Box p={2} />
                <AppFormButton
                  title={"Reset"}
                  formButtonOnClick={formButtonOnClick}
                />
                <Box p={2} />
              </VStack>
            </Center>
          </Box>
        </Center>
      </AppForm>
    </LightMode>
  );
}
