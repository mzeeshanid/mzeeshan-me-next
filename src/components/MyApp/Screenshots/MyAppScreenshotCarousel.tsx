import { Carousel, IconButton } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import { ImageGalleryProvider } from "@/components/ImageGallery/ImageGalleryContext";
import { BasicImageDataModel } from "@/data/basicImage/basicImageDataModel";
import React from "react";
import MyAppScreenshotCarouselItem from "./MyAppScreenshotCarouselItem";

type Props = {
  screenshots: BasicImageDataModel[];
};

const MyAppScreenshotCarousel: React.FC<Props> = (props: Props) => {
  const { screenshots } = props;

  return (
    <ImageGalleryProvider images={screenshots.map((s) => ({ src: s.src.src, alt: s.alt }))}>
      <Carousel.Root
        gap={2}
        autoSize
        slideCount={screenshots.length}
        w="full"
        mx="auto"
      >
        <Carousel.ItemGroup>
          {screenshots.map((screenshot, index) => (
            <Carousel.Item key={index} index={index} width={"auto"}>
              <MyAppScreenshotCarouselItem
                screenshot={screenshot}
                index={index}
              />
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>

        <Carousel.Control justifyContent="center" gap={4}>
          <Carousel.PrevTrigger asChild>
            <IconButton size="xs" variant="ghost">
              <LuChevronLeft />
            </IconButton>
          </Carousel.PrevTrigger>

          <Carousel.Indicators />

          <Carousel.NextTrigger asChild>
            <IconButton size="xs" variant="ghost">
              <LuChevronRight />
            </IconButton>
          </Carousel.NextTrigger>
        </Carousel.Control>
      </Carousel.Root>
    </ImageGalleryProvider>
  );
};

export default MyAppScreenshotCarousel;
