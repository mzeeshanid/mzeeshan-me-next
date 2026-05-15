import { cx } from "styled-system/css";
import { stack } from "styled-system/patterns";
import { button } from "styled-system/recipes";
import {
  paletteCva,
  useColorPalette,
  type PaletteCvaKey,
} from "@/contexts/useColorPalette";
import myHeroData from "@/data/home/myHeroData";
import React from "react";

const MyHeroActions: React.FC = () => {
  const { actions } = myHeroData();
  const { palette } = useColorPalette();

  return (
    <div
      className={stack({
        gap: "4",
        direction: { base: "column", md: "row" },
        w: "full",
      })}
    >
      {actions.map((action, idx) => (
        <a key={idx} href={action.link}>
          <button
            className={cx(
              paletteCva({ palette: palette as PaletteCvaKey }),
              button({ variant: action.variant, size: "xl" }),
            )}
          >
            {action.buttonText}
          </button>
        </a>
      ))}
    </div>
  );
};

export default MyHeroActions;
