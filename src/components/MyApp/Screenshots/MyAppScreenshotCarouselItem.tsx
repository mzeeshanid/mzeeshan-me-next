import { useImageGallery } from "@/components/ImageGallery/ImageGalleryContext";
import { BasicImageDataModel } from "@/data/basicImage/basicImageDataModel";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

type Props = {
  screenshot: BasicImageDataModel;
  index: number;
};

const MyAppScreenshotCarouselItem: React.FC<Props> = (props: Props) => {
  const { screenshot, index } = props;
  const { openAt } = useImageGallery();
  return (
    <Box
      w={screenshot.width}
      h={screenshot.height}
      bg="bg.subtle"
      rounded="2xl"
      overflow={"hidden"}
      cursor="zoom-in"
      onClick={() => openAt(index)}
      _hover={{
        transform: "scale(1.005)",
        transition: "transform 0.2s ease-out",
      }}
      transition="transform 0.2s ease-out"
    >
      <Image
        src={screenshot.src}
        placeholder="blur"
        alt={screenshot.alt}
        width={screenshot.width}
        height={screenshot.height}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
        }}
        loading="lazy"
      />
    </Box>
  );
};

export default MyAppScreenshotCarouselItem;
