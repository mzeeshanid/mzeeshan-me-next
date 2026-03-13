import Image from "next/image";
import { Box } from "@chakra-ui/react";
import { useImageGallery } from "@/components/ImageGallery/ImageGalleryContext";

type MarkdownImageProps = {
  src?: string;
  alt?: string;
  index: number;
  width?: number;
  height?: number;
  my?: number;
};

export const MarkdownImage: React.FC<MarkdownImageProps> = ({
  src,
  alt,
  index,
  width,
  height,
  my,
}) => {
  const { openAt } = useImageGallery();

  if (!src) return null;

  return (
    <Box
      my={my ?? 0}
      cursor="zoom-in"
      onClick={() => openAt(index)}
      _hover={{
        transform: "scale(1.005)",
        transition: "transform 0.2s ease-out",
      }}
      transition="transform 0.2s ease-out"
    >
      <Image
        src={src}
        alt={alt ?? ""}
        width={width ?? 800}
        height={height ?? 450}
        style={{ width: "100%", height: "auto" }}
      />
    </Box>
  );
};
