import React from "react";
import {
  Button,
  Center,
  Flex,
  HStack,
  Spacer,
  LightMode,
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
  theme,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import isExternalLink from "../hooks/isExternalLink";
import Image from "next/image";
import useGoToLink from "../hooks/useGoToLink";

function AppNavBar({ navItems }) {
  const gotolink = useGoToLink();

  const showMobileMenu = useBreakpointValue({
    base: true,
    lg: navItems.length > 7,
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
            <Button variant="outline" colorScheme="teal">
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
        <Wrap spacing={4}>
          {menuItems().map((item, idx) => {
            return <WrapItem key={idx}>{item}</WrapItem>;
          })}
        </Wrap>
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
            icon={<HamburgerIcon color={theme.colors.black} />}
            size="lg"
            variant="outline"
          />
          <MenuList>
            {navItems.map((item, idx) => {
              return (
                <MenuItem
                  textColor={theme.colors.black}
                  key={idx}
                  onClick={() => gotolink(item.path)}
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
    <LightMode>
      <Flex
        w="100%"
        bg={theme.colors.gray[50]}
        alignItems="center"
        justifyContent="center"
      >
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
                <Heading size="md" textColor={theme.colors.black}>
                  Muhammad Zeeshan
                </Heading>
                <Text textColor={theme.colors.black}>Yeah! it's me ;)</Text>
              </VStack>
            </HStack>
          </Link>
          <Spacer />
          {showMobileMenu ? mobileMenu() : normalMenu()}
        </Flex>
      </Flex>
    </LightMode>
  );
}

export default AppNavBar;
