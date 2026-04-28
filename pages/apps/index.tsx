import dynamic from "next/dynamic";
import Footer from "@/components/Footer/Footer";
import MyAppsHero from "@/components/MyApps/Hero/MyAppsHero";
import MyAppsSeo from "@/components/MyApps/Seo/MyAppsSeo";
import NavBar from "@/components/NavBar/NavBar";
import PageHeader from "@/components/PageHeader/PageHeader";
const MyAppsListing = dynamic(() => import("@/components/MyApps/Listing/MyAppsListing"));
const MyAppStats = dynamic(() => import("@/components/MyApp/Stats/MyAppsStats"));
const MyAppsTestimonials = dynamic(() => import("@/components/MyApps/Testimonials/MyAppsTestimonials"));
import { myAppsStatsData } from "@/data/myApps/myAppStatsData";
import { Container, Spacer } from "@chakra-ui/react";
import React from "react";

type Props = {};

const MyAppsHome: React.FC<Props> = (props: Props) => {
  return (
    <>
      <MyAppsSeo />
      <NavBar />
      <main>
      <Spacer p={4} />
      <Container maxW="6xl">
        <PageHeader
          title={"My Apps"}
          breadcrumbItems={[{ label: "Home", href: "/" }, { label: "Apps" }]}
        />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <MyAppsHero />
      </Container>

      <Spacer p={4} />
      <Container maxW="6xl">
        <MyAppsListing />
      </Container>

      <Spacer p={4} />
      <Container maxW={"6xl"}>
        <MyAppStats statsData={myAppsStatsData} />
      </Container>

      <Spacer p={4} />
      <Container maxW={"6xl"}>
        <MyAppsTestimonials />
      </Container>

      <Spacer p={4} />
      </main>
      <Footer />
    </>
  );
};

export default MyAppsHome;
