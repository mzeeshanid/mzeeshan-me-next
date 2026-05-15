import { css } from "styled-system/css";
import { flex, grid } from "styled-system/patterns";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import myPerformanceData from "@/data/home/myPerformanceData";
import React from "react";
import MyPerformanceStatItem from "./MyPerformanceStatItem";

const MyPerformanceStats: React.FC = () => {
  const myPerformanceStats = myPerformanceData();

  return (
    <section>
      <div className={flex({ justify: "center" })}>
        <SectionHeader
          textAlign="center"
          tagline={myPerformanceStats.tagline}
          headline={myPerformanceStats.title}
          description={myPerformanceStats.detail}
        />
      </div>
      <div className={css({ p: "4" })} />
      <div className={grid({ columns: { base: 1, md: 2, lg: 3 }, gap: "4" })}>
        {myPerformanceStats.stats.map((stat, index) => (
          <MyPerformanceStatItem
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default MyPerformanceStats;
