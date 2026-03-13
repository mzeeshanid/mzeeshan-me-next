import { fetchSampleFilesExtensionDetailsStrapi } from "@/apis/sampleFiles/sampleFilesExtensionDetails";
import { MyStrapiError } from "@/strapiClient/strapiError";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { slug } = req.query;

      if (!slug || typeof slug !== "string") {
        return res.status(400).json({ error: "Slug parameter is required" });
      }

      const extensionDetails = await fetchSampleFilesExtensionDetailsStrapi(slug);
      res.status(200).json(extensionDetails);
    } catch (error) {
      if (error instanceof MyStrapiError) {
        return res.status(error.status ?? 500).json({
          error: error.message,
        });
      }

      res.status(500).json({ error: "Failed to fetch sample files extension details" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
