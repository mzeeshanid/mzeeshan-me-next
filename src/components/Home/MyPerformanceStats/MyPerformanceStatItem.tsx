import { css, cx } from "styled-system/css";
import { hstack } from "styled-system/patterns";
import { card } from "styled-system/recipes";
import { paletteCva, useColorPalette, type PaletteCvaKey } from "@/contexts/useColorPalette";
import DeferredIcon from "@/components/DeferredIcon/DeferredIcon";
import React from "react";
import { IconType } from "react-icons";

type MyPerformanceStatProps = {
  title: string;
  value: string;
  icon: IconType;
};

const MyPerformanceStatItem: React.FC<MyPerformanceStatProps> = ({ title, value, icon }) => {
  const { palette } = useColorPalette();
  const cardStyles = card({});

  return (
    <div className={cx(cardStyles.root, css({ bg: "bg.subtle", borderWidth: 0 }))}>
      <div className={cardStyles.header}>
        <p
          className={cx(
            paletteCva({ palette: palette as PaletteCvaKey }),
            css({
              fontSize: { base: "2xl", md: "4xl" },
              color: "colorPalette.fg",
              fontWeight: { base: "bold", md: "extrabold" },
            }),
          )}
        >
          {value}
        </p>
      </div>
      <div className={cardStyles.body}>
        <div className={hstack({ justify: "space-between" })}>
          <span>{title}</span>
          <DeferredIcon
            icon={icon}
            boxSize={{ base: 10, md: 12 }}
            color={`${palette}.fg`}
          />
        </div>
      </div>
    </div>
  );
};

export default MyPerformanceStatItem;
