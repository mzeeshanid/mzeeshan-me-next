import myHeroData from "@/data/home/myHeroData";
import { Center, GridItem, SimpleGrid } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

type MyHeroSkillsProps = {};

const MyHeroSkills: React.FC<MyHeroSkillsProps> = (
  props: MyHeroSkillsProps
) => {
  const { heroSkillsImages } = myHeroData();

  return (
    <SimpleGrid columns={3} gap={4} w="full">
      {heroSkillsImages.map((img, idx) => {
        return (
          <GridItem
            key={idx}
            rounded={"2xl"}
            bg="bg.subtle"
            p={4}
            transform={`translateY(${img.yOffset ?? 0}px) rotate(${img.rotationAngle ?? 0}deg)`}
            transition="transform 0.3s ease"
            _hover={{ transform: `rotate(0deg) scale(1.05)` }}
          >
            <Center>
              <Image
                width={img.width}
                height={img.height}
                src={img.src}
                alt={img.alt}
                placeholder="blur"
              />
            </Center>
          </GridItem>
        );
      })}
    </SimpleGrid>
  );
};

export default MyHeroSkills;
