import { fetchSampleFilesExtensionsStrapi } from "@/apis/sampleFiles/sampleFilesExtension";
import { MyStrapiError } from "@/strapiClient/strapiError";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const keyword = req.query.keyword as string | undefined;
      const limit = Number(req.query.limit ?? 20);
      const page = Number(req.query.page ?? 1);
      const categorySlug = req.query.categorySlug as string | undefined;
      const isFeaturedParam = req.query.isFeatured as string | undefined;
      const isFeatured = isFeaturedParam ? isFeaturedParam === "true" : undefined;

      const extensions = await fetchSampleFilesExtensionsStrapi(
        keyword,
        limit,
        page,
        categorySlug,
        isFeatured
      );
      res.status(200).json(extensions);
    } catch (error) {
      if (error instanceof MyStrapiError) {
        return res.status(error.status ?? 500).json({
          error: error.message,
        });
      }

      res.status(500).json({ error: "Failed to fetch sample files extensions" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
