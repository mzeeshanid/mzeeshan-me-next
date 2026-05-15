import { css } from "styled-system/css";
import { container, hstack } from "styled-system/patterns";
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
  const [open, setOpen] = useState(false);
  const onToggle = () => setOpen((v) => !v);
  const [scrolled, setScrolled] = useState(false);

  const scrolledBg = useColorModeValue(
    "rgba(250, 250, 250, 0.5)",
    "rgba(17, 17, 17, 0.5)",
  );
  const scrolledBorderColor = useColorModeValue(
    "rgba(148, 163, 184, 0.22)",
    "rgba(148, 163, 184, 0.18)",
  );

  useEffect(() => {
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 10);
        rafId = null;
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <header
      className={css({
        position: "sticky",
        top: 0,
        zIndex: 1000,
        px: { base: 0, md: 2 },
        borderBottomWidth: 1,
      })}
      style={{
        background: scrolled ? scrolledBg : "transparent",
        borderColor: scrolled ? scrolledBorderColor : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        transition: "background 0.2s, backdrop-filter 0.2s, border-color 0.2s",
      }}
    >
      <div className={container({ maxW: "8xl" })}>
        <div className={hstack({ justify: "space-between", py: "4" })}>
          {props.header ? <NavBarHeader {...props.header} /> : <MyIntro />}
          <div className={css({ display: { base: "block", lg: "none" } })}>
            <NavBarMobileMenu open={open} onToggle={onToggle} />
          </div>
          <div className={css({ display: { base: "none", lg: "block" } })}>
            <NavBarNormalMenu />
          </div>
        </div>
        <div className={css({ display: { base: "block", lg: "none" } })}>
          <NavBarMobileMenuContent open={open} onToggle={onToggle} />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
