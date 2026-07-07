import {
  Button,
  Collapsible,
  HStack,
  Link,
  Popover,
  Portal,
  Stack,
  StackSeparator,
} from "@chakra-ui/react";
import DeferredIcon from "@/components/DeferredIcon/DeferredIcon";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { LuMoon, LuSun } from "react-icons/lu";
import { useColorPalette } from "../../contexts/useColorPalette";
import navBarData from "../../data/navBar/navBarData";
import { useColorMode } from "../ui/color-mode";
import { useMounted } from "../../hooks/useMounted";
import NavBarThemePopOverContent from "./NavBarThemePopOverContent";

type NavBarMobileMenuContentProps = {
  open: boolean;
  onToggle: () => void;
};

const NavBarMobileMenuContent: React.FC<NavBarMobileMenuContentProps> = (
  props,
) => {
  const { open, onToggle } = props;
  const { mainLinks } = navBarData();
  const { palette } = useColorPalette();
  const { colorMode, toggleColorMode } = useColorMode();
  const mounted = useMounted();

  return (
    <Collapsible.Root open={open} onOpenChange={onToggle}>
      <Collapsible.Content>
        <Stack pl={4} pr={4} pb={4} gap={4} separator={<StackSeparator />}>
          {mainLinks.map((linkItem, idx) => (
            <HStack key={idx} pl={4} pr={4}>
              {linkItem.icon && <DeferredIcon icon={linkItem.icon} />}
              <Link
                href={linkItem.url}
                area-label={`link for ${linkItem.label} page`}
                fontSize={"lg"}
                color={"fg"}
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
            <Popover.Root lazyMount unmountOnExit>
              <Popover.Trigger asChild>
                <Button
                  size={{ base: "xs", md: "sm" }}
                  variant="subtle"
                  colorPalette={palette}
                  aria-label="adjust global color palette for site as desired"
                >
                  <DeferredIcon icon={FaWandMagicSparkles} />
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
              <DeferredIcon
                icon={mounted && colorMode === "dark" ? LuMoon : LuSun}
              />
            </Button>
          </HStack>
        </Stack>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default NavBarMobileMenuContent;
