import React from "react";
import { absoluteUrl } from "@/baseUrl/absoluteUrl";
import { salaryTaxMetaData } from "@/data/tools/salaryTaxCalculator";
import { SoftwareApplicationJsonLd } from "next-seo";
import { generateNextSeo } from "next-seo/pages";
import Head from "next/head";

const SalaryTaxSeo: React.FC = () => {
  const meta = salaryTaxMetaData;
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
          content="salary tax calculator Pakistan, Pakistan income tax calculator 2025-26, FBR tax calculator, net take home salary Pakistan, income tax slab 2025 Pakistan, salaried person tax Pakistan, monthly tax deduction Pakistan, how to calculate income tax Pakistan, Pakistan salary after tax, FBR salaried income tax"
        />
        <link rel="canonical" href={canonicalUrl} />
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
            caption: "Pakistan Salary Tax Calculator — FBR 2025-26",
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

export default SalaryTaxSeo;
