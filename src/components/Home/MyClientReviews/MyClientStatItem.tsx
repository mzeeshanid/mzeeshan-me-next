import { css } from "styled-system/css";
import { stack } from "styled-system/patterns";
import React from "react";

type MyClientStatItemProps = {
  item: { label: string; value: string };
  idx: number;
};

const MyClientStatItem: React.FC<MyClientStatItemProps> = ({ item }) => {
  return (
    <div
      className={stack({ gap: "2", align: "center", px: { base: "0", md: "8" } })}
      style={{ textAlign: "center" }}
    >
      <p className={css({ textStyle: { base: "2xl", md: "4xl" }, fontWeight: "semibold" })}>
        {item.value}
      </p>
      <p className={css({ whiteSpace: "nowrap", color: "fg.muted" })}>
        {item.label}
      </p>
    </div>
  );
};

export default MyClientStatItem;
