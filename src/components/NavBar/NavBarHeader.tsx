import { css } from "styled-system/css";
import { hstack, stack } from "styled-system/patterns";
import Image from "next/image";
import type { StaticImageData } from "next/image";

export type NavBarHeaderProps = {
  title: string;
  subtitle: string;
  icon: StaticImageData;
  alt: string;
  rounded?: boolean;
};

const NavBarHeader: React.FC<NavBarHeaderProps> = (props) => {
  return (
    <div className={hstack({ gap: "4", justify: { base: "center", md: "flex-start" } })}>
      <div className={css({
        w: "60px",
        h: "60px",
        flexShrink: 0,
        borderRadius: props.rounded ? "full" : "md",
        overflow: "hidden",
      })}>
        <Image
          width={60}
          height={60}
          src={props.icon}
          alt={props.alt}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          placeholder="blur"
          priority
          sizes="60px"
        />
      </div>
      <div className={stack({ direction: "column", align: "flex-start", gap: "0" })}>
        <p className={css({ fontWeight: "bold", fontSize: "lg" })}>{props.title}</p>
        <p className={css({ color: "fg.muted" })}>{props.subtitle}</p>
      </div>
    </div>
  );
};

export default NavBarHeader;
