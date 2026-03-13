// apis/articles/articles.ts
import { MyStrapiError } from "@/strapiClient/strapiError";
import { ArticleModel } from "./articles";
import strapiClient from "@/strapiClient/strapiClient";
import { getBaseUrl } from "@/baseUrl/getBaseUrl";

export const fetchArticleBySlugStrapi = async (
  slug: string
): Promise<ArticleModel> => {
  try {
    const response = await strapiClient()
      .collection("articles")
      .find({
        filters: {
          slug: {
            $eq: slug,
          },
        },
        fields: [
          "title",
          "description",
          "slug",
          "content",
          "readingTime",
          "createdAt",
          "updatedAt",
        ],
        populate: [
          "writer",
          "writer.picture",
          "category",
          "image",
          "related",
          "related.image",
          "related.writer",
          "related.writer.picture",
          "related.category",
        ],
        pagination: {
          page: 1,
          pageSize: 1,
        },
      });

    if (!response.data?.length) {
      throw new MyStrapiError("Article not found", 404);
    }

    return response.data[0] as ArticleModel;
  } catch (error: any) {
    if (error instanceof MyStrapiError) {
      throw error;
    }

    throw new MyStrapiError(
      "Failed to fetch article",
      error?.response?.status
    );
  }
};

export const fetchArticleBySlugNextJs = async (
  slug: string
): Promise<ArticleModel> => {
  if (!slug) {
    throw new Error("Article slug is required");
  }

  const baseUrl = getBaseUrl();

  const res = await fetch(`${baseUrl}/api/articles/${slug}`);

  if (!res.ok) {
    throw new Error("Failed to fetch article details");
  }

  return res.json();
};
