import { LightMode, Box, theme } from "@chakra-ui/react";
import { FAQPageJsonLd, NextSeo, SoftwareAppJsonLd } from "next-seo";
import React from "react";
import myNavItems from "../../data/myNavItems";
import AppFooter from "../AppFooter";
import AppNavBar from "../AppNavBar";
import AppStats from "../AppStats";
import AppClone from "./AppClone";
import AppFaqs from "./AppFaqs";
import AppHowTos from "./AppHowTos";
import AppScreenShots from "./AppScreenShots";
import MyAppFeaturesGrid from "./MyAppFeaturesGrid";
import MyAppHero from "./MyAppHero";
import MyAppReviews from "./MyAppReviews";
import Head from "next/head";

export default function MyApp({ appData }) {
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
          content="filemanager iOS, file browser iOS, download manager iOS, playlist manager iOS, downloader app iOS, background video playback, background multimedia playback, filemanager app iOS, file browser app for iOS, Wifi file sharing iOS, offline filemanagement iOS, file editing iOS, import or exports files in iOS, iOS general file operations copy move paste delete, best app for file management, good filemanager app, good downloading app, internet download manager iOS"
        />
      </Head>
      <AppNavBar navItems={myNavItems()} />
      <MyAppHero heroData={appData.hero} />
      <Box p={12} bg={theme.colors.gray[50]} />
      <AppScreenShots screenshots={appData.screenshots} />
      <Box p={8} bg={theme.colors.white} />
      <MyAppFeaturesGrid features={appData.features} />
      <AppStats stats={appData.stats} />
      <AppHowTos />
      <MyAppReviews reviews={appData.reviews} />
      <AppClone cloneData={appData.clone} />
      <AppFaqs faqs={appData.faqs} />
      <AppFooter />
    </LightMode>
  );
}
