// ArticleCoverImage.tsx
import Image from "next/image";
import { Box, ConditionalValue } from "@chakra-ui/react";
import { ArticleModel } from "@/apis/articles/articles";
import { getCdnBlurUrl } from "@/utils/cdnImage";

const ArticleCoverImage: React.FC<{
  article: ArticleModel;
  borderRadius?: string | number | ConditionalValue<string | string>;
  maxW?: string | number | ConditionalValue<string | string>;
}> = ({ article, maxW = "4xl", borderRadius = "lg" }) => {
  const image = article.image?.formats?.large;
  if (!image) return null;

  return (
    <Box
      borderRadius={borderRadius}
      overflow="hidden"
      bg="bg.muted"
      maxW={maxW}
      w="full"
      aspectRatio={image.width / image.height}
    >
      <Image
        src={image.url}
        alt={article.title}
        width={image.width}
        height={image.height}
        placeholder="blur"
        blurDataURL={getCdnBlurUrl(image.url)}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        priority
        sizes="(max-width: 48em) 100vw, 350px"
      />
    </Box>
  );
};

export default ArticleCoverImage;
