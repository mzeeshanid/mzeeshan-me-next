import React from "react";
import { IconButton } from "@chakra-ui/button";
import { DarkMode } from "@chakra-ui/color-mode";
import { Flex, Heading, HStack, Link, Text, VStack } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { Spacer } from "@chakra-ui/layout";
import { FaLinkedin, FaSkype, FaTwitter, FaAt } from "react-icons/fa";
import Icon from "@chakra-ui/icon";
import useTextBPValue from "../hooks/useTextBPValue";

function AppFooter() {
  const headingBPValue = useBreakpointValue({
    base: "lg",
    lg: "2xl",
  });

  const textBPValue = useTextBPValue();

  const flexDir = useBreakpointValue({ base: "column", sm: "row" });

  const paddingLeftRight = useBreakpointValue({
    base: 6,
    md: 8,
    lg: 12,
    xl: 16,
  });

  const socialLinks = [
    {
      link: "https://www.linkedin.com/in/muhammad-zeeshan-04b8585b/",
      araiLabel: "LinkedIn Profile",
      icon: FaLinkedin,
    },
    {
      link: "https://twitter.com/mzeeshanid",
      araiLabel: "Twitter Profile",
      icon: FaTwitter,
    },
    {
      link: "skype:mzeeshanid",
      araiLabel: "Skype Profile",
      icon: FaSkype,
    },
    // {
    //   link: "https://www.sigmatraffic.com?ref=98846",
    //   araiLabel: "Sigma Traffic",
    //   icon: FaAt,
    // },
  ];

  return (
    <DarkMode>
      <VStack spacing={0} bg="gray.700">
        <VStack spacing={0} p={4}>
          <Text fontSize={textBPValue} color="white" align="center">
            Want to get in touch? Feel free to contact me at
          </Text>
          <Link color="white" href="mailto:mzeeshanid@yahoo.com">
            <Heading color="white" size={headingBPValue}>
              mzeeshanid@yahoo.com
            </Heading>
          </Link>
        </VStack>
        <Flex width="100%" bg="gray.800" justifyContent="center">
          <Flex
            width="100%"
            maxW="1400px"
            pl={paddingLeftRight}
            pr={paddingLeftRight}
            alignItems="center"
            direction={flexDir}
          >
            <VStack pt={2} pb={2}>
              <Text color="white">Muhammad Zeeshan</Text>
            </VStack>
            <Spacer />
            <VStack pt={2} pb={2}>
              <Text color="white">Copyright © 2021</Text>
            </VStack>
            <Spacer />
            <HStack pt={4} pb={4}>
              {socialLinks.map((socialLink, idx) => {
                return (
                  <Link key={idx} isExternal={true} href={socialLink.link}>
                    <IconButton
                      aria-label={socialLink.araiLabel}
                      icon={
                        <Icon as={socialLink.icon} w={6} h={6} color="white" />
                      }
                    />
                  </Link>
                );
              })}
            </HStack>
          </Flex>
        </Flex>
      </VStack>
    </DarkMode>
  );
}

export default AppFooter;
