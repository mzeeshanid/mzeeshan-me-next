import { css, cx } from "styled-system/css";
import { flex, hstack, stack } from "styled-system/patterns";
import { avatar, card } from "styled-system/recipes";
import { paletteCva, useColorPalette, type PaletteCvaKey } from "@/contexts/useColorPalette";
import { Avatar } from "@ark-ui/react/avatar";
import DeferredIcon from "@/components/DeferredIcon/DeferredIcon";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { RiDoubleQuotesL } from "react-icons/ri";
import { ReviewJsonLd } from "next-seo";
import React from "react";
import { IconType } from "react-icons";

type MyClientReviewItemProps = {
  name: string;
  rating: number;
  countryCode: string;
  country: string;
  platform: string;
  text: string;
  icon: IconType;
  isVerified: boolean;
  date: string;
  source: string;
};

const MyClientReviewItem: React.FC<MyClientReviewItemProps> = ({
  name,
  rating,
  country,
  platform,
  text,
  isVerified,
  date,
  icon,
  source,
}) => {
  const { palette } = useColorPalette();
  const cardStyles = card({});
  const avatarStyles = avatar({});
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <>
      <ReviewJsonLd
        scriptId={`review-${name.replace(/\s+/g, "-").toLowerCase()}`}
        author={name}
        reviewRating={{ ratingValue: rating, bestRating: 5, worstRating: 1 }}
        itemReviewed={{ name: "Muhammad Zeeshan", "@type": "Organization" }}
        reviewBody={text}
        url={source}
      />
      <div className={cx(cardStyles.root, css({ h: "full" }))}>
        <div className={cardStyles.header}>
          <div className={hstack({ justify: "space-between" })}>
            <div
              className={cx(
                paletteCva({ palette: palette as PaletteCvaKey }),
                hstack({ gap: "1" }),
              )}
              aria-label={`${name}'s rating ${rating} out of 5 stars`}
            >
              {Array.from({ length: 5 }).map((_, i) =>
                i < rating ? (
                  <FaStar key={i} style={{ color: "var(--colors-color-palette-solid)" }} />
                ) : (
                  <FaRegStar key={i} style={{ color: "var(--colors-color-palette-solid)" }} />
                ),
              )}
            </div>
            <div className={hstack({})}>
              <span className={css({ fontSize: "sm", color: "fg.muted" })}>{date}</span>
              {isVerified && (
                <DeferredIcon icon={FiCheckCircle} color={palette} size="md" />
              )}
            </div>
          </div>
        </div>
        <div className={cardStyles.body}>
          <div className={flex({ align: "start", gap: "2" })}>
            <DeferredIcon
              icon={RiDoubleQuotesL}
              color={palette}
              size="lg"
            />
            <p className={css({ fontSize: "md", color: "fg.muted", mt: "2" })}>{text}</p>
          </div>
        </div>
        <div className={cardStyles.footer}>
          <div className={stack({ gap: "4", w: "full" })}>
            <div className={hstack({ gap: "4", justify: "space-between" })}>
              <div className={hstack({})}>
                <Avatar.Root
                  className={cx(
                    paletteCva({ palette: palette as PaletteCvaKey }),
                    avatarStyles.root,
                  )}
                >
                  <Avatar.Fallback className={avatarStyles.fallback}>
                    {initials}
                  </Avatar.Fallback>
                </Avatar.Root>
                <div className={stack({ align: "start", gap: "0" })}>
                  <p className={css({ fontWeight: "bold" })}>{name}</p>
                  <p className={css({ fontSize: "sm", color: "fg.subtle" })}>
                    {country} • {platform}
                  </p>
                </div>
              </div>
              <DeferredIcon icon={icon} size="md" color="fg.muted" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyClientReviewItem;
