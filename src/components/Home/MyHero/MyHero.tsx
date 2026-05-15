import { css, cx } from "styled-system/css";
import { grid, stack } from "styled-system/patterns";
import { tag } from "styled-system/recipes";
import { paletteCva, useColorPalette, type PaletteCvaKey } from "@/contexts/useColorPalette";
import myHeroData from "@/data/home/myHeroData";
import Image from "next/image";
import React from "react";
import MyHeroActions from "./MyHeroActions";
import MyHeroSkills from "./MyHeroSkills";
import MyHeroStats from "./MyHeroStats";

const MyHero: React.FC = () => {
  const { palette } = useColorPalette();
  const { tagline, title, details, heroImage } = myHeroData();
  const tagStyles = tag({ size: "lg", variant: "surface" });

  return (
    <section>
      <div className={grid({ columns: { base: 1, lg: 2 }, gap: { base: "4", md: "8" } })}>
        <div>
          <div className={stack({ align: "flex-start", gap: "4" })}>
            <div className={cx(paletteCva({ palette: palette as PaletteCvaKey }), tagStyles.root)}>
              <span className={tagStyles.label}>{tagline}</span>
            </div>
            <h1
              className={cx(
                paletteCva({ palette: palette as PaletteCvaKey }),
                css({
                  fontSize: { base: "4xl", md: "5xl", lg: "6xl" },
                  fontWeight: "extrabold",
                  lineHeight: 1,
                  color: "colorPalette.fg",
                }),
              )}
            >
              {title}
            </h1>
            <p className={css({ color: "fg.muted", fontSize: { base: "md", md: "lg" } })}>
              {details}
            </p>
            <MyHeroActions />
          </div>
        </div>
        <div>
          <div className={stack({ w: "full", h: "full", gap: "8" })}>
            <div
              className={css({
                bg: "bg.subtle",
                rounded: "2xl",
                overflow: "hidden",
                transition: "transform 0.3s ease",
                _hover: { transform: "scale(1.02)" },
                w: "full",
              })}
              style={{ aspectRatio: heroImage.width / heroImage.height }}
            >
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                width={heroImage.width}
                height={heroImage.height}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                placeholder="blur"
                fetchPriority="high"
                loading="eager"
                sizes="(max-width: 62em) 100vw, 50vw"
              />
            </div>
            <div className={css({ w: "full" })}>
              <MyHeroSkills />
            </div>
          </div>
        </div>
      </div>
      <div className={css({ p: { base: "4", md: "8" } })} />
      <div className={css({ w: "full" })}>
        <MyHeroStats />
      </div>
    </section>
  );
};

export default MyHero;
