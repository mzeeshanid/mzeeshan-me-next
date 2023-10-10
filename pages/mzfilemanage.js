import { LightMode } from "@chakra-ui/system";
import { FAQPageJsonLd, NextSeo, SoftwareAppJsonLd } from "next-seo";
import React from "react";
import MyApp from "../src/components/PersonalAppsTemplate/MyApp";
import MZfileManageData from "../src/data/mzfileManageData";

export default function MZFileManage() {
  const appData = MZfileManageData();
  const metaTitle = "iOS App - MZFileManager";
  const mestDesc =
    "MZFileManager is the one-stop file manager along with a powerful download manager, playlist manager and much more!";

  const image = "https://www.mzeeshan.me/assets/mzfilemanage_appicon.png";

  return (
    <LightMode>
      <NextSeo
        title={metaTitle}
        description={mestDesc}
        openGraph={{
          title: metaTitle,
          description: mestDesc,
          url: "https://www.mzeeshan.me/mzfilemanage",
          images: [
            {
              url: image,
              width: 300,
              height: 300,
              alt: "MZFileManager App Icon",
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
        name="MZFileManager"
        price="Free"
        priceCurrency="USD"
        aggregateRating={{ ratingValue: "4.4", reviewCount: "10" }}
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
