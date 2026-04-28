import { getBaseUrl } from '@/baseUrl/getBaseUrl';
import strapiClient from '@/strapiClient/strapiClient';
import { MyStrapiError } from '@/strapiClient/strapiError';
import { API } from '@strapi/client';
import { MediaItem } from '../mediaItem/mediaItem';
import { ArticleCategoryModel } from './articleCategories';

export interface ArticleModel extends API.Document {
    id: number;
    documentId: string;
    title: string;
    description: string;
    slug: string;
    content?: string;
    readingTime?: string;
    image?: MediaItem;
    createdAt: string;
    updatedAt: string;
    writer: ArticleWriter,
    category: ArticleCategoryModel;
    related?: ArticleModel[];
};

export interface ArticleWriter extends API.Document {
    id: number;
    documentId: string;
    name: string;
    picture?: MediaItem;
};

export type ArticleResponseCollection = API.DocumentResponseCollection<ArticleModel>;

export const fetchArticlesStrapi = async (
  page: number = 1,
  pageSize: number = 2,
  keyword?: string,
  categorySlug?: string
): Promise<ArticleResponseCollection> => {
  try {
    const filters: any = {};

    if (keyword) {
      filters.$or = [
        { title: { $containsi: keyword } },
        { description: { $containsi: keyword } },
      ];
    }

    if (categorySlug) {
      filters.category = {
        slug: {
          $eq: categorySlug,
        },
      };
    }

    const response = await strapiClient().collection("articles").find({
      sort: ["createdAt:desc"],
      fields: [
        "title",
        "description",
        "slug",
        "readingTime",
        "createdAt",
        "updatedAt",
      ],
      populate: ["writer", "category", "image", "writer.picture"],
      pagination: { page, pageSize },
      filters,
    });

    return response as ArticleResponseCollection;
  } catch (error: any) {
    throw new MyStrapiError(
      "Failed to fetch articles",
      error?.response?.status
    );
  }
};

export const fetchArticlesNextJs = async (
  page: number = 1,
  pageSize: number = 2,
  keyword?: string,
  categorySlug?: string
): Promise<ArticleResponseCollection> => {
  const baseUrl = getBaseUrl();

  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  if (keyword) {
    params.set("keyword", keyword);
  }

  if (categorySlug) {
    params.set("category", categorySlug);
  }

  const response = await fetch(`${baseUrl}/api/articles?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch articles from Next.js API");
  }

  return response.json();
};