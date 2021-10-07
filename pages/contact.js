import { LightMode } from "@chakra-ui/color-mode";
import { NextSeo, SocialProfileJsonLd } from "next-seo";
import React from "react";
import AppContact from "../src/components/AppContact";
import AppFooter from "../src/components/AppFooter";
import AppHero from "../src/components/AppHero";
import AppNavBar from "../src/components/AppNavBar";
import appGenericMeta from "../src/data/appGenericMeta";
import myNavItems from "../src/data/myNavItems";
import mySocialConnect from "../src/data/mySocialConnect";

export default function Contact() {
  const meta = appGenericMeta();
  return (
    <LightMode>
      <NextSeo
        openGraph={{
          title: meta.title,
          description: meta.desc,
          url: "https://www.mzeeshan.me/",
          type: "profile",
          profile: {
            firstName: "Muhammad",
            lastName: "Zeeshan",
            username: "mzeeshanid",
            gender: "male",
          },
          images: [
            {
              url: meta.image,
              width: 150.0,
              height: 150.0,
              alt: "Profile Photo",
            },
          ],
        }}
      />
      <SocialProfileJsonLd
        type="Person"
        name="Muhammad Zeeshan"
        url="https://www.mzeeshan.me"
        sameAs={mySocialConnect().map((item) => {
          return item.url.includes("skype") ? item.url : `https:${item.url}`;
        })}
      />
      <AppNavBar navItems={myNavItems()} />
      <AppHero />
      <AppContact />
      <AppFooter />
    </LightMode>
  );
}
