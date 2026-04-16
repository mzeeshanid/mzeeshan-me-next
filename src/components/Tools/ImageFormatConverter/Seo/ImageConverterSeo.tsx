import Head from "next/head";
import React from "react";
import { SoftwareApplicationJsonLd } from "next-seo";
import { generateNextSeo } from "next-seo/pages";

import { absoluteUrl } from "@/baseUrl/absoluteUrl";
import type { ToolMetaData } from "@/data/tools/imageFormatConverter/types";

type Props = {
  meta: ToolMetaData;
};

const ImageConverterSeo: React.FC<Props> = ({ meta }) => {
  const canonicalUrl = absoluteUrl(meta.url);
  const imageUrl = absoluteUrl(meta.image.src);

  return (
    <>
      <Head>
        {generateNextSeo({
          title: meta.title,
          description: meta.description,
          canonical: canonicalUrl,
          openGraph: {
            title: meta.title,
            description: meta.description,
            url: canonicalUrl,
            images: [
              {
                url: imageUrl,
                type: meta.image.type,
              },
            ],
          },
        })}
        {meta.keywords && (
          <meta name="keywords" content={meta.keywords} />
        )}
      </Head>
      <SoftwareApplicationJsonLd
        type="WebApplication"
        name={meta.title}
        description={`${meta.description} Runs in the browser without uploading images to a server.`}
        url={canonicalUrl}
        applicationCategory="UtilitiesApplication"
        operatingSystem="All"
        screenshot={[
          {
            url: imageUrl,
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

export default ImageConverterSeo;
