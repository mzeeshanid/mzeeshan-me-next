import { Box, IconButton } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import React from "react";

type Props = {
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
};

export const ImageGalleryControls: React.FC<Props> = ({
  index,
  total,
  onPrev,
  onNext,
}) => {
  return (
    <>
      {/* ⬅️ Left */}
      <IconButton
        aria-label="Previous image"
        variant="subtle"
        position="absolute"
        left={4}
        top="50%"
        transform="translateY(-50%)"
        zIndex={2}
        onClick={onPrev}
        disabled={index === 0}
      >
        <FaChevronLeft />
      </IconButton>

      {/* ➡️ Right */}
      <IconButton
        aria-label="Next image"
        variant="subtle"
        position="absolute"
        right={4}
        top="50%"
        transform="translateY(-50%)"
        zIndex={2}
        onClick={onNext}
        disabled={index === total - 1}
      >
        <FaChevronRight />
      </IconButton>

      {/* Index */}
      <Box
        position="absolute"
        bottom={6}
        width="100%"
        textAlign="center"
        pointerEvents="none"
        zIndex={2}
      >
        <Box
          as="span"
          px={3}
          py={1}
          borderRadius="full"
          bg="blackAlpha.700"
          color="white"
          fontSize="sm"
          fontWeight="medium"
        >
          {index + 1} of {total}
        </Box>
      </Box>
    </>
  );
};
