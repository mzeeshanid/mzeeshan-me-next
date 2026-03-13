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

export interface ShareableLinkValidationValues {
  gdriveUrl: string;
}

export const shareableLinkValidationSchema: Yup.ObjectSchema<ShareableLinkValidationValues> =
  Yup.object({
    gdriveUrl: Yup.string()
      .required("Enter google drive shareable link")
      .url("Enter a valid link")
      .test(
        "gdriveUrl",
        "Enter a valid google drive shareable link",
        (value) => {
          if (!value) {
            return false;
          }
          return isValidGoogleDriveShareableLink(value);
        },
      ),
  });
