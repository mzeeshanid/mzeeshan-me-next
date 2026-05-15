import { css, cx } from "styled-system/css";
import { stack } from "styled-system/patterns";
import { separator } from "styled-system/recipes";
import React from "react";

type MyStatItemProps = {
  title: string;
  value: string;
};

const MyStatItem: React.FC<MyStatItemProps> = ({ title, value }) => {
  return (
    <div className={stack({ align: "flex-start", gap: "4" })}>
      <div className={stack({ align: "flex-start", gap: "0" })}>
        <p className={css({ textStyle: { base: "xl", md: "2xl" }, fontWeight: "semibold" })}>
          {value}
        </p>
        <p className={css({ whiteSpace: "nowrap", color: "fg.muted" })}>
          {title}
        </p>
      </div>
      <hr className={cx(separator({}), css({ w: "full" }))} />
    </div>
  );
};

export default MyStatItem;
