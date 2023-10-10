import { LightMode } from "@chakra-ui/system";
import { FAQPageJsonLd, NextSeo, SoftwareAppJsonLd } from "next-seo";
import React from "react";
import MyApp from "../src/components/PersonalAppsTemplate/MyApp";
import MZPlayerHDData from "../src/data/mzPlayerHDData";

export default function MZPlayerHD() {
  const appData = MZPlayerHDData();
  const metaTitle = "iOS App - MZPlayerHD";
  const metaDesc =
    "MZPlayerHD allows background playback of youtube videos. Enjoy your videos with advanced HD video player.";
  const image = "https://www.mzeeshan.me/assets/mzplayer_hd_appicon.png";
  return (
    <LightMode>
      <NextSeo
        title={metaTitle}
        description={metaDesc}
        openGraph={{
          title: metaTitle,
          description: metaDesc,
          url: "https://www.mzeeshan.me/mzplayerhd",
          images: [
            {
              url: image,
              width: 300,
              height: 300,
              alt: "MZPlayerHD App Icon",
              type: "image/png",
            },
          ],
          site_name:
            "Muhammad Zeeshan | Senior iOS Developer | Swift Enthusiast",
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            property: "keywords",
            content:
              "filemanager iOS, file browser iOS, download manager iOS, playlist manager iOS, downloader app iOS, background video playback, background multimedia playback, filemanager app iOS, file browser app for iOS, Wifi file sharing iOS, offline filemanagement iOS, file editing iOS, import or exports files in iOS, iOS general file operations copy move paste delete, best app for file management, good filemanager app, good downloading app, internet download manager iOS, free download file manager ios, free download file browser, buy source code file manager ios, ios source code for file manager app, purchase file manager ios, buy file explorer ios",
          },
        ]}
      />
      <SoftwareAppJsonLd
        name="MZPlayerHD"
        price="Free"
        priceCurrency="USD"
        aggregateRating={{ ratingValue: "4.4", reviewCount: "15" }}
        operatingSystem="iOS"
        applicationCategory="Utility"
      />
      <FAQPageJsonLd
        mainEntity={appData.faqs.map((faq) => {
          return {
            questionName: faq.question,
            acceptedAnswerText: faq.answer,
          };
        })}
      />

      <MyApp appData={appData} />
    </LightMode>
  );
}
