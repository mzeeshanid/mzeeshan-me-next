import {
  Box,
  Divider,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
  Wrap,
  WrapItem,
  theme,
} from "@chakra-ui/react";
import React from "react";
import myContribution from "../data/myContribution";
import AppHeadingText from "./AppHeadingText";
import { MdCheckCircle } from "react-icons/md";
import GitHubButton from "react-next-github-btn";

function AppContribution() {
  const contributions = myContribution();
  return (
    <Box bg="white" p={8}>
      <AppHeadingText
        headingColor={theme.colors.black}
        heading="Open Source Contribution"
        bg="white"
      />
      <Box p={4} />
      <Wrap justify="center" spacing={8}>
        {contributions.map((contribution, idx) => {
          return (
            <WrapItem key={idx}>
              <VStack
                spacing={0}
                border="1px"
                rounded="xl"
                shadow="xl"
                borderColor="gray.300"
              >
                <VStack spacing={0} p={4}>
                  <Text
                    as="h2"
                    textAlign="center"
                    fontWeight="bold"
                    fontSize="xl"
                    color={theme.colors.black}
                  >
                    {contribution.title}
                  </Text>
                  <Text textAlign="center" color={theme.colors.black}>
                    {contribution.detail}
                  </Text>
                </VStack>
                <Divider />
                <Wrap
                  w="100%"
                  align="center"
                  justify="center"
                  pl={4}
                  pr={4}
                  pt={2}
                  pb={2}
                >
                  <WrapItem pt="6px">
                    <GitHubButton
                      href={contribution.link}
                      data-size="large"
                      data-show-count="true"
                      aria-label={"Star " + contribution.ariaLabel}
                    >
                      Star
                    </GitHubButton>
                  </WrapItem>
                  <WrapItem pt="6px">
                    <GitHubButton
                      href={contribution.link + "/fork"}
                      data-size="large"
                      data-show-count="true"
                      aria-label={"Fork " + contribution.ariaLabel}
                    >
                      Fork
                    </GitHubButton>
                  </WrapItem>
                  <WrapItem pt="6px">
                    <GitHubButton
                      href={contribution.link + "/archive/master.zip"}
                      data-size="large"
                      aria-label={"Download " + contribution.ariaLabel}
                    >
                      Download
                    </GitHubButton>
                  </WrapItem>
                </Wrap>
                <Divider />
                <VStack p={4} w="100%" justify="start" align="start">
                  <List>
                    {contribution.features.map((feature, idx) => {
                      return (
                        <ListItem key={idx} color={theme.colors.black}>
                          <ListIcon as={MdCheckCircle} color="teal.500" />
                          {feature}
                        </ListItem>
                      );
                    })}
                  </List>
                </VStack>
              </VStack>
            </WrapItem>
          );
        })}
      </Wrap>
    </Box>
  );
}

export default AppContribution;
