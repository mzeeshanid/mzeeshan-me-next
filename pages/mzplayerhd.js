import { LightMode } from "@chakra-ui/react";
import { FAQPageJsonLd, NextSeo, SoftwareAppJsonLd } from "next-seo";
import React from "react";
import Head from "next/head";
import MZPlayerHDData from "../src/data/mzPlayerHDData";
import MyApp from "../src/components/PersonalAppsTemplate/MyApp";

export default function MZPlayerHD() {
  const appData = MZPlayerHDData();
  return (
    <LightMode>
      <NextSeo title={"MZPlayerHD iOS App by Muhammad Zeeshan"} />
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
      <Head>
        <meta
          name="keywords"
          content="filemanager iOS, file browser iOS, download manager iOS, playlist manager iOS, downloader app iOS, background video playback, background multimedia playback, filemanager app iOS, file browser app for iOS, Wifi file sharing iOS, offline filemanagement iOS, file editing iOS, import or exports files in iOS, iOS general file operations copy move paste delete, best app for file management, good filemanager app, good downloading app, internet download manager iOS, free download file manager ios, free download file browser, buy source code file manager ios, ios source code for file manager app, purchase file manager ios, buy file explorer ios"
        />
      </Head>
      <MyApp appData={appData} />
    </LightMode>
  );
}
