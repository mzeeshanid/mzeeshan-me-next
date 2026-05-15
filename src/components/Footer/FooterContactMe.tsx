import { cx } from "styled-system/css";
import { vstack } from "styled-system/patterns";
import { button } from "styled-system/recipes";
import Image from "next/image";
import NextLink from "next/link";
import profilePic from "public/assets/profile_pic.jpeg";
import {
  paletteCva,
  useColorPalette,
  type PaletteCvaKey,
} from "../../contexts/useColorPalette";

const FooterContactMe = () => {
  const { palette } = useColorPalette();

  return (
    <div
      className={vstack({
        bg: "bg.subtle",
        w: "full",
        pt: "12",
        pb: "12",
        gap: "4",
        rounded: "sm",
        borderWidth: "1px",
        textAlign: "center",
        alignItems: "center",
      })}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Image
          width={80}
          height={80}
          src={profilePic}
          alt="Logo"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          placeholder="blur"
          sizes="80px"
        />
      </div>
      <h3 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        {"Have any questions?"}
      </h3>
      <p style={{ color: "var(--colors-fg-muted)" }}>
        {"Feel free to reach out! I am happy to answer your questions."}
      </p>
      <NextLink
        href="/contact"
        className={cx(
          paletteCva({ palette: palette as PaletteCvaKey }),
          button({ variant: "solid", size: "lg" }),
        )}
      >
        {"Contact Me"}
      </NextLink>
    </div>
  );
};

export default FooterContactMe;
