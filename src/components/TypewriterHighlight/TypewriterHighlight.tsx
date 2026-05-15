import { Box, BoxProps, Highlight, useBreakpointValue } from "@chakra-ui/react";
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
  const useFadeOnMobile = useBreakpointValue({ base: true, md: false }) ?? true;
  const [wordIndex, setWordIndex] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);

  const currentWord = words[wordIndex];
  const longestWord = React.useMemo(
    () => words.reduce((longest, word) => (word.length > longest.length ? word : longest), words[0] || ""),
    [words],
  );

  React.useEffect(() => {
    if (useFadeOnMobile) {
      const fadeOutDelay = pauseDelay;
      const nextWordDelay = fadeOutDelay + 220;
      const fadeInDelay = nextWordDelay + 60;
      const cycleDelay = fadeInDelay + pauseDelay;

      setIsVisible(true);

      const fadeOutTimer = window.setTimeout(() => setIsVisible(false), fadeOutDelay);
      const nextWordTimer = window.setTimeout(() => {
        setWordIndex((i) => (i + 1) % words.length);
      }, nextWordDelay);
      const fadeInTimer = window.setTimeout(() => setIsVisible(true), fadeInDelay);
      const noopTimer = window.setTimeout(() => undefined, cycleDelay);

      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(nextWordTimer);
        clearTimeout(fadeInTimer);
        clearTimeout(noopTimer);
      };
    }

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
    useFadeOnMobile,
    typingSpeed,
    deletingSpeed,
    pauseDelay,
    words.length,
  ]);

  if (useFadeOnMobile) {
    return (
      <Box
        as="span"
        position="relative"
        display="inline-grid"
        verticalAlign="top"
        whiteSpace="normal"
        {...boxProps}
      >
        <Box
          as="span"
          visibility="hidden"
          pointerEvents="none"
          gridArea="1 / 1"
          fontWeight="bold"
          {...highlightStyles}
        >
          {longestWord || " "}
        </Box>
        <Box
          as="span"
          gridArea="1 / 1"
          transition="opacity 0.25s ease"
          opacity={isVisible ? 1 : 0}
        >
          <Highlight
            query={currentWord}
            styles={{
              fontWeight: "bold",
              ...highlightStyles,
            }}
          >
            {currentWord || " "}
          </Highlight>
        </Box>
      </Box>
    );
  }

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
