import {
  Button,
  Collapsible,
  HStack,
  Icon,
  Link,
  Popover,
  Portal,
  Stack,
  StackSeparator,
} from "@chakra-ui/react";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { LuMoon, LuSun } from "react-icons/lu";
import { useColorPalette } from "../../contexts/useColorPalette";
import navBarData from "../../data/navBar/navBarData";
import { useColorMode } from "../ui/color-mode";
import NavBarThemePopOverContent from "./NavBarThemePopOverContent";

type NavBarMobileMenuContentProps = {
  open: boolean;
  onToggle: () => void;
};

const NavBarMobileMenuContent: React.FC<NavBarMobileMenuContentProps> = (
  props
) => {
  const { open, onToggle } = props;
  const { mainLinks } = navBarData();
  const { palette } = useColorPalette();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Collapsible.Root open={open} onOpenChange={onToggle}>
      <Collapsible.Content>
        <Stack pl={4} pr={4} pb={4} gap={4} separator={<StackSeparator />}>
          {mainLinks.map((linkItem, idx) => (
            <HStack key={idx} pl={4} pr={4}>
              <Icon as={linkItem.icon} />
              <Link
                href={linkItem.url}
                area-label={`link for ${linkItem.label} page`}
                fontSize={"lg"}
              >
                {linkItem.label}
              </Link>
            </HStack>
          ))}
          <HStack gap={2} pl={4} pr={4} separator={<StackSeparator />}>
            <Link
              w="full"
              href="/contact"
              area-label="link for contact me page"
            >
              <Button
                w="full"
                as={"span"}
                variant={"solid"}
                size={{ base: "xs", md: "sm" }}
                colorPalette={palette}
              >
                {"Contact Me"}
              </Button>
            </Link>
            <Popover.Root>
              <Popover.Trigger asChild>
                <Button
                  size={{ base: "xs", md: "sm" }}
                  variant="subtle"
                  colorPalette={palette}
                  aria-label="adjust global color palette for site as desired"
                >
                  <Icon as={FaWandMagicSparkles} />
                </Button>
              </Popover.Trigger>
              <Portal>
                <Popover.Positioner>
                  <Popover.Content>
                    <Popover.Arrow />
                    <Popover.Body>
                      <NavBarThemePopOverContent />
                    </Popover.Body>
                  </Popover.Content>
                </Popover.Positioner>
              </Portal>
            </Popover.Root>
            <Button
              variant="subtle"
              aria-label="toggle dark light theme"
              size={{ base: "xs", md: "sm" }}
              onClick={toggleColorMode}
            >
              <Icon as={colorMode === "light" ? LuSun : LuMoon} />
            </Button>
          </HStack>
        </Stack>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default NavBarMobileMenuContent;
