import { Toaster, toaster } from "@/components/ui/toaster";
import { useColorPalette } from "@/contexts/useColorPalette";
import { driveDirectData } from "@/data/tools/driveDirect/driveDirectData";
import {
  buildGoogleDriveDirectLink,
  isValidGoogleDriveShareableLink,
} from "@/utils/driveDirect";
import {
  Button,
  Field,
  HStack,
  Input,
  Stack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";

import * as Yup from "yup";

type Props = {
  onDirectLinkGenerated: (directLink: string) => void;
};

const DriveDirectSingleLink: React.FC<Props> = (props: Props) => {
  const { onDirectLinkGenerated } = props;

  const { hero } = driveDirectData();
  const { palette } = useColorPalette();

  const initialValues: ShareableLinksFormValue = {
    gdriveUrl: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={singleLinkValidationSchema}
      onSubmit={(values) => {
        const link = buildGoogleDriveDirectLink(values.gdriveUrl);

        if (!link) {
          return;
        }

        onDirectLinkGenerated(link);

        toaster.success({
          title: `Link Generated Successfully`,
          description: `Your direct download link has been generated. You can copy it from the section below.`,
          closable: true,
          action: {
            label: "Copy",
            onClick: () => {
              navigator.clipboard.writeText(link);
            },
          },
        });
      }}
    >
      {({ handleChange, values, errors, handleSubmit, touched, resetForm }) => (
        <Form>
          <Toaster />
          <Stack gap={4}>
            <Field.Root
              colorPalette={palette}
              invalid={!!(errors.gdriveUrl && touched.gdriveUrl)}
              required
            >
              <HStack w={"full"} justify={"space-between"}>
                <Field.Label>
                  {"SHAREABLE URL"}
                  <Field.RequiredIndicator />
                </Field.Label>
                <Button
                  variant="plain"
                  size="xs"
                  onClick={() => {
                    resetForm();
                  }}
                >
                  {"Reset"}
                </Button>
              </HStack>
              <Input
                name="gdriveUrl"
                value={values.gdriveUrl}
                onChange={handleChange}
                placeholder="Paste Google Drive share link here"
                size="lg"
              />
              {errors.gdriveUrl && touched.gdriveUrl && (
                <Field.ErrorText>{errors.gdriveUrl}</Field.ErrorText>
              )}
            </Field.Root>
            <Button
              colorPalette={palette}
              onClick={() => {
                handleSubmit();
              }}
            >
              {hero.heroSingleLinkCTA}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

type ShareableLinksFormValue = {
  gdriveUrl: string;
};

const singleLinkValidationSchema: Yup.ObjectSchema<ShareableLinksFormValue> =
  Yup.object({
    gdriveUrl: Yup.string()
      .required("Enter google drive shareable link")
      .url("Enter a valid link")
      .test(
        "gdriveUrl",
        "Enter a valid google drive shareable link",
        (value?: string) => {
          if (!value) return false;

          try {
            return isValidGoogleDriveShareableLink(value);
          } catch {
            return false;
          }
        },
      ),
  });

export default DriveDirectSingleLink;
