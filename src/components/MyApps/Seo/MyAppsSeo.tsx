import { absoluteUrl } from "@/baseUrl/absoluteUrl";
import { generateNextSeo } from "next-seo/pages";
import Head from "next/head";
import React from "react";

type Props = {};

const MyAppsSeo: React.FC<Props> = (props: Props) => {
  const title = "Native Apps by Muhammad Zeeshan";
  const details =
    "Explore a collection of thoughtfully designed native applications focused on performance, usability, and elegant user experiences.";
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

export default MyAppsSeo;
