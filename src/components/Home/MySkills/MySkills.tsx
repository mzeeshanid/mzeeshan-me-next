import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import mySkillsData from "@/data/home/mySkillsData";
import { Box, Center, GridItem, SimpleGrid, Spacer } from "@chakra-ui/react";
import React from "react";
import MySkillItem from "./MySkillItem";

type MySkillsProps = {};

const MySkills: React.FC<MySkillsProps> = (props: MySkillsProps) => {
  const { tagline, title, description, skills } = mySkillsData();
  return (
    <Box as={"section"}>
      <Center>
        <SectionHeader
          textAlign={"center"}
          tagline={tagline}
          headline={title}
          description={description}
        />
      </Center>
      <Spacer p={4} />
      <SimpleGrid columns={1} gap={8}>
        {skills.map((skill, index) => (
          <GridItem key={index}>
            <MySkillItem idx={index} skill={skill} />
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default MySkills;
