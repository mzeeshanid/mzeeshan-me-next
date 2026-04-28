import type { NextApiRequest, NextApiResponse } from "next";
import { MyStrapiError } from "@/strapiClient/strapiError";
import { fetchArticleBySlugStrapi } from "@/apis/articles/articleDetail";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    const slug = req.query.slug as string;

    if (!slug) {
      return res.status(400).json({ error: "Slug is required" });
    }

    const article = await fetchArticleBySlugStrapi(slug);

    res.status(200).json(article);
  } catch (error) {
    if (error instanceof MyStrapiError) {
      return res.status(error.status ?? 500).json({
        error: error.message,
      });
    }

    res.status(500).json({ error: "Failed to fetch article details" });
  }
}
