import { fetchArticleCategoriesStrapi } from "@/apis/articles/articleCategories";
import { MyStrapiError } from "@/strapiClient/strapiError";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            const articleCategories = await fetchArticleCategoriesStrapi();
            res.status(200).json(articleCategories);
        } catch (error) {
            if (error instanceof MyStrapiError) {
                return res.status(error.status ?? 500).json({
                    error: error.message,
                });
            }
            
            res.status(500).json({ error: "Failed to fetch articles" });
        }
    } else {
        res.status(405).json({ success: false, message: "Method not allowed" });
    }
    
}