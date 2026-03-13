import { absoluteUrl } from "@/baseUrl/absoluteUrl";
import { driveDirectData } from "@/data/tools/driveDirect/driveDirectData";
import { SoftwareApplicationJsonLd } from "next-seo";
import { generateNextSeo } from "next-seo/pages";
import Head from "next/head";
import React from "react";

type Props = {};

const DriveDirectSeo: React.FC<Props> = (props: Props) => {
  const { meta, steps } = driveDirectData();
  const canonicalUrl = absoluteUrl(meta.url);
  return (
    <>
      <Head>
        {generateNextSeo({
          title: meta.title,
          description: meta.desc,
          canonical: canonicalUrl,
          openGraph: {
            title: meta.title,
            description: meta.desc,
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
          content="Google Drive, Direct Link, Download Link, Link Generator, Free Tool, No Login, Secure, Private, Instant Links, Shareable Links"
        />
      </Head>
      <SoftwareApplicationJsonLd
        type="WebApplication"
        name={meta.title}
        description={meta.desc}
        url={canonicalUrl}
        applicationCategory="Tool"
        operatingSystem="All"
        screenshot={[
          {
            url: absoluteUrl(meta.image.src),
            caption: "Hero Image",
          },
          ...steps.steps.map((step, idx) => ({
            url: absoluteUrl(step.image.src),
            caption: `Step ${idx + 1}: ${step.title}`,
          })),
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

export default DriveDirectSeo;
