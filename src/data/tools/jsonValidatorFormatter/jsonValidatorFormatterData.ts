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

// ─── JSON tool registry ───────────────────────────────────────────────────────

export type JsonConverterTabId =
  | "validator"
  | "csv"
  | "yaml"
  | "xml"
  | "typescript";

export type JsonRelatedTool = {
  id: JsonConverterTabId;
  label: string;
  path: string;
  description: string;
};

export const jsonRelatedToolsData: JsonRelatedTool[] = [
  {
    id: "validator",
    label: "JSON Validator & Formatter",
    path: "/tools/json-validator-and-formatter",
    description:
      "Validate, format, minify, and inspect JSON in an interactive collapsible tree with search and node details.",
  },
  {
    id: "csv",
    label: "JSON to CSV",
    path: "/tools/json-to-csv",
    description:
      "Convert JSON arrays and objects to CSV with auto-inferred headers, RFC-compliant quoting, and one-click copy.",
  },
  {
    id: "yaml",
    label: "JSON to YAML",
    path: "/tools/json-to-yaml",
    description:
      "Turn JSON into clean, readable YAML — ready for Kubernetes manifests, Docker Compose files, and CI/CD pipelines.",
  },
  {
    id: "xml",
    label: "JSON to XML",
    path: "/tools/json-to-xml",
    description:
      "Convert JSON to well-formed XML with proper nesting, entity escaping, and an XML declaration header.",
  },
  {
    id: "typescript",
    label: "JSON to TypeScript",
    path: "/tools/json-to-typescript",
    description:
      "Generate TypeScript interfaces from any JSON object — nested objects become named sub-interfaces automatically.",
  },
];

// ─── Per-tab related article header ──────────────────────────────────────────

type RelatedArticleHeader = { badge: string; title: string; desc: string };

export const jsonConverterRelatedArticleDataByTab: Record<
  JsonConverterTabId,
  RelatedArticleHeader
> = {
  validator: {
    badge: jsonValidatorFormatterRelatedArticleData.badge,
    title: jsonValidatorFormatterRelatedArticleData.title,
    desc: jsonValidatorFormatterRelatedArticleData.description,
  },
  csv: {
    badge: "Related",
    title: "Read more",
    desc: "Helpful articles about working with CSV data.",
  },
  yaml: {
    badge: "Related",
    title: "Read more",
    desc: "Helpful articles about YAML and configuration management.",
  },
  xml: {
    badge: "Related",
    title: "Read more",
    desc: "Helpful articles about XML and data integration.",
  },
  typescript: {
    badge: "Related",
    title: "Read more",
    desc: "Helpful articles about TypeScript and API type safety.",
  },
};

// ─── Per-tab SEO metadata ─────────────────────────────────────────────────────

export const jsonConverterTabMetaData: Record<
  JsonConverterTabId,
  JsonValidatorFormatterMetaData
> = {
  validator: jsonValidatorFormatterMetaData,
  csv: {
    title: "JSON to CSV Converter",
    description:
      "Free online JSON to CSV converter. Paste any JSON array or object and instantly download a clean CSV — no server upload, works entirely in your browser.",
    url: "/tools/json-to-csv",
    image: { src: "/assets/json_to_csv_icon.png", type: "image/svg+xml" },
  },
  yaml: {
    title: "JSON to YAML Converter",
    description:
      "Convert JSON to YAML online for free. Paste JSON and get clean, readable YAML output instantly — ideal for Kubernetes configs, CI/CD pipelines, and Docker Compose files.",
    url: "/tools/json-to-yaml",
    image: {
      src: "/assets/json_to_yaml_icon.png",
      type: "image/svg+xml",
    },
  },
  xml: {
    title: "JSON to XML Converter",
    description:
      "Convert JSON to XML online for free. Paste JSON and get well-formed XML with proper nesting and declaration — no server upload, all processing in the browser.",
    url: "/tools/json-to-xml",
    image: {
      src: "/assets/json_to_xml_icon.png",
      type: "image/svg+xml",
    },
  },
  typescript: {
    title: "JSON to TypeScript Interface Generator",
    description:
      "Generate TypeScript interfaces from JSON instantly. Paste any JSON object and get typed interfaces with nested types — free, in-browser, no signup required.",
    url: "/tools/json-to-typescript",
    image: {
      src: "/assets/json_to_type_script_icon.png",
      type: "image/svg+xml",
    },
  },
};

// ─── Per-tab page header data ─────────────────────────────────────────────────

export const jsonConverterTabHeaderData: Record<
  JsonConverterTabId,
  JsonValidatorFormatterHeaderData
> = {
  validator: jsonValidatorFormatterHeaderData,
  csv: {
    title: "JSON to CSV Converter",
    subtitle: "Convert JSON arrays and objects to CSV in one click.",
    icon: "/assets/json_to_csv_icon.png",
    alt: "JSON to CSV Converter icon",
    rounded: false,
  },
  yaml: {
    title: "JSON to YAML Converter",
    subtitle: "Turn JSON into clean, readable YAML instantly.",
    icon: "/assets/json_to_yaml_icon.png",
    alt: "JSON to YAML Converter icon",
    rounded: false,
  },
  xml: {
    title: "JSON to XML Converter",
    subtitle: "Convert JSON to well-formed XML in your browser.",
    icon: "/assets/json_to_xml_icon.png",
    alt: "JSON to XML Converter icon",
    rounded: false,
  },
  typescript: {
    title: "JSON to TypeScript Interface Generator",
    subtitle: "Generate TypeScript interfaces from any JSON object.",
    icon: "/assets/json_to_type_script_icon.png",
    alt: "JSON to TypeScript Converter icon",
    rounded: false,
  },
};

// ─── Per-tab hero data ────────────────────────────────────────────────────────

export type JsonConverterHeroData = {
  badge: string;
  title: string;
  description: string;
  inputLabel: string;
  outputLabel: string;
  convertButtonLabel: string;
  inputHint: string;
};

export const jsonConverterHeroDataByTab: Record<
  Exclude<JsonConverterTabId, "validator">,
  JsonConverterHeroData
> = {
  csv: {
    badge: "CSV Converter",
    title: "Convert JSON to CSV",
    description:
      "Paste a JSON array or object below and click Convert to get a comma-separated CSV. Nested objects and arrays are stringified inline.",
    inputLabel: "JSON Input",
    outputLabel: "CSV Output",
    convertButtonLabel: "Convert to CSV",
    inputHint:
      "Switch to Output to see the CSV result and copy it directly into Excel, Google Sheets, or any data tool.",
  },
  yaml: {
    badge: "YAML Converter",
    title: "Convert JSON to YAML",
    description:
      "Paste any JSON below and click Convert to get clean YAML output. Ideal for Kubernetes manifests, CI/CD configs, and Docker Compose files.",
    inputLabel: "JSON Input",
    outputLabel: "YAML Output",
    convertButtonLabel: "Convert to YAML",
    inputHint:
      "Switch to Output to see the YAML result and copy it straight into your config file or pipeline.",
  },
  xml: {
    badge: "XML Converter",
    title: "Convert JSON to XML",
    description:
      "Paste any JSON below and click Convert to get well-formed XML with proper nesting. Arrays are expanded as sibling elements.",
    inputLabel: "JSON Input",
    outputLabel: "XML Output",
    convertButtonLabel: "Convert to XML",
    inputHint:
      "Switch to Output to see the XML result and copy it into your SOAP request, feed, or document template.",
  },
  typescript: {
    badge: "TypeScript Generator",
    title: "Generate TypeScript Interfaces from JSON",
    description:
      "Paste any JSON object below and click Generate to get typed TypeScript interfaces. Nested objects become sub-interfaces automatically.",
    inputLabel: "JSON Input",
    outputLabel: "TypeScript Output",
    convertButtonLabel: "Generate Interfaces",
    inputHint:
      "Switch to Output to see the generated interfaces and copy them directly into your TypeScript project.",
  },
};

// ─── Per-tab intro data ───────────────────────────────────────────────────────

type IntroData = typeof jsonValidatorFormatterIntroData;

export const jsonConverterIntroDataByTab: Record<
  JsonConverterTabId,
  IntroData
> = {
  validator: jsonValidatorFormatterIntroData,
  csv: {
    header: {
      badge: "About CSV",
      title: "What CSV is",
      description:
        "CSV (Comma-Separated Values) is the simplest tabular data format — each row is a line, each column is a comma-separated field. Spreadsheets, databases, and data pipelines all speak it natively.",
    },
    cards: [
      {
        title: "Universal tabular format",
        description:
          "CSV is accepted by Excel, Google Sheets, PostgreSQL, MySQL, pandas, and virtually every data tool ever built. It is the lowest-common-denominator format for moving tabular data.",
      },
      {
        title: "Default for API exports",
        description:
          "Most dashboards and reporting tools export data as CSV. When your API returns JSON, converting it to CSV is the first step toward getting that data into a spreadsheet or analytics tool.",
      },
      {
        title: "Why this tool helps",
        description:
          "Manually mapping JSON keys to CSV columns is tedious and error-prone. This tool flattens JSON arrays into rows and extracts all unique keys as headers automatically.",
      },
    ],
  },
  yaml: {
    header: {
      badge: "About YAML",
      title: "What YAML is",
      description:
        "YAML (YAML Ain't Markup Language) is a human-readable data serialization format. It is indentation-based, whitespace-sensitive, and designed to be easy to write and read by hand.",
    },
    cards: [
      {
        title: "The config file standard",
        description:
          "Kubernetes manifests, Docker Compose files, GitHub Actions workflows, Ansible playbooks, and most modern CI/CD pipelines are written in YAML. Understanding it is essential for DevOps work.",
      },
      {
        title: "Cleaner than JSON for configs",
        description:
          "YAML has no quotes around keys, no trailing commas, and supports inline comments. For configuration files that humans edit frequently, YAML is far more readable than JSON.",
      },
      {
        title: "Why this tool helps",
        description:
          "Starting from JSON is common when an API returns config data or when migrating settings between systems. This tool handles all the indentation, quoting, and nesting rules automatically.",
      },
    ],
  },
  xml: {
    header: {
      badge: "About XML",
      title: "What XML is",
      description:
        "XML (eXtensible Markup Language) is a tag-based data format used heavily in enterprise systems, SOAP APIs, RSS feeds, SVG graphics, and document formats like DOCX and XLSX.",
    },
    cards: [
      {
        title: "Enterprise and legacy systems",
        description:
          "Many banking, healthcare, and government systems still communicate via XML or SOAP. Converting modern JSON API responses to XML is a common integration requirement.",
      },
      {
        title: "Document and configuration formats",
        description:
          "Android layouts, Maven POM files, Office Open XML documents, and RSS feeds all use XML. If you work across these ecosystems, XML conversion is a recurring need.",
      },
      {
        title: "Why this tool helps",
        description:
          "Writing XML by hand from JSON is tedious — tag names must be valid identifiers, special characters must be escaped, and nesting must mirror the object structure. This tool handles all of it.",
      },
    ],
  },
  typescript: {
    header: {
      badge: "About TypeScript Interfaces",
      title: "What TypeScript interfaces are",
      description:
        "TypeScript interfaces describe the shape of an object — the keys it has, the types of their values, and which fields are optional. They are the foundation of type-safe JavaScript development.",
    },
    cards: [
      {
        title: "Type safety from day one",
        description:
          "Defining interfaces for your API responses means TypeScript catches mismatches between what your backend sends and what your frontend expects at compile time, not at runtime.",
      },
      {
        title: "Essential for large codebases",
        description:
          "As a codebase grows, untyped API payloads become a major source of bugs. Generating interfaces from real payloads is the fastest way to retrofit types onto existing code.",
      },
      {
        title: "Why this tool helps",
        description:
          "Writing interfaces by hand from deeply nested JSON is slow and error-prone. Pasting a real API response here gives you a working type definition in seconds.",
      },
    ],
  },
};

// ─── Per-tab benefits data ────────────────────────────────────────────────────

type BenefitsData = typeof jsonValidatorFormatterBenefitsData;

export const jsonConverterBenefitsDataByTab: Record<
  JsonConverterTabId,
  BenefitsData
> = {
  validator: jsonValidatorFormatterBenefitsData,
  csv: {
    header: {
      badge: "Benefits",
      title: "Why convert JSON to CSV",
      description:
        "JSON is great for APIs and nested data, but CSV is what most data tools, spreadsheets, and pipelines actually consume.",
    },
    cards: [
      {
        title: "Works with every spreadsheet",
        description:
          "Excel, Google Sheets, LibreOffice Calc, and Numbers all open CSV natively. Converting JSON to CSV is the fastest way to get API data into a spreadsheet.",
      },
      {
        title: "Direct database import",
        description:
          "PostgreSQL, MySQL, and SQLite all support COPY or LOAD commands for CSV. Converting JSON to CSV lets you bulk-insert API data without writing a custom importer.",
      },
      {
        title: "Faster than manual mapping",
        description:
          "Manually extracting keys and values from nested JSON into columns is tedious. This tool infers headers from all unique keys across the entire array automatically.",
      },
    ],
  },
  yaml: {
    header: {
      badge: "Benefits",
      title: "Why convert JSON to YAML",
      description:
        "YAML is the dominant format for configuration files in modern infrastructure tools. Converting from JSON saves you from writing it by hand.",
    },
    cards: [
      {
        title: "Drop into Kubernetes directly",
        description:
          "Kubernetes only accepts YAML or JSON for manifests. When you build a config programmatically as JSON, this converter turns it into deploy-ready YAML in one step.",
      },
      {
        title: "More readable for humans",
        description:
          "YAML removes the visual noise of quotes and brackets. Config files that teams read and edit daily are much clearer in YAML than in JSON.",
      },
      {
        title: "No library dependency",
        description:
          "You get clean YAML output without installing js-yaml or yamljs in your project. Useful when prototyping or working in environments where adding packages is restricted.",
      },
    ],
  },
  xml: {
    header: {
      badge: "Benefits",
      title: "Why convert JSON to XML",
      description:
        "XML powers many legacy systems and document formats that still form the backbone of enterprise integrations.",
    },
    cards: [
      {
        title: "SOAP API integration",
        description:
          "Many banking, insurance, and government APIs require SOAP requests with XML payloads. Converting from JSON is the fastest way to build those payloads from modern data.",
      },
      {
        title: "Office document generation",
        description:
          "DOCX, XLSX, and ODP files are ZIP archives of XML documents. Understanding the XML structure is the first step toward programmatic document generation.",
      },
      {
        title: "Portable and validated",
        description:
          "XML supports schemas (XSD) for validation and XSLT for transformation. Converting to XML opens the door to these tools without writing XML from scratch.",
      },
    ],
  },
  typescript: {
    header: {
      badge: "Benefits",
      title: "Why generate TypeScript interfaces",
      description:
        "Hand-writing interfaces for large API payloads is tedious and error-prone. Generating them from real data is faster and more accurate.",
    },
    cards: [
      {
        title: "Catch API drift early",
        description:
          "When a backend changes a field type or renames a key, TypeScript interfaces catch the mismatch at compile time before it reaches production.",
      },
      {
        title: "Better IDE autocomplete",
        description:
          "Typed API responses give you autocomplete on every field when you write code that consumes them — no more guessing key names from documentation.",
      },
      {
        title: "Documents the API shape",
        description:
          "Interfaces serve as living documentation for the shape of your API. Generated interfaces from real payloads stay accurate longer than hand-written docs.",
      },
    ],
  },
};

// ─── Per-tab features data ────────────────────────────────────────────────────

type FeaturesData = typeof jsonValidatorFormatterFeaturesData;

export const jsonConverterFeaturesDataByTab: Record<
  JsonConverterTabId,
  FeaturesData
> = {
  validator: jsonValidatorFormatterFeaturesData,
  csv: {
    header: {
      badge: "Features",
      title: "Built for clean CSV output",
      description:
        "Handles the edge cases that trip up simple converters — nested values, missing keys, and special characters in cell content.",
    },
    features: [
      {
        icon: FaWandMagicSparkles,
        title: "Auto-infers headers from all rows",
        description:
          "Keys are collected from every object in the array, not just the first row. You get complete headers even when objects have different shapes.",
      },
      {
        icon: FaBugSlash,
        title: "Handles nested objects and arrays",
        description:
          "Nested values are serialized as JSON strings inside the CSV cell, rather than silently dropped or causing a crash.",
      },
      {
        icon: FaCodeBranch,
        title: "RFC-compliant quoting",
        description:
          "Cells containing commas, quotes, or newlines are automatically wrapped in double-quotes with escaped internal quotes — valid CSV by the RFC 4180 spec.",
      },
      {
        icon: FaArrowPointer,
        title: "Works on single objects too",
        description:
          "If you paste a single JSON object instead of an array, it is converted as a single-row CSV with the object keys as headers.",
      },
      {
        icon: FaMagnifyingGlass,
        title: "Copy output with one click",
        description:
          "Copy the CSV directly to your clipboard and paste into Excel, Google Sheets, or any data tool without downloading a file.",
      },
    ] as JsonValidatorFormatterFeature[],
  },
  yaml: {
    header: {
      badge: "Features",
      title: "Built for correct YAML output",
      description:
        "Handles string quoting, deep nesting, arrays of objects, and edge cases that naive converters get wrong.",
    },
    features: [
      {
        icon: FaWandMagicSparkles,
        title: "Automatic string quoting",
        description:
          "Strings containing special YAML characters (colons, brackets, pipes) are automatically quoted so the output is always parseable by YAML libraries.",
      },
      {
        icon: FaBugSlash,
        title: "Correct array indentation",
        description:
          "Arrays of objects use the correct YAML block sequence style with dash-prefixed items at the right indentation level.",
      },
      {
        icon: FaCodeBranch,
        title: "Deep nesting support",
        description:
          "Arbitrarily nested objects and arrays are handled with consistent two-space indentation throughout the output.",
      },
      {
        icon: FaArrowPointer,
        title: "Null and boolean preservation",
        description:
          "JSON null, true, and false map to their correct YAML equivalents rather than being stringified.",
      },
      {
        icon: FaMagnifyingGlass,
        title: "In-browser, no upload",
        description:
          "All conversion happens locally in the browser. Your JSON payloads — including secrets and config values — never leave your machine.",
      },
    ] as JsonValidatorFormatterFeature[],
  },
  xml: {
    header: {
      badge: "Features",
      title: "Built for valid XML output",
      description:
        "Generates well-formed XML with an XML declaration, proper escaping, and correct nesting for any JSON structure.",
    },
    features: [
      {
        icon: FaWandMagicSparkles,
        title: "XML declaration included",
        description:
          'Every output starts with <?xml version="1.0" encoding="UTF-8"?> so the output is immediately usable as a standalone XML document.',
      },
      {
        icon: FaBugSlash,
        title: "Special character escaping",
        description:
          "Ampersands, angle brackets, quotes, and apostrophes in string values are escaped to their XML entity equivalents automatically.",
      },
      {
        icon: FaCodeBranch,
        title: "Arrays expand to sibling elements",
        description:
          "JSON arrays produce repeated sibling elements under the parent tag — the most common convention for JSON-to-XML conversion.",
      },
      {
        icon: FaArrowPointer,
        title: "Tag name sanitization",
        description:
          "JSON keys that are not valid XML tag names (starting with digits, containing spaces) are sanitized to valid identifiers automatically.",
      },
      {
        icon: FaMagnifyingGlass,
        title: "In-browser, no upload",
        description:
          "Conversion runs entirely in your browser. JSON that contains credentials, PII, or internal data never touches a server.",
      },
    ] as JsonValidatorFormatterFeature[],
  },
  typescript: {
    header: {
      badge: "Features",
      title: "Built for accurate TypeScript interfaces",
      description:
        "Infers types from real values, generates sub-interfaces for nested objects, and produces clean output you can paste directly into your codebase.",
    },
    features: [
      {
        icon: FaWandMagicSparkles,
        title: "Nested objects become sub-interfaces",
        description:
          "Each nested object generates its own named interface. The root interface references sub-interfaces by name rather than using inline anonymous types.",
      },
      {
        icon: FaBugSlash,
        title: "Null fields become optional",
        description:
          "Fields whose value is null in the sample JSON are marked as optional (?) in the generated interface, reflecting the real-world uncertainty of the field.",
      },
      {
        icon: FaCodeBranch,
        title: "Array element type inference",
        description:
          "Array fields infer their element type from the first item. Object arrays generate a named item interface; primitive arrays use the correct primitive type.",
      },
      {
        icon: FaArrowPointer,
        title: "Safe key quoting",
        description:
          'Interface keys that are not valid identifiers (containing hyphens, spaces, etc.) are automatically wrapped in quotes: `"my-key": string`.',
      },
      {
        icon: FaMagnifyingGlass,
        title: "In-browser, no upload",
        description:
          "Type generation runs entirely in the browser. API responses containing sensitive data never leave your machine.",
      },
    ] as JsonValidatorFormatterFeature[],
  },
};

// ─── Per-tab FAQs data ────────────────────────────────────────────────────────

type FaqsData = typeof jsonValidatorFormatterFaqsData;

export const jsonConverterFaqsDataByTab: Record<JsonConverterTabId, FaqsData> =
  {
    validator: jsonValidatorFormatterFaqsData,
    csv: {
      header: {
        badge: "FAQs",
        title: "Questions about JSON to CSV",
        desc: "Common questions about converting JSON to CSV and what to expect from the output.",
      },
      faqs: [
        {
          question: "What JSON shapes does the converter support?",
          answer:
            "Arrays of objects (the most common case), single objects, and arrays of primitives are all supported. Deeply nested objects inside array items have their nested values stringified as JSON within the CSV cell.",
        },
        {
          question:
            "What happens when objects in the array have different keys?",
          answer:
            "All unique keys across every object in the array are collected and used as headers. Objects missing a key produce an empty cell for that column.",
        },
        {
          question: "Are commas inside values handled correctly?",
          answer:
            "Yes. Values containing commas, double-quotes, or newlines are wrapped in double-quotes with internal quotes escaped — following RFC 4180.",
        },
        {
          question: "Does the tool send my JSON to a server?",
          answer:
            "No. The conversion runs entirely in your browser using JavaScript. Your data never leaves your machine.",
        },
      ] as JsonValidatorFormatterFaq[],
    },
    yaml: {
      header: {
        badge: "FAQs",
        title: "Questions about JSON to YAML",
        desc: "Common questions about the conversion and how edge cases are handled.",
      },
      faqs: [
        {
          question: "Is the output valid YAML?",
          answer:
            "Yes for all standard JSON types. Strings that contain YAML special characters are automatically quoted. The output can be parsed by js-yaml, PyYAML, and other standard libraries.",
        },
        {
          question: "How are JSON null values handled?",
          answer:
            "JSON null maps to the YAML null scalar. Boolean true and false map to their YAML equivalents without quotes.",
        },
        {
          question: "Does the output support YAML comments?",
          answer:
            "No. JSON has no concept of comments so none can be inferred. You can add comments manually to the output after converting.",
        },
        {
          question: "Does the tool send my JSON to a server?",
          answer:
            "No. The conversion runs entirely in your browser. Sensitive config values and secrets in your JSON never leave your machine.",
        },
      ] as JsonValidatorFormatterFaq[],
    },
    xml: {
      header: {
        badge: "FAQs",
        title: "Questions about JSON to XML",
        desc: "Common questions about the conversion and the XML structure produced.",
      },
      faqs: [
        {
          question: "What is the root element called?",
          answer:
            "The root element is always <root>. JSON arrays produce <item> elements inside <root>. JSON objects produce one child element per key inside <root>.",
        },
        {
          question: "How are JSON arrays represented in XML?",
          answer:
            "Array items are repeated as sibling elements using the array's key name as the tag. For example, a users array produces multiple <users> elements.",
        },
        {
          question: "Are invalid XML tag names sanitized?",
          answer:
            "Yes. JSON keys that start with digits or contain spaces and special characters are sanitized to valid XML identifiers automatically.",
        },
        {
          question: "Does the tool send my JSON to a server?",
          answer:
            "No. The conversion runs entirely in your browser. Your JSON payloads never leave your machine.",
        },
      ] as JsonValidatorFormatterFaq[],
    },
    typescript: {
      header: {
        badge: "FAQs",
        title: "Questions about TypeScript interface generation",
        desc: "Common questions about the interfaces generated and how to use them.",
      },
      faqs: [
        {
          question: "Can I paste the output directly into my project?",
          answer:
            "Yes. The output uses standard TypeScript interface syntax. Paste it into any .ts or .d.ts file and it will compile without modification.",
        },
        {
          question: "How are array types inferred?",
          answer:
            "The element type is inferred from the first item in the array. If the array is empty, the element type is unknown[]. For object arrays, a named sub-interface is generated for the element type.",
        },
        {
          question: "What happens with null values?",
          answer:
            "Fields whose value is null in the sample JSON are typed as null and marked optional with ?. You can widen the type manually if the field can also hold other values.",
        },
        {
          question: "Does the tool send my JSON to a server?",
          answer:
            "No. Interface generation runs entirely in your browser. API responses containing sensitive data or internal field names never leave your machine.",
        },
      ] as JsonValidatorFormatterFaq[],
    },
  };
