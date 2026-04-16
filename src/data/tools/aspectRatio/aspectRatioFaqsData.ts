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
      question: "How do I calculate the aspect ratio from width and height?",
      answer:
        "Enter your original width and height into the calculator. It will reduce the two numbers to their simplest ratio — for example, 1920×1080 becomes 16:9. You can then use that ratio to calculate any new width or height while maintaining the same proportions.",
    },
    {
      question: "What is the 16:9 aspect ratio in pixels?",
      answer:
        "16:9 is the standard widescreen ratio used by most TVs, monitors, and video platforms. Common pixel dimensions include 1280×720 (720p), 1920×1080 (1080p), 2560×1440 (1440p), and 3840×2160 (4K). Enter any width into the calculator with a 16:9 ratio selected to get the correct height instantly.",
    },
    {
      question: "How do I resize an image without distortion?",
      answer:
        "Enter your original image dimensions to get the aspect ratio, then enter the new width or height you need. The calculator gives you the other dimension that preserves the original ratio exactly — use both values when resizing in your image editor to avoid stretching or squashing.",
    },
    {
      question: "What aspect ratio should I use for YouTube videos and thumbnails?",
      answer:
        "YouTube recommends 16:9 for videos and thumbnails. The ideal thumbnail size is 1280×720 pixels, which is exactly 16:9. Enter 16:9 into the calculator and type any width to get the correct height for a properly proportioned YouTube asset.",
    },
    {
      question: "Is the Aspect Ratio Calculator free to use?",
      answer:
        "Yes, the Aspect Ratio Calculator is completely free with no hidden charges or limitations.",
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
      question: "Is there a limit to how many calculations I can do?",
      answer:
        "No, you can perform unlimited aspect ratio calculations with no restrictions.",
    },
  ],
};