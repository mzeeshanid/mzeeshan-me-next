export type MyContributionData = {
    title: string;
    detail: string;
    link: string;
    ariaLabel: string;
    features: string[];
};

const myContributionData = (): MyContributionData[] => {
  return [
    {
      title: "MZDownloadManager",
      detail: "It uses the URLSession api to download files.",
      link: "//github.com/mzeeshanid/MZDownloadManager",
      ariaLabel: "mzeeshanid/MZDownloadManager on GitHub",
      features: [
        "Download large files in background.",
        "Download multiple files at a time.",
        "Resume interrupted downloads.",
      ],
    },
    {
      title: "MZCroppableView",
      detail: "Irregular image cropping",
      link: "//github.com/mzeeshanid/MZCroppableView",
      ariaLabel: "mzeeshanid/MZCroppableView on GitHub",
      features: [
        "Subclass of UIView.",
        "Gesture based irregular image cropping.",
        "High quality cropped image.",
      ],
    },
  ];
}

export default myContributionData;
