export type ToolStatistic = {
  label: string;
  value: string;
  description: string;
};

export type MyToolsStatisticsData = {
  title: string;
  subtitle: string;
  statistics: ToolStatistic[];
};

export const myToolsStatisticsData: MyToolsStatisticsData = {
  title: "Tools Impact",
  subtitle: "Helping developers and designers worldwide",
  statistics: [
    {
      label: "Active Users",
      value: "10K+",
      description: "Monthly active users worldwide",
    },
    {
      label: "Tools Published",
      value: "5+",
      description: "Free and open-source tools",
    },
    {
      label: "Uses Per Month",
      value: "50K+",
      description: "Tool conversions and calculations",
    },
    {
      label: "GitHub Stars",
      value: "100+",
      description: "Community appreciation & support",
    },
  ],
};
