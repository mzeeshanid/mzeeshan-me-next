import React from "react";
import { absoluteUrl } from "@/baseUrl/absoluteUrl";
import { colorConverterMetaData } from "@/data/tools/colorFormatConverter";
import { SoftwareApplicationJsonLd } from "next-seo";
import { generateNextSeo } from "next-seo/pages";
import Head from "next/head";

const ColorConverterSeo: React.FC = () => {
  const meta = colorConverterMetaData;
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
          content="hex to rgb, rgb to hex, hsl to hex, hsv converter, css color converter, hex to rgb converter online, rgb to hsl converter, hex to rgba with opacity, hsl to hex online, color format converter, convert hex color code, rgb to hsv online, hsv to rgb converter, web color codes converter, html color converter, css color codes, color picker converter"
        />
      </Head>
      <SoftwareApplicationJsonLd
        type="WebApplication"
        name={meta.title}
        description={meta.description}
        url={canonicalUrl}
        applicationCategory="Utility"
        operatingSystem="All"
        screenshot={[
          {
            url: absoluteUrl(meta.image.src),
            caption: "Color Format Converter — HEX RGB HSL HSV",
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

export default ColorConverterSeo;
