import { Popover } from "@ark-ui/react/popover";
import { css, cx } from "styled-system/css";
import { flex, hstack } from "styled-system/patterns";
import { button, popover } from "styled-system/recipes";
import NextLink from "next/link";
import { useState } from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";
import {
  paletteCva,
  useColorPalette,
  type PaletteCvaKey,
} from "../../contexts/useColorPalette";
import navBarData from "../../data/navBar/navBarData";
import NavBarThemePopOverContent from "./NavBarThemePopOverContent";
import DeferredIcon from "../DeferredIcon/DeferredIcon";

const popoverStyles = popover({ size: "md" });

const NavBarNormalMenu: React.FC = () => {
  const { palette } = useColorPalette();
  const { mainLinks } = navBarData();
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <div className={flex({ align: "center", gap: "4" })}>
      <div className={hstack({ gap: "4" })}>
        {mainLinks.map((linkItem, idx) => (
          <NextLink
            key={idx}
            href={linkItem.url}
            aria-label={`link for ${linkItem.label} page`}
            className={css({
              fontSize: "lg",
              textDecoration: "none",
              color: "fg",
              _hover: { color: "colorPalette.fg" },
            })}
          >
            <span
              className={css({
                display: "flex",
                alignItems: "center",
                gap: "2",
              })}
            >
              {linkItem.icon && <linkItem.icon size={16} />}
              {linkItem.label}
            </span>
          </NextLink>
        ))}
      </div>
      <div className={hstack({ gap: "4" })}>
        <hr
          className={css({
            borderLeft: "1px solid",
            borderColor: "border.muted",
            h: "6",
            alignSelf: "center",
          })}
        />
        <NextLink
          href="/contact"
          aria-label="link for contact me page"
          className={cx(
            paletteCva({ palette: palette as PaletteCvaKey }),
            button({ variant: "solid", size: "sm" }),
          )}
        >
          {"Contact Me"}
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
      </div>
    </div>
  );
};

export default NavBarNormalMenu;
