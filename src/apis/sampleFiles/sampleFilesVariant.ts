import { getBaseUrl } from "@/baseUrl/getBaseUrl";
import { getBeBaseUrl } from "@/baseUrl/getBeBaseUrl";
import { MyStrapiError } from "@/strapiClient/strapiError";

export interface IncrementVariantDownloadResponse {
  success: boolean;
  message: string;
}

/**
 * Increment the download count of a sample file variant
 * Direct Strapi call - use for backend/API routes only
 */
export const incrementVariantDownloadCountStrapi = async (
  variantDocumentId: string,
): Promise<IncrementVariantDownloadResponse> => {
  const beBaseUrl = getBeBaseUrl();
  const apiToken = process.env.BE_STRAPI_API_TOKEN;

  if (!apiToken) {
    throw new Error("BE_STRAPI_API_TOKEN is not defined");
  }

  try {
    const response = await fetch(
      `${beBaseUrl}/api/sample-file-variants/${variantDocumentId}/increment-download`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    const responseBody = await response.json().catch(() => null);

    if (!response.ok) {
      throw new MyStrapiError(
        responseBody?.error || "Failed to increment variant download count",
        response.status,
      );
    }

    return responseBody as IncrementVariantDownloadResponse;
  } catch (error: any) {
    if (error instanceof MyStrapiError) {
      throw error;
    }

    throw new MyStrapiError(
      "Failed to increment variant download count",
      error?.response?.status,
    );
  }
};

/**
 * Increment download count for a sample file variant
 * Frontend API call - use on client side
 */
export const incrementVariantDownloadCount = async (
  variantDocumentId: string,
): Promise<{ success: boolean }> => {
  const baseUrl = getBaseUrl();

  try {
    const res = await fetch(
      `${baseUrl}/api/sample-files/variants/${variantDocumentId}/download`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to update download count");
    }

    await res.json();
    return { success: true };
  } catch (error: any) {
    console.error("Error incrementing download count:", error);
    throw error;
  }
};
