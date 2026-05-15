import { css, cx } from "styled-system/css";
import { grid, stack } from "styled-system/patterns";
import { paletteCva, useColorPalette, type PaletteCvaKey } from "@/contexts/useColorPalette";
import myFrameworks from "@/data/home/myFrameworksData";
import { TypewriterHighlight } from "@/components/TypewriterHighlight/TypewriterHighlight";
import React from "react";
import MyFrameworkItem from "./MyFrameworkItem";

const MyFrameworks: React.FC = () => {
  const { palette } = useColorPalette();
  const { tagline, typeWriterPre, typeWriterWords, typeWriterPost, detail, frameworks } = myFrameworks();

  return (
    <section>
      <div className={stack({ gap: { base: "6", md: "8" }, align: "center" })}>
        <div className={stack({ gap: { base: "4", md: "5" } })}>
          <div className={stack({ gap: { base: "2", md: "3" } })}>
            <p
              className={cx(
                paletteCva({ palette: palette as PaletteCvaKey }),
                css({
                  textStyle: { base: "sm", md: "md" },
                  fontWeight: "medium",
                  color: "colorPalette.solid",
                  textAlign: "center",
                }),
              )}
            >
              {tagline}
            </p>
            <h2
              className={css({
                fontWeight: "medium",
                fontSize: { base: "2xl", md: "3xl", lg: "5xl" },
                textAlign: "center",
                lineHeight: "shorter",
              })}
            >
              {typeWriterPre}
              <TypewriterHighlight
                words={typeWriterWords}
                highlightClassName={cx(
                  paletteCva({ palette: palette as PaletteCvaKey }),
                  css({
                    px: "0.5",
                    bg: "colorPalette.subtle",
                    color: "colorPalette.fg",
                    fontWeight: "bold",
                    fontSize: { base: "2xl", md: "3xl", lg: "5xl" },
                  }),
                )}
              />
              {typeWriterPost}
            </h2>
          </div>
          <p
            className={css({
              color: "fg.muted",
              textStyle: { base: "md", md: "lg" },
              maxW: "3xl",
              textAlign: "center",
            })}
          >
            {detail}
          </p>
        </div>
        <div className={grid({ columns: { base: 1, md: 2 }, gap: "6" })}>
          {frameworks.map((framework, idx) => (
            <MyFrameworkItem
              key={idx}
              title={framework.title}
              description={framework.detail}
              icon={framework.icon}
              link={framework.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyFrameworks;
