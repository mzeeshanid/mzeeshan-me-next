import { useColorPalette } from "@/contexts/useColorPalette";
import myFrameworks from "@/data/home/myFrameworksData";
import { Box, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import React from "react";
import MyFrameworkItem from "./MyFrameworkItem";
import { TypewriterHighlight } from "@/components/TypewriterHighlight/TypewriterHighlight";

type MyFrameworksProps = {};

const MyFrameworks: React.FC<MyFrameworksProps> = (
  props: MyFrameworksProps,
) => {
  const { palette } = useColorPalette();
  const {
    tagline,
    typeWriterPre,
    typeWriterWords,
    typeWriterPost,
    detail,
    frameworks,
  } = myFrameworks();
  return (
    <Box as={"section"}>
      <Stack gap={{ base: 6, md: 8 }} align={"center"}>
        <Stack gap={{ base: 4, md: 5 }}>
          <Stack gap={{ base: 2, md: 3 }}>
            <Text
              textStyle={{ base: "sm", md: "md" }}
              fontWeight="medium"
              color={`${palette}.solid`}
              textAlign={"center"}
            >
              {tagline}
            </Text>
            <Heading
              as="h2"
              fontWeight={"medium"}
              fontSize={{ base: "2xl", md: "3xl", lg: "5xl" }}
              textAlign={"center"}
              lineHeight={"shorter"}
            >
              {typeWriterPre}
              <TypewriterHighlight
                words={typeWriterWords}
                highlightStyles={{
                  px: "0.5",
                  bg: `${palette}.subtle`,
                  color: `${palette}.fg`,
                  fontWeight: "bold",
                  fontSize: { base: "2xl", md: "3xl", lg: "5xl" },
                }}
              />
              {typeWriterPost}
            </Heading>
          </Stack>
          <Text
            color="fg.muted"
            textStyle={{ base: "md", md: "lg" }}
            maxW="3xl"
            textAlign={"center"}
          >
            {detail}
          </Text>
        </Stack>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
          {frameworks.map((framework, idx) => (
            <MyFrameworkItem
              key={idx}
              title={framework.title}
              description={framework.detail}
              icon={framework.icon}
              link={framework.link}
            />
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default MyFrameworks;
