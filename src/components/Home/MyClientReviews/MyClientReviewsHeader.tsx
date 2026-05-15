import { css, cx } from "styled-system/css";
import { hstack, stack } from "styled-system/patterns";
import { paletteCva, useColorPalette, type PaletteCvaKey } from "@/contexts/useColorPalette";
import { FaStar, FaRegStar } from "react-icons/fa";

type MyClientReviewsHeaderProps = {
  title: string;
  avgRating: number;
  totalReviews: number;
};

const MyClientReviewsHeader: React.FC<MyClientReviewsHeaderProps> = ({
  title,
  avgRating,
  totalReviews,
}) => {
  const { palette } = useColorPalette();

  return (
    <div className={stack({ align: "flex-start", gap: "4", pl: { base: "4", md: "8" }, pr: { base: "4", md: "8" } })}>
      <h2 className={css({ textStyle: "2xl", minW: "180px" })}>{title}</h2>
      <p className={css({ fontWeight: "bold", fontSize: { base: "4xl", md: "6xl" } })}>
        {avgRating.toFixed(0)}/5
      </p>
      <div className={stack({ direction: { base: "row", md: "column" } })}>
        <div
          className={cx(
            paletteCva({ palette: palette as PaletteCvaKey }),
            hstack({ gap: "1" }),
          )}
          aria-label="Average client rating"
        >
          {Array.from({ length: 5 }).map((_, i) =>
            i < Math.round(avgRating) ? (
              <FaStar key={i} style={{ color: "var(--colors-color-palette-solid)" }} />
            ) : (
              <FaRegStar key={i} style={{ color: "var(--colors-color-palette-solid)" }} />
            ),
          )}
        </div>
        <p
          className={css({
            fontSize: "lg",
            textDecoration: "underline",
            textDecorationThickness: "0.25px",
            textUnderlineOffset: "4px",
            color: "fg.subtle",
          })}
        >
          {`${totalReviews} + reviews`}
        </p>
      </div>
    </div>
  );
};

export default MyClientReviewsHeader;
