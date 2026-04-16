import { Box, Container, HStack, useDisclosure } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

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
  const scrolledBg = useColorModeValue(
    "rgba(250, 250, 250, 0.5)",
    "rgba(17, 17, 17, 0.5)",
  );
  const scrolledBorderColor = useColorModeValue(
    "rgba(148, 163, 184, 0.22)",
    "rgba(148, 163, 184, 0.18)",
  );

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBarBgColor = scrolled ? scrolledBg : "transparent";

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={1000}
      pl={{ base: 0, md: 2 }}
      pr={{ base: 0, md: 2 }}
      borderBottomWidth={1}
      style={{
        background: navBarBgColor,
        borderColor: scrolled ? scrolledBorderColor : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        transition: "background 0.2s, backdrop-filter 0.2s, border-color 0.2s",
      }}
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
