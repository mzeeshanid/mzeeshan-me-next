import { css } from "styled-system/css";
import { flex, grid } from "styled-system/patterns";
import myHeroData from "@/data/home/myHeroData";
import Image from "next/image";
import React from "react";

const MyHeroSkills: React.FC = () => {
  const { heroSkillsImages } = myHeroData();

  return (
    <div className={grid({ columns: 3, gap: "4", w: "full" })}>
      {heroSkillsImages.map((img, idx) => (
        <div
          key={idx}
          className={css({
            rounded: "2xl",
            bg: "bg.subtle",
            p: "4",
            transition: "transform 0.3s ease",
            _hover: { transform: "rotate(0deg) scale(1.05)" },
          })}
          style={{
            transform: `translateY(${img.yOffset ?? 0}px) rotate(${img.rotationAngle ?? 0}deg)`,
          }}
        >
          <div className={flex({ justify: "center", align: "center" })}>
            <Image
              width={img.width}
              height={img.height}
              src={img.src}
              alt={img.alt}
              placeholder="blur"
              sizes="100px"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyHeroSkills;
