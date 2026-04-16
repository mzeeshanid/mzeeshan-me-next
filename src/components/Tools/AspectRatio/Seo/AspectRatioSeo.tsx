import { absoluteUrl } from "@/baseUrl/absoluteUrl";
import { aspectRatioMetaData } from "@/data/tools/aspectRatio/aspectRatioMetaData";
import { SoftwareApplicationJsonLd } from "next-seo";
import { generateNextSeo } from "next-seo/pages";
import Head from "next/head";
import React from "react";

type Props = {};

const AspectRatioSeo: React.FC<Props> = () => {
  const meta = aspectRatioMetaData;
  return (
    <>
      <Head>
        {generateNextSeo({
          title: meta.title,
          description: meta.desc,
          canonical: absoluteUrl(meta.url),
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
          content="aspect ratio calculator, aspect ratio calculator 16:9, calculate aspect ratio from width and height, video aspect ratio calculator, aspect ratio calculator for youtube, resize image without distortion, find aspect ratio of image, aspect ratio 4:3 to 16:9, 16:9 aspect ratio pixels, responsive design aspect ratio, aspect ratio converter"
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
