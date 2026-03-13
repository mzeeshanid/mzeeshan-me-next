import strapiClient from "@/strapiClient/strapiClient";
import { MyStrapiError } from "@/strapiClient/strapiError";
import { API } from "@strapi/client";

export interface ContactMeModel extends API.Document {
  id: number;
  documentId: string;
  name: string;
  email: string;
  message: string;
}

export type ContactMeResponse = API.DocumentResponse<ContactMeModel>;

/**
 * Create a new contact message
 * Direct Strapi call - use for backend/API routes only
 */
export const createContactMeStrapi = async (
  name: string,
  email: string,
  message: string
): Promise<ContactMeResponse> => {
  try {
    const response = await strapiClient()
      .collection("contact-mes")
      .create({
        name,
        email,
        message,
      });
    return response as ContactMeResponse;
  } catch (error: any) {
    throw new MyStrapiError(
      "Failed to create contact message",
      error?.response?.status
    );
  }
};
