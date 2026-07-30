import { getBaseUrl } from "@/baseUrl/getBaseUrl";
import { getBeBaseUrl } from "@/baseUrl/getBeBaseUrl";
import strapiClient from "@/strapiClient/strapiClient";
import { MyStrapiError } from "@/strapiClient/strapiError";

export interface IncrementVariantDownloadResponse {
  success: boolean;
  message: string;
}

/**
 * Variant names are stored as "EXT - Descriptive Title" (e.g. "MP4 - 4K HEVC").
 * Strips the leading "EXT - " prefix so only the descriptive title remains.
 */
export const trimVariantNamePrefix = (name: string): string =>
  name.replace(/^[A-Za-z0-9+]+ - /i, "");

export interface SampleFilesChangelogVariant {
  name: string;
  documentId: string;
}

export interface SampleFilesChangelogEntry {
  date: string;
  extension: string;
  extensionSlug: string;
  variants: SampleFilesChangelogVariant[];
  moreCount: number;
}

const MAX_VARIANTS_PER_CHANGELOG_ENTRY = 3;

interface RecentVariant {
  documentId: string;
  name: string;
  createdAt: string;
  extension?: { name: string; slug: string };
}

const formatChangelogDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

/**
 * Builds "Recently Added" changelog entries from real variant creation
 * timestamps — groups variants created for the same extension on the same
 * day into a single entry, newest first.
 */
export const fetchSampleFilesChangelogStrapi = async (
  categorySlug?: string,
  limit: number = 5,
  extensionSlug?: string,
): Promise<SampleFilesChangelogEntry[]> => {
  try {
    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

    const filters: any = {
      createdAt: { $gte: oneMonthAgo.toISOString() },
    };
    if (extensionSlug) {
      filters.extension = { slug: { $eq: extensionSlug } };
    } else if (categorySlug) {
      filters.extension = { type: { slug: { $eq: categorySlug } } };
    }

    const response = await strapiClient()
      .collection("sample-file-variants")
      .find({
        fields: ["name", "createdAt"],
        populate: { extension: { fields: ["name", "slug"] } },
        filters,
        sort: ["createdAt:desc"],
        // 200 is the highest pageSize Strapi's REST API allows per request.
        pagination: { page: 1, pageSize: 200 },
      });

    const variants = (response.data || []) as unknown as RecentVariant[];

    const entries: SampleFilesChangelogEntry[] = [];
    const byKey = new Map<string, SampleFilesChangelogEntry>();

    for (const variant of variants) {
      if (!variant.extension) continue;

      const dateLabel = formatChangelogDate(variant.createdAt);
      const key = `${variant.extension.slug}|${dateLabel}`;

      let entry = byKey.get(key);
      if (!entry) {
        entry = {
          date: dateLabel,
          extension: variant.extension.name,
          extensionSlug: variant.extension.slug,
          variants: [],
          moreCount: 0,
        };
        byKey.set(key, entry);
        entries.push(entry);
      }

      if (entry.variants.length < MAX_VARIANTS_PER_CHANGELOG_ENTRY) {
        entry.variants.push({
          name: trimVariantNamePrefix(variant.name),
          documentId: variant.documentId,
        });
      } else {
        entry.moreCount += 1;
      }
    }

    return entries.slice(0, limit);
  } catch (error: any) {
    throw new MyStrapiError(
      "Failed to fetch sample files changelog",
      error?.response?.status,
    );
  }
};

/**
 * Increment the download count of a sample file variant
 * Direct Strapi call - use for backend/API routes only
 */
export const incrementVariantDownloadCountStrapi = async (
  variantDocumentId: string,
): Promise<IncrementVariantDownloadResponse> => {
  const beBaseUrl = getBeBaseUrl();
  const apiToken = process.env.BE_STRAPI_API_TOKEN;

  if (!apiToken) {
    throw new Error("BE_STRAPI_API_TOKEN is not defined");
  }

  try {
    const response = await fetch(
      `${beBaseUrl}/api/sample-file-variants/${variantDocumentId}/increment-download`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    const responseBody = await response.json().catch(() => null);

    if (!response.ok) {
      throw new MyStrapiError(
        responseBody?.error || "Failed to increment variant download count",
        response.status,
      );
    }

    return responseBody as IncrementVariantDownloadResponse;
  } catch (error: any) {
    if (error instanceof MyStrapiError) {
      throw error;
    }

    throw new MyStrapiError(
      "Failed to increment variant download count",
      error?.response?.status,
    );
  }
};

/**
 * Increment download count for a sample file variant
 * Frontend API call - use on client side
 */
export const incrementVariantDownloadCount = async (
  variantDocumentId: string,
  extensionDocumentId?: string,
): Promise<{ success: boolean }> => {
  const baseUrl = getBaseUrl();

  try {
    const res = await fetch(
      `${baseUrl}/api/sample-files/variants/${variantDocumentId}/download`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: extensionDocumentId
          ? JSON.stringify({ extensionDocumentId })
          : undefined,
      },
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to update download count");
    }

    await res.json();
    return { success: true };
  } catch (error: any) {
    console.error("Error incrementing download count:", error);
    throw error;
  }
};
