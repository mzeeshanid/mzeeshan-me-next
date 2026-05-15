import { css, cx } from "styled-system/css";
import { grid, stack } from "styled-system/patterns";
import {
  paletteCva,
  useColorPalette,
  type PaletteCvaKey,
} from "@/contexts/useColorPalette";
import myStatsData from "@/data/home/myStatsData";
import React from "react";

const MyHeroStats: React.FC = () => {
  const { stats } = myStatsData();
  const { palette } = useColorPalette();

  return (
    <div
      className={grid({
        columns: { base: 2, lg: 4 },
        gap: { base: "4", md: "8" },
      })}
    >
      {stats.slice(0, 4).map((stat, idx) => (
        <div key={idx}>
          <div className={stack({ align: "flex-start", gap: "0" })}>
            <p
              className={cx(
                paletteCva({ palette: palette as PaletteCvaKey }),
                css({
                  fontWeight: "bold",
                  color: "colorPalette.fg",
                  fontSize: { base: "lg", md: "xl", lg: "2xl" },
                }),
              )}
            >
              {stat.value}
            </p>
            <p className={css({ color: "fg.muted" })}>{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyHeroStats;
