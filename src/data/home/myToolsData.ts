import { BasicImageDataModel } from "../basicImage/basicImageDataModel";

export type MyToolsData = {
  tagline: string;
  title: string;
  details: string;
  tools: MyToolDataModel[];
};

export type MyToolDataModel = {
  title: string;
  caption: string;
  detail: string;
  url: string;
  icon: BasicImageDataModel;
};

export const myToolsData: MyToolsData = {
  tagline: "Helper Tools",
  title: "My Published Helper Tools",
  details:
    "Here are some of the helper tools that I have developed and published. These tools are designed to assist users in various tasks and enhance their productivity.",
  tools: [
    {
      title: "Sample Files",
      caption: "Download It!",
      detail:
        "Free download of sample files of different types needed for testing during development.",
      icon: {
        src: "/assets/mzfilemanage_appicon.png",
        alt: "Sample Files icon",
        width: 300,
        height: 300,
      },
      url: "/tools/sample-files",
    },
    {
      title: "Aspect Ratio",
      caption: "Calculate It!",
      detail:
        "A tool that allows to calculate aspect ratio by entering original size and desired width or height.",
      icon: {
        src: "/assets/aspect_ratio_app_icon.png",
        alt: "Aspect Ratio icon",
        width: 300,
        height: 300,
      },
      url: "/tools/aspect-ratio-calculator",
    },
    {
      title: "Drive Direct",
      caption: "Generate It!",
      detail:
        "It's a helper tool that allows to create a direct link of a file by using share url of google drive.",
      icon: {
        src: "/assets/drive_direct_icon.png",
        alt: "Drive Direct icon",
        width: 300,
        height: 300,
      },
      url: "/tools/google-drive-direct-download-link-generator",
    },
    {
      title: "String Metrics",
      caption: "Measure It!",
      detail:
        "A tool that allows to calculate distance and similarity between strings based on 6+ different algorithms.",
      icon: {
        src: "/assets/string_metric_app_icon.png",
        alt: "String Metrics icon",
        width: 300,
        height: 300,
      },
      url: "/tools/string-metrics",
    },
    {
      title: "JSON Validator",
      caption: "Inspect It!",
      detail:
        "Validate, format, minify, and inspect JSON payloads in a collapsible tree with node details and search.",
      icon: {
        src: "/assets/json_validator_formatter_icon.png",
        alt: "JSON Validator and Formatter icon",
        width: 300,
        height: 300,
      },
      url: "/tools/json-validator-and-formatter",
    },
    {
      title: "JSON to CSV",
      caption: "Convert It!",
      detail:
        "Convert JSON arrays and objects to CSV with auto-inferred headers and RFC-compliant quoting — paste and copy in one click.",
      icon: {
        src: "/assets/json_to_csv_icon.png",
        alt: "JSON to CSV Converter icon",
        width: 300,
        height: 300,
      },
      url: "/tools/json-to-csv",
    },
    {
      title: "JSON to YAML",
      caption: "Convert It!",
      detail:
        "Turn JSON into clean, readable YAML instantly — ideal for Kubernetes manifests, Docker Compose, and CI/CD pipelines.",
      icon: {
        src: "/assets/json_to_yaml_icon.png",
        alt: "JSON to YAML Converter icon",
        width: 300,
        height: 300,
      },
      url: "/tools/json-to-yaml",
    },
    {
      title: "JSON to XML",
      caption: "Convert It!",
      detail:
        "Convert JSON to well-formed XML with proper nesting, entity escaping, and an XML declaration — all in the browser.",
      icon: {
        src: "/assets/json_to_xml_icon.png",
        alt: "JSON to XML Converter icon",
        width: 300,
        height: 300,
      },
      url: "/tools/json-to-xml",
    },
    {
      title: "JSON to TypeScript",
      caption: "Generate It!",
      detail:
        "Generate TypeScript interfaces from any JSON object — nested objects become named sub-interfaces automatically.",
      icon: {
        src: "/assets/json_to_type_script_icon.png",
        alt: "JSON to TypeScript Converter icon",
        width: 300,
        height: 300,
      },
      url: "/tools/json-to-typescript",
    },
    {
      title: "Image Converter",
      caption: "Convert It!",
      detail:
        "Convert WebP, PNG, and JPG images locally in the browser without uploading them to a server.",
      icon: {
        src: "/assets/image_format_converter_icon.png",
        alt: "Image Format Converter icon",
        width: 300,
        height: 300,
      },
      url: "/tools/image-format-converter",
    },
    {
      title: "App Icon Generator",
      caption: "Generate It!",
      detail:
        "Create iOS, Android, watchOS, iPadOS, and macOS icon packs from one image and download a project-ready ZIP.",
      icon: {
        src: "/assets/app_icon_generator_app_icon.png",
        alt: "App Icon Generator icon",
        width: 300,
        height: 300,
      },
      url: "/tools/app-icon-generator",
    },
    {
      title: "Promotional Offer",
      caption: "Signature generator",
      detail:
        "A tool that allows to generate promotional offer signature for testing required for buying promotional offer.",
      icon: {
        src: "/assets/promotional_offer_appicon.png",
        alt: "Promotional Offer icon",
        width: 300,
        height: 300,
      },
      url: "/tools/apple-inapp-promotional-offer-signature-generator-for-testing",
    },
  ],
};
