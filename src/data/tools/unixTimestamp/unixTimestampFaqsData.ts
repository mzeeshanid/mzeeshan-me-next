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
    {
      question: "Is Unix timestamp the same as POSIX time?",
      answer:
        "Yes. POSIX time is the formal name from the POSIX standard for the same seconds-since-epoch value that's colloquially called Unix time or epoch time. All three terms refer to the identical number.",
    },
    {
      question: "How do I convert a Unix timestamp in Excel or Google Sheets?",
      answer:
        "Both use the same date-serial math: =(A1/86400)+DATE(1970,1,1) converts a timestamp in cell A1 to a date (format the cell as date/time), and =(A1-DATE(1970,1,1))*86400 converts a date back to a timestamp. See the Excel and Google Sheets entries in the code snippets section below for the full formulas.",
    },
    {
      question: "How do I add a Discord timestamp to a message?",
      answer:
        "Type <t:TIMESTAMP:FORMAT> in any Discord message, where TIMESTAMP is a Unix timestamp in seconds and FORMAT is one of t, T, d, D, f, F, or R. Discord renders it in each viewer's own timezone and locale. Use the Discord Timestamp Generator above to get the exact codes for any date.",
    },
    {
      question: "How many digits does a Unix timestamp have?",
      answer:
        "A seconds-precision timestamp has 10 digits today (e.g., 1700000000). Milliseconds have 13 digits, microseconds have 16, and nanoseconds have 19. This converter auto-detects which precision you've pasted based on digit count.",
    },
    {
      question: "Can I convert multiple Unix timestamps at once?",
      answer:
        "Yes. Use the bulk converter in the developer utilities section — paste any number of timestamps or dates (one per line, or comma-separated) and copy the results back out as CSV or JSON.",
    },
  ],
};
