import { css, cx } from "styled-system/css";
import { grid, hstack, stack } from "styled-system/patterns";
import { button } from "styled-system/recipes";
import { paletteCva, useColorPalette, type PaletteCvaKey } from "@/contexts/useColorPalette";
import myPricingData from "@/data/home/myPricingData";
import DeferredIcon from "@/components/DeferredIcon/DeferredIcon";
import NextLink from "next/link";
import React from "react";
import { FiCheckCircle } from "react-icons/fi";

const MyPricing: React.FC = () => {
  const { palette } = useColorPalette();
  const { tagline, highlitedTitle, normalTitle, detail, featureTitle, features } = myPricingData();

  return (
    <div className={grid({ gap: { base: "4", md: "8" }, columns: { base: 1, md: 2 } })}>
      <div style={{ flex: "0.5" }} className={css({ py: "4" })}>
        <div className={stack({ gap: { base: "2", md: "4" }, align: "flex-start" })}>
          <p
            className={cx(
              paletteCva({ palette: palette as PaletteCvaKey }),
              css({
                textStyle: { base: "sm", md: "md" },
                fontWeight: "medium",
                color: "colorPalette.solid",
              }),
            )}
          >
            {tagline}
          </p>
          <h2>
            <span
              className={cx(
                paletteCva({ palette: palette as PaletteCvaKey }),
                css({
                  textStyle: { base: "3xl", md: "5xl" },
                  color: "colorPalette.fg",
                  fontWeight: "extrabold",
                }),
              )}
            >
              {highlitedTitle}
            </span>
            <span className={css({ textStyle: { base: "lg", md: "xl" } })}>
              {normalTitle}
            </span>
          </h2>
          <p className={css({ color: "fg.muted", textStyle: { base: "md", md: "lg" }, maxW: "3xl" })}>
            {detail}
          </p>
        </div>
      </div>
      <div style={{ flex: "0.5" }}>
        <div
          className={css({
            w: "full",
            h: "full",
            bg: "bg.muted",
            rounded: { base: "xl", md: "2xl" },
            p: "8",
          })}
        >
          <div className={stack({})}>
            <h3
              className={cx(
                paletteCva({ palette: palette as PaletteCvaKey }),
                css({
                  color: "colorPalette.fg",
                  textStyle: { base: "xl", md: "2xl" },
                  fontWeight: "bold",
                }),
              )}
            >
              {featureTitle}
            </h3>
            <ul>
              {features.map((feature, idx) => (
                <li key={idx} className={css({ mb: "2" })}>
                  <div className={hstack({})}>
                    <DeferredIcon icon={FiCheckCircle} color={"fg.muted"} />
                    <span className={css({ color: "fg.muted", textStyle: { base: "md", md: "lg" } })}>
                      {feature}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <NextLink href="/contact" className={css({ w: "full", display: "block" })}>
              <button
                className={cx(
                  paletteCva({ palette: palette as PaletteCvaKey }),
                  button({ variant: "solid", size: "lg" }),
                  css({ w: "full" }),
                )}
              >
                {"Contact Me"}
              </button>
            </NextLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPricing;
