import React from "react";
import {
  Button,
  Center,
  Flex,
  Grid,
  HStack,
  Spacer,
  DarkMode,
  VStack,
  Heading,
  Text,
  Link,
  IconButton,
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  LinkBox,
  LinkOverlay,
  Circle,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import isExternalLink from "../hooks/isExternalLink";
import Image from "next/image";

function AppNavBar({ navItems }) {
  const showMobileMenu = useBreakpointValue({
    base: true,
    md: navItems.length > 5,
  });

  const paddingLeftRight = useBreakpointValue({
    base: 6,
    md: 8,
    lg: 12,
    xl: 16,
  });

  const menuItems = () => {
    return navItems.map((item, idx) => {
      const isExternal = isExternalLink(item.path);
      return (
        <LinkBox key={idx}>
          <LinkOverlay href={item.path} isExternal={isExternal} color="teal">
            <Button variant="ghost" colorScheme="teal">
              {item.title}
            </Button>
          </LinkOverlay>
        </LinkBox>
      );
    });
  };

  const normalMenu = () => {
    return (
      <Center p={4}>
        <Grid
          templateColumns={`repeat(${
            navItems.length > 6 ? 6 : navItems.length
          }, 1fr)`}
          gap={4}
        >
          {menuItems()}
        </Grid>
      </Center>
    );
  };

  const mobileMenu = () => {
    return (
      <Center p={4}>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Nav menu"
            icon={<HamburgerIcon />}
            size="lg"
            variant="outline"
          />
          <MenuList>
            {navItems.map((item, idx) => {
              return (
                <MenuItem
                  textColor="white"
                  key={idx}
                  onClick={() => gotoLink(item.path)}
                >
                  {item.title}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      </Center>
    );
  };

  return (
    <DarkMode>
      <Flex w="100%" bg="gray.700" alignItems="center" justifyContent="center">
        <Flex w="100%" maxW="1400px">
          <Link href="/">
            <HStack pl={paddingLeftRight} pr={paddingLeftRight} pt={4} pb={4}>
              <Circle mx={4} size="60px" overflow="hidden">
                <Image
                  src="/assets/profile_pic.jpeg"
                  alt="Profile picture"
                  width="60px"
                  height="60px"
                />
              </Circle>
              <VStack alignItems="flex-start" spacing={0}>
                <Heading size="md" textColor="white">
                  Muhammad Zeeshan
                </Heading>
                <Text textColor="white">Yeah! it's me ;)</Text>
              </VStack>
            </HStack>
          </Link>
          <Spacer />
          {showMobileMenu ? mobileMenu() : normalMenu()}
        </Flex>
      </Flex>
    </DarkMode>
  );
}

export default AppNavBar;
