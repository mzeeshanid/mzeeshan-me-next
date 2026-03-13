import { absoluteUrl } from "@/baseUrl/absoluteUrl";
import { generateNextSeo } from "next-seo/pages";
import Head from "next/head";
import React from "react";

type Props = {};

const MyToolsSeo: React.FC<Props> = (props: Props) => {
  const title = "Helper Tools by Muhammad Zeeshan";
  const details =
    "Explore a collection of thoughtfully designed helper tools focused to boost productivity with perfection.";
  const heroImage = "/assets/mzfilemanage/mzfilemanage_hero.png";

  return (
    <Head>
      {generateNextSeo({
        title: title,
        description: details,
        openGraph: {
          title: title,
          description: details,
          url: absoluteUrl(heroImage),
          images: [
            {
              url: absoluteUrl(heroImage),
              type: "image/png",
            },
          ],
        },
      })}
    </Head>
  );
};

export default MyToolsSeo;
