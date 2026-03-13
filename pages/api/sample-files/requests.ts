import { checkSampleFileExtensionExistsStrapi } from "@/apis/sampleFiles/sampleFilesExtension";
import { createSampleFileRequestStrapi } from "@/apis/sampleFiles/sampleFileRequestsStrapi";
import { MyStrapiError } from "@/strapiClient/strapiError";
import { validateTurnstile } from "../turnstile";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const extension = req.query.extension as string | undefined;

      if (!extension) {
        return res.status(400).json({ error: "Extension parameter is required" });
      }

      const existingExtension = await checkSampleFileExtensionExistsStrapi(extension);
      res.status(200).json(existingExtension);
    } catch (error) {
      if (error instanceof MyStrapiError) {
        return res.status(error.status ?? 500).json({
          error: error.message,
        });
      }

      res.status(500).json({ error: "Failed to check sample file extension" });
    }
  } else if (req.method === "POST") {
    try {
      const { name, email, token } = req.body;

      if (!name) {
        return res.status(400).json({ error: "Name is required" });
      }

      if (!token) {
        return res.status(400).json({ error: "CAPTCHA token is required" });
      }

      // Validate Turnstile token
      const turnstileValidation = await validateTurnstile(token);
      if (!turnstileValidation.success) {
        return res
          .status(400)
          .json({ error: turnstileValidation.error || "CAPTCHA verification failed" });
      }

      const newRequest = await createSampleFileRequestStrapi(name, email);
      res.status(201).json(newRequest);
    } catch (error) {
      if (error instanceof MyStrapiError) {
        return res.status(error.status ?? 500).json({
          error: error.message,
        });
      }

      res.status(500).json({ error: "Failed to create sample file request" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
