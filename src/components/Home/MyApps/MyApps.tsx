import { css, cx } from "styled-system/css";
import { grid, stack } from "styled-system/patterns";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { paletteCva, useColorPalette, type PaletteCvaKey } from "@/contexts/useColorPalette";
import myAppsData from "@/data/home/myAppsData";
import NextLink from "next/link";
import MyAppItem from "./MyAppItem";

const MyApps = () => {
  const { tagline, title, details, apps } = myAppsData();
  const { palette } = useColorPalette();

  return (
    <section>
      <div className={stack({ gap: "8", align: "center" })}>
        <SectionHeader
          tagline={tagline}
          headline={title}
          description={details}
          textAlign="center"
        />
        <div className={grid({ columns: { base: 1, md: 2 }, gap: { base: "4", md: "6" } })}>
          {apps.map((app, idx) => (
            <div key={idx} className={css({ w: "full", h: "full" })}>
              <MyAppItem
                title={app.title}
                caption={app.caption}
                detail={app.detail}
                icon={app.icon}
                url={app.url}
              />
            </div>
          ))}
          <div className={css({ gridColumn: { base: "span 1", md: "span 2" } })}>
            <div
              className={css({
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                w: "full",
                h: "44px",
                textAlign: "center",
                bg: "bg.subtle",
                borderRadius: "md",
              })}
            >
              <NextLink
                href="/apps"
                className={cx(
                  paletteCva({ palette: palette as PaletteCvaKey }),
                  css({ fontWeight: "medium", color: "colorPalette.fg" }),
                )}
              >
                {"View All Apps"}
              </NextLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyApps;
