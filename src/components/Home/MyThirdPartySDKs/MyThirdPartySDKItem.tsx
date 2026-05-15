import { cx } from "styled-system/css";
import { tag } from "styled-system/recipes";
import React from "react";

type MyThirdPartySDKItemProps = {
  title: string;
  link: string;
};

const MyThirdPartySDKItem: React.FC<MyThirdPartySDKItemProps> = ({ title, link }) => {
  const tagStyles = tag({ size: "lg", variant: "surface" });

  return (
    <a href={link}>
      <div className={cx(tagStyles.root)}>
        <span className={tagStyles.label}>{title}</span>
      </div>
    </a>
  );
};

export default MyThirdPartySDKItem;
