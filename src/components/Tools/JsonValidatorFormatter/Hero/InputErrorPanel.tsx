import { Box, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { LuX } from "react-icons/lu";
import type { ValidationErrorDetails } from "./jsonValidatorFormatterTypes";

type Props = {
  error: ValidationErrorDetails;
  /** The current text in the editor — used to render the line-highlighted code view */
  text: string;
  onDismiss: () => void;
};

/**
 * Compact inline error panel shown below the input textarea when Format /
 * Validate is clicked on invalid JSON.
 *
 * Scroll strategy
 * ───────────────
 * The outer <Box> is the single scroll container (overflow: auto, maxH).
 * Every row has minW="max-content" + display="flex" so it widens to its own
 * content instead of being clamped by the container. The code cell has
 * flexShrink={0} so it never compresses below its intrinsic pre width.
 * This lets the container scroll both axes without a nested wrapper fighting it.
 */
const InputErrorPanel: React.FC<Props> = ({ error, text, onDismiss }) => {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const errorLineRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Step 1 — bring the panel itself into the viewport (page-level scroll)
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });

    // Step 2 — after the page scroll settles, scroll the error line inside the panel.
    // Use getBoundingClientRect so the offset is always relative to the scroll
    // container's current viewport position, not the element's offsetParent.
    const timer = setTimeout(() => {
      if (!errorLineRef.current || !scrollRef.current) return;
      const container = scrollRef.current;
      const containerRect = container.getBoundingClientRect();
      const targetRect = errorLineRef.current.getBoundingClientRect();
      // position of target's top edge relative to the container's top edge,
      // accounting for any scroll already applied
      const relativeTop = targetRect.top - containerRect.top + container.scrollTop;
      container.scrollTop = relativeTop - container.clientHeight / 2 + targetRect.height / 2;
    }, 350);

    return () => clearTimeout(timer);
  }, [error]);

  const lines = text.split("\n");

  return (
    <Box ref={panelRef} borderWidth="1px" borderRadius="xl" overflow="hidden" borderColor="border.error">
      {/* Header */}
      <HStack
        px={4}
        py={3}
        bg="rgba(239,68,68,0.07)"
        borderBottomWidth="1px"
        borderColor="border.error"
        justify="space-between"
      >
        <VStack align="start" gap={0}>
          <Text fontWeight="semibold" color="fg.error" fontSize="sm">
            {"Invalid JSON"}
          </Text>
          <Text color="fg.muted" fontSize="xs" fontFamily="mono">
            {error.message}
          </Text>
        </VStack>
        <HStack gap={3} align="center" flexShrink={0}>
          {(error.line != null || error.column != null) && (
            <Text
              fontSize="xs"
              fontFamily="mono"
              color="fg.error"
              bg="rgba(239,68,68,0.12)"
              px={2}
              py={1}
              borderRadius="md"
              whiteSpace="nowrap"
            >
              {`Line ${error.line ?? "?"}, Col ${error.column ?? "?"}`}
            </Text>
          )}
          <IconButton size="xs" variant="ghost" aria-label="Dismiss error" onClick={onDismiss}>
            <LuX />
          </IconButton>
        </HStack>
      </HStack>

      {/* Code view */}
      <Box
        ref={scrollRef}
        maxH="14rem"
        overflow="auto"
        fontFamily="mono"
        fontSize="sm"
      >
        {lines.map((line, index) => {
          const lineNumber = index + 1;
          const isErrorLine = error.line === lineNumber;

          return (
            <Box
              key={lineNumber}
              ref={isErrorLine ? errorLineRef : undefined}
              display="flex"
              alignItems="flex-start"
              // minW per-row so each row expands to its own content width,
              // letting the parent scroll container measure the true max width
              minW="max-content"
              bg={isErrorLine ? "rgba(239,68,68,0.12)" : "transparent"}
            >
              {/* Gutter */}
              <Box
                w="52px"
                flexShrink={0}
                px={3}
                py="2px"
                textAlign="right"
                color={isErrorLine ? "fg.error" : "fg.subtle"}
                borderRightWidth="1px"
                fontWeight={isErrorLine ? "bold" : "normal"}
                style={{ userSelect: "none" }}
              >
                {lineNumber}
              </Box>
              {/* Code cell — flexShrink:0 prevents flex from squeezing it */}
              <Box
                as="pre"
                flexShrink={0}
                px={3}
                py="2px"
                m={0}
                whiteSpace="pre"
                color={isErrorLine ? "fg.error" : undefined}
                fontWeight={isErrorLine ? "semibold" : "normal"}
              >
                {line || " "}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default InputErrorPanel;
