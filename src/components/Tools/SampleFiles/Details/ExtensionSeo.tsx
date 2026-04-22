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
  const pageUrl = absoluteUrl(`/tools/sample-files/extensions/${extension.slug}`);
  const image = absoluteUrl("/assets/mzfilemanage_appicon.png");

  const title = `Free ${extension.name} Sample Files – Download for Testing`;

  const rawDesc =
    extension.info ||
    extension.details?.sections?.whatIs?.content ||
    `Download free ${extension.name} sample files for testing and development.`;
  const description = rawDesc.slice(0, 155);

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
        description={description}
        url={pageUrl}
        license="https://creativecommons.org/licenses/by/4.0/"
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
