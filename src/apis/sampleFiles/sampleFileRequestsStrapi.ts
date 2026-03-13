import strapiClient from "@/strapiClient/strapiClient";
import { MyStrapiError } from "@/strapiClient/strapiError";
import { API } from "@strapi/client";

export interface SampleFileRequestModel extends API.Document {
  id: number;
  documentId: string;
  name: string;
  email?: string;
}

export type SampleFileRequestResponse = API.DocumentResponse<SampleFileRequestModel>;

/**
* Create a new sample file request
* Direct Strapi call - use for backend/API routes only
*/
export const createSampleFileRequestStrapi = async (
    name: string,
    email?: string
): Promise<SampleFileRequestResponse> => {
    try {
        const response = await strapiClient()
        .collection("sample-file-requests")
        .create({
            name: name.toLowerCase(),
            email: email || null,
        });
        return response as SampleFileRequestResponse;
    } catch (error: any) {
        throw new MyStrapiError(
            "Failed to create sample file request",
            error?.response?.status
        );
    }
};
