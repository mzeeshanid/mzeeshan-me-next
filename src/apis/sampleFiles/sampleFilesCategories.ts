import { getBaseUrl } from '@/baseUrl/getBaseUrl';
import strapiClient from '@/strapiClient/strapiClient';
import { MyStrapiError } from '@/strapiClient/strapiError';
import { API } from '@strapi/client';

export interface SampleFilesCategoryModel extends API.Document {
  id: number;
  documentId: string;
  name: string;
  slug: string;
};

export type SampleFilesCategoryResponseCollection = API.DocumentResponseCollection<SampleFilesCategoryModel>;

export const fetchSampleFilesCategoriesStrapi = async (): Promise<SampleFilesCategoryResponseCollection> => {
  try {
    const response = await strapiClient()
    .collection("sample-file-types")
    .find({
      fields: ["name", "slug"],
      pagination: { page: 1, pageSize: 100 },
    });
    
    return response as SampleFilesCategoryResponseCollection;
  } catch (error: any) {
    throw new MyStrapiError(
      "Failed to fetch sample files categories",
      error?.response?.status
    );
  }
};

//useEffect is called from the browser and from the security point of view we don't use env variables directly in the browser so we are 
export const fetchSampleFilesCategoriesNextJs = async (): Promise<SampleFilesCategoryResponseCollection> => {
  const baseUrl = getBaseUrl();
  try {
    const res = await fetch(
      `${baseUrl}/api/sample-files/categories`
    );
    
    const data = await res.json();
    
    return data;
  } catch (error: any) {
    throw new Error("Failed to fetch sample files categories from Next.js API");
  }
  
}