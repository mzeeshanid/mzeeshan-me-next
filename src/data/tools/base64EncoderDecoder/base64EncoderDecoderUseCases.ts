import { IconType } from "react-icons";
import { FaCode, FaEnvelope, FaFileAlt, FaImage, FaKey, FaLink } from "react-icons/fa";

export type Base64UseCase = {
  icon: IconType;
  title: string;
  description: string;
};

export type Base64UseCasesData = {
  header: {
    badge: string;
    title: string;
    description: string;
  };
  useCases: Base64UseCase[];
};

export const base64UseCasesData: Base64UseCasesData = {
  header: {
    badge: "Use Cases",
    title: "When & Why to Use Base64",
    description:
      "Base64 is the standard way to transfer binary data through text-only channels. Here are the most common real-world scenarios.",
  },
  useCases: [
    {
      icon: FaImage,
      title: "Embed Images in HTML",
      description:
        "Use Base64 data URIs to inline small icons and images directly in HTML, eliminating extra HTTP requests for assets under ~10 KB.",
    },
    {
      icon: FaCode,
      title: "CSS Background Images",
      description:
        "Embed small background images or sprites directly in your stylesheet with background-image: url('data:image/png;base64,...') to reduce network requests.",
    },
    {
      icon: FaFileAlt,
      title: "Send Files in JSON APIs",
      description:
        "Many REST APIs accept binary attachments as Base64 strings inside JSON payloads — PDFs, images, audio files, and documents.",
    },
    {
      icon: FaKey,
      title: "Decode JWT Tokens",
      description:
        "JWT header and payload sections are Base64URL encoded. Paste a JWT to decode and inspect its claims — useful for debugging auth flows.",
    },
    {
      icon: FaLink,
      title: "HTTP Basic Authentication",
      description:
        "Basic Auth credentials are sent as Authorization: Basic <base64(user:pass)>. Decode the header value to verify or debug authentication requests.",
    },
    {
      icon: FaEnvelope,
      title: "Email Inline Images",
      description:
        "Email clients support Base64-encoded images embedded directly in the email body via data URIs, avoiding broken images from blocked external URLs.",
    },
  ],
};
