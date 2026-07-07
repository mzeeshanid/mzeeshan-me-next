import dynamic from "next/dynamic";
// Above fold — eager (visible without scrolling)
import MyHero from "@/components/Home/MyHero/MyHero";
import MySeo from "@/components/Home/MySeo/MySeo";
import {
  MySkillsSkeleton,
  MyFrameworksSkeleton,
  MyThirdPartySDKsSkeleton,
  MyPricingSkeleton,
  MyPerformanceStatsSkeleton,
  MyCTASkeleton,
  MyAppsSkeleton,
  MyFreeToolsSkeleton,
  MyStatsSkeleton,
  MyClientReviewsSkeleton,
  MyOpenSourceContributionSkeleton,
} from "@/components/Home/HomeSkeletons";
// Below fold — lazy chunks; skeletons hold layout while each chunk downloads
const MySkills = dynamic(() => import("@/components/Home/MySkills/MySkills"), { loading: () => <MySkillsSkeleton /> });
const MyFrameworks = dynamic(() => import("@/components/Home/MyFrameworks/MyFrameworks"), { loading: () => <MyFrameworksSkeleton /> });
const MyThirdPartySDKs = dynamic(() => import("@/components/Home/MyThirdPartySDKs/MyThirdPartySDKs"), { loading: () => <MyThirdPartySDKsSkeleton /> });
const MyPricing = dynamic(() => import("@/components/Home/MyPricing/MyPricing"), { loading: () => <MyPricingSkeleton /> });
const MyPerformanceStats = dynamic(() => import("@/components/Home/MyPerformanceStats/MyPerformanceStats"), { loading: () => <MyPerformanceStatsSkeleton /> });
const MyCTA = dynamic(() => import("@/components/Home/MyCTA/MyCTA"), { loading: () => <MyCTASkeleton /> });
const MyApps = dynamic(() => import("@/components/Home/MyApps/MyApps"), { loading: () => <MyAppsSkeleton /> });
const MyFreeTools = dynamic(() => import("@/components/Home/MyFreeTools/MyFreeTools"), { loading: () => <MyFreeToolsSkeleton /> });
const MyStats = dynamic(() => import("@/components/Home/MyStats/MyStats"), { loading: () => <MyStatsSkeleton /> });
const MyClientReviews = dynamic(() => import("@/components/Home/MyClientReviews/MyClientReviews"), { loading: () => <MyClientReviewsSkeleton /> });
const MyOpenSourceContribution = dynamic(() => import("@/components/Home/MyOpenSourceContribution/MyOpenSourceContribution"), { loading: () => <MyOpenSourceContributionSkeleton /> });
import { Container } from "@chakra-ui/react";
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
        <main>
        {/* --- Hero --- */}
        <Container maxW="6xl" mt={{ base: 4, lg: 8 }} mb={8}>
          <MyHero />
        </Container>
        {/* --- Skills --- */}
        <Container maxW="6xl" mb={8}>
          <MySkills />
        </Container>
        {/* --- Frameworks --- */}
        <Container maxW="6xl" mb={8}>
          <MyFrameworks />
        </Container>
        {/* --- SDKs --- */}
        <Container maxW="6xl" mb={8}>
          <MyThirdPartySDKs />
        </Container>
        {/* --- Pricing --- */}
        <Container maxW="6xl" mb={8}>
          <MyPricing />
        </Container>
        {/* --- Performance --- */}
        <Container maxW="6xl" mb={8}>
          <MyPerformanceStats />
        </Container>
        {/* --- CTA --- */}
        <Container maxW="6xl" mb={8}>
          <MyCTA />
        </Container>
        {/* --- Apps --- */}
        <Container maxW="6xl" mb={8}>
          <MyApps />
        </Container>
        {/* --- Free Tools --- */}
        <Container maxW="6xl" mb={8}>
          <MyFreeTools />
        </Container>
        {/* --- Stats --- */}
        <Container maxW="6xl" mb={8}>
          <MyStats />
        </Container>
        {/* --- Reviews --- */}
        <Container maxW="6xl" mb={8}>
          <MyClientReviews />
        </Container>
        {/* --- OpenSource Contribution --- */}
        <Container maxW="6xl" mb={4}>
          <MyOpenSourceContribution />
        </Container>
        {/* --- Footer --- */}
        </main>
        <Footer />
      </Container>
    </>
  );
};

export default Home;
