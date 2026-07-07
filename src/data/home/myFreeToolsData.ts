import { myToolsData, MyToolDataModel } from "./myToolsData";

export type MyFreeToolsData = {
  tagline: string;
  title: string;
  details: string;
  tools: MyToolDataModel[];
};

const FEATURED_TOOL_TITLES = [
  "Drive Direct",
  "Sample Files",
  "Salary Tax Calculator",
  "JSON Validator",
];

const myFreeToolsData = (): MyFreeToolsData => {
  const tools = FEATURED_TOOL_TITLES.map(
    (title) => myToolsData.tools.find((tool) => tool.title === title)!
  );

  return {
    tagline: "Free Tools",
    title: "Free Tools I've Built",
    details:
      "A handful of free, browser-based utilities I've built and published to solve problems I kept running into myself.",
    tools,
  };
};

export default myFreeToolsData;
