import { absoluteUrl } from "@/baseUrl/absoluteUrl";
import {
  jsonValidatorFormatterMetaData,
  JsonValidatorFormatterMetaData,
} from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import { SoftwareApplicationJsonLd } from "next-seo";
import { generateNextSeo } from "next-seo/pages";
import Head from "next/head";
import React from "react";

type Props = {
  /** Override meta for converter sub-pages. Defaults to the validator meta. */
  meta?: JsonValidatorFormatterMetaData;
};

const JsonValidatorFormatterSeo: React.FC<Props> = ({ meta: metaProp }) => {
  const meta = metaProp ?? jsonValidatorFormatterMetaData;
  const canonicalUrl = absoluteUrl(meta.url);

  return (
    <>
      <Head>
        {generateNextSeo({
          title: meta.title,
          description: meta.description,
          canonical: canonicalUrl,
          openGraph: {
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
          content={
            meta.keywords ??
            "json validator, json formatter, json validator show error line, json validator with line numbers, json that shows error line, json tree viewer online, format escaped json string, remove escape characters from json online, json formatter no upload, json parse error line, json prettify, json minify, json search"
          }
        />
      </Head>
      <SoftwareApplicationJsonLd
        type="WebApplication"
        name={meta.title}
        description={meta.description}
        url={canonicalUrl}
        applicationCategory="DeveloperApplication"
        operatingSystem="All"
        screenshot={[
          {
            url: absoluteUrl(meta.image.src),
            caption: meta.title,
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

export default JsonValidatorFormatterSeo;
