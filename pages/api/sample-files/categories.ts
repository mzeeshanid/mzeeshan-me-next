import { fetchSampleFilesCategoriesStrapi } from "@/apis/sampleFiles/sampleFilesCategories";
import { MyStrapiError } from "@/strapiClient/strapiError";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            const categories = await fetchSampleFilesCategoriesStrapi();
            res.status(200).json(categories);
        } catch (error) {
            if (error instanceof MyStrapiError) {
                return res.status(error.status ?? 500).json({
                    error: error.message,
                });
            }
            
            res.status(500).json({ error: "Failed to fetch sample files categories" });
        }
    } else {
        res.status(405).json({ success: false, message: "Method not allowed" });
    }
    
}