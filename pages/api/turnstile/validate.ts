import { validateTurnstileToken } from "next-turnstile";
import { v4 } from "uuid";

export interface TurnstileValidationResponse {
  success: boolean;
  error?: string;
}

/**
 * Validate Turnstile token on the server side
 * @param token - The Turnstile token from the client
 * @returns Promise with validation result
 */
export async function validateTurnstile(
  token: string
): Promise<TurnstileValidationResponse> {
  if (!token) {
    return {
      success: false,
      error: "CAPTCHA token is required",
    };
  }

  if (!process.env.TURNSTILE_SECRET_KEY) {
    console.error("TURNSTILE_SECRET_KEY is not configured");
    return {
      success: false,
      error: "Server configuration error",
    };
  }

  try {
    const validationResponse = await validateTurnstileToken({
      token,
      secretKey: process.env.TURNSTILE_SECRET_KEY,
      idempotencyKey: v4(),
      sandbox: process.env.NODE_ENV === "development",
    });

    if (!validationResponse.success) {
      return {
        success: false,
        error: "CAPTCHA verification failed",
      };
    }

    return {
      success: true,
    };
  } catch (error: any) {
    console.error("Turnstile validation error:", error);
    return {
      success: false,
      error: "Failed to verify CAPTCHA",
    };
  }
}
