import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { aspectRatioInstructions } from "@/data/tools/aspectRatio/aspectRatioInstructionsData";
import { Box, Center, List, Spacer, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

type Props = {};

const AspectRatioInstructions: React.FC<Props> = (props: Props) => {
  const instructions = aspectRatioInstructions;
  return (
    <Box as="section">
      <SectionHeader
        tagline={instructions.header.badge}
        headline={instructions.header.title}
        description={instructions.header.desc}
      />
      <Spacer p={4} />
      <Stack direction={{ base: "column-reverse", md: "row" }} gap={4}>
        <Box w="full" alignContent={"center"}>
          <List.Root gap={8}>
            {instructions.steps.map((item, idx) => (
              <List.Item key={idx}>
                <Text fontWeight={"bold"}>{item.title}</Text>
                <Text color={"fg.muted"}>{item.desc}</Text>
              </List.Item>
            ))}
          </List.Root>
        </Box>
        <Box w="full">
          <Center bg="bg.subtle" borderRadius={"2xl"} overflow={"hidden"}>
            <Image
              src={instructions.heroImage.src}
              alt={instructions.heroImage.alt}
              placeholder="blur"
              width={instructions.heroImage.width}
              height={instructions.heroImage.height}
              style={{ width: "100%", height: "auto" }}
            />
          </Center>
        </Box>
      </Stack>
    </Box>
  );
};

export default AspectRatioInstructions;
