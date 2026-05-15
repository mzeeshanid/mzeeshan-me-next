import { grid, stack } from "styled-system/patterns";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import myStatsData from "@/data/home/myStatsData";
import React from "react";
import MyStatItem from "./MyStatItem";

const MyStats: React.FC = () => {
  const { tagline, title, detail, stats } = myStatsData();

  return (
    <section>
      <div className={grid({ columns: { base: 1, lg: 2 }, gap: "8" })}>
        <div>
          <div className={stack({ align: "flex-start" })}>
            <SectionHeader tagline={tagline} headline={title} description={detail} />
          </div>
        </div>
        <div>
          <div className={grid({ columns: 2, gap: "8" })}>
            {stats.map((stat, index) => (
              <MyStatItem key={index} title={stat.title} value={stat.value} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyStats;
