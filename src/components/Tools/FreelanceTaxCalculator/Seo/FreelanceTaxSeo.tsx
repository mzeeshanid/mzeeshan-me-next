import React from "react";
import { absoluteUrl } from "@/baseUrl/absoluteUrl";
import { freelanceTaxMetaData } from "@/data/tools/freelanceTaxCalculator";
import { SoftwareApplicationJsonLd } from "next-seo";
import { generateNextSeo } from "next-seo/pages";
import Head from "next/head";

const FreelanceTaxSeo: React.FC = () => {
  const meta = freelanceTaxMetaData;
  const canonicalUrl = absoluteUrl(meta.url);
  return (
    <>
      <Head>
        {generateNextSeo({
          title: meta.title,
          description: meta.description,
          canonical: canonicalUrl,
          openGraph: {
            type: "website",
            siteName: "mzeeshan.me",
            title: meta.title,
            description: meta.description,
            url: canonicalUrl,
            images: [
              {
                url: absoluteUrl(meta.image.src),
                type: meta.image.type,
              },
            ],
          },
        })}
        <meta
          name="keywords"
          content="freelance tax calculator Pakistan, Pakistan freelancer income tax 2026-27, PSEB tax rate 0.25, Section 154A Pakistan, Pakistan freelancer income tax, Upwork Fiverr tax Pakistan, foreign income tax Pakistan freelancer, PSEB registered freelancer tax, freelance income tax Pakistan, how much tax freelancers pay Pakistan"
        />
      </Head>
      <SoftwareApplicationJsonLd
        type="WebApplication"
        name={meta.title}
        description={meta.description}
        url={canonicalUrl}
        applicationCategory="FinanceApplication"
        operatingSystem="All"
        screenshot={[
          {
            url: absoluteUrl(meta.image.src),
            caption: "Pakistan Freelance Tax Calculator — PSEB 0.25% & Section 154A 2026-27",
          },
        ]}
        offers={[
          {
            price: 0,
            priceCurrency: "PKR",
            availability: "https://schema.org/InStock",
          },
        ]}
      />
    </>
  );
};

export default FreelanceTaxSeo;
