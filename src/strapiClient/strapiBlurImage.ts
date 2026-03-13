// lib/blur-image.ts
import sharp from "sharp";

/**
* Returns the predicted blur image URL based on a Strapi format URL.
* Fails silently if blur image does not exist.
*/
export const getBlurImageUrl = async (
    formatUrl: string
): Promise<string | null> => {
    try {
        // Replace known Strapi prefixes with blur_
        const blurUrl = formatUrl.replace(
            /\/(large|medium|small|thumbnail)_/,
            "/blur_"
        );
        
        // HEAD request to check existence (cheap)
        const res = await fetch(blurUrl, { method: "HEAD" });
        if (!res.ok) return null;
        
        return blurUrl;
    } catch {
        return null;
    }
};

/**
* Returns a base64 getImageBlurData compatible with next/image.
* Uses the blur image if available, otherwise falls back to thumbnail.
*/
export const getImageBlurData = async (
    thumbnailUrl: string,
    referenceFormatUrl?: string
): Promise<string | null> => {
    try {
        // Prefer blur image if it exists
        const blurUrl = referenceFormatUrl
        ? await getBlurImageUrl(referenceFormatUrl)
        : null;
        
        const sourceUrl = blurUrl ?? thumbnailUrl;
        
        const res = await fetch(sourceUrl);
        if (!res.ok) return null;
        
        const buffer = Buffer.from(await res.arrayBuffer());
        
        // Ensure very small size (~20px max)
        const tiny = await sharp(buffer)
        .resize(20)
        .toBuffer();
        
        const mime = res.headers.get("content-type") ?? "image/jpeg";
        
        return `data:${mime};base64,${tiny.toString("base64")}`;
    } catch {
        return null;
    }
};
