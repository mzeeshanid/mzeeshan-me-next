import { absoluteUrl } from "@/baseUrl/absoluteUrl";
import { appleOfferSignatureMetaData } from "@/data/tools/appleOfferSignature/appleOfferSignatureMetaData";
import { SoftwareApplicationJsonLd } from "next-seo";
import { generateNextSeo } from "next-seo/pages";
import Head from "next/head";
import React from "react";

type Props = {};

const AppleOfferSignatureSeo: React.FC<Props> = (props: Props) => {
  const meta = appleOfferSignatureMetaData;
  return (
    <>
      <Head>
        {generateNextSeo({
          title: meta.title,
          description: meta.desc,
          openGraph: {
            title: meta.title,
            description: meta.desc,
            url: absoluteUrl(meta.url),
            images: [
              {
                url: absoluteUrl(meta.image.src),
                type: "image/png",
              },
            ],
          },
        })}
        <meta
          name="keywords"
          content="Apple promotional offer signature generator, In-App purchase promo signature tool, Apple StoreKit signature generator, promotional offer signature testing tool, SKPaymentDiscount signature generator, generate Apple promo offer signature, Apple InApp subscription promotional offer, StoreKit promotional offer tool, App Store Connect promo signature testing, Apple promo offer signature generator online, StoreKit promo offer signature generator, promo offer signature tester, Apple InApp promo offer signing tool, SKPaymentDiscount signature tester, generate promo offer signature for developers, Apple In-App purchase testing tool, promotional offer signature generator for StoreKit"
        />
      </Head>
      <SoftwareApplicationJsonLd
        type="WebApplication"
        name={meta.title}
        description={meta.desc}
        url={absoluteUrl(meta.url)}
        applicationCategory="Tool"
        operatingSystem="All"
        screenshot={[
          {
            url: absoluteUrl(meta.image.src),
            caption: "Hero Image",
          },
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

export default AppleOfferSignatureSeo;
