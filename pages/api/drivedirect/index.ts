import type { NextApiRequest, NextApiResponse } from "next";
import {
  shareableLinkValidationSchema,
  type ShareableLinkValidationValues,
} from "@/validations/shareableLinkValidationSchema";
import {
  shareableLinksValidationSchema,
  type ShareableLinksValidationValues,
} from "@/validations/shareableLinksValidationSchema";

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

      const fileId = values.gdriveUrl.split("/")[5];
      const directLink = `https://drive.google.com/uc?export=download&id=${fileId}`;

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

      const urls = values.gdriveUrls;
      const directLinks: string[] = [];

      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        if (!url) continue;

        const fileId = url.split("/")[5];
        const directLink = `https://drive.google.com/uc?export=download&id=${fileId}`;
        directLinks.push(directLink);
      }

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
