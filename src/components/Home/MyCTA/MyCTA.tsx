import { css, cx } from "styled-system/css";
import { stack } from "styled-system/patterns";
import { button, tag } from "styled-system/recipes";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { paletteCva, useColorPalette, type PaletteCvaKey } from "@/contexts/useColorPalette";
import NextLink from "next/link";
import React from "react";

const MyCTA: React.FC = () => {
  const { palette } = useColorPalette();
  const tagStyles = tag({ size: "lg", variant: "surface" });

  return (
    <section>
      <div className={stack({ gap: "6", align: "center" })}>
        <div
          className={cx(
            paletteCva({ palette: palette as PaletteCvaKey }),
            tagStyles.root,
            css({ px: "4", py: "2", rounded: "full" }),
          )}
        >
          <span className={tagStyles.label}>{"Sound's interesting"}</span>
        </div>
        <SectionHeader
          headline={"Ready to grow your business?"}
          description={"Let's connect today to discuss how I can help you achieve your goals."}
          textAlign="center"
        />
        <NextLink href="/contact">
          <button
            className={cx(
              paletteCva({ palette: palette as PaletteCvaKey }),
              button({ variant: "solid", size: "lg" }),
            )}
          >
            {"Contact Me"}
          </button>
        </NextLink>
      </div>
    </section>
  );
};

export default MyCTA;
