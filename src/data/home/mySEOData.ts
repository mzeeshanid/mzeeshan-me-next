import myClientReviewsData, { MyClientReviewData } from "./myClientReviewsData";

type SeoImage = { src: string; alt: string; width: number; height: number };

type MySEOData = {
  firstName: string;
  lastName: string;
  username: string;
  gender: string;
  type: string;
  url: string;
  title: string;
  desc: string;
  logo: SeoImage;
  hero: SeoImage;
  sameAs: string[];
  reviewsData: MyClientReviewData;
}

const mySEOData = (): MySEOData => {
  return {
    firstName: "Muhammad",
    lastName: "Zeeshan",
    username: "mzeeshanid",
    gender: "male",
    type: "profile",
    url: "https://www.mzeeshan.me/",
    title: "Muhammad Zeeshan | Senior iOS Developer | Swift Enthusiast",
    desc: "Experienced iOS developer specializing in building high-quality and scalable mobile applications using Swift, SwiftUI, and Objective-C.",
    logo: {
      src: "/assets/profile_pic.jpeg",
      width: 200.0,
      height: 200.0,
      alt: "logo image",
    },
    hero: {
      src: "/assets/mzeeshan_me_hero.jpeg",
      width: 500.0,
      height: 375.0,
      alt: "Hero Image",
    },
    sameAs: [
      "https://www.upwork.com/fl/mzeeshanid",
      "https://x.com/mzeeshanid",
      "https://fiverr.com/s/w52zEo",
      "https://stackoverflow.com/users/1796092/muhammad-zeeshan",
      "https://www.linkedin.com/in/muhammad-zeeshan-04b8585b/"
    ],
    reviewsData: myClientReviewsData()
  };
}

export default mySEOData;