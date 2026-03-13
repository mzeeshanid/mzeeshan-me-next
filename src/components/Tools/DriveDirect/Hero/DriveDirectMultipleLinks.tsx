import { Form, Formik } from "formik";
import React from "react";

import { Toaster, toaster } from "@/components/ui/toaster";
import { useColorPalette } from "@/contexts/useColorPalette";
import { driveDirectData } from "@/data/tools/driveDirect/driveDirectData";
import { Button, Field, HStack, Stack, Textarea } from "@chakra-ui/react";
import * as Yup from "yup";
import { extractGoogleDriveFileId } from "./DriveDirectSingleLink";

type Props = {
  onDirectLinkGenerated: (directLinks: string[]) => void;
};

const DriveDirectMultipleLinks: React.FC<Props> = (props: Props) => {
  const { hero } = driveDirectData();
  const { palette } = useColorPalette();

  const initialValues: ShareableLinksFormValue = {
    gdriveUrls: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={multilinksValidationSchema}
      onSubmit={(values) => {
        const urls = values.gdriveUrls.split("\n");
        const directLinks: string[] = [];
        let i;
        for (i = 0; i < urls.length; i++) {
          let url = urls[i];
          if (!url) continue;

          const fileId = extractGoogleDriveFileId(url);
          const directLink = `https://drive.google.com/uc?export=download&id=${fileId}`;
          directLinks.push(directLink);
        }

        props.onDirectLinkGenerated(directLinks);

        toaster.success({
          title: `Links Generated Successfully`,
          description: `Your direct download links have been generated. You can copy them from the section below.`,
          closable: true,
          action: {
            label: "Copy All",
            onClick: () => {
              navigator.clipboard.writeText(directLinks.join("\n"));
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
              required
              invalid={!!(errors.gdriveUrls && touched.gdriveUrls)}
            >
              <HStack w={"full"} justify={"space-between"}>
                <Field.Label>
                  {"SHAREABLE URLs"}
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
              <Textarea
                name="gdriveUrls"
                value={values.gdriveUrls}
                onChange={handleChange}
                colorPalette={palette}
                placeholder={`Paste multiple Google Drive links (one per line)
            https://drive.google.com/file/d/...
            https://drive.google.com/file/d/...`}
                size="lg"
                rows={5}
              />
              {errors.gdriveUrls && touched.gdriveUrls && (
                <Field.ErrorText>{errors.gdriveUrls}</Field.ErrorText>
              )}
            </Field.Root>
            <Button
              colorPalette={palette}
              onClick={() => {
                handleSubmit();
              }}
            >
              {hero.heroMultiLinkCTA}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

type ShareableLinksFormValue = {
  gdriveUrls: string;
};

const multilinksValidationSchema: Yup.ObjectSchema<ShareableLinksFormValue> =
  Yup.object({
    gdriveUrls: Yup.string()
      .required("Enter google drive shareable links")
      .test(
        "gdriveUrls",
        "Text contains invalid google drive shareable link",
        function (value?: string) {
          if (!value) {
            return this.createError({
              message: "Enter google drive shareable links",
            });
          }

          const links = value.split("\n");
          let invalidIndex: number | null = null;

          for (let i = 0; i < links.length; i++) {
            const link = links[i].trim();
            if (!link) continue;

            try {
              const url = new URL(link);
              const urlComponents = link.split("/");

              const isValid =
                url.hostname === "drive.google.com" &&
                urlComponents.length > 5 &&
                urlComponents[5].length > 0;

              if (!isValid) {
                invalidIndex = i;
                break;
              }
            } catch {
              invalidIndex = i;
              break;
            }
          }

          if (invalidIndex === null) {
            return true;
          }

          return this.createError({
            message: `Invalid google drive shareable link at index: ${
              invalidIndex + 1
            }`,
          });
        },
      ),
  });

export default DriveDirectMultipleLinks;
