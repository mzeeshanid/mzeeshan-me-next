import React from "react";
import Head from "next/head";
import { generateNextSeo } from "next-seo/pages";

type ArticleCategorySeoProps = {
  category: {
    name: string;
    slug: string;
    description?: string;
  };
};

export const ArticleCategorySeo: React.FC<ArticleCategorySeoProps> = ({
  category,
}) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
  const url = `${siteUrl}/blog/category/${category.slug}`;

  const title = `${category.name} Articles`;
  const metaDescription =
    category.description ??
    `Read the latest articles about ${category.name}. Tutorials, guides, and insights curated for you.`;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />

        {/* next-seo v7 output */}
        {generateNextSeo({
          title,
          description: metaDescription,
          canonical: url,
          openGraph: {
            type: "website",
            url,
            title,
            description: metaDescription,
          },
          twitter: {
            cardType: "summary",
          },
        })}
      </Head>
    </>
  );
};
