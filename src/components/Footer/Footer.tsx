import { css } from "styled-system/css";
import { container, flex, vstack } from "styled-system/patterns";

import MyIntro from "../MyIntro/MyIntro";
import FooterContactMe from "./FooterContactMe";
import FooterMainLinks from "./FooterMainLinks";
import FooterSocialLinks from "./FooterSocialLinks";
import FooterTermsRights from "./FooterTermsRights";

function Footer() {
  return (
    <footer>
      <div className={vstack({ w: "full", gap: "4" })}>
        <div className={container({ w: "full", maxW: "6xl", px: "4" })}>
          <FooterContactMe />
        </div>
        <div className={container({ w: "full", maxW: "8xl", px: "4" })}>
          <div className={vstack({ gap: "4" })}>
            <div
              className={flex({
                direction: { base: "column", lg: "row" },
                justify: "space-between",
                align: "center",
                w: "full",
                px: "4",
                my: "4",
                gap: "4",
              })}
            >
              <MyIntro />
              <FooterMainLinks />
              <FooterSocialLinks />
            </div>
            <hr className={css({ w: "full", borderColor: "border.muted" })} />
            <FooterTermsRights />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
