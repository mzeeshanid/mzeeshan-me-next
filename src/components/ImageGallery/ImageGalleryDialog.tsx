import { useImageGestures } from "@/hooks/useImageGestures";
import { Box, CloseButton, Dialog, Flex, Portal } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { ImageGalleryControls } from "./ImageGalleryControls";
import { ImageGallerySlide } from "./ImageGallerySlide";

type Props = {
  images: { src: string; alt?: string }[];
  startIndex: number;
  onClose: () => void;
};

export const ImageGalleryDialog: React.FC<Props> = ({
  images,
  startIndex,
  onClose,
}) => {
  const [index, setIndex] = React.useState(startIndex);
  const [scale, setScale] = React.useState(1);
  const [origin, setOrigin] = React.useState({
    x: 50,
    y: 50,
  });

  const isZoomed = scale > 1;

  const prev = React.useCallback(() => {
    if (isZoomed) return;
    setIndex((i) => Math.max(0, i - 1));
  }, [isZoomed]);

  const next = React.useCallback(() => {
    if (isZoomed) return;
    setIndex((i) => Math.min(images.length - 1, i + 1));
  }, [isZoomed, images.length]);

  const { onPointerUp } = useImageGestures({
    scale,
    setScale,
    setOrigin,
    prev,
    next,
  });

  useEffect(() => {
    setScale(1);
    setOrigin({ x: 50, y: 50 });
  }, [index]);

  const shouldRender = (i: number) => Math.abs(i - index) <= 1;

  const prevRef = React.useRef<() => void>(() => {});
  const nextRef = React.useRef<() => void>(() => {});

  React.useEffect(() => {
    prevRef.current = prev;
    nextRef.current = next;
  });

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
      if (e.key === "ArrowLeft") {
        prevRef.current();
      }
      if (e.key === "ArrowRight") {
        nextRef.current();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <Dialog.Root
      open
      onOpenChange={onClose}
      size={"full"}
      motionPreset="slide-in-bottom"
    >
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(8px)" />
        <Dialog.Positioner>
          <Dialog.Content bg="transparent">
            <Dialog.Body p={0} position="relative" overflow="hidden">
              <ImageGalleryControls
                index={index}
                total={images.length}
                onPrev={prev}
                onNext={next}
              />

              <Flex
                width={`${images.length * 100}vw`}
                height="100%"
                transform={`translateX(-${index * 100}vw)`}
                transition={
                  isZoomed
                    ? "none"
                    : "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)"
                }
              >
                {images.map((img, i) => (
                  <ImageGallerySlide
                    key={img.src}
                    img={img}
                    scale={scale}
                    origin={origin}
                    shouldRender={shouldRender(i)}
                    onPointerUp={onPointerUp}
                  />
                ))}
              </Flex>

              <Box
                position="absolute"
                bottom={0}
                left={0}
                width="100%"
                height="120px"
                bgGradient="linear(to-t, rgba(0,0,0,0.6), rgba(0,0,0,0))"
                pointerEvents="none"
              />
            </Dialog.Body>
            <Dialog.CloseTrigger asChild zIndex={2}>
              <CloseButton variant={"subtle"} size="md" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
