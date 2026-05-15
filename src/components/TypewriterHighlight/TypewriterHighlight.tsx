import { css } from "styled-system/css";
import * as React from "react";

type TypewriterHighlightProps = {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDelay?: number;
  highlightClassName?: string;
};

export const TypewriterHighlight: React.FC<TypewriterHighlightProps> = ({
  words,
  typingSpeed = 90,
  deletingSpeed = 50,
  pauseDelay = 1200,
  highlightClassName,
}) => {
  const [useFadeOnMobile, setUseFadeOnMobile] = React.useState(true);
  const [wordIndex, setWordIndex] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 48em)");
    setUseFadeOnMobile(!mq.matches);
    const handler = (e: MediaQueryListEvent) => setUseFadeOnMobile(!e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

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
      timeoutId = window.setTimeout(() => setCharIndex((c) => c + 1), typingSpeed);
    } else if (!isDeleting && charIndex === currentWord.length) {
      timeoutId = window.setTimeout(() => setIsDeleting(true), pauseDelay);
    } else if (isDeleting && charIndex > 0) {
      timeoutId = window.setTimeout(() => setCharIndex((c) => c - 1), deletingSpeed);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(timeoutId);
  }, [charIndex, isDeleting, currentWord, useFadeOnMobile, typingSpeed, deletingSpeed, pauseDelay, words.length]);

  if (useFadeOnMobile) {
    return (
      <span
        className={css({
          position: "relative",
          display: "inline-grid",
          verticalAlign: "top",
          whiteSpace: "normal",
        })}
      >
        <span
          className={css({ visibility: "hidden", pointerEvents: "none", gridArea: "1 / 1", fontWeight: "bold" })}
        >
          {longestWord || " "}
        </span>
        <span
          className={css({ gridArea: "1 / 1", transition: "opacity 0.25s ease" })}
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          <span className={highlightClassName}>{currentWord || " "}</span>
        </span>
      </span>
    );
  }

  const visibleText = currentWord.slice(0, charIndex);
  return (
    <span className={css({ whiteSpace: "pre" })}>
      <span className={highlightClassName}>{visibleText || " "}</span>
      <span style={{ marginLeft: "1px", animation: "blink 1s step-end infinite" }}>|</span>
    </span>
  );
};
