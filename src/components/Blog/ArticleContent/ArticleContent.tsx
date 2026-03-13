import { Box } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import {
  getMarkdownTheme,
  markdownComponents,
} from "../../../../styles/markdownTheme";
import React from "react";
import { markdownSanitizeSchema } from "../../../../styles/markdownSanitizeSchema";
import { ImageGalleryProvider } from "@/components/ImageGallery/ImageGalleryContext";
import { MarkdownImage } from "@/components/Markdown/MarkdownImage";

type ArticleContentProps = {
  content: string;
};

const ArticleContent: React.FC<ArticleContentProps> = (
  props: ArticleContentProps,
) => {
  const { content } = props;
  const markdownTheme = getMarkdownTheme();

  const images = React.useMemo(
    () => extractImagesFromMarkdown(content),
    [content],
  );

  const imageIndexMap = React.useMemo(() => {
    const map = new Map<string, number>();
    images.forEach((img, index) => {
      // key must be stable
      map.set(`${img.src}`, index);
    });
    return map;
  }, [images]);

  return (
    <Box w="full">
      <ImageGalleryProvider images={images}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            ...markdownTheme,
            ...markdownComponents,
            img: ({ src, alt }: any) => {
              if (!src) return null;

              const index = imageIndexMap.get(src);
              if (index === undefined) {
                // safety fallback
                return <img src={src} alt={alt ?? ""} />;
              }

              return <MarkdownImage src={src} alt={alt} index={index} my={6} />;
            },
          }}
          rehypePlugins={[rehypeRaw, [rehypeSanitize, markdownSanitizeSchema]]}
        >
          {content}
        </ReactMarkdown>
      </ImageGalleryProvider>
    </Box>
  );
};

export type GalleryImage = {
  src: string;
  alt?: string;
};

export const extractImagesFromMarkdown = (content: string): GalleryImage[] => {
  const images: GalleryImage[] = [];

  // Markdown images
  const mdRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let match;
  while ((match = mdRegex.exec(content))) {
    images.push({ src: match[2], alt: match[1] });
  }

  // HTML images
  const htmlRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
  while ((match = htmlRegex.exec(content))) {
    images.push({ src: match[1] });
  }

  return images;
};

export default ArticleContent;
