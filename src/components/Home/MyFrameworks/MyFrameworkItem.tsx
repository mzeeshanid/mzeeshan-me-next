import { css, cx } from "styled-system/css";
import { stack } from "styled-system/patterns";
import { paletteCva, useColorPalette, type PaletteCvaKey } from "@/contexts/useColorPalette";
import DeferredIcon from "@/components/DeferredIcon/DeferredIcon";
import React from "react";
import { IconType } from "react-icons";

type MyFrameworkItemProps = {
  title: string;
  description: string;
  link: string;
  icon: IconType;
};

const MyFrameworkItem: React.FC<MyFrameworkItemProps> = ({ title, description, icon, link }) => {
  const { palette } = useColorPalette();

  return (
    <a href={link}>
      <div className={stack({ align: "center" })}>
        <DeferredIcon
          icon={icon}
          boxSize={12}
          color={`${palette}.fg`}
        />
        <p
          className={cx(
            paletteCva({ palette: palette as PaletteCvaKey }),
            css({
              fontWeight: "semibold",
              fontSize: "lg",
              textAlign: "center",
              color: "colorPalette.fg",
            }),
          )}
        >
          {title}
        </p>
        <p className={css({ textAlign: "center", color: "fg.muted" })}>{description}</p>
      </div>
    </a>
  );
};

export default MyFrameworkItem;
