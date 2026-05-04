import { fetchSampleFilesStatsStrapi } from "@/apis/sampleFiles/sampleFilesExtension";
import { MyStrapiError } from "@/strapiClient/strapiError";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const stats = await fetchSampleFilesStatsStrapi();
      res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
      res.status(200).json(stats);
    } catch (error) {
      if (error instanceof MyStrapiError) {
        return res.status(error.status ?? 500).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to fetch sample files stats" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
