import { absoluteUrl } from "@/baseUrl/absoluteUrl";
import mySEOData from "@/data/home/mySEOData";
import { ClaimReviewJsonLd, ProfilePageJsonLd } from "next-seo";
import { generateNextSeo } from "next-seo/pages";
import Head from "next/head";
import React from "react";

type MySeoProps = {};

const MySeo: React.FC<MySeoProps> = (props: MySeoProps) => {
  const mySeo = mySEOData();
  const canonicalUrl = mySeo.url;

  return (
    <>
      <Head>
        {generateNextSeo({
          title: mySeo.title,
          description: mySeo.desc,
          openGraph: {
            title: mySeo.title,
            description: mySeo.desc,
            url: canonicalUrl,
            type: mySeo.type,
            siteName: "mzeeshan.me",
            profile: {
              firstName: mySeo.firstName,
              lastName: mySeo.lastName,
              username: mySeo.username,
              gender: mySeo.gender,
            },
            images: [
              {
                ...mySeo.hero,
                url: absoluteUrl(mySeo.hero.src),
              },
              {
                ...mySeo.logo,
                url: absoluteUrl(mySeo.logo.src),
              },
            ],
          },
        })}
        <link rel="canonical" href={canonicalUrl} />
        <link
          rel="preload"
          as="image"
          href="/assets/mzeeshan_me_hero.jpeg"
          // @ts-ignore
          fetchpriority="high"
        />
        <meta
          name="keywords"
          content="Senior iOS Developer, Senior iOS Developer Pakistan, Experienced iOS Developer, Swift iOS Developer, SwiftUI iOS Developer, Freelance iOS Developer, Experienced React Native Developer, Experienced cross platform developer, Experienced iOS Native developer, Native iOS Development, Test driven development, Freelancer from Pakistan, Hire freelance native iOS Developer from Pakistan, Hire iOS Developer, Hire experienced iOS Developer"
        />
      </Head>
      <ProfilePageJsonLd
        mainEntity={{
          name: mySeo.title,
          alternateName: mySeo.username,
          description: mySeo.desc,
          image: absoluteUrl(mySeo.hero.src),
          sameAs: mySeo.sameAs,
        }}
      />
      {mySeo.reviewsData.reviews.map((review, idx) => (
        <ClaimReviewJsonLd
          key={idx}
          claimReviewed={review.text}
          reviewRating={{
            ratingValue: review.rating,
            bestRating: 5,
            worstRating: 1,
            alternateName: review.platform,
          }}
          url={review.source}
          author={review.name}
        />
      ))}
    </>
  );
};

export default MySeo;
