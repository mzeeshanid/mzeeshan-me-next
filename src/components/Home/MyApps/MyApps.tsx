import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import myAppsData from "@/data/home/myAppsData";
import {
  Box,
  Center,
  GridItem,
  Link,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import MyAppItem from "./MyAppItem";
import { useColorPalette } from "@/contexts/useColorPalette";

type MyAppsProps = {};

const MyApps = (props: MyAppsProps) => {
  const { tagline, title, details, apps } = myAppsData();
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
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 4, md: 6 }}>
          {apps.map((app, idx) => (
            <GridItem key={idx} w="full" h={"full"}>
              <MyAppItem
                title={app.title}
                caption={app.caption}
                detail={app.detail}
                icon={app.icon}
                url={app.url}
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
              <Link href="/apps" fontWeight={"medium"} colorPalette={palette}>
                {"View All Apps"}
              </Link>
            </Center>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default MyApps;
