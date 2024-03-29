import { Box, SimpleGrid, VStack, theme } from "@chakra-ui/react";
import React from "react";
import AppHeadingText from "../AppHeadingText";
import AppIconFeature from "../AppIconFeature";

function SampleFileFeatured({ items }) {
  return (
    <VStack justify={"center"} align={"center"} p={4} bg={theme.colors.white}>
      <Box p={2}>
        <AppHeadingText
          heading={"Categories"}
          text={"Choose your desired category"}
          bg={"white"}
          headingColor={theme.colors.black}
        />
      </Box>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        justify={"center"}
        align={"center"}
      >
        {items.map((item, idx) => {
          return <AppIconFeature key={idx} item={item} />;
        })}
      </SimpleGrid>
    </VStack>
  );
}

export default SampleFileFeatured;
