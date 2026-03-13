import { getBaseUrl } from '@/baseUrl/getBaseUrl';
import strapiClient from '@/strapiClient/strapiClient';
import { MyStrapiError } from '@/strapiClient/strapiError';
import { API } from '@strapi/client';
import { SampleFilesCategoryModel } from './sampleFilesCategories';
import { SampleFilesExtensionDetailsData } from '@/data/tools/sampleFiles/sampleFilesExtensionDetails';

export interface SampleFileVariantModel extends API.Document {
    id: number;
    documentId: string;
    name: string;
    size: string;
    url?: string;
    downloads?: number;
}

export interface SampleFilesExtensionDetailModel extends API.Document {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    info: string;
    details?: SampleFilesExtensionDetailsData; // JSON string with additional details
    type?: SampleFilesCategoryModel;
    variants?: SampleFileVariantModel[];
}

export type SampleFilesExtensionDetailResponse = API.DocumentResponse<SampleFilesExtensionDetailModel>;

export const fetchSampleFilesExtensionDetailsStrapi = async (
    slug: string
): Promise<SampleFilesExtensionDetailModel> => {
    try {
        const response = await strapiClient()
        .collection("sample-file-extensions")
        .find({
            filters: {
                slug: {
                    $eq: slug.toLowerCase(),
                },
            },
            fields: ["id", "name", "slug", "info", "details", "isFeatured"],
            populate: ["type", "variants"],
            pagination: {
                page: 1,
                pageSize: 1,
            },
        });
        
        if (!response.data?.length) {
            throw new MyStrapiError("Extension not found", 404);
        }
        
        return response.data[0] as SampleFilesExtensionDetailModel;
        
    } catch (error: any) {
        throw new MyStrapiError(
            "Failed to fetch sample files extension details",
            error?.response?.status
        );
    }
};

export const fetchSampleFilesExtensionDetailsNextJs = async (
    slug: string
): Promise<SampleFilesExtensionDetailResponse> => {
    const baseUrl = getBaseUrl();
    
    try {
        const res = await fetch(
            `${baseUrl}/api/sample-files/extensions/${slug}`
        );
        
        if (!res.ok) {
            throw new Error("Failed to fetch sample files extension details from Next.js API");
        }
        
        const data = await res.json();
        return data;
    } catch (error: any) {
        throw new Error("Failed to fetch sample files extension details from Next.js API");
    }
};
