import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { useColorPalette } from "@/contexts/useColorPalette";
import { MySkillData } from "@/data/home/mySkillsData";
import { FiCheckCircle } from "react-icons/fi";

import {
  Center,
  GridItem,
  HStack,
  Icon,
  SimpleGrid,
  Tag,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

type MySkillItemProps = {
  idx: number;
  skill: MySkillData;
};

const MySkillItem: React.FC<MySkillItemProps> = (props: MySkillItemProps) => {
  const { palette } = useColorPalette();
  const { idx, skill } = props;
  const featureIconSize = useBreakpointValue({ base: 150, md: 180 }) ?? 150;

  const isEven = (idx + 1) % 2 === 0;
  const flexDirection = useBreakpointValue({
    base: isEven ? "column-reverse" : "column",
    md: isEven ? "row-reverse" : "row",
  });

  return (
    <SimpleGrid
      key={idx}
      gap={8}
      display={"flex"}
      flexDirection={flexDirection}
    >
      <GridItem flex={0.5}>
        <VStack align={"flex-start"} gap={4} h="full">
          <Tag.Root size="lg" colorPalette={palette} variant={"surface"}>
            <Tag.Label>{skill.tag}</Tag.Label>
          </Tag.Root>
          <SectionHeader
            headline={skill.title}
            description={skill.description}
          />
          <VStack align={"flex-start"} gap={2} px={{ base: 2, md: 4 }}>
            {skill.features.map((feature, index) => (
              <HStack key={index}>
                <Icon as={FiCheckCircle} color={"fg.muted"} />
                <Text whiteSpace="nowrap" color={"fg.muted"}>
                  {feature}
                </Text>
              </HStack>
            ))}
          </VStack>
        </VStack>
      </GridItem>
      <GridItem flex={0.5}>
        <Center
          w={"full"}
          h={"full"}
          bg={"bg.muted"}
          rounded={{ base: "xl", md: "2xl" }}
          p={4}
          minHeight={featureIconSize * 2}
        >
          <Image
            width={featureIconSize}
            height={featureIconSize}
            src={skill.featureIcon}
            blurDataURL={skill.featureIcon}
            alt={skill.featureIconAlt}
          />
        </Center>
      </GridItem>
    </SimpleGrid>
  );
};

export default MySkillItem;
