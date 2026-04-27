import { absoluteUrl } from "@/baseUrl/absoluteUrl";
import { SoftwareApplicationJsonLd } from "next-seo";
import { generateNextSeo } from "next-seo/pages";
import Head from "next/head";
import React from "react";

const SampleFilesSeo: React.FC = () => {
  const title = "Free Sample Files for Testing – Download 55+ Formats";
  const desc =
    "Download free sample files in 55+ formats including PDF, MP3, FLAC, WAV, MP4, DOCX and more. Instantly available for developers and testers.";
  const image = "/assets/mzfilemanage_appicon.png";
  const canonicalUrl = absoluteUrl("/tools/sample-files");

  return (
    <>
      <Head>
        {generateNextSeo({
          title,
          description: desc,
          canonical: canonicalUrl,
          twitter: { cardType: "summary" },
          openGraph: {
            type: "website",
            siteName: "mzeeshan.me",
            title,
            description: desc,
            url: canonicalUrl,
            images: [
              {
                url: absoluteUrl(image),
                type: "image/png",
                width: 300,
                height: 300,
                alt: "Sample Files – free test file downloads",
              },
            ],
          },
        })}
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta
          name="keywords"
          content="free sample files, test files, dummy files, download sample files, sample PDF, sample MP3, sample FLAC, sample video, file testing, developer test files"
        />
      </Head>

      <SoftwareApplicationJsonLd
        type="WebApplication"
        name={title}
        description={desc}
        url={canonicalUrl}
        applicationCategory="Utility"
        operatingSystem="All"
        author={{ name: "mzeeshan.me", url: absoluteUrl("/") }}
        screenshot={[{ url: absoluteUrl(image), caption: "Sample Files – free test file downloads" }]}
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

export default SampleFilesSeo;
