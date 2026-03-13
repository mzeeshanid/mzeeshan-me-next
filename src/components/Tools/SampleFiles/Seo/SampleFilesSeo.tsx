import { absoluteUrl } from "@/baseUrl/absoluteUrl";
import { SoftwareApplicationJsonLd } from "next-seo";
import { generateNextSeo } from "next-seo/pages";
import Head from "next/head";
import React from "react";

type Props = {};

const SampleFilesSeo: React.FC<Props> = (props: Props) => {
  const title = "Ultimate Resource for free Sample Files";
  const desc =
    "A web app, that allow developers and testers to download free sample files, having 55+ differet types.";
  const image = "/assets/mzfilemanage_appicon.png";
  const canonicalUrl = absoluteUrl("/tools/sample-files");
  return (
    <>
      <Head>
        {generateNextSeo({
          title: title,
          description: desc,
          canonical: canonicalUrl,
          openGraph: {
            title: title,
            description: desc,
            url: canonicalUrl,
            images: [
              {
                url: absoluteUrl(image),
                type: "image/png",
                width: 300,
                height: 300,
                alt: "Sample Files Web App Icon",
              },
            ],
          },
        })}
      </Head>
      <SoftwareApplicationJsonLd
        type="WebApplication"
        name={title}
        description={desc}
        url={canonicalUrl}
        applicationCategory="Utility"
        operatingSystem="All"
        screenshot={[
          {
            url: absoluteUrl(image),
            caption: "Sample Files Web App Icon",
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

export default SampleFilesSeo;
