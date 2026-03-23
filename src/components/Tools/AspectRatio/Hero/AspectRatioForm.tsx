import { useColorPalette } from "@/contexts/useColorPalette";
import {
  Button,
  Card,
  Checkbox,
  Field,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";

import { aspectRatioMetaData } from "@/data/tools/aspectRatio/aspectRatioMetaData";
import type { AspectRatioFormValues } from "@/utils/aspectRatio";
import React from "react";
import { aspectRatioValidationSchema } from "@/validations/aspectRatioValidationSchema";
import AspectRatioWatcher from "./AspectRatioWatcher";
import AspectRatioComboBox from "./AspectRatioComboBox";

type Props = {
  initialValues: AspectRatioFormValues;
  onFormValuesChange: (values: AspectRatioFormValues) => void;
};

const AspectRatioForm: React.FC<Props> = (props: Props) => {
  const { palette } = useColorPalette();
  const [lastEdited, setLastEdited] = React.useState<
    "desiredWidth" | "desiredHeight" | undefined
  >(undefined);

  const [roundValues, setRoundValues] = React.useState<boolean>(true);
  const { initialValues, onFormValuesChange } = props;
  const meta = aspectRatioMetaData;

  return (
    <Card.Root w="full">
      <Formik
        initialValues={initialValues}
        validationSchema={aspectRatioValidationSchema}
        onSubmit={() => {}}
      >
        {({
          handleChange,
          values,
          errors,
          touched,
          resetForm,
          setFieldTouched,
        }) => {
          return (
            <Form>
              <Card.Header>
                <VStack align={"start"}>
                  <Heading size={"3xl"} as="h1">
                    {meta.title}
                  </Heading>
                  <Text color={"fg.muted"}>{meta.desc}</Text>
                </VStack>
              </Card.Header>
              <Card.Body>
                <AspectRatioWatcher
                  lastEdited={lastEdited}
                  roundValues={roundValues}
                  onFormValuesChange={onFormValuesChange}
                />
                <Stack direction={"row"} gap={6}>
                  <Stack w={"50%"} gap={6}>
                    <Field.Root
                      colorPalette={palette}
                      invalid={
                        !!(errors.originalWidth && touched.originalWidth)
                      }
                    >
                      <Field.Label>{"ORIGINAL WIDTH"}</Field.Label>
                      <Input
                        name="originalWidth"
                        placeholder="Enter the original width"
                        value={values.originalWidth}
                        onChange={handleChange}
                        onBlur={() => {
                          setFieldTouched("originalWidth", true, true);
                        }}
                        size="lg"
                      />
                      {errors.originalWidth && touched.originalWidth && (
                        <Field.ErrorText>
                          {errors.originalWidth}
                        </Field.ErrorText>
                      )}
                    </Field.Root>
                    <Field.Root
                      colorPalette={palette}
                      invalid={
                        !!(errors.originalHeight && touched.originalHeight)
                      }
                    >
                      <Field.Label>{"ORIGINAL HEIGHT"}</Field.Label>
                      <Input
                        name="originalHeight"
                        placeholder="Enter the original height"
                        value={values.originalHeight}
                        onChange={handleChange}
                        onBlur={() => {
                          setFieldTouched("originalHeight", true, true);
                        }}
                        size="lg"
                      />
                      {errors.originalHeight && touched.originalHeight && (
                        <Field.ErrorText>
                          {errors.originalHeight}
                        </Field.ErrorText>
                      )}
                    </Field.Root>
                  </Stack>
                  <Stack w={"50%"} gap={6}>
                    <Field.Root
                      colorPalette={palette}
                      invalid={!!(errors.desiredWidth && touched.desiredWidth)}
                    >
                      <Field.Label>{"DESIRED WIDTH"}</Field.Label>
                      <Input
                        name="desiredWidth"
                        placeholder="Enter the desired width"
                        value={values.desiredWidth}
                        onChange={(e) => {
                          setLastEdited("desiredWidth");
                          handleChange(e);
                        }}
                        onBlur={() => {
                          setFieldTouched("desiredWidth", true, true);
                        }}
                        size="lg"
                      />
                      {errors.desiredWidth && touched.desiredWidth && (
                        <Field.ErrorText>{errors.desiredWidth}</Field.ErrorText>
                      )}
                    </Field.Root>
                    <Field.Root
                      colorPalette={palette}
                      invalid={
                        !!(errors.desiredHeight && touched.desiredHeight)
                      }
                    >
                      <Field.Label>{"DESIRED HEIGHT"}</Field.Label>
                      <Input
                        name="desiredHeight"
                        placeholder="Enter the desired height"
                        value={values.desiredHeight}
                        onChange={(e) => {
                          setLastEdited("desiredHeight");
                          handleChange(e);
                        }}
                        onBlur={() => {
                          setFieldTouched("desiredHeight", true, true);
                        }}
                        size="lg"
                      />
                      {errors.desiredHeight && touched.desiredHeight && (
                        <Field.ErrorText>
                          {errors.desiredHeight}
                        </Field.ErrorText>
                      )}
                    </Field.Root>
                  </Stack>
                </Stack>
              </Card.Body>
              <Card.Footer>
                <VStack gap={4}>
                  <AspectRatioComboBox
                    comboxBoxValueChanged={(item) => {
                      resetForm({
                        values: {
                          originalWidth: item.width.toString(),
                          originalHeight: item.height.toString(),
                          desiredWidth: "",
                          desiredHeight: "",
                        },
                      });
                    }}
                  />
                  <HStack gap={4}>
                    <Button
                      size="sm"
                      colorPalette={palette}
                      onClick={() =>
                        resetForm({
                          values: {
                            originalWidth: values.originalWidth,
                            originalHeight: values.originalHeight,
                            desiredWidth: "",
                            desiredHeight: "",
                          },
                        })
                      }
                    >
                      {"Reset"}
                    </Button>
                    <Checkbox.Root
                      variant={"solid"}
                      colorPalette={palette}
                      checked={roundValues}
                      onCheckedChange={(e) => setRoundValues(!!e.checked)}
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                      <Checkbox.Label color={"fg.muted"}>
                        {"Round results to the nearest whole number"}
                      </Checkbox.Label>
                    </Checkbox.Root>
                  </HStack>
                </VStack>
              </Card.Footer>
            </Form>
          );
        }}
      </Formik>
    </Card.Root>
  );
};

export default AspectRatioForm;
