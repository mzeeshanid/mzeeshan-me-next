import { Box, Container, HStack, useDisclosure } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import MyIntro from "../MyIntro/MyIntro";
import NavBarMobileMenu from "./NavBarMobileMenu";
import NavBarMobileMenuContent from "./NavBarMobileMenuContent";
import NavBarNormalMenu from "./NavBarNormalMenu";
import NavBarHeader, { NavBarHeaderProps } from "./NavBarHeader";

type NavBarProps = {
  header?: NavBarHeaderProps;
};

const NavBar: React.FC<NavBarProps> = (props) => {
  const { open, onToggle } = useDisclosure();
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBarBgColor = scrolled ? "bg.subtle" : "transparent";

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={1000}
      transition="background 0.2s"
      bg={navBarBgColor}
      pl={{ base: 0, md: 2 }}
      pr={{ base: 0, md: 2 }}
      borderBottomWidth={1}
    >
      <Container maxW={"8xl"}>
        <HStack justify="space-between" align="center" py={4}>
          {props.header ? <NavBarHeader {...props.header} /> : <MyIntro />}
          <Box display={{ base: "block", lg: "none" }}>
            <NavBarMobileMenu open={open} onToggle={onToggle} />
          </Box>
          <Box display={{ base: "none", lg: "block" }}>
            <NavBarNormalMenu />
          </Box>
        </HStack>
        <Box display={{ base: "block", lg: "none" }}>
          <NavBarMobileMenuContent open={open} onToggle={onToggle} />
        </Box>
      </Container>
    </Box>
  );
};

export default NavBar;
