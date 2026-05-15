import { css, cx } from "styled-system/css";
import { hstack, stack } from "styled-system/patterns";
import { tag } from "styled-system/recipes";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { paletteCva, useColorPalette, type PaletteCvaKey } from "@/contexts/useColorPalette";
import { MySkillData } from "@/data/home/mySkillsData";
import { FiCheckCircle } from "react-icons/fi";
import DeferredIcon from "@/components/DeferredIcon/DeferredIcon";
import Image from "next/image";
import React from "react";

type MySkillItemProps = {
  idx: number;
  skill: MySkillData;
};

const MySkillItem: React.FC<MySkillItemProps> = ({ idx, skill }) => {
  const { palette } = useColorPalette();
  const tagStyles = tag({ size: "lg", variant: "surface" });
  const isEven = (idx + 1) % 2 === 0;

  const flexClass = isEven
    ? css({ display: "flex", flexDirection: { base: "column-reverse", md: "row-reverse" }, gap: "8" })
    : css({ display: "flex", flexDirection: { base: "column", md: "row" }, gap: "8" });

  return (
    <div className={flexClass}>
      <div style={{ flex: "0.5" }}>
        <div className={stack({ align: "flex-start", gap: "4", h: "full" })}>
          <div className={cx(paletteCva({ palette: palette as PaletteCvaKey }), tagStyles.root)}>
            <span className={tagStyles.label}>{skill.tag}</span>
          </div>
          <SectionHeader headline={skill.title} description={skill.description} />
          <div className={stack({ align: "flex-start", gap: "2", px: { base: "2", md: "4" } })}>
            {skill.features.map((feature, index) => (
              <div key={index} className={hstack({})}>
                <DeferredIcon icon={FiCheckCircle} color={"fg.muted"} />
                <span className={css({ color: "fg.muted" })}>{feature}</span>
              </div>
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
            minHeight: { base: "300px", md: "360px" },
          })}
        >
          <Image
            width={180}
            height={180}
            src={skill.featureIcon}
            alt={skill.featureIconAlt}
            placeholder="blur"
            sizes="(max-width: 48em) 150px, 180px"
          />
        </div>
      </div>
    </div>
  );
};

export default MySkillItem;
