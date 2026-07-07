import {
  Button,
  Flex,
  HStack,
  Link,
  Popover,
  Portal,
  StackSeparator,
} from "@chakra-ui/react";

import { FaWandMagicSparkles } from "react-icons/fa6";
import DeferredIcon from "@/components/DeferredIcon/DeferredIcon";
import { useColorPalette } from "../../contexts/useColorPalette";

import navBarData from "../../data/navBar/navBarData";
import NavBarThemePopOverContent from "./NavBarThemePopOverContent";

type NavBarNormalMenuProps = {};

const NavBarNormalMenu: React.FC<NavBarNormalMenuProps> = (props) => {
  const { palette } = useColorPalette();
  const { mainLinks } = navBarData();

  return (
    <Flex gap={4}>
      <HStack gap={4} aria-label="horizontal stack displaying main links">
        {mainLinks.map((linkItem, idx) => (
          <Link
            key={idx}
            href={linkItem.url}
            area-label={`link for ${linkItem.label} page`}
            fontSize={"lg"}
            color={"fg"}
          >
            <HStack gap={2}>
              {linkItem.icon && <DeferredIcon icon={linkItem.icon} />}
              {linkItem.label}
            </HStack>
          </Link>
        ))}
      </HStack>
      <HStack gap={4} separator={<StackSeparator />}>
        <Link href="/contact" area-label="link for contact me page">
          <Button
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
      </HStack>
    </Flex>
  );
};

export default NavBarNormalMenu;
