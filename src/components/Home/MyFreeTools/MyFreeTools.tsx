import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import myFreeToolsData from "@/data/home/myFreeToolsData";
import {
  Box,
  Center,
  GridItem,
  Link,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import MyFreeToolItem from "./MyFreeToolItem";
import { useColorPalette } from "@/contexts/useColorPalette";

type MyFreeToolsProps = {};

const MyFreeTools = (props: MyFreeToolsProps) => {
  const { tagline, title, details, tools } = myFreeToolsData();
  const { palette } = useColorPalette();
  return (
    <Box as={"section"}>
      <VStack gap={8}>
        <SectionHeader
          tagline={tagline}
          headline={title}
          description={details}
          align={"center"}
          textAlign={"center"}
        />
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 4, md: 6 }} w="full">
          {tools.map((tool, idx) => (
            <GridItem key={idx} w="full" h={"full"}>
              <MyFreeToolItem
                title={tool.title}
                caption={tool.caption}
                detail={tool.detail}
                icon={tool.icon}
                url={tool.url}
              />
            </GridItem>
          ))}
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Center
              w="full"
              h="44px"
              textAlign={"center"}
              bg="bg.subtle"
              borderRadius={"md"}
            >
              <Link href="/tools" fontWeight={"medium"} colorPalette={palette}>
                {"View All Tools"}
              </Link>
            </Center>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default MyFreeTools;
