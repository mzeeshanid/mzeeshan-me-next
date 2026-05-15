import { container, grid, stack } from "styled-system/patterns";
import { card } from "styled-system/recipes";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import myClientReviewsData from "@/data/home/myClientReviewsData";
import React from "react";
import MyClientStatItem from "./MyClientStatItem";

const MyClientStats: React.FC = () => {
  const { stats, statsTitle } = myClientReviewsData();
  const cardStyles = card({});

  return (
    <div className={cardStyles.root}>
      <div className={cardStyles.body}>
        <div className={container({ py: "8" })}>
          <div className={stack({ gap: "12", align: "center" })}>
            <SectionHeader textAlign="center" headline={statsTitle} />
            <div className={grid({ columns: { base: 2, lg: 4 }, gap: "4" })}>
              {stats.map((item, idx) => (
                <MyClientStatItem key={idx} idx={idx} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyClientStats;
