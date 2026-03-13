import { getBaseUrl } from "@/baseUrl/getBaseUrl";
import {
    SampleFileRequestModel,
    SampleFileRequestResponse,
} from "./sampleFileRequestsStrapi";
import { SampleFilesExtensionModel } from "./sampleFilesExtension";

type FetchOptions = {
  signal?: AbortSignal;
};

/**
 * Check if a sample file extension already exists by extension name
 * Frontend API call - use on client side
 */
export const checkSampleFileExtensionExists = async (
  extension: string,
  options?: FetchOptions
): Promise<SampleFilesExtensionModel | null> => {
  const baseUrl = getBaseUrl();

  const params = new URLSearchParams({
    extension: extension.toLowerCase(),
  });

  try {
    const res = await fetch(
      `${baseUrl}/api/sample-files/requests?${params.toString()}`,
      {
        signal: options?.signal,
      }
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to check extension");
    }

    const data = await res.json();
    return data || null;
  } catch (error: any) {
    console.error("Error checking if extension exists:", error);
    throw error;
  }
};

/**
 * Create a new sample file request
 * Frontend API call - use on client side
 */
export const createSampleFileRequest = async (
  name: string,
  turnstileToken: string,
  email?: string,
  options?: FetchOptions
): Promise<SampleFileRequestResponse> => {
  const baseUrl = getBaseUrl();

  try {
    const res = await fetch(`${baseUrl}/api/sample-files/requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.toLowerCase(),
        token: turnstileToken,
        email: email || null,
      }),
      signal: options?.signal,
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to create request");
    }

    const data = await res.json();
    return data as SampleFileRequestResponse;
  } catch (error: any) {
    console.error("Error creating sample file request:", error);
    throw error;
  }
};

export type { SampleFileRequestModel, SampleFileRequestResponse };
