import dynamic from "next/dynamic";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import PageHeader from "@/components/PageHeader/PageHeader";
import { Container, Spacer } from "@chakra-ui/react";
import React from "react";
import MyAppHero from "../Hero/MyAppHero";
import { MyAppDataModel } from "@/data/myApps/myAppData";
import MyAppSeo from "../Seo/MyAppSeo";
const MyAppScreenshots = dynamic(() => import("../Screenshots/MyAppScreenshots"));
const MyAppFeatures = dynamic(() => import("../Features/MyAppFeatures"));
const MyAppStats = dynamic(() => import("../Stats/MyAppsStats"));
const MyAppReviews = dynamic(() => import("../Reviews/MyAppReviews"));
const MyAppClone = dynamic(() => import("../Clone/MyAppClone"));
const MyAppFaqs = dynamic(() => import("../Faqs/MyAppFaqs"));

type Props = {
  appData: MyAppDataModel;
};

const MyAppHome: React.FC<Props> = (props: Props) => {
  const {
    meta,
    screenshotsData,
    featuresData,
    faqsData,
    statsData,
    reviewsData,
    cloneData,
  } = props.appData;
  return (
    <>
      <MyAppSeo meta={meta} screenshotsData={screenshotsData} />
      <NavBar
        header={{
          title: meta.appName,
          subtitle: meta.tagline,
          icon: meta.appIcon.src,
          alt: meta.appIcon.alt,
        }}
      />
      <main>
      <Spacer p={4} />
      <Container maxW="6xl">
        <PageHeader
          title={meta.appName}
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "Apps", href: "/apps" },
            { label: meta.appName },
          ]}
        />
      </Container>

      <Spacer p={4} />
      <Container maxW={"6xl"}>
        <MyAppHero meta={meta} />
      </Container>

      <Spacer p={4} />
      <Container maxW={"6xl"}>
        <MyAppScreenshots screenshotsData={screenshotsData} />
      </Container>

      <Spacer p={4} />
      <Container maxW={"6xl"}>
        <MyAppFeatures featuresData={featuresData} />
      </Container>

      <Spacer p={8} />
      <Container maxW={"6xl"}>
        <MyAppStats statsData={statsData} />
      </Container>

      <Spacer p={8} />
      <Container maxW={"6xl"}>
        <MyAppReviews reviewsData={reviewsData} />
      </Container>

      <Spacer p={8} />
      <Container maxW={"6xl"}>
        <MyAppClone cloneData={cloneData} />
      </Container>

      <Spacer p={8} />
      <Container maxW={"6xl"}>
        <MyAppFaqs faqsData={faqsData} />
      </Container>

      <Spacer p={4} />
      </main>
      <Footer />
    </>
  );
};

export default MyAppHome;
