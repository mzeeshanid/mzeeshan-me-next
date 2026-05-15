import { Collapsible } from "@ark-ui/react/collapsible";
import { Popover } from "@ark-ui/react/popover";
import { css, cx } from "styled-system/css";
import { hstack, stack } from "styled-system/patterns";
import { button, popover } from "styled-system/recipes";
import NextLink from "next/link";
import { useState } from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";
import DeferredIcon from "@/components/DeferredIcon/DeferredIcon";
import { LuMoon, LuSun } from "react-icons/lu";
import {
  paletteCva,
  useColorPalette,
  type PaletteCvaKey,
} from "../../contexts/useColorPalette";
import navBarData from "../../data/navBar/navBarData";
import { useColorMode } from "../ui/color-mode";
import { useMounted } from "../../hooks/useMounted";
import NavBarThemePopOverContent from "./NavBarThemePopOverContent";

type NavBarMobileMenuContentProps = {
  open: boolean;
  onToggle: () => void;
};

const popoverStyles = popover({ size: "md" });

const NavBarMobileMenuContent: React.FC<NavBarMobileMenuContentProps> = ({
  open,
}) => {
  const { mainLinks } = navBarData();
  const { palette } = useColorPalette();
  const { colorMode, toggleColorMode } = useColorMode();
  const mounted = useMounted();
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <Collapsible.Root open={open}>
      <Collapsible.Content>
        <div className={stack({ gap: "4", px: "4", pb: "4" })}>
          {mainLinks.map((linkItem, idx) => (
            <div key={idx}>
              <div className={hstack({ px: "4" })}>
                {linkItem.icon && <linkItem.icon size={16} />}
                <NextLink
                  href={linkItem.url}
                  aria-label={`link for ${linkItem.label} page`}
                  className={css({
                    fontSize: "lg",
                    textDecoration: "none",
                    color: "fg",
                    _hover: { color: "colorPalette.fg" },
                  })}
                >
                  {linkItem.label}
                </NextLink>
              </div>
              {idx < mainLinks.length - 1 && (
                <hr
                  className={css({
                    borderColor: "border.muted",
                    w: "full",
                    mt: "4",
                  })}
                />
              )}
            </div>
          ))}
          <hr className={css({ borderColor: "border.muted", w: "full" })} />
          <div className={hstack({ gap: "2", px: "4" })}>
            <NextLink href="/contact" className={css({ flex: "1" })}>
              <button
                className={cx(
                  paletteCva({ palette: palette as PaletteCvaKey }),
                  button({ variant: "solid", size: "sm" }),
                  css({ w: "full" }),
                )}
              >
                {"Contact Me"}
              </button>
            </NextLink>
            <Popover.Root
              open={popoverOpen}
              onOpenChange={({ open }) => setPopoverOpen(open)}
            >
              <Popover.Trigger asChild>
                <button
                  className={cx(
                    paletteCva({ palette: palette as PaletteCvaKey }),
                    button({ variant: "subtle", size: "sm" }),
                  )}
                  aria-label="adjust global color palette for site as desired"
                >
                  <DeferredIcon icon={FaWandMagicSparkles} size={"sm"} />
                </button>
              </Popover.Trigger>
              <Popover.Positioner style={{ zIndex: 1100 }}>
                <Popover.Content className={popoverStyles.content}>
                  <div className={popoverStyles.body}>
                    {popoverOpen && <NavBarThemePopOverContent />}
                  </div>
                </Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
            <button
              className={button({ variant: "subtle", size: "sm" })}
              aria-label="toggle dark light theme"
              onClick={toggleColorMode}
            >
              {mounted &&
                (colorMode === "dark" ? (
                  <DeferredIcon icon={LuMoon} size={"sm"} />
                ) : (
                  <DeferredIcon icon={LuSun} size={"sm"} />
                ))}
            </button>
          </div>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default NavBarMobileMenuContent;
