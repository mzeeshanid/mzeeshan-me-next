import { css } from "styled-system/css";
import { hstack, stack } from "styled-system/patterns";
import NextLink from "next/link";
import DeferredIcon from "@/components/DeferredIcon/DeferredIcon";
import footerData from "../../data/footer/footerData";

const FooterMainLinks = () => {
  const { mainLinks } = footerData();

  return (
    <div className={stack({
      direction: { base: "column", lg: "row" },
      gap: { base: "2", md: "4", lg: "6" },
      justify: "center",
      align: "center",
      flexWrap: "wrap",
    })}>
      {mainLinks.map((linkItem, idx) => (
        <NextLink
          key={idx}
          href={linkItem.url}
          aria-label={`bottom bar link ${linkItem.label}`}
          className={css({ fontSize: "lg", textDecoration: "none", color: "fg", _hover: { color: "colorPalette.fg" } })}
        >
          <div className={hstack({ gap: "2" })}>
            {linkItem.icon && <DeferredIcon icon={linkItem.icon} />}
            {linkItem.label}
          </div>
        </NextLink>
      ))}
    </div>
  );
};

export default FooterMainLinks;
