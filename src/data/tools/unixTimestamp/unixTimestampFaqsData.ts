import { UnixTimestampSectionHeader } from "./unixTimestampFeaturesData";

export type UnixTimestampFaqItem = {
  question: string;
  answer: string;
};

export type UnixTimestampFaqsData = {
  header: UnixTimestampSectionHeader;
  faqs: UnixTimestampFaqItem[];
};

export const unixTimestampFaqsData: UnixTimestampFaqsData = {
  header: {
    badge: "FAQ",
    title: "Frequently Asked Questions",
    desc: "Answers to common questions about Unix timestamps and epoch time conversion.",
  },
  faqs: [
    {
      question: "Is Unix time always UTC?",
      answer:
        "Yes. Unix timestamps represent seconds since January 1, 1970 00:00:00 UTC. The timestamp itself is timezone-independent — the same integer represents the same absolute moment everywhere on Earth. Timezone only matters when displaying the timestamp as a human-readable date.",
    },
    {
      question: "What's the difference between seconds and milliseconds timestamps?",
      answer:
        "A seconds-precision Unix timestamp (e.g., 1700000000) is a 10-digit number. A milliseconds timestamp (e.g., 1700000000000) is a 13-digit number — simply multiply/divide by 1000 to convert. JavaScript's Date.now() returns milliseconds; most UNIX/POSIX functions return seconds.",
    },
    {
      question: "Why is Unix time useful?",
      answer:
        "Unix timestamps are a single integer, making them trivial to store, transmit, sort, and compare. They're unambiguous (no timezone or format confusion), and they're universally supported across every programming language, OS, and database.",
    },
    {
      question: "Can Unix time be negative?",
      answer:
        "Yes. Negative Unix timestamps represent dates before January 1, 1970. For example, -86400 is December 31, 1969 00:00:00 UTC. Most modern systems support this, though some older 32-bit systems may behave unexpectedly with negative values.",
    },
    {
      question: "What is the maximum Unix timestamp?",
      answer:
        "For 32-bit systems, the maximum is 2,147,483,647 (January 19, 2038). For 64-bit systems, it's 9,223,372,036,854,775,807 — far enough in the future not to worry about.",
    },
    {
      question: "Does Unix time account for leap seconds?",
      answer:
        "No. Unix time assumes every day is exactly 86,400 seconds. Leap seconds (which keep atomic clocks aligned with Earth's rotation) are not counted. In practice, this causes a difference of about 27 seconds between UTC and Unix time as of 2024.",
    },
    {
      question: "How do I get the current Unix timestamp in the browser?",
      answer:
        "Use Math.floor(Date.now() / 1000) for seconds precision, or Date.now() for milliseconds. Both are available in every modern browser with no libraries required.",
    },
    {
      question: "What is the Unix epoch?",
      answer:
        "The Unix epoch is the reference point: January 1, 1970, 00:00:00 UTC. Its timestamp is 0. Every other Unix timestamp is measured as the number of seconds (or milliseconds) elapsed from this moment.",
    },
  ],
};
