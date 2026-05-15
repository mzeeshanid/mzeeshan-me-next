import { css } from "styled-system/css";
import { flex, stack } from "styled-system/patterns";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import mySkillsData from "@/data/home/mySkillsData";
import React from "react";
import MySkillItem from "./MySkillItem";

const MySkills: React.FC = () => {
  const { tagline, title, description, skills } = mySkillsData();

  return (
    <section>
      <div className={flex({ justify: "center" })}>
        <SectionHeader
          textAlign="center"
          tagline={tagline}
          headline={title}
          description={description}
        />
      </div>
      <div className={css({ p: "4" })} />
      <div className={stack({ gap: "8" })}>
        {skills.map((skill, index) => (
          <MySkillItem key={index} idx={index} skill={skill} />
        ))}
      </div>
    </section>
  );
};

export default MySkills;
