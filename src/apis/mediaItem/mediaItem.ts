import { API } from "@strapi/client";

// Type definitions based on the actual response structure
export interface MediaItem extends API.Document {
    id: number;
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    formats?: Record<string, MediaItem>;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
}