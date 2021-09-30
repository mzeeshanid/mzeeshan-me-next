import { Box, Link, theme } from "@chakra-ui/react";
import AppFooter from "../src/components/AppFooter";
import AppHeadingText from "../src/components/AppHeadingText";
import AppHero from "../src/components/AppHero";
import AppIconBoxContainer from "../src/components/AppIconBoxContainer";
import AppNavBar from "../src/components/AppNavBar";
import myNavItems from "../src/data/myNavItems";
import myApps from "../src/data/myApps";
import AppStats from "../src/components/AppStats";
import myStats from "../src/data/myStats";
import myTools from "../src/data/myTools";
import AppContribution from "../src/components/AppContribution";
import AppMySkills from "../src/components/AppMySkills";
import appGenericMeta from "../src/data/appGenericMeta";
import { NextSeo } from "next-seo";

export default function Home() {
  const meta = appGenericMeta();
  return (
    <>
      <NextSeo
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
              width: 150.0,
              height: 150.0,
              alt: "Profile Photo",
            },
          ],
        }}
      />
      <AppNavBar navItems={myNavItems()} />
      <AppHero />
      <Box bg="white" p={4} />
      <AppHeadingText
        bg="white"
        headingColor={theme.colors.black}
        heading="About Me"
        text="I strive to build immerse apps, having more than 6 years of experience
          in the field of mobile application development specifically for iOS
          platform using objective-c and swift programming language with strong
          understanding of object oriented design, protocol oriented
          programming, dependency manager, memory management, REST APIs, test
          driven development (Initial stage), git for source control. Also
          having strong grip on tools like xcode with deep understanding of
          debugging and adhoc / appstore distribution of applications."
      />
      <Box bg="white" p={4} />
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
      <AppContribution />
      <AppFooter />
    </>
  );
}