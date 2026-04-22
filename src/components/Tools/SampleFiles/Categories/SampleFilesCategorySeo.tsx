import { SampleFilesCategoryModel } from "@/apis/sampleFiles/sampleFilesCategories";
import { SampleFilesExtensionModel } from "@/apis/sampleFiles/sampleFilesExtension";
import { absoluteUrl } from "@/baseUrl/absoluteUrl";
import { generateNextSeo } from "next-seo/pages";
import Head from "next/head";
import React from "react";

type Props = {
  category: SampleFilesCategoryModel;
  extensions: SampleFilesExtensionModel[];
};

const SampleFilesCategorySeo: React.FC<Props> = ({ category, extensions }) => {
  const pageUrl = absoluteUrl(`/tools/sample-files/category/${category.slug}`);
  const image = "/assets/mzfilemanage_appicon.png";

  const title = `Free ${category.name} Sample Files – Download for Testing`;

  const sampleNames = extensions
    .slice(0, 3)
    .map((e) => e.name)
    .join(", ");
  const desc =
    extensions.length > 0
      ? `Download free ${category.name.toLowerCase()} sample files in ${extensions.length} formats${sampleNames ? ` including ${sampleNames}` : ""}. Instant download for developers and testers.`
      : `Download free ${category.name.toLowerCase()} sample files for testing and development. Instant download, no sign-up required.`;

  const keywords = [
    `${category.name} sample files`,
    `free ${category.name.toLowerCase()} files`,
    `download ${category.name.toLowerCase()} files`,
    `test ${category.name.toLowerCase()} files`,
    `${category.name.toLowerCase()} test files for developers`,
  ].join(", ");

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    description: desc,
    url: pageUrl,
    numberOfItems: extensions.length,
    itemListElement: extensions.slice(0, 50).map((ext, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: ext.name,
      url: absoluteUrl(`/tools/sample-files/extensions/${ext.slug}`),
    })),
  };

  return (
    <>
      <Head>
        {generateNextSeo({
          title,
          description: desc,
          canonical: pageUrl,
          twitter: { cardType: "summary" },
          openGraph: {
            type: "website",
            title,
            description: desc,
            url: pageUrl,
            images: [
              {
                url: absoluteUrl(image),
                type: "image/png",
                width: 300,
                height: 300,
                alt: `${category.name} sample files`,
              },
            ],
          },
        })}
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta name="keywords" content={keywords} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      </Head>
    </>
  );
};

export default SampleFilesCategorySeo;
