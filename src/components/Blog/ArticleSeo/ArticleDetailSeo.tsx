import { ArticleModel } from "@/apis/articles/articles";
import { ArticleJsonLd } from "next-seo";
import { generateNextSeo } from "next-seo/pages";
import Head from "next/head";
import React from "react";

type ArticleDetailSeoProps = {
  article: ArticleModel;
};

export const ArticleDetailSeo: React.FC<ArticleDetailSeoProps> = ({
  article,
}) => {
  const {
    title,
    description,
    slug,
    createdAt,
    updatedAt,
    image,
    writer,
    category,
  } = article;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const url = `${siteUrl}/blog/${slug}`;

  const ogImage = image?.formats?.large || image?.formats?.medium || image;

  const publishedTime = new Date(createdAt).toISOString();
  const modifiedTime = new Date(updatedAt ?? createdAt).toISOString();

  const authorName = writer?.name ?? "Editorial Team";
  const authorUrl = `${siteUrl}`;

  const metaDescription =
    description?.slice(0, 160) ?? `Read ${title} on our blog.`;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Indexing */}
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />

        {generateNextSeo({
          title,
          description: metaDescription,
          canonical: url,
          openGraph: {
            type: "article",
            url,
            title,
            description: metaDescription,
            article: {
              publishedTime,
              modifiedTime,
              authors: authorUrl ? [authorUrl] : undefined,
              tags: category?.name ? [category.name] : undefined,
            },
            images: ogImage?.url
              ? [
                  {
                    url: ogImage.url,
                    width: ogImage.width,
                    height: ogImage.height,
                    alt: title,
                  },
                ]
              : undefined,
          },
          twitter: {
            cardType: ogImage?.url ? "summary_large_image" : "summary",
          },
        })}
      </Head>

      {/* 📄 Article structured data */}
      <ArticleJsonLd
        url={url}
        headline={title}
        image={ogImage?.url}
        datePublished={publishedTime}
        dateModified={modifiedTime}
        author={authorName}
        description={metaDescription}
      />
    </>
  );
};
