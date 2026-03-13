// ArticleCoverImage.tsx
import Image from "next/image";
import { Box, ConditionalValue } from "@chakra-ui/react";
import { ArticleModel } from "@/apis/articles/articles";

const ArticleCoverImage: React.FC<{
  article: ArticleModel;
  borderRadius?: string | number | ConditionalValue<string | string>;
  maxW?: string | number | ConditionalValue<string | string>;
}> = ({ article, maxW = "4xl", borderRadius = "lg" }) => {
  const image = article.image?.formats?.large;
  if (!image) return null;

  const desiredWidth = 300;
  const desiredHeight = (image.height / image.width) * desiredWidth;

  return (
    <Box
      borderRadius={borderRadius}
      overflow="hidden"
      bg="bg.muted"
      maxW={maxW}
      minW={desiredWidth}
      minH={desiredHeight}
    >
      <Image
        src={image.url}
        alt={article.title}
        width={image.width}
        height={image.height}
        placeholder={article.blurData ? "blur" : "empty"}
        blurDataURL={article.blurData}
        style={{ width: "100%", height: "auto" }}
        priority
      />
    </Box>
  );
};

export default ArticleCoverImage;
