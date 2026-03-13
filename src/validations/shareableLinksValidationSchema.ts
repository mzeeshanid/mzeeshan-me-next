import * as Yup from "yup";

const isValidGoogleDriveShareableLink = (value: string): boolean => {
  try {
    const url = new URL(value);
    const urlComponents = value.split("/");
    return (
      url.hostname === "drive.google.com" &&
      urlComponents.length > 5 &&
      !!urlComponents[5]
    );
  } catch {
    return false;
  }
};

export interface ShareableLinksValidationValues {
  gdriveUrls: string[];
}

export const shareableLinksValidationSchema: Yup.ObjectSchema<ShareableLinksValidationValues> =
  Yup.object({
    gdriveUrls: Yup.array()
      .of(Yup.string().required())
      .required("Enter google drive shareable links")
      .test("gdriveUrls", (value, context) => {
        if (!value || value.length === 0) {
          return context.createError({
            message: "Enter google drive shareable links",
          });
        }

        let invalidIndex: number | null = null;

        for (let i = 0; i < value.length; i++) {
          const link = value[i];
          if (!link) {
            continue;
          }

          if (!isValidGoogleDriveShareableLink(link)) {
            invalidIndex = i;
            break;
          }
        }

        if (invalidIndex === null) {
          return true;
        }

        return context.createError({
          message: `Invalid google drive shareable link at index: ${invalidIndex + 1}`,
        });
      }),
  });
