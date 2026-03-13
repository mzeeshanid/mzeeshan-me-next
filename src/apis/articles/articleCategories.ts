import { getBaseUrl } from '@/baseUrl/getBaseUrl';
import strapiClient from '@/strapiClient/strapiClient';
import { MyStrapiError } from '@/strapiClient/strapiError';
import { API } from '@strapi/client';

export interface ArticleCategoryModel extends API.Document {
  id: number;
  documentId: string;
  name: string;
  slug: string;
};

export type ArticleCategoryResponseCollection = API.DocumentResponseCollection<ArticleCategoryModel>;

export const fetchArticleCategoriesStrapi = async (): Promise<ArticleCategoryResponseCollection> => {
  try {
    const response = await strapiClient()
    .collection("article-categories")
    .find({
      sort: ["name:asc"],
      fields: ["name", "slug"],
      pagination: { page: 1, pageSize: 100 },
    });
    
    return response as ArticleCategoryResponseCollection;
  } catch (error: any) {
    throw new MyStrapiError(
      "Failed to fetch article categories",
      error?.response?.status
    );
  }
};

//useEffect is called from the browser and from the security point of view we don't use env variables directly in the browser so we are 
export const fetchArticleCategoriesNextJs = async (): Promise<ArticleCategoryResponseCollection> => {
  const baseUrl = getBaseUrl();
  try {
    const res = await fetch(
      `${baseUrl}/api/articles/categories`
    );
    
    const data = await res.json();
    
    return data;
  } catch (error: any) {
    throw new Error("Failed to fetch article categories from Next.js API");
  }
  
}