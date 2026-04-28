import { SampleFilesExtensionDetailModel } from "@/apis/sampleFiles/sampleFilesExtensionDetails";
import { absoluteUrl } from "@/baseUrl/absoluteUrl";
import { DatasetJsonLd } from "next-seo";
import { generateNextSeo } from "next-seo/pages";
import Head from "next/head";
import React from "react";

type Props = {
  extension: SampleFilesExtensionDetailModel;
};

const ExtensionSeo: React.FC<Props> = ({ extension }) => {
  const pageUrl = absoluteUrl(
    `/tools/sample-files/extensions/${extension.slug}`,
  );
  const image = absoluteUrl("/assets/mzfilemanage_appicon.png");

  const title = `Free ${extension.name} Sample Files`;

  // Page meta description: short, prefer info, fall back to whatIs content
  const rawDesc =
    extension.details?.sections?.whatIs?.content ||
    `Download free ${extension.name} sample files for testing and development.`;
  const description = rawDesc.slice(0, 155);

  // Dataset JSON-LD description: must be substantive (Google rejects < ~50 chars).
  // Prefer the longer whatIs content; augment the short info string if needed.
  const whatIsContent = extension.details?.sections?.whatIs?.content;
  const datasetDesc = whatIsContent
    ? whatIsContent.slice(0, 500)
    : `A collection of free ${extension.name} sample files for developers and testers. Includes variants covering audio quality, channels, sample rates, metadata, and more. Download individual files to verify codec compatibility, player behaviour, and edge-case handling.`;

  const keywords = [
    extension.name,
    `${extension.name} sample file`,
    `${extension.name} test file`,
    `download ${extension.name}`,
    `free ${extension.name} files`,
    extension.type?.name,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <>
      <Head>
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta name="keywords" content={keywords} />

        {generateNextSeo({
          title,
          description,
          canonical: pageUrl,
          openGraph: {
            type: "website",
            siteName: "mzeeshan.me",
            url: pageUrl,
            title,
            description,
            images: [
              {
                url: image,
                type: "image/png",
                width: 300,
                height: 300,
                alt: `${extension.name} Sample Files`,
              },
            ],
          },
          twitter: {
            cardType: "summary",
          },
        })}
      </Head>

      <DatasetJsonLd
        name={title}
        description={datasetDesc}
        url={pageUrl}
        license="https://creativecommons.org/licenses/by/4.0/"
        creator={{
          "@type": "Organization",
          name: "mzeeshan.me",
          url: absoluteUrl("/"),
        }}
        distribution={(extension.variants || []).map((v) => ({
          "@type": "DataDownload",
          name: v.name,
          contentUrl: v.asset?.url ?? v.url ?? "",
          encodingFormat: extension.name.toLowerCase(),
          contentSize: v.size,
        }))}
      />
    </>
  );
};

export default ExtensionSeo;
