import { css, cx } from "styled-system/css";
import { stack } from "styled-system/patterns";
import { paletteCva, useColorPalette, type PaletteCvaKey } from "@/contexts/useColorPalette";
import type React from "react";

export interface SectionHeaderProps {
  tagline?: React.ReactNode;
  headline: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  headingAs?: "h1" | "h2" | "h3";
  textAlign?: React.CSSProperties["textAlign"];
  className?: string;
}

export const SectionHeader = ({
  tagline,
  headline,
  description,
  children,
  headingAs: HeadingTag = "h2",
  textAlign,
  className,
}: SectionHeaderProps) => {
  const { palette } = useColorPalette();

  return (
    <div
      className={cx(
        stack({ gap: { base: "6", md: "8" } }),
        className,
      )}
      style={textAlign ? { textAlign } : undefined}
    >
      <div className={stack({ gap: { base: "4", md: "5" } })}>
        <div className={stack({ gap: { base: "2", md: "3" } })}>
          {tagline && (
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
          )}
          <HeadingTag
            className={css({ textStyle: { base: "3xl", md: "4xl" } })}
          >
            {headline}
          </HeadingTag>
        </div>
        {description && (
          <p
            className={css({
              color: "fg.muted",
              textStyle: { base: "md", md: "lg" },
              maxW: "3xl",
            })}
          >
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
};
