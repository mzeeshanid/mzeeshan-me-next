import { Box } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

type Props = {
  img: { src: string; alt?: string };
  shouldRender: boolean;
  scale: number;
  origin: { x: number; y: number };
  onPointerUp: React.PointerEventHandler<HTMLDivElement>;
};

export const ImageGallerySlide = React.memo<Props>(
  ({ img, shouldRender, scale, origin, onPointerUp }) => {
    return (
      <Box
        width="100vw"
        height="100vh"
        flexShrink={0}
        p="24px"
        boxSizing="border-box"
        overflow="hidden"
        cursor={scale > 1 ? "default" : "ew-resize"}
      >
        <Box
          position="relative"
          width="100%"
          height="100%"
          overflow="hidden"
          onPointerUp={onPointerUp}
        >
          {shouldRender && (
            <Image
              src={img.src}
              alt={img.alt ?? ""}
              fill
              priority
              style={{
                objectFit: "contain",
                transform: `scale(${scale})`,
                transformOrigin: `${origin.x}% ${origin.y}%`,
                transition: "transform 0.25s ease",
              }}
            />
          )}
        </Box>
      </Box>
    );
  }
);

ImageGallerySlide.displayName = "ImageGallerySlide";
