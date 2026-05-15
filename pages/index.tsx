import dynamic from "next/dynamic";
import { css } from "styled-system/css";
import { container } from "styled-system/patterns";
// Above fold — eager (visible without scrolling)
import MyHero from "@/components/Home/MyHero/MyHero";
import MySeo from "@/components/Home/MySeo/MySeo";
// Below fold — lazy chunks loaded in parallel after initial paint
const MySkills = dynamic(() => import("@/components/Home/MySkills/MySkills"));
const MyFrameworks = dynamic(() => import("@/components/Home/MyFrameworks/MyFrameworks"));
const MyThirdPartySDKs = dynamic(() => import("@/components/Home/MyThirdPartySDKs/MyThirdPartySDKs"));
const MyPricing = dynamic(() => import("@/components/Home/MyPricing/MyPricing"));
const MyPerformanceStats = dynamic(() => import("@/components/Home/MyPerformanceStats/MyPerformanceStats"));
const MyCTA = dynamic(() => import("@/components/Home/MyCTA/MyCTA"));
const MyApps = dynamic(() => import("@/components/Home/MyApps/MyApps"));
const MyStats = dynamic(() => import("@/components/Home/MyStats/MyStats"));
const MyClientReviews = dynamic(() => import("@/components/Home/MyClientReviews/MyClientReviews"));
const MyOpenSourceContribution = dynamic(() => import("@/components/Home/MyOpenSourceContribution/MyOpenSourceContribution"));
import React from "react";
import Footer from "../src/components/Footer/Footer";
import NavBar from "../src/components/NavBar/NavBar";

const gap8 = css({ p: "8" });
const gap4 = css({ p: "4" });

const Home: React.FC = () => {
  return (
    <>
      <MySeo />
      <div className={css({ w: "full", maxW: "full" })}>
        <NavBar />
        <main>
          <div className={css({ p: { base: "4", lg: "8" } })} />
          <div className={container({ maxW: "6xl" })}>
            <MyHero />
          </div>
          <div className={gap8} />
          <div className={container({ maxW: "6xl" })}>
            <MySkills />
          </div>
          <div className={gap8} />
          <div className={container({ maxW: "6xl" })}>
            <MyFrameworks />
          </div>
          <div className={gap8} />
          <div className={container({ maxW: "6xl" })}>
            <MyThirdPartySDKs />
          </div>
          <div className={gap8} />
          <div className={container({ maxW: "6xl" })}>
            <MyPricing />
          </div>
          <div className={gap8} />
          <div className={container({ maxW: "6xl" })}>
            <MyPerformanceStats />
          </div>
          <div className={gap8} />
          <div className={container({ maxW: "6xl" })}>
            <MyCTA />
          </div>
          <div className={gap8} />
          <div className={container({ maxW: "6xl" })}>
            <MyApps />
          </div>
          <div className={gap8} />
          <div className={container({ maxW: "6xl" })}>
            <MyStats />
          </div>
          <div className={gap8} />
          <div className={container({ maxW: "6xl" })}>
            <MyClientReviews />
          </div>
          <div className={gap8} />
          <div className={container({ maxW: "6xl" })}>
            <MyOpenSourceContribution />
          </div>
          <div className={gap4} />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
