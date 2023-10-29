import React from "react";
import AppNavBar from "../../src/components/AppNavBar";
import myNavItems from "../../src/data/myNavItems";
import AppFooter from "../../src/components/AppFooter";
import G2DHero from "../../src/components/g2d/G2DHero";
import GDrive2DirectSteps from "../../src/components/g2d/GDrive2DirectSteps";
import { Box, LightMode, theme } from "@chakra-ui/react";
import AppHeadingText from "../../src/components/AppHeadingText";
import { NextSeo } from "next-seo";
import Head from "next/head";
import g2dGenericMeta from "../../src/data/g2dGenericMeta";

function index() {
  const metaData = g2dGenericMeta();
  return (
    <LightMode>
      <NextSeo
        title={metaData.title}
        description={metaData.desc}
        openGraph={{
          url: "https://www.mzeeshan.me/google-drive-direct-link-generator",
          title: metaData.title,
          description: metaData.desc,
          images: [{ url: metaData.image }],
          site_name: metaData.title,
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <Head>
        <meta
          name="keywords"
          content="direct download link google drive, direct download link generator, google drive direct link generator, direct link download, direct link generator, google drive direct link to file, how to make direct download link, google drive direct link to image, google drive direct link to video, google drive shareable link, share link generator, direct download, gdirect, how to by pass google drive preview page"
        />
      </Head>
      <AppNavBar navItems={myNavItems()} />
      <G2DHero />
      <Box bg={theme.colors.white} p={4} />
      <Box bg={theme.colors.gray[100]} p={4}>
        <AppHeadingText
          heading="Steps For Getting Sharing Link"
          bg={"transparent"}
        />
      </Box>
      <Box bg={theme.colors.white} p={4} />
      <GDrive2DirectSteps />
      <Box bg={theme.colors.white} p={4} />
      <AppFooter />
    </LightMode>
  );
}

export default index;
