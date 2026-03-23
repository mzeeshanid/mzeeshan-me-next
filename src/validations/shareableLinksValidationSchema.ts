import * as Yup from "yup";
import { isValidGoogleDriveShareableLink } from "@/utils/driveDirect";

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
