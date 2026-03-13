import { getBaseUrl } from '@/baseUrl/getBaseUrl';
import strapiClient from '@/strapiClient/strapiClient';
import { MyStrapiError } from '@/strapiClient/strapiError';
import { API } from '@strapi/client';

export interface SampleFilesExtensionModel extends API.Document {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  info: string;
  isFeatured: boolean;
}

export type SampleFilesExtensionResponseCollection = API.DocumentResponseCollection<SampleFilesExtensionModel>;

export const fetchSampleFilesExtensionsStrapi = async (
  keyword?: string,
  limit: number = 50,
  page: number = 1,
  categorySlug?: string,
  isFeatured?: boolean
): Promise<SampleFilesExtensionResponseCollection> => {
  try {
    const filters: any = {};
    
    if (keyword) {
      filters.$or = [
        { name: { $containsi: keyword } },
        { slug: { $containsi: keyword } },
        { info: { $containsi: keyword } },
      ];
    }
    
    if (categorySlug) {
      filters.type = {
        slug: { $eq: categorySlug },
      };
    }
    
    if (isFeatured !== undefined) {
      filters.isFeatured = { $eq: isFeatured };
    }
    
    const response = await strapiClient()
    .collection("sample-file-extensions")
    .find({
      fields: ["id", "name", "slug", "info", "isFeatured"],
      pagination: { page, pageSize: limit },
      filters,
      populate: ["type"],
    });
    
    return response as SampleFilesExtensionResponseCollection;
  } catch (error: any) {
    throw new MyStrapiError(
      "Failed to fetch sample files extensions",
      error?.response?.status
    );
  }
};

/**
 * Check if a sample file extension already exists by name or slug
 * Direct Strapi call - use for backend/API routes only
 */
export const checkSampleFileExtensionExistsStrapi = async (
  extension: string
): Promise<SampleFilesExtensionModel | null> => {
  try {
    const response = await strapiClient()
      .collection("sample-file-extensions")
      .find({
        filters: {
          $or: [
            { name: { $eqi: extension } },
            { slug: { $eqi: extension } },
          ],
        },
        fields: ["id", "name", "slug"],
        pagination: {
          limit: 1,
        },
      });

    const existingExtension =
      (response?.data?.[0] as SampleFilesExtensionModel) || null;
    return existingExtension;
  } catch (error: any) {
    throw new MyStrapiError(
      "Failed to check if extension exists",
      error?.response?.status
    );
  }
};

type FetchOptions = {
  signal?: AbortSignal;
};

export const fetchSampleFilesExtensionsNextJs = async (
  keyword?: string,
  limit: number = 50,
  page: number = 1,
  categorySlug?: string,
  isFeatured?: boolean,
  options?: FetchOptions
): Promise<SampleFilesExtensionResponseCollection> => {
  const baseUrl = getBaseUrl();

  const params = new URLSearchParams({
    limit: String(limit),
    page: String(page),
  });

  if (keyword) {
    params.set("keyword", keyword);
  }

  if (categorySlug) {
    params.set("categorySlug", categorySlug);
  }

  if (isFeatured !== undefined) {
    params.set("isFeatured", String(isFeatured));
  }

  try {
    const res = await fetch(
      `${baseUrl}/api/sample-files/extensions?${params.toString()}`,
      {
        signal: options?.signal,
      }
    );

    if (!res.ok) {
      throw new Error(
        `Request failed with status ${res.status}`
      );
    }

    return await res.json();
  } catch (error: any) {
    if (error?.name === "AbortError") {
      return Promise.reject(error);
    }

    throw error;
  }
};