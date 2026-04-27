import { absoluteUrl } from "@/baseUrl/absoluteUrl";
import { unixTimestampMetaData } from "@/data/tools/unixTimestamp/unixTimestampMetaData";
import { SoftwareApplicationJsonLd } from "next-seo";
import { generateNextSeo } from "next-seo/pages";
import Head from "next/head";
import React from "react";

type Props = {};

const UnixTimestampSeo: React.FC<Props> = () => {
  const meta = unixTimestampMetaData;
  const canonicalUrl = absoluteUrl(meta.url);

  return (
    <>
      <Head>
        {generateNextSeo({
          title: meta.title,
          description: meta.desc,
          canonical: canonicalUrl,
          openGraph: {
            type: "website",
            siteName: "mzeeshan.me",
            title: meta.title,
            description: meta.desc,
            url: canonicalUrl,
            images: [
              {
                url: absoluteUrl(meta.image.src),
                width: meta.image.width,
                height: meta.image.height,
                alt: meta.image.alt,
                type: "image/png",
              },
            ],
          },
        })}
        <link rel="canonical" href={canonicalUrl} />
        <meta
          name="keywords"
          content="unix timestamp to human readable date, epoch converter online, convert unix timestamp to date and time, milliseconds to date converter, date to unix timestamp online, unix epoch converter, epoch time converter, timestamp to date, unix timestamp converter, epoch timestamp, seconds to date converter, unix time converter"
        />
      </Head>
      <SoftwareApplicationJsonLd
        type="WebApplication"
        name={meta.title}
        description={meta.desc}
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

export default UnixTimestampSeo;
