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
  return (
    <>
      <Head>
        {generateNextSeo({
          title: meta.appName,
          description: meta.description,
          openGraph: {
            title: meta.appName,
            description: meta.description,
            url: absoluteUrl(meta.siteUrl),
            images: [
              {
                url: absoluteUrl(meta.heroImage.src),
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
            url: absoluteUrl(meta.heroImage.src),
            caption: "Hero Image",
          },
          ...screenshotsData.screenshots.map((screenshot) => ({
            url: absoluteUrl(screenshot.src),
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
