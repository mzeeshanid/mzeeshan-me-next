import { css, cx } from "styled-system/css";
import { grid, stack, wrap } from "styled-system/patterns";
import { tag } from "styled-system/recipes";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { paletteCva, useColorPalette, type PaletteCvaKey } from "@/contexts/useColorPalette";
import myThirdPartySDKsData from "@/data/home/myThirdPartySDKsData";
import Image from "next/image";
import React from "react";
import MyThirdPartySDKItem from "./MyThirdPartySDKItem";

const MyThirdPartySDKs: React.FC = () => {
  const { tagline, title, detail, sdks, heroImage } = myThirdPartySDKsData();
  const { palette } = useColorPalette();
  const tagStyles = tag({ size: "lg", variant: "surface" });

  return (
    <div className={grid({ gap: { base: "4", md: "8" }, columns: { base: 1, md: 2 } })}>
      <div style={{ flex: "0.5" }}>
        <div className={stack({ align: "flex-start", gap: "4", h: "full" })}>
          <div className={cx(paletteCva({ palette: palette as PaletteCvaKey }), tagStyles.root)}>
            <span className={tagStyles.label}>{tagline}</span>
          </div>
          <SectionHeader headline={title} description={detail} />
          <div className={wrap({ gap: "2" })}>
            {sdks.map((sdk, idx) => (
              <MyThirdPartySDKItem key={idx} title={sdk.title} link={sdk.link} />
            ))}
          </div>
        </div>
      </div>
      <div style={{ flex: "0.5" }}>
        <div
          className={css({
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            w: "full",
            h: "full",
            bg: "bg.muted",
            rounded: { base: "xl", md: "2xl" },
            p: "4",
            minH: "300px",
          })}
        >
          <Image
            style={{ width: `${heroImage.width}px`, height: "auto" }}
            src={heroImage.src}
            placeholder="blur"
            alt={heroImage.alt}
            sizes="(max-width: 48em) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
};

export default MyThirdPartySDKs;
