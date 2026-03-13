import { SampleFilesCategoryModel } from "@/apis/sampleFiles/sampleFilesCategories";
import { absoluteUrl } from "@/baseUrl/absoluteUrl";
import { generateNextSeo } from "next-seo/pages";
import Head from "next/head";
import React from "react";

type Props = {
  category: SampleFilesCategoryModel;
};

const SampleFilesCategorySeo: React.FC<Props> = (props: Props) => {
  const { category } = props;
  const title = category.name + " - Sample Files";
  const desc =
    "A web app, that allow developers and testers to download free sample files from 6 different categories.";
  const image = "/assets/mzfilemanage_appicon.png";
  return (
    <Head>
      {generateNextSeo({
        title: title,
        description: desc,
        openGraph: {
          title: title,
          description: desc,
          url: absoluteUrl(image),
          images: [
            {
              url: absoluteUrl(image),
              type: "image/png",
              width: 300,
              height: 300,
              alt: "Sample Files Web App Icon",
            },
          ],
        },
      })}
    </Head>
  );
};

export default SampleFilesCategorySeo;
