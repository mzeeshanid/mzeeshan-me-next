import type { NextApiRequest, NextApiResponse } from "next";
import {
  shareableLinkValidationSchema,
  type ShareableLinkValidationValues,
} from "@/validations/shareableLinkValidationSchema";
import {
  shareableLinksValidationSchema,
  type ShareableLinksValidationValues,
} from "@/validations/shareableLinksValidationSchema";
import {
  buildGoogleDriveDirectLink,
  buildGoogleDriveDirectLinks,
} from "@/utils/driveDirect";

type SuccessResponse<T> = {
  success: true;
  data: T;
};

type ErrorResponse = {
  success: false;
  message: string;
};

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<any>>,
) {
  if (req.method === "GET") {
    const { shareableLink } = req.query as { shareableLink?: string };

    const validationSchema = shareableLinkValidationSchema;

    try {
      const values: ShareableLinkValidationValues = await validationSchema.validate(
        {
        gdriveUrl: shareableLink,
        },
      );

      const directLink = buildGoogleDriveDirectLink(values.gdriveUrl);

      res.status(200).json({
        success: true,
        data: { directLink },
      });
    } catch (error: any) {
      res.status(422).json({
        success: false,
        message: error.message,
      });
    }
  } else if (req.method === "POST") {
    const { shareableLinks } = req.body as { shareableLinks?: string[] };

    const validationSchema = shareableLinksValidationSchema;

    try {
      const values: ShareableLinksValidationValues = await validationSchema.validate(
        {
        gdriveUrls: shareableLinks,
        },
      );

      const directLinks = buildGoogleDriveDirectLinks(values.gdriveUrls);

      res.status(200).json({
        success: true,
        data: { directLinks },
      });
    } catch (error: any) {
      res.status(422).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }
}
