import { hstack } from "styled-system/patterns";
import { button } from "styled-system/recipes";
import NextLink from "next/link";
import DeferredIcon from "@/components/DeferredIcon/DeferredIcon";
import footerData from "../../data/footer/footerData";

const FooterSocialLinks = () => {
  const { socialLinks } = footerData();

  return (
    <div className={hstack({ gap: "0", justify: { base: "center", md: "flex-end" } })}>
      {socialLinks.map(({ icon, link }, idx) => (
        <NextLink
          key={idx}
          href={link}
          aria-label={link}
          className={button({ variant: "ghost", size: "sm" })}
        >
          <DeferredIcon icon={icon} size="md" />
        </NextLink>
      ))}
    </div>
  );
};

export default FooterSocialLinks;
