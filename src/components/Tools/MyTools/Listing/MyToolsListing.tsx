import { myToolsData } from "@/data/home/myToolsData";
import { Box, GridItem, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React from "react";
import MyToolListingItem from "./MyToolListingItem";

type Props = {
  keyword?: string;
};

const MyToolsListing: React.FC<Props> = (props: Props) => {
  const myTools = myToolsData;

  const filteredTools = React.useMemo(() => {
    if (!props.keyword || props.keyword.trim() === "") {
      return myTools.tools;
    }

    const lowerKeyword = props.keyword.toLowerCase();
    return myTools.tools.filter((tool) => {
      return (
        tool.title.toLowerCase().includes(lowerKeyword) ||
        tool.detail.toLowerCase().includes(lowerKeyword)
      );
    });
  }, [props.keyword]);

  if (filteredTools.length === 0) {
    return (
      <Box as={"section"}>
        <VStack py={8} gap={4} align={"center"}>
          <Text fontSize="2xl" fontWeight="medium">
            {"No tools found"}
          </Text>
          <Text fontSize="sm" color="fg.muted">
            {"Try searching with different keywords"}
          </Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box as={"section"}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
        {filteredTools.map((tool, index) => (
          <GridItem key={index} w={"full"} h="full">
            <MyToolListingItem tool={tool} />
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default MyToolsListing;
