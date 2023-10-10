import { Box, LightMode, theme } from "@chakra-ui/react";
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

export default function MyApp({ appData }) {
  return (
    <LightMode>
      <AppNavBar navItems={myNavItems()} />
      <MyAppHero heroData={appData.hero} />
      <Box p={12} bg={theme.colors.gray[50]} />
      <AppScreenShots
        screenshots={appData.screenshots}
        appLink={appData.hero.appUrl}
        hero={appData.hero}
      />
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
