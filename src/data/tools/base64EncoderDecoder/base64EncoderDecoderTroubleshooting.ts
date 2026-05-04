import { IconType } from "react-icons";
import { FaExclamationTriangle } from "react-icons/fa";
import { FaCircleQuestion, FaKey, FaTextSlash } from "react-icons/fa6";

export type Base64TroubleshootItem = {
  icon: IconType;
  title: string;
  problem: string;
  solution: string;
};

export type Base64TroubleshootingData = {
  header: {
    badge: string;
    title: string;
    description: string;
  };
  items: Base64TroubleshootItem[];
};

export const base64TroubleshootingData: Base64TroubleshootingData = {
  header: {
    badge: "Troubleshooting",
    title: "Common Base64 Errors",
    description:
      "Decode failing? Here are the four most frequent errors and exactly how to fix each one.",
  },
  items: [
    {
      icon: FaExclamationTriangle,
      title: "Invalid Padding",
      problem:
        'Error: "Invalid padding" or "Incorrect padding". Base64 strings must have a length divisible by 4.',
      solution:
        'Add missing = signs at the end until the length is a multiple of 4. For example, a 22-character string needs == appended. Use the "Fix Padding" option in the tool to do this automatically.',
    },
    {
      icon: FaTextSlash,
      title: "Illegal Base64 Character",
      problem:
        'Error: "Invalid character". Standard Base64 uses only A–Z, a–z, 0–9, +, /, and =. Anything else will fail.',
      solution:
        "Remove spaces, line breaks, smart quotes, or URL-encoded characters like %3D (which is = encoded). Paste your string into a text editor first to strip invisible characters.",
    },
    {
      icon: FaCircleQuestion,
      title: "Garbled or Unreadable Output",
      problem:
        "Decoding succeeds but the output looks like gibberish or contains strange symbols instead of readable text.",
      solution:
        "The original string was encoded in a different charset. Try switching the charset selector from UTF-8 to ISO-8859-1 (Latin-1). This is common with older systems or non-English content.",
    },
    {
      icon: FaKey,
      title: "JWT or OAuth Token Won't Decode",
      problem:
        'Your string contains - and _ characters but fails with "Invalid character". This is a Base64URL string, not standard Base64.',
      solution:
        "Enable the URL-safe toggle before decoding. Base64URL replaces + with -, / with _, and omits the = padding. JWTs and OAuth tokens always use Base64URL for their header and payload segments.",
    },
  ],
};
