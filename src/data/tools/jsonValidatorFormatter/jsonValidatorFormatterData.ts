import { IconType } from "react-icons";
import {
  FaArrowPointer,
  FaBugSlash,
  FaCheck,
  FaCodeBranch,
  FaMagnifyingGlass,
  FaWandMagicSparkles,
  FaX,
} from "react-icons/fa6";

export type JsonValidatorFormatterHeaderData = {
  title: string;
  subtitle: string;
  icon: string;
  alt: string;
  rounded: boolean;
};

export type JsonValidatorFormatterMetaData = {
  title: string;
  description: string;
  url: string;
  image: {
    src: string;
    type: string;
  };
};

export type JsonValidatorFormatterFeature = {
  icon: IconType;
  title: string;
  description: string;
};

export type JsonValidatorFormatterFaq = {
  question: string;
  answer: string;
};

type SectionHeaderData = {
  badge: string;
  title: string;
  description: string;
};

type SimpleContentCard = {
  title: string;
  description: string;
};

type ComparisonCell = {
  text: string;
  color: string;
  icon?: IconType;
};

export type JsonValidatorFormatterComparisonColumn = {
  title: string;
  key: string;
  link?: string;
};

export type JsonValidatorFormatterComparisonRow = {
  feature: ComparisonCell;
  mz: ComparisonCell;
  jsonViewer: ComparisonCell;
  jsonLint: ComparisonCell;
};

export const jsonValidatorFormatterHeaderData: JsonValidatorFormatterHeaderData =
  {
    title: "JSON Validator",
    subtitle: "Validate, format, inspect, and search JSON faster.",
    icon: "/assets/json_validator_formatter_icon.png",
    alt: "JSON Validator and Formatter icon",
    rounded: false,
  };

export const jsonValidatorFormatterMetaData: JsonValidatorFormatterMetaData = {
  title: "JSON Validator And Formatter",
  description:
    "Validate JSON, format and minify payloads, inspect nodes in a collapsible tree, and pinpoint parse errors with line-level feedback.",
  url: "/tools/json-validator-and-formatter",
  image: {
    src: "/assets/json_validator_formatter_icon.png",
    type: "image/svg+xml",
  },
};

export const jsonValidatorFormatterDefaultJson = `{
  "service": "payments",
  "version": 3,
  "healthy": true,
  "owners": [
    {
      "name": "Zeeshan",
      "role": "maintainer"
    },
    {
      "name": "Amina",
      "role": "reviewer"
    }
  ],
  "limits": {
    "retry": 3,
    "timeoutMs": 1500
  },
  "tags": ["api", "production", "json"],
  "metadata": null
}`;

export const jsonValidatorFormatterHeroData = {
  badge: "JSON Tool",
  title: "Validate, format, inspect, and search JSON",
  description:
    "Use the Text tab to clean and format payloads, then switch to Viewer to inspect a collapsed JSON tree, validate syntax, and debug parse errors.",
  textInputLabel: "JSON Input",
  textInputHint:
    "Switch to Viewer to validate the payload, browse the tree, and inspect individual nodes.",
  viewerTitle: "JSON Tree",
  viewerDescription:
    "All nodes start collapsed. Expand only the branches you need.",
  validationTitle: "JSON validation failed",
  selectedNodeTitle: "Selected Node Details",
  selectedNodeEmpty:
    "No node selected yet. Pick a node from the JSON tree to see its details here.",
  selectedNodePrompt:
    "Select a node from the tree to inspect its type, key, and current value.",
  selectedNodePathPrefix: "Path:",
  typeLegendTitle: "Type Legend",
};

export const jsonValidatorFormatterIntroData: {
  header: SectionHeaderData;
  cards: SimpleContentCard[];
} = {
  header: {
    badge: "About JSON",
    title: "What JSON is",
    description:
      "JSON stands for JavaScript Object Notation. It is a lightweight text format used to represent structured data in a way that is easy for humans to read and simple for applications to parse.",
  },
  cards: [
    {
      title: "Readable structure",
      description:
        "JSON organizes data into objects, arrays, strings, numbers, booleans, and null values. That makes it a natural fit for configuration files, API payloads, and log inspection.",
    },
    {
      title: "Default format for APIs",
      description:
        "Most modern frontend and backend systems exchange data as JSON. When you are debugging requests, validating responses, or checking nested objects, being able to inspect JSON quickly saves time.",
    },
    {
      title: "Why this tool helps",
      description:
        "Large payloads become hard to read when they are minified, escaped, or deeply nested. This tool helps format them, validate syntax, search the structure, and inspect specific nodes with less friction.",
    },
  ],
};

export const jsonValidatorFormatterBenefitsData: {
  header: SectionHeaderData;
  cards: SimpleContentCard[];
} = {
  header: {
    badge: "Benefits",
    title: "Why JSON wins",
    description:
      "JSON is usually easier to work with than older or heavier data formats when the goal is fast parsing, clear structure, and API-friendly payloads.",
  },
  cards: [
    {
      title: "Lighter than XML",
      description:
        "JSON avoids verbose opening and closing tags, so payloads are usually shorter, easier to scan, and less tiring to debug than XML.",
    },
    {
      title: "Better for nested data",
      description:
        "Compared with CSV, JSON handles arrays and nested objects naturally, which makes it much better for real application payloads and configuration data.",
    },
    {
      title: "Safer for APIs",
      description:
        "JSON has become the default for web APIs because most languages parse it well, frontend apps consume it easily, and the structure maps cleanly into objects.",
    },
  ],
};

export const jsonValidatorFormatterRelatedArticleData = {
  badge: "Related",
  title: "Read more",
  description:
    "This is a placeholder related article for now. We can swap it with the dedicated JSON article as soon as that write-up is ready.",
};

export const jsonValidatorFormatterSearchData = {
  label: "Search JSON",
  placeholder: "Search by key, path, or value",
  noMatches: "No active matches yet.",
  resultsPrefix: "Showing match",
  shortcutTitle: "Shortcut Guide",
  shortcuts: [
    {
      label: "Go or next result",
      keys: ["Enter"],
      alternateKeys: ["F3"],
    },
    {
      label: "Previous result",
      keys: ["Shift", "Enter"],
      alternateKeys: ["Shift", "F3"],
    },
    {
      label: "Jump to next match",
      keys: ["Ctrl", "G"],
      alternateKeys: ["Cmd", "G"],
    },
  ],
};

export const jsonValidatorFormatterFeaturesData = {
  header: {
    badge: "Features",
    title: "Built for reading messy JSON quickly",
    description:
      "Move from raw payloads to validated structure without leaving the page. The tool is designed for debugging APIs, checking request bodies, and exploring nested documents.",
  },
  features: [
    {
      icon: FaWandMagicSparkles,
      title: "Format, minify, and clean escaped payloads",
      description:
        "Pretty-print readable JSON, compress it into a single line, or strip escape characters from JSON copied out of logs and APIs.",
    },
    {
      icon: FaBugSlash,
      title: "Line-aware validation feedback",
      description:
        "When parsing fails, the viewer reports the error message and highlights the exact line that needs attention.",
    },
    {
      icon: FaCodeBranch,
      title: "Collapsed tree explorer by default",
      description:
        "Open only the branches you care about, keeping large payloads readable even when objects and arrays are deeply nested.",
    },
    {
      icon: FaArrowPointer,
      title: "Node inspection panel",
      description:
        "Select any node to see its key, the current value preview, and the detected data type with color-coded context.",
    },
    {
      icon: FaMagnifyingGlass,
      title: "Search with next and previous navigation",
      description:
        "Find matching keys, paths, and primitive values, then jump through results without manually expanding the entire document.",
    },
  ] as JsonValidatorFormatterFeature[],
};

export const jsonValidatorFormatterComparisonData = {
  header: {
    badge: "Comparison",
    title: "Why use this instead of a basic formatter?",
    desc: "Popular tools can format JSON, but this one is designed to help you inspect and debug the structure as well.",
  },
  columns: [
    {
      title: "Feature",
      key: "feature",
    },
    {
      title: "This tool",
      key: "mz",
    },
    {
      title: "jsonviewer.stack.hu",
      key: "jsonViewer",
      link: "https://jsonviewer.stack.hu/",
    },
    {
      title: "jsonlint.com",
      key: "jsonLint",
      link: "https://jsonlint.com/",
    },
  ] as JsonValidatorFormatterComparisonColumn[],
  rows: [
    {
      feature: {
        text: "Viewer and raw text workflow in one place",
        color: "fg",
      },
      mz: { text: "Yes", color: "fg.success", icon: FaCheck },
      jsonViewer: {
        text: "Mostly viewer-first",
        color: "fg.warning",
        icon: FaCheck,
      },
      jsonLint: { text: "Validation-first", color: "fg.warning", icon: FaX },
    },
    {
      feature: { text: "Selected node detail panel", color: "fg" },
      mz: {
        text: "Key, value, and type table",
        color: "fg.success",
        icon: FaCheck,
      },
      jsonViewer: {
        text: "Limited detail context",
        color: "fg.warning",
        icon: FaX,
      },
      jsonLint: { text: "No", color: "fg.error", icon: FaX },
    },
    {
      feature: {
        text: "Search with next and previous result navigation",
        color: "fg",
      },
      mz: { text: "Built in", color: "fg.success", icon: FaCheck },
      jsonViewer: {
        text: "Search available but less guided",
        color: "fg.warning",
        icon: FaCheck,
      },
      jsonLint: { text: "No", color: "fg.error", icon: FaX },
    },
    {
      feature: { text: "Escape cleanup for logged JSON strings", color: "fg" },
      mz: { text: "Yes", color: "fg.success", icon: FaCheck },
      jsonViewer: {
        text: "Manual cleanup needed",
        color: "fg.warning",
        icon: FaX,
      },
      jsonLint: {
        text: "Manual cleanup needed",
        color: "fg.warning",
        icon: FaX,
      },
    },
    {
      feature: { text: "UI and responsiveness", color: "fg" },
      mz: {
        text: "Modern and responsive UI/UX",
        color: "fg.success",
        icon: FaCheck,
      },
      jsonViewer: { text: "Stone age UI/UX", color: "fg.error", icon: FaX },
      jsonLint: { text: "Stone age UI/UX", color: "fg.error", icon: FaX },
    },
  ] as JsonValidatorFormatterComparisonRow[],
};

export const jsonValidatorFormatterFaqsData = {
  header: {
    badge: "FAQs",
    title: "Questions developers usually ask",
    desc: "A few quick answers before you paste in production payloads, logs, or test fixtures.",
  },
  faqs: [
    {
      question: "Does the tool send my JSON to a server?",
      answer:
        "No. Validation, formatting, searching, and tree rendering happen in the browser, so you can inspect payloads without posting them to a backend.",
    },
    {
      question: "What does Remove White Space do?",
      answer:
        "It minifies valid JSON by removing indentation and extra spacing while preserving the data structure.",
    },
    {
      question: "What does Remove Escape Characters help with?",
      answer:
        "It is useful when JSON has been copied out of logs or APIs as an escaped string, for example with repeated backslashes or quoted braces.",
    },
    {
      question: "Will the viewer open all nodes automatically?",
      answer:
        "No. The tree starts fully collapsed to stay readable. Search navigation expands only the branches needed to reach the current match.",
    },
  ] as JsonValidatorFormatterFaq[],
};
