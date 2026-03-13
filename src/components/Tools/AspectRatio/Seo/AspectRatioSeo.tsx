import { absoluteUrl } from "@/baseUrl/absoluteUrl";
import { aspectRatioMetaData } from "@/data/tools/aspectRatio/aspectRatioMetaData";
import { SoftwareApplicationJsonLd } from "next-seo";
import { generateNextSeo } from "next-seo/pages";
import Head from "next/head";
import React from "react";

type Props = {};

const AspectRatioSeo: React.FC<Props> = (props: Props) => {
  const meta = aspectRatioMetaData;
  return (
    <>
      <Head>
        {generateNextSeo({
          title: meta.title,
          description: meta.desc,
          openGraph: {
            title: meta.title,
            description: meta.desc,
            url: absoluteUrl(meta.url),
            images: [
              {
                url: absoluteUrl(meta.image.src),
                type: "image/png",
              },
            ],
          },
        })}
        <meta
          name="keywords"
          content="aspect ratio calculator,aspect ratio tool,image aspect ratio calculator,video aspect ratio calculator,resize without distortion,aspect ratio converter"
        />
      </Head>
      <SoftwareApplicationJsonLd
        type="WebApplication"
        name={meta.title}
        description={meta.desc}
        url={absoluteUrl(meta.url)}
        applicationCategory="Tool"
        operatingSystem="All"
        screenshot={[
          {
            url: absoluteUrl(meta.image.src),
            caption: "Hero Image",
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

export default AspectRatioSeo;
