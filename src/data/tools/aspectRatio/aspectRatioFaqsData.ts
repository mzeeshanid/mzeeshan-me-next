import { AspectRatioSectionHeaderModel } from "./aspectRatioData";

/* FAQs */
export type AspectRatioFaqsDataModel = {
  header: AspectRatioSectionHeaderModel;
  faqs: AspectRatioFaqItemModel[];
};

export type AspectRatioFaqItemModel = {
  question: string;
  answer: string;
};

export const aspectRatioFaqsData: AspectRatioFaqsDataModel = {
  header: {
    badge: "FAQs",
    title: "Got Questions?",
    desc: "Answers to common questions about the aspect ratio calculator.",
  },
  faqs: [
    {
      question: "Is the Aspect Ratio Calculator free to use?",
      answer:
      "Yes, the Aspect Ratio Calculator is completely free with no hidden charges or limitations.",
    },
    {
      question: "What can I use the Aspect Ratio Calculator for?",
      answer:
      "You can use it to resize images, videos, designs, and screens while keeping the original proportions intact.",
    },
    {
      question: "Can I calculate a missing width or height?",
      answer:
      "Yes, simply enter one dimension and the target ratio, and the calculator will automatically compute the missing value.",
    },
    {
      question: "Does it support custom aspect ratios?",
      answer:
      "Yes, you can enter any custom ratio (such as 3:2, 4:5, 21:9, or even decimal ratios).",
    },
    {
      question: "Will my results be accurate?",
      answer:
      "Yes, the calculator uses precise math and updates in real time to ensure accurate proportional scaling.",
    },
    {
      question: "Does the calculator work on mobile devices?",
      answer:
      "Yes, it’s fully responsive and works on desktops, tablets, and mobile phones.",
    },
    {
      question: "Is there a limit to how many calculations I can do?",
      answer:
      "No, you can perform unlimited aspect ratio calculations with no restrictions.",
    },
  ],
};