import * as Yup from "yup";
import { isValidGoogleDriveShareableLink } from "@/utils/driveDirect";

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
