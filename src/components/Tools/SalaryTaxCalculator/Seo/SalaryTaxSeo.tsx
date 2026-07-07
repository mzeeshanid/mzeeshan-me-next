import React from "react";
import { absoluteUrl } from "@/baseUrl/absoluteUrl";
import { getSalaryTaxMetaForYear } from "@/data/tools/salaryTaxCalculator";
import { CURRENT_TAX_YEAR } from "@/data/tools/salaryTaxCalculator/salaryTaxSlabsData";
import { SoftwareApplicationJsonLd } from "next-seo";
import { generateNextSeo } from "next-seo/pages";
import Head from "next/head";

interface SalaryTaxSeoProps {
  taxYear?: string;
}

const SalaryTaxSeo: React.FC<SalaryTaxSeoProps> = ({ taxYear = CURRENT_TAX_YEAR }) => {
  const meta = getSalaryTaxMetaForYear(taxYear);
  const canonicalUrl = absoluteUrl(meta.url);
  const fullYear = taxYear.replace("-", "-20");
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
          content={`salary tax calculator Pakistan ${fullYear}, Pakistan income tax calculator ${taxYear}, FBR tax calculator, net take home salary Pakistan, income tax slab Pakistan, salaried person tax Pakistan, monthly tax deduction Pakistan, how to calculate income tax Pakistan, Pakistan salary after tax, FBR salaried income tax`}
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
            caption: `Pakistan Salary Tax Calculator — FBR ${taxYear}`,
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
