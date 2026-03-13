import type { NextApiRequest, NextApiResponse } from "next";
import { fetchArticlesStrapi, ArticleModel } from "@/apis/articles/articles";
import { MyStrapiError } from "@/strapiClient/strapiError";
import { getImageBlurData } from "@/strapiClient/strapiBlurImage";

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

    let articles = await fetchArticlesStrapi(
      page,
      pageSize,
      keyword,
      category
    );

    const articlesWithBlur = await Promise.all(
      articles.data.map(async (article) => {
        const image = article.image;

        if (!image?.formats?.thumbnail?.url) {
          return article;
        }

        const blurData = await getImageBlurData(
          image.formats.thumbnail.url
        );

        return {
          ...article,
          blurData,
        } as ArticleModel;
      })
    );

    res.status(200).json({
      ...articles,
      data: articlesWithBlur,
    });
  } catch (error) {
    if (error instanceof MyStrapiError) {
      return res.status(error.status ?? 500).json({
        error: error.message,
      });
    }

    res.status(500).json({ error: "Failed to fetch articles" });
  }
}
