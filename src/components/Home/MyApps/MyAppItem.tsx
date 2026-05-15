import { css, cx } from "styled-system/css";
import { stack } from "styled-system/patterns";
import { card } from "styled-system/recipes";
import { BasicImageDataModel } from "@/data/basicImage/basicImageDataModel";
import Image from "next/image";

type MyAppItemProps = {
  title: string;
  caption: string;
  detail: string;
  url: string;
  icon: BasicImageDataModel;
};

const MyAppItem = ({ title, caption, icon, url }: MyAppItemProps) => {
  const cardStyles = card({});

  return (
    <div className={cx(cardStyles.root, css({ bg: "bg.subtle", borderWidth: 0 }))}>
      <div className={cardStyles.body}>
        <a href={url}>
          <div className={css({ display: "flex", alignItems: "flex-start", gap: "4" })}>
            <div
              className={css({
                w: "64px",
                h: "64px",
                flexShrink: 0,
                bg: "bg.muted",
                rounded: "xl",
                overflow: "hidden",
              })}
            >
              <Image
                alt={icon.alt}
                src={icon.src}
                placeholder="blur"
                width={64}
                height={64}
                sizes="64px"
              />
            </div>
            <div className={stack({ align: "flex-start", gap: "0" })}>
              <p className={css({ fontSize: { base: "xl", md: "2xl" }, fontWeight: "bold" })}>
                {title}
              </p>
              <p className={css({ color: "fg.muted" })}>{caption}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default MyAppItem;
