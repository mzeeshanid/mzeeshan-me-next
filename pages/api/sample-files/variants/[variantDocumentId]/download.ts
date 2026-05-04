import { incrementExtensionDownloadCountStrapi } from "@/apis/sampleFiles/sampleFilesExtension";
import { incrementVariantDownloadCountStrapi } from "@/apis/sampleFiles/sampleFilesVariant";
import { MyStrapiError } from "@/strapiClient/strapiError";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "PUT") {
    try {
      const { variantDocumentId } = req.query;

      if (!variantDocumentId || typeof variantDocumentId !== "string") {
        return res
          .status(400)
          .json({ error: "Variant document ID is required" });
      }

      const { extensionDocumentId } = req.body ?? {};

      const incrementCalls: Promise<any>[] = [
        incrementVariantDownloadCountStrapi(variantDocumentId),
      ];

      if (extensionDocumentId && typeof extensionDocumentId === "string") {
        incrementCalls.push(
          incrementExtensionDownloadCountStrapi(extensionDocumentId),
        );
      }

      await Promise.all(incrementCalls);
      res.status(200).json({ success: true });
    } catch (error) {
      if (error instanceof MyStrapiError) {
        return res.status(error.status ?? 500).json({
          error: error.message,
        });
      }

      res.status(500).json({ error: "Failed to update download count" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
