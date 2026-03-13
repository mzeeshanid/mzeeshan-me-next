import { createContactMeStrapi } from "@/apis/contact/contactMeStrapi";
import { MyStrapiError } from "@/strapiClient/strapiError";
import { validateTurnstile } from "./turnstile/validate";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { name, email, message, token } = req.body;

      // Validate required fields
      if (!name) {
        return res.status(400).json({ error: "Name is required" });
      }

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      if (!token) {
        return res.status(400).json({ error: "CAPTCHA token is required" });
      }

      // Validate Turnstile token
      const turnstileValidation = await validateTurnstile(token);
      if (!turnstileValidation.success) {
        return res.status(400).json({
          error: turnstileValidation.error || "CAPTCHA verification failed",
        });
      }

      // Create contact message in Strapi
      const newMessage = await createContactMeStrapi(name, email, message);
      res.status(201).json(newMessage);
    } catch (error) {
      if (error instanceof MyStrapiError) {
        return res.status(error.status ?? 500).json({
          error: error.message,
        });
      }

      res.status(500).json({ error: "Failed to send contact message" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
