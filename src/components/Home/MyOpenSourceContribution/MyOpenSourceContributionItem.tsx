import { css, cx } from "styled-system/css";
import { flex, hstack, stack } from "styled-system/patterns";
import { card } from "styled-system/recipes";
import { paletteCva, useColorPalette, type PaletteCvaKey } from "@/contexts/useColorPalette";
import { MyContributionData } from "@/data/home/myContributionData";
import DeferredIcon from "@/components/DeferredIcon/DeferredIcon";
import { FaGithub } from "react-icons/fa6";
import { FiCheckCircle } from "react-icons/fi";
import { GithubInfoButton } from "./GithubInfoButton";

type OpenSourceContributionItemProps = {
  contribution: MyContributionData;
};

const MyOpenSourceContributionItem: React.FC<OpenSourceContributionItemProps> = ({
  contribution,
}) => {
  const { palette } = useColorPalette();
  const cardStyles = card({});
  const buttonFlexClass = css({
    flex: { base: "auto", md: "1", lg: "auto" },
    w: { base: "full", md: "auto" },
  });

  return (
    <div className={cx(cardStyles.root, css({ h: "full" }))}>
      <div className={cardStyles.header}>
        <div className={stack({ align: "flex-start" })}>
          <div className={flex({ align: "flex-start", justify: "flex-start", gap: "2" })}>
            <DeferredIcon
              icon={FaGithub}
              size="2xl"
              colorPalette={palette}
            />
            <div className={stack({ align: "flex-start" })}>
              <h3
                className={css({ fontWeight: "bold", textStyle: { base: "xl", md: "2xl" } })}
                aria-label={contribution.ariaLabel}
              >
                {contribution.title}
              </h3>
              <p aria-label={contribution.ariaLabel}>{contribution.detail}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={cardStyles.body}>
        <ul className={css({ w: "full", pl: "2" })}>
          {contribution.features.map((feature, fIdx) => (
            <li key={fIdx} className={css({ mb: "2" })}>
              <div className={hstack({})}>
                <DeferredIcon icon={FiCheckCircle} colorPalette={palette} />
                <span aria-label={feature}>{feature}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={cx(
          cardStyles.footer,
          css({ justifyContent: { base: "flex-start", md: "flex-end" } }),
        )}
      >
        <div className={stack({ direction: { base: "column", md: "row" }, justify: "space-between", gap: "2", w: "full" })}>
          <GithubInfoButton className={buttonFlexClass} repoUrl={contribution.link} infoType="stars" />
          <GithubInfoButton className={buttonFlexClass} repoUrl={contribution.link} infoType="forks" />
          <GithubInfoButton className={buttonFlexClass} repoUrl={contribution.link} infoType="download" />
        </div>
      </div>
    </div>
  );
};

export default MyOpenSourceContributionItem;
