import { getBaseUrl } from "@/baseUrl/getBaseUrl";

type FetchOptions = {
  signal?: AbortSignal;
};

/**
 * Create a new contact message
 * Frontend API call - use on client side
 */
export const createContactMessage = async (
  name: string,
  email: string,
  message: string,
  token: string,
  options?: FetchOptions
): Promise<{ success: boolean }> => {
  const baseUrl = getBaseUrl();

  try {
    const res = await fetch(`${baseUrl}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        token,
      }),
      signal: options?.signal,
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to send message");
    }

    await res.json();
    return { success: true };
  } catch (error: any) {
    console.error("Error creating contact message:", error);
    throw error;
  }
};
