import Footer from "@/components/Footer/Footer";
import MyAppStats from "@/components/MyApp/Stats/MyAppsStats";
import MyAppsHero from "@/components/MyApps/Hero/MyAppsHero";
import MyAppsListing from "@/components/MyApps/Listing/MyAppsListing";
import MyAppsSeo from "@/components/MyApps/Seo/MyAppsSeo";
import MyAppsTestimonials from "@/components/MyApps/Testimonials/MyAppsTestimonials";
import NavBar from "@/components/NavBar/NavBar";
import PageHeader from "@/components/PageHeader/PageHeader";
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
