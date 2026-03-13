import { Box, BoxProps, Highlight } from "@chakra-ui/react";
import * as React from "react";

type TypewriterHighlightProps = {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDelay?: number;
  highlightStyles?: BoxProps;
} & BoxProps;

export const TypewriterHighlight: React.FC<TypewriterHighlightProps> = ({
  words,
  typingSpeed = 90,
  deletingSpeed = 50,
  pauseDelay = 1200,
  highlightStyles,
  ...boxProps
}) => {
  const [wordIndex, setWordIndex] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const currentWord = words[wordIndex];

  React.useEffect(() => {
    let timeoutId: number;

    if (!isDeleting && charIndex < currentWord.length) {
      timeoutId = window.setTimeout(
        () => setCharIndex((c) => c + 1),
        typingSpeed,
      );
    } else if (!isDeleting && charIndex === currentWord.length) {
      timeoutId = window.setTimeout(() => setIsDeleting(true), pauseDelay);
    } else if (isDeleting && charIndex > 0) {
      timeoutId = window.setTimeout(
        () => setCharIndex((c) => c - 1),
        deletingSpeed,
      );
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(timeoutId);
  }, [
    charIndex,
    isDeleting,
    currentWord,
    typingSpeed,
    deletingSpeed,
    pauseDelay,
    words.length,
  ]);

  const visibleText = currentWord.slice(0, charIndex);
  return (
    <Box as="span" whiteSpace="pre" {...boxProps}>
      <Highlight
        query={visibleText}
        styles={{
          fontWeight: "bold",
          ...highlightStyles,
        }}
      >
        {visibleText || " "}
      </Highlight>
      {/* Cursor */}
      <Box as="span" ml="1px" animation="blink 1s step-end infinite">
        |
      </Box>
    </Box>
  );
};
