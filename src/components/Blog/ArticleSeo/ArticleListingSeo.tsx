import { absoluteUrl } from "@/baseUrl/absoluteUrl";
import mySEOData from "@/data/home/mySEOData";
import { generateNextSeo } from "next-seo/pages";
import Head from "next/head";
import React from "react";

type ArticleListingSeoProps = {
  page?: number;
};

const ArticleListingSeo: React.FC<ArticleListingSeoProps> = (
  props: ArticleListingSeoProps,
) => {
  const { page = 1 } = props;
  const aTitle = "Blog - Sharing Experiences";
  const aDesc =
    "A personal blog where I write about programming, personal experiences and my personal apps. Sometime I share my travelling experiences, stories and jokes.";
  const mySeo = mySEOData();

  const blogUrl = absoluteUrl("/blog");
  const canonical = page > 1 ? `${blogUrl}?page=${page}` : blogUrl;
  return (
    <>
      <Head>
        {generateNextSeo({
          title: aTitle,
          description: aDesc,
          canonical: canonical,
          openGraph: {
            title: aTitle,
            description: aDesc,
            url: blogUrl,
            type: "website",
            images: [
              {
                ...mySeo.logo,
                url: absoluteUrl(mySeo.logo.src),
              },
              {
                ...mySeo.hero,
                url: absoluteUrl(mySeo.hero.src),
              },
            ],
          },
          twitter: {
            handle: "@mzeeshanid",
            site: "@site",
            cardType: "summary_large_image",
          },
        })}
      </Head>
    </>
  );
};

export default ArticleListingSeo;
