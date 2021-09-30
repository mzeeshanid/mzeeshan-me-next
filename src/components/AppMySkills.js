import Image from "next/image";
import {
  GridItem,
  List,
  ListItem,
  SimpleGrid,
  VStack,
  theme,
} from "@chakra-ui/react";
import React from "react";
import mySkills from "../data/mySkills";
import useTextBPValue from "../hooks/useTextBPValue";
import AppHeadingText from "./AppHeadingText";

function AppMySkills() {
  const skills = mySkills();
  const textBPValue = useTextBPValue();
  return (
    <VStack bg="gray.100">
      <AppHeadingText
        headingColor={theme.colors.black}
        heading="My Skills"
        bg="transparent"
      />
      <SimpleGrid columns={{ sm: 1, md: 2 }} p={3} w="100%" spacing={3}>
        {skills.map((skill, idx) => {
          return (
            <GridItem
              key={idx}
              p={8}
              bg="gray.200"
              justify="center"
              align="center"
            >
              <AppHeadingText
                headingColor={theme.colors.black}
                heading={skill.heading}
                bg="transparent"
              />
              <List p={2} color={theme.colors.black}>
                {skill.data.map((skill, idx) => {
                  return (
                    <ListItem key={idx} fontSize={textBPValue}>
                      {skill}
                    </ListItem>
                  );
                })}
              </List>
              <Image
                width="150px"
                height="150px"
                src={skill.image}
                placeholder={"blur"}
                alt={skill.alt}
              />
            </GridItem>
          );
        })}
      </SimpleGrid>
    </VStack>
  );
}

export default AppMySkills;
