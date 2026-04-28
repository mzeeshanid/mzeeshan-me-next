import MyApps from "@/components/Home/MyApps/MyApps";
import MyClientReviews from "@/components/Home/MyClientReviews/MyClientReviews";
import MyCTA from "@/components/Home/MyCTA/MyCTA";
import MyFrameworks from "@/components/Home/MyFrameworks/MyFrameworks";
import MyHero from "@/components/Home/MyHero/MyHero";
import MyOpenSourceContribution from "@/components/Home/MyOpenSourceContribution/MyOpenSourceContribution";
import MyPerformanceStats from "@/components/Home/MyPerformanceStats/MyPerformanceStats";
import MyPricing from "@/components/Home/MyPricing/MyPricing";
import MySeo from "@/components/Home/MySeo/MySeo";
import MySkills from "@/components/Home/MySkills/MySkills";
import MyStats from "@/components/Home/MyStats/MyStats";
import MyThirdPartySDKs from "@/components/Home/MyThirdPartySDKs/MyThirdPartySDKs";
import { Container, Spacer } from "@chakra-ui/react";
import React from "react";
import Footer from "../src/components/Footer/Footer";
import NavBar from "../src/components/NavBar/NavBar";

type HomeProps = {};

const Home: React.FC<HomeProps> = (props: HomeProps) => {
  return (
    <>
      <MySeo />
      <Container p={0} maxW="full">
        {/* --- NavBar --- */}
        <NavBar />
        <Spacer p={{ base: 4, lg: 8 }} />
        {/* --- Hero --- */}
        <Container maxW="6xl">
          <MyHero />
        </Container>
        <Spacer p={8} />
        {/* --- Skills --- */}
        <Container maxW="6xl">
          <MySkills />
        </Container>
        <Spacer p={8} />
        {/* --- Frameworks --- */}
        <Container maxW="6xl">
          <MyFrameworks />
        </Container>
        <Spacer p={8} />
        {/* --- SDKs --- */}
        <Container maxW="6xl">
          <MyThirdPartySDKs />
        </Container>
        <Spacer p={8} />
        {/* --- Pricing --- */}
        <Container maxW="6xl">
          <MyPricing />
        </Container>
        <Spacer p={8} />
        {/* --- Performance --- */}
        <Container maxW="6xl">
          <MyPerformanceStats />
        </Container>
        <Spacer p={8} />
        {/* --- CTA --- */}
        <Container maxW="6xl">
          <MyCTA />
        </Container>
        <Spacer p={8} />
        {/* --- Apps --- */}
        <Container maxW="6xl">
          <MyApps />
        </Container>
        <Spacer p={8} />
        {/* --- Stats --- */}
        <Container maxW="6xl">
          <MyStats />
        </Container>
        <Spacer p={8} />
        {/* --- Reviews --- */}
        <Container maxW="6xl">
          <MyClientReviews />
        </Container>
        <Spacer p={8} />
        {/* --- OpenSource Contribution --- */}
        <Container maxW="6xl">
          <MyOpenSourceContribution />
        </Container>
        <Spacer p={4} />
        {/* --- Footer --- */}
        <Footer />
      </Container>
    </>
  );
};

export default Home;
