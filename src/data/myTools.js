import g2dAppIcon from "../../public/assets/g2d_app_icon.png";
import fileManageIcon from "../../public/assets/mzfilemanage_appicon.png";

function myTools() {
  const tools = [
    {
      title: "G2D",
      detail:
        "It's a helper tool that allows to create a direct link of a file by using share url of google drive.",
      image: g2dAppIcon,
      alt: "G2D web app icon",
      url: "//www.g2d.dev/",
    },
    {
      title: "Sample Files",
      detail:
        "Free download of sample files of different types needed for testing during development.",
      image: fileManageIcon,
      alt: "Sample files web app icon",
      url: "samplefiles",
    },
  ];
  return tools;
}

export default myTools;
