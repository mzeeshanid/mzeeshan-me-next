import { absoluteUrl } from "@/baseUrl/absoluteUrl";
import { appIconGeneratorMetaData } from "@/data/tools/appIconGenerator/appIconGeneratorData";
import { SoftwareApplicationJsonLd } from "next-seo";
import { generateNextSeo } from "next-seo/pages";
import Head from "next/head";
import React from "react";

const AppIconGeneratorSeo: React.FC = () => {
  const meta = appIconGeneratorMetaData;
  const canonicalUrl = absoluteUrl(meta.url);

  return (
    <>
      <Head>
        {generateNextSeo({
          title: meta.title,
          description: meta.description,
          canonical: canonicalUrl,
          openGraph: {
            type: "website",
            siteName: "mzeeshan.me",
            title: meta.title,
            description: meta.description,
            url: canonicalUrl,
            images: [
              {
                url: absoluteUrl(meta.image.src),
                type: meta.image.type,
              },
            ],
          },
        })}
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <SoftwareApplicationJsonLd
        type="WebApplication"
        name={meta.title}
        description={meta.description}
        url={canonicalUrl}
        applicationCategory="DeveloperApplication"
        operatingSystem="All"
        screenshot={[
          {
            url: absoluteUrl(meta.image.src),
            caption: meta.title,
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

export default AppIconGeneratorSeo;
