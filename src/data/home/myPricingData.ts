type MyPricingData = {
  tagline: string;
  highlitedTitle: string;
  normalTitle: string;
  detail: string;

  featureTitle: string;
  features: string[];
};

const myPricingData = (): MyPricingData => {
  return {
    tagline: "Simple Price, No Surprise",
    highlitedTitle: "USD 20",
    normalTitle: " per hour",
    detail:
      "Offering competitive and transparent pricing for iOS development services, tailored to deliver exceptional value without compromising on quality.",
    featureTitle: "Features & Benefits",
    features: [
      "No contracts & commitments",
      "No hidden costs",
      "Adhoc based projects",
      "Design Integration",
      "API Integration",
      "Minimal viable product (MVP)",
      "Third-Party SDK Integration",
      "Maintenance and Support",
      "Bug Fixes",
      "App Store Submission",
    ],
  };
};

export default myPricingData;
