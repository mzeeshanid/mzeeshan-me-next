import React from "react";
import { absoluteUrl } from "@/baseUrl/absoluteUrl";
import { stringMetricsMetaData } from "@/data/tools/stringMetrics/stringMetricsFeatures";
import { SoftwareApplicationJsonLd } from "next-seo";
import { generateNextSeo } from "next-seo/pages";
import Head from "next/head";

type Props = {};

const StringMetricsSeo: React.FC<Props> = (props: Props) => {
  const meta = stringMetricsMetaData;

  return (
    <>
      <Head>
        {generateNextSeo({
          title: meta.title,
          description: meta.description,
          openGraph: {
            title: meta.title,
            description: meta.description,
            url: absoluteUrl(meta.url),
            images: [
              {
                url: absoluteUrl(meta.image.src),
                type: meta.image.type,
              },
            ],
          },
        })}
        <meta
          name="keywords"
          content="string metrics, string similarity, string comparison, fuzzy matching, levenshtein distance, jaro-winkler, damerau distance, lcs, edit distance, string algorithms"
        />
        <link rel="canonical" href={absoluteUrl(meta.url)} />
      </Head>
      <SoftwareApplicationJsonLd
        type="WebApplication"
        name={meta.title}
        description={meta.description}
        url={absoluteUrl(meta.url)}
        applicationCategory="Utility"
        operatingSystem="All"
        screenshot={[
          {
            url: absoluteUrl(meta.image.src),
            caption: "String Metrics Tool",
          },
        ]}
        offers={[
          {
            price: 0,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        ]}
      />
    </>
  );
};

export default StringMetricsSeo;
