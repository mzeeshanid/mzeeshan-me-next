import type { NextApiRequest, NextApiResponse } from "next";
import { fetchArticlesStrapi } from "@/apis/articles/articles";
import { MyStrapiError } from "@/strapiClient/strapiError";

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
    const page = Number(req.query.page ?? 1);
    const pageSize = Number(req.query.pageSize ?? 2);
    const keyword = req.query.keyword as string | undefined;
    const category = req.query.category as string | undefined;

    const articles = await fetchArticlesStrapi(page, pageSize, keyword, category);

    res.status(200).json(articles);
  } catch (error) {
    if (error instanceof MyStrapiError) {
      return res.status(error.status ?? 500).json({
        error: error.message,
      });
    }

    res.status(500).json({ error: "Failed to fetch articles" });
  }
}
