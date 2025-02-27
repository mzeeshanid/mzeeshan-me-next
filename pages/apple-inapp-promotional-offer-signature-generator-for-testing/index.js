import { LightMode } from "@chakra-ui/system";
import Head from "next/head";
import myNavItems from "../../src/data/myNavItems";
import AppNavBar from "../../src/components/AppNavBar";
import AppFooter from "../../src/components/AppFooter";
import PromotionalOfferHero from "../../src/components/PromotionalOffer/PromotionalOfferHero";
import PromotionalOfferInfo from "../../src/components/PromotionalOffer/PromotionalOfferInfo";
import { NextSeo } from "next-seo";

function index() {
  return (
    <LightMode>
      <Head>
        <meta
          name="keywords"
          content="apple in app promotional offer signature generator for testing"
        />
        <NextSeo
          title={"Apple Promotional Offer Signature Generator"}
          description={
            "apple in app promotional offer signature generator for testing"
          }
          openGraph={{
            title: "Apple Promotional Offer Signature Generator",
            description:
              "apple in app promotional offer signature generator for testing",
            url: "https://www.mzeeshan.me/apple-inapp-promotional-offer-signature-generator-for-testing",
            images: [
              {
                url: "https://www.mzeeshan.me/assets/promotional_offer_appicon.png",
                width: 400,
                height: 400,
                alt: "Apple Promotional Offer Signature Generator Web App Icon",
                type: "image/png",
              },
            ],
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
                "generate apple promotional offer signature for testing, promotional offer signature, skdomainerror 12",
            },
          ]}
        />
      </Head>
      <AppNavBar navItems={myNavItems()} />
      <PromotionalOfferHero />
      <PromotionalOfferInfo />
      <AppFooter />
    </LightMode>
  );
}

export default index;
