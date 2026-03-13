import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { useColorPalette } from "@/contexts/useColorPalette";
import { MyAppCloneDataModel } from "@/data/myApps/myAppCloneData";
import {
  Box,
  Button,
  Center,
  GridItem,
  HStack,
  Link,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { LuCheck } from "react-icons/lu";

type Props = {
  cloneData: MyAppCloneDataModel;
};

const MyAppClone: React.FC<Props> = (props: Props) => {
  const { palette } = useColorPalette();
  const { cloneData } = props;
  return (
    <Box as="section">
      <SectionHeader
        tagline={cloneData.header.badge}
        headline={cloneData.header.title}
        description={cloneData.header.desc}
      />
      <Spacer p={4} />
      <Box overflow={"hidden"} borderRadius={"lg"}>
        <SimpleGrid columns={{ base: 1, md: 5 }}>
          <GridItem colSpan={{ base: undefined, md: 3 }}>
            <Center bg={"bg.subtle"} h={"full"} p={{ base: 4, md: 8 }}>
              <VStack align={"flex-start"}>
                <Text fontWeight={"bold"} fontSize={"2xl"}>
                  {cloneData.title}
                </Text>
                <Text color={"fg.muted"}>{cloneData.description}</Text>
                <Spacer p={1} />
                <Text fontWeight="bold" fontSize="xs" color={`${palette}.fg`}>
                  {"WHAT'S INCLUDED"}
                </Text>
                <Spacer p={1} />
                <SimpleGrid columns={{ base: 1, lg: 2 }} gap={2}>
                  {cloneData.features.map((feature, index) => (
                    <GridItem key={index}>
                      <HStack gap={1}>
                        <LuCheck />
                        <Text fontSize={"sm"}>{feature}</Text>
                      </HStack>
                    </GridItem>
                  ))}
                </SimpleGrid>
              </VStack>
            </Center>
          </GridItem>
          <GridItem colSpan={{ base: undefined, md: 2 }}>
            <Center bg={"bg.muted"} h={"full"} p={{ base: 4, md: 8 }}>
              <VStack gap={4}>
                <Text fontWeight={"bold"} fontSize={"2xl"}>
                  {cloneData.pricingTitle}
                </Text>
                <Text>
                  <Text
                    as="span"
                    fontWeight={"bold"}
                    fontSize={"4xl"}
                    color={`${palette}.fg`}
                  >
                    {cloneData.price}
                  </Text>
                  <Text as="span">{` ${cloneData.currency}`}</Text>
                </Text>
                <Link variant={"underline"} href={cloneData.appStoreLink}>
                  {"Download free from AppStore"}
                </Link>
                <Link variant={"plain"} href={"/contact"}>
                  <Button colorPalette={palette}>{"Contact Me"}</Button>
                </Link>
              </VStack>
            </Center>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default MyAppClone;
