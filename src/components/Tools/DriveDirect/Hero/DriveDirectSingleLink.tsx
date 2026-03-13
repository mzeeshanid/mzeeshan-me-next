import { Toaster, toaster } from "@/components/ui/toaster";
import { useColorPalette } from "@/contexts/useColorPalette";
import { driveDirectData } from "@/data/tools/driveDirect/driveDirectData";
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
        const fileId = extractGoogleDriveFileId(values.gdriveUrl);
        const link = `https://drive.google.com/uc?export=download&id=${fileId}`;
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
            const url = new URL(value);
            const urlComponents = value.split("/");

            return (
              url.hostname === "drive.google.com" &&
              urlComponents.length > 5 &&
              urlComponents[5].length > 0
            );
          } catch {
            return false;
          }
        },
      ),
  });

export const extractGoogleDriveFileId = (url: string): string | null => {
  try {
    const parsed = new URL(url);
    const idFromQuery = parsed.searchParams.get("id");
    if (idFromQuery) return idFromQuery;

    const parts = parsed.pathname.split("/");
    return parts[parts.indexOf("d") + 1] ?? null;
  } catch {
    return null;
  }
};

export default DriveDirectSingleLink;
