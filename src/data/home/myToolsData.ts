import { BasicImageDataModel } from "../basicImage/basicImageDataModel";

export type MyToolsData = {
  tagline: string;
  title: string;
  details: string;
  tools: MyToolDataModel[];
}

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
    details: "Here are some of the helper tools that I have developed and published. These tools are designed to assist users in various tasks and enhance their productivity.",
    tools: [
        {
            title: "Sample Files",
            caption: "Download It!",
            detail: "Free download of sample files of different types needed for testing during development.",
            icon: {
                src: "/assets/mzfilemanage_appicon.png",
                alt: "Sample Files icon",
                width: 300,
                height: 300,
            },
            url: "/tools/sample-files"
        },
        {
            title: "Aspect Ratio",
            caption: "Calculate It!",
            detail: "A tool that allows to calculate aspect ratio by entering original size and desired width or height.",
            icon: {
                src: "/assets/aspect_ratio_app_icon.png",
                alt: "Aspect Ratio icon",
                width: 300,
                height: 300,
            },
            url: "/tools/aspect-ratio-calculator"
        },
        {
            title: "Drive Direct",
            caption: "Generate It!",
            detail: "It's a helper tool that allows to create a direct link of a file by using share url of google drive.",
            icon: {
                src: "/assets/drive_direct_icon.png",
                alt: "Drive Direct icon",
                width: 300,
                height: 300,
            },
            url: "/tools/google-drive-direct-download-link-generator"
        },
        {
            title: "String Metrics",
            caption: "Measure It!",
            detail: "A tool that allows to calculate distance and similarity between strings based on 6+ different algorithms.",
            icon: {
                src: "/assets/string_metric_app_icon.png",
                alt: "String Metrics icon",
                width: 300,
                height: 300,
            },
            url: "/tools/string-metrics"
        },
        {
            title: "Promotional Offer",
            caption: "Signature generator",
            detail: "A tool that allows to generate promotional offer signature for testing required for buying promotional offer.",
            icon: {
                src: "/assets/promotional_offer_appicon.png",
                alt: "Promotional Offer icon",
                width: 300,
                height: 300,
            },
            url: "/tools/apple-inapp-promotional-offer-signature-generator-for-testing"
        }
    ]
}