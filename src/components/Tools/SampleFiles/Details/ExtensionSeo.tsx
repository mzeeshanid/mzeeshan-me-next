import { SampleFilesExtensionDetailModel } from "@/apis/sampleFiles/sampleFilesExtensionDetails";
import { absoluteUrl } from "@/baseUrl/absoluteUrl";
import { generateNextSeo } from "next-seo/pages";
import Head from "next/head";
import React from "react";

type Props = {
  extension: SampleFilesExtensionDetailModel;
};

const ExtensionSeo: React.FC<Props> = (props: Props) => {
  const { extension } = props;
  const title = extension.name.toUpperCase() + " - Sample File";
  const metaDesc = extension.details?.sections?.whatIs?.content;
  const image = "/assets/mzfilemanage_appicon.png";
  return (
    <Head>
      {generateNextSeo({
        title: title,
        description: metaDesc,
        openGraph: {
          title: title,
          description: metaDesc,
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

export default ExtensionSeo;
