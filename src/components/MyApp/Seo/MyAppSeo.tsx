import { absoluteUrl } from "@/baseUrl/absoluteUrl";
import { MyAppMetaDataModel } from "@/data/myApps/myAppMetaData";
import { MyAppScreenshotsDataModel } from "@/data/myApps/myAppScreenshotsData";
import { SoftwareApplicationJsonLd } from "next-seo";
import { generateNextSeo } from "next-seo/pages";
import Head from "next/head";
import React from "react";

type Props = {
  meta: MyAppMetaDataModel;
  screenshotsData: MyAppScreenshotsDataModel;
};

const MyAppSeo: React.FC<Props> = (props: Props) => {
  const { meta, screenshotsData } = props;
  const canonicalUrl = absoluteUrl(meta.siteUrl);
  const title = `${meta.appName} - ${meta.tagline}`;
  return (
    <>
      <Head>
        {generateNextSeo({
          title,
          description: meta.description,
          canonical: canonicalUrl,
          openGraph: {
            title,
            description: meta.description,
            url: canonicalUrl,
            type: "website",
            images: [
              {
                url: absoluteUrl(meta.heroImage.src.src),
                type: "image/png",
              },
            ],
          },
        })}
        <meta name="keywords" content={meta.keywords} />
      </Head>
      <SoftwareApplicationJsonLd
        type="MobileApplication"
        name={meta.appName}
        description={meta.description}
        url={absoluteUrl(meta.siteUrl)}
        applicationCategory={meta.category}
        operatingSystem={meta.operatingSystems}
        screenshot={[
          {
            url: absoluteUrl(meta.heroImage.src.src),
            caption: "Hero Image",
          },
          ...screenshotsData.screenshots.map((screenshot) => ({
            url: absoluteUrl(screenshot.src.src),
            caption: screenshot.alt,
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

export default MyAppSeo;
