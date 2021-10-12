import { LightMode } from "@chakra-ui/color-mode";
import { FAQPageJsonLd, NextSeo, SoftwareAppJsonLd } from "next-seo";
import React from "react";
import MyApp from "../src/components/PersonalAppsTemplate/MyApp";
import MZfileManageData from "../src/data/mzfileManageData";

import Head from "next/head";

export default function MZFileManage() {
  const appData = MZfileManageData();
  return (
    <LightMode>
      <NextSeo title={"MZFileManager iOS App by Muhammad Zeeshan"} />
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
      <Head>
        <meta
          name="keywords"
          content="filemanager iOS, file browser iOS, download manager iOS, playlist manager iOS, downloader app iOS, background video playback, background multimedia playback, filemanager app iOS, file browser app for iOS, Wifi file sharing iOS, offline filemanagement iOS, file editing iOS, import or exports files in iOS, iOS general file operations copy move paste delete, best app for file management, good filemanager app, good downloading app, internet download manager iOS, free download file manager ios, free download file browser, buy source code file manager ios, ios source code for file manager app, purchase file manager ios, buy file explorer ios"
        />
      </Head>
      <MyApp appData={appData} />;
    </LightMode>
  );
}
