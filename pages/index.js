import { Box, Center, Link, theme } from "@chakra-ui/react";
import loadable from "@loadable/component";
import { NextSeo, SocialProfileJsonLd } from "next-seo";
import Head from "next/head";
import AppFooter from "../src/components/AppFooter";
import AppHeadingText from "../src/components/AppHeadingText";
import AppHero from "../src/components/AppHero";
import AppIconBoxContainer from "../src/components/AppIconBoxContainer";
import AppMySkills from "../src/components/AppMySkills";
import AppNavBar from "../src/components/AppNavBar";
import AppStats from "../src/components/AppStats";
import appGenericMeta from "../src/data/appGenericMeta";
import myApps from "../src/data/myApps";
import myNavItems from "../src/data/myNavItems";
import myStats from "../src/data/myStats";
import myTools from "../src/data/myTools";
import AppReviews from "../src/components/AppReviews";

const AppOpenSourceContribution = loadable(() =>
  import("../src/components/AppContribution")
);

export default function Home() {
  const meta = appGenericMeta();
  return (
    <>
      <NextSeo
        title={meta.title}
        description={meta.desc}
        openGraph={{
          title: meta.title,
          description: meta.desc,
          url: "https://www.mzeeshan.me/",
          type: "profile",
          profile: {
            firstName: "Muhammad",
            lastName: "Zeeshan",
            username: "mzeeshanid",
            gender: "male",
          },
          images: [
            {
              url: meta.image,
              width: 1008.0,
              height: 756.0,
              alt: "Hero Image",
            },
          ],
        }}
      />
      <SocialProfileJsonLd
        type="Person"
        name="Muhammad Zeeshan"
        url="https://www.mzeeshan.me"
        sameAs={[
          "https://www.facebook.com/mzeeshanid",
          "https://www.linkedin.com/in/muhammad-zeeshan-04b8585b/",
          "https://twitter.com/mzeeshanid",
        ]}
      />
      <Head>
        <meta
          name="keywords"
          content="Senior iOS Developer, Senior iOS Developer Pakistan, Experienced iOS Developer, Swift iOS Developer, SwiftUI iOS Developer, Freelance iOS Developer, Experienced React Native Developer, Experienced cross platform developer, Experienced iOS Native developer, Native iOS Development, Test driven development, Freelancer from Pakistan, Hire freelance native iOS Developer from Pakistan, Hire iOS Developer, Hire experienced iOS Developer"
        />
      </Head>
      <AppNavBar navItems={myNavItems()} />
      <AppHero as={"h1"} />
      <Box bg="white" p={4} />
      <Center>
        <Box maxW={"1200px"}>
          <AppHeadingText
            bg="white"
            headingColor={theme.colors.black}
            heading="About Me"
            text="I strive to build immerse apps, having more than 6 years of experience
          in the field of mobile application development specifically for iOS
          platform using objective-c and swift programming language with strong
          understanding of object oriented design, protocol oriented
          programming, dependency manager, memory management, REST APIs, test
          driven development, git for source control. Also
          having strong grip on tools like xcode with deep understanding of
          debugging and adhoc / appstore distribution of applications."
          />
        </Box>
      </Center>
      <Box bg="white" p={4} />
      <Center>
        <Box maxW={"1200px"}>
          <AppHeadingText
            bg="white"
            headingColor={theme.colors.black}
            heading="Master Thesis"
            text="An ontological approach for generating adaptive content in game based
          inquiry learning environment."
          >
            <Link
              color="teal"
              href="http://111.68.99.22:8080/xmlui/handle/123456789/8912"
              isExternal
            >
              More Details
            </Link>
          </AppHeadingText>
        </Box>
      </Center>
      <Box bg="white" p={4} />
      <Box bg="gray.100" p={4} />
      <AppMySkills />
      <Box bg="white" p={4} />
      <AppIconBoxContainer
        title="My Apps"
        info="My personal apps and apps on which I worked on."
        data={myApps()}
        bg={"white"}
      />
      <AppStats stats={myStats()} />
      <Box bg="gray.100" p={4} />
      <AppIconBoxContainer
        title={"Helper Tools"}
        data={myTools()}
        bg="gray.100"
      />
      <Box p={4} />
      <AppReviews />
      <Box>
        <AppOpenSourceContribution />
      </Box>
      <AppFooter />
    </>
  );
}
