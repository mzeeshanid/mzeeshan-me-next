import React from "react";
import { useColorPalette } from "@/contexts/useColorPalette";
import { stringMetricsHeroData } from "@/data/tools/stringMetrics/stringMetricsFeatures";
import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
  Field,
  HStack,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import StringMetricsResult from "../Result/StringMetricsResult";

type Props = {};

interface FormValues {
  source: string;
  target: string;
}

const StringMetricsHero: React.FC<Props> = (props: Props) => {
  const { palette } = useColorPalette();
  const heroData = stringMetricsHeroData;

  const validationSchema = Yup.object().shape({
    source: Yup.string().required("Source string is required"),
    target: Yup.string().required("Target string is required"),
  });

  const initialValues: FormValues = {
    source: "",
    target: "",
  };

  const [result, setResult] = React.useState<{
    source: string;
    target: string;
  } | null>(null);

  return (
    <Box as="section">
      <Stack gap={8} direction={{ base: "column", lg: "row" }}>
        <Stack gap={6} w={{ base: "full", lg: "50%" }}>
          {/* Title */}
          <Stack gap={2}>
            <Heading as="h1" size={{ base: "2xl", md: "4xl" }}>
              {heroData.heroTitle}
            </Heading>
            <Text color="fg.muted">{heroData.heroDescription}</Text>
          </Stack>

          {/* Form */}
          <Box
            bg="bg.subtle"
            p={6}
            borderRadius={"xl"}
            border="1px solid"
            borderColor="border"
          >
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                setResult({
                  source: values.source,
                  target: values.target,
                });
              }}
            >
              {({
                errors,
                touched,
                resetForm,
                values,
                handleChange,
                handleSubmit,
                setFieldTouched,
              }) => (
                <Form>
                  <VStack gap={4} align="stretch">
                    <Field.Root
                      colorPalette={palette}
                      required
                      invalid={!!(errors.source && touched.source)}
                    >
                      <Field.Label>
                        {"Source String"}
                        <Field.RequiredIndicator />
                      </Field.Label>
                      <Input
                        name="source"
                        placeholder={heroData.sourcePlaceholder}
                        size="lg"
                        value={values.source}
                        onChange={handleChange}
                        onBlur={() => {
                          setFieldTouched("source", true, true);
                        }}
                      />
                      <Field.HelperText>
                        {"Enter the first string you want to compare"}
                      </Field.HelperText>
                      {errors.source && touched.source && (
                        <Field.ErrorText>{errors.source}</Field.ErrorText>
                      )}
                    </Field.Root>
                    <Field.Root
                      colorPalette={palette}
                      required
                      invalid={!!(errors.target && touched.target)}
                    >
                      <Field.Label>
                        {"Target String"}
                        <Field.RequiredIndicator />
                      </Field.Label>
                      <Input
                        name="target"
                        placeholder={heroData.targetPlaceholder}
                        size="lg"
                        value={values.target}
                        onChange={handleChange}
                        onBlur={() => {
                          setFieldTouched("target", true, true);
                        }}
                      />
                      <Field.HelperText>
                        {"Enter the second string you want to compare"}
                      </Field.HelperText>
                      {errors.target && touched.target && (
                        <Field.ErrorText>{errors.target}</Field.ErrorText>
                      )}
                    </Field.Root>
                    <HStack>
                      <Button
                        colorPalette={palette}
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        {heroData.compareButtonText}
                      </Button>
                      <Button
                        colorPalette={palette}
                        variant={"surface"}
                        onClick={() => {
                          resetForm();
                          setResult(null);
                        }}
                      >
                        {"Reset"}
                      </Button>
                    </HStack>
                  </VStack>
                </Form>
              )}
            </Formik>

            {/* Foot Note */}
            <Text mt={4} fontSize="sm" color="fg.muted" textAlign="center">
              {heroData.heroFootNote}
            </Text>
          </Box>
        </Stack>

        {/* Results */}
        <Box w={{ base: "full", lg: "50%" }}>
          {result && (
            <StringMetricsResult
              source={result.source}
              target={result.target}
            />
          )}
          {!result && (
            <Box
              bg="bg.subtle"
              borderRadius={"xl"}
              border="1px solid"
              borderColor="border"
              p={8}
              minH="400px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <VStack gap={4} textAlign="center">
                <Text color="fg.muted" fontSize="lg">
                  Enter two strings above and click Compare to see the results
                </Text>
                <Text color="fg.muted" fontSize="sm">
                  Results will show similarity scores and distances using
                  multiple algorithms
                </Text>
              </VStack>
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default StringMetricsHero;
