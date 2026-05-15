import { css } from "styled-system/css";
import { grid, hstack, stack } from "styled-system/patterns";
import { button } from "styled-system/recipes";
import { LuMoon, LuSun } from "react-icons/lu";
import { useColorPalette } from "../../contexts/useColorPalette";
import navBarData from "../../data/navBar/navBarData";
import { useColorMode } from "../ui/color-mode";
import { useMounted } from "@/hooks/useMounted";
import DeferredIcon from "../DeferredIcon/DeferredIcon";

const NavBarThemePopOverContent: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { themeColors } = navBarData();
  const { palette, setPalette } = useColorPalette();
  const mounted = useMounted();

  return (
    <div className={stack({ gap: "3" })}>
      <div className={hstack({ justify: "space-between" })}>
        <p className={css({ fontWeight: "medium" })}>{"Theme Panel"}</p>
        <button
          className={button({ variant: "ghost", size: "sm" })}
          aria-label="toggle dark light theme"
          onClick={toggleColorMode}
        >
          {mounted &&
            (colorMode === "light" ? (
              <DeferredIcon icon={LuSun} size={"sm"} />
            ) : (
              <DeferredIcon icon={LuMoon} size={"sm"} />
            ))}
        </button>
      </div>
      <div className={stack({ gap: "2" })}>
        <p className={css({ fontSize: "sm", color: "fg.muted" })}>
          {"Accent Color"}
        </p>
        <div className={grid({ columns: 3, gap: "2" })}>
          {themeColors.map((color, idx) => (
            <button
              key={idx}
              aria-label={`set theme color to ${color.name}`}
              className={css({
                display: "flex",
                alignItems: "center",
                gap: "1.5",
                border: "1px solid",
                borderRadius: "md",
                p: "2",
                bg: "transparent",
                cursor: "pointer",
                transition: "border-color 0.15s",
              })}
              style={{
                borderColor:
                  palette === color.key
                    ? `var(--colors-${color.key}-solid)`
                    : "var(--colors-border-muted)",
              }}
              onClick={() => setPalette(color.key)}
            >
              <span
                className={css({ borderRadius: "full", flexShrink: 0 })}
                style={{
                  width: 16,
                  height: 16,
                  background: `var(--colors-${color.key}-solid)`,
                }}
              />
              <span className={css({ fontSize: "xs" })}>{color.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavBarThemePopOverContent;
