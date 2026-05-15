import { css } from "styled-system/css";
import { grid, stack } from "styled-system/patterns";
import myClientReviewsData from "@/data/home/myClientReviewsData";
import React from "react";
import MyClientReviewItem from "./MyClientReviewItem";
import MyClientReviewsHeader from "./MyClientReviewsHeader";
import MyClientStats from "./MyClientStats";

const MyClientReviews: React.FC = () => {
  const { title, reviews } = myClientReviewsData();

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <section>
      <MyClientStats />
      <div className={css({ p: "4" })} />
      <div className={stack({ direction: { base: "column", md: "row" }, gap: "4" })}>
        <MyClientReviewsHeader
          avgRating={avgRating}
          totalReviews={reviews.length}
          title={title}
        />
        <div className={grid({ columns: { base: 1, lg: 2 }, gap: "4" })}>
          {reviews.map((review, idx) => (
            <div key={idx} className={css({ h: "full", maxW: { base: "full", lg: "md" } })}>
              <MyClientReviewItem {...review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyClientReviews;
