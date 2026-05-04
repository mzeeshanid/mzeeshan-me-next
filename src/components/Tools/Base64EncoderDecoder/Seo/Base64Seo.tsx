import React from "react";
import { absoluteUrl } from "@/baseUrl/absoluteUrl";
import { base64MetaData } from "@/data/tools/base64EncoderDecoder/base64EncoderDecoderFeatures";
import { SoftwareApplicationJsonLd } from "next-seo";
import { generateNextSeo } from "next-seo/pages";
import Head from "next/head";

const Base64Seo: React.FC = () => {
  const meta = base64MetaData;
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
        <meta
          name="keywords"
          content="base64 encode, base64 decode, base64 encoder decoder, base64 converter, image to base64, base64 to image, base64 url encode, base64 file encoder, base64url decode, pdf to base64, base64 encode online free, base64 decode online free"
        />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <SoftwareApplicationJsonLd
        type="WebApplication"
        name={meta.title}
        description={meta.description}
        url={canonicalUrl}
        applicationCategory="Utility"
        operatingSystem="All"
        screenshot={[
          {
            url: absoluteUrl(meta.image.src),
            caption: "Base64 Encoder Decoder Tool",
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

export default Base64Seo;
