import aspectRatioIcon from "../../public/assets/aspect_ratio_app_icon.png";
import stringMetricsIcon from "../../public/assets/string_metric_app_icon.png";
import g2dAppIcon from "../../public/assets/g2d_app_icon.png";
import promotionalOfferAppIcon from "../../public/assets/promotional_offer_appicon.png";
import fileManageIcon from "../../public/assets/mzfilemanage_appicon.png";

function myTools() {
  const tools = [
    {
      title: "G2D",
      detail:
        "It's a helper tool that allows to create a direct link of a file by using share url of google drive.",
      image: g2dAppIcon,
      alt: "G2D web app icon",
      url: "google-drive-direct-link-generator",
    },
    {
      title: "Sample Files",
      detail:
        "Free download of sample files of different types needed for testing during development.",
      image: fileManageIcon,
      alt: "Sample files web app icon",
      url: "samplefiles",
    },
    {
      title: "Aspect Ratio",
      detail:
        "A tool that allows to calculate aspect ratio by entering original size and desired width or height.",
      image: aspectRatioIcon,
      alt: "Aspect ratio calculator app icon",
      url: "aspectratio",
    },
    {
      title: "String Metrics",
      detail:
        "A tool that allows to calculate distance and similarity between strings based on 6+ different algorithms.",
      image: stringMetricsIcon,
      alt: "String Metrics app icon",
      url: "string-metrics",
    },
    {
      title: "Promotional Offer",
      detail:
        "A tool that allows to generate promotional offer signature for testing required for buying promotional offer.",
      image: promotionalOfferAppIcon,
      alt: "Apple promotinoal offer signature generator app icon",
      url: "apple-inapp-promotional-offer-signature-generator-for-testing",
    },
  ];
  return tools;
}

export default myTools;
