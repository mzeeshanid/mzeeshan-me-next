import {
  Box,
  Center,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  theme,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import g2dAppIcon from "../../../public/assets/g2d_app_icon.png";
import AppHeadingText from "../AppHeadingText";
import gDrive2DirectNotes from "../../data/gDrive2DirectNotes";
import GDrive2DirectSingleLinkForm from "./GDrive2DirectSingleLinkForm";
import GDrive2DirectMultiLinkForm from "./GDrive2DirectMultiLinkForm";
import { MdCheckCircle } from "react-icons/md";

function G2DHero() {
  const paddingBPValue = useBreakpointValue({
    base: 2,
    md: 4,
    lg: 8,
  });

  const spacingBPValue = useBreakpointValue({
    base: 1,
    md: 2,
    lg: 4,
  });

  const appIconImageBPValue = useBreakpointValue({
    base: 75,
    md: 90,
    lg: 120,
  });

  const textBPValue = useBreakpointValue({
    base: "lg",
    lg: "xl",
  });

  const headingBPValue = useBreakpointValue({
    base: "xl",
    lg: "2xl",
  });

  const padding = useBreakpointValue({ base: 4, md: 6, lg: 8 });

  const notes = gDrive2DirectNotes();

  return (
    <VStack>
      <Center w="100%" bg={theme.colors.gray[50]}>
        <Box maxW={1200} py={paddingBPValue}>
          <VStack spacing={spacingBPValue}>
            <Image
              src={g2dAppIcon}
              placeholder={"blur"}
              alt="Google Drive Direct Link Generator"
              width={appIconImageBPValue}
              height={appIconImageBPValue}
            />
            <VStack>
              <Text
                color={theme.colors.gray[500]}
                as={"b"}
                fontSize={textBPValue}
                textAlign="center"
              >
                G2D
              </Text>
              <Text
                color={theme.colors.gray[500]}
                fontSize={textBPValue}
                textAlign="center"
              >
                Download It!
              </Text>
            </VStack>
            <VStack>
              <Heading size={headingBPValue} textAlign="center">
                Google Drive Direct Link Generator
              </Heading>
              <Text as={"h2"} fontSize={textBPValue} textAlign="center">
                This tool allows you to quickly convert your Google Drive
                shareable link into direct link. Direct link will immediately
                start downloading file, rather than opening a preview page.
              </Text>
            </VStack>
          </VStack>
        </Box>
      </Center>
      <Center width={"100%"}>
        <Box width={"100%"} align="center" bg={theme.colors.white}>
          <Flex
            w="100%"
            pl={padding}
            pt={padding}
            pr={padding}
            direction={{ base: "column", md: "row" }}
            justify="space-around"
            maxW="1200px"
          >
            <Tabs
              w="100%"
              color={theme.colors.black}
              colorScheme="teal"
              variant="enclosed"
              borderColor={theme.colors.gray[300]}
            >
              <TabList>
                <Tab>Single</Tab>
                <Tab>Multiple</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <GDrive2DirectSingleLinkForm />
                </TabPanel>
                <TabPanel>
                  <GDrive2DirectMultiLinkForm />
                </TabPanel>
              </TabPanels>
            </Tabs>
            <Box p={4}></Box>
            <VStack>
              <VStack
                maxW="350px"
                minW={{ base: "300px", md: "350px" }}
                border="1px"
                rounded="xl"
                shadow="lg"
                borderColor="gray.300"
                p={6}
              >
                <AppHeadingText heading="Notes" bg={theme.colors.white} />
                <List spacing={6} align="start">
                  {notes.map((item, idx) => (
                    <ListItem key={idx}>
                      <ListIcon as={MdCheckCircle} color="teal" />
                      {item}
                    </ListItem>
                  ))}
                </List>
              </VStack>
            </VStack>
          </Flex>
        </Box>
      </Center>
    </VStack>
  );
}

export default G2DHero;
